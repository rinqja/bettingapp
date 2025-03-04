import { Request, Response } from 'express';
import User from '../models/User';
import Transaction from '../models/Transaction';
import { monitor } from '../utils/serviceMonitor';

// Get dashboard statistics
export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    // First, verify the user exists
    // @ts-ignore (req.user is added by auth middleware)
    const userId = req.user?.userId;
    console.log('Checking user:', userId);

    const user = await User.findById(userId);
    if (!user) {
      console.log('User not found in database:', userId);
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify user has admin/superuser role
    if (!['admin', 'superuser'].includes(user.role)) {
      console.log('User lacks required role:', user.role);
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    const totalUsers = await User.countDocuments();
    const totalCoinsResult = await User.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$balance' }
        }
      }
    ]);
    const totalCoins = totalCoinsResult[0]?.total || 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const transactionsToday = await Transaction.countDocuments({
      createdAt: { $gte: today }
    });

    const recentTransactions = await Transaction.find()
      .populate('from to', 'username')
      .sort({ createdAt: -1 })
      .limit(10);

    console.log('Successfully fetched dashboard stats for user:', userId);
    res.json({
      stats: {
        totalUsers,
        totalCoins,
        transactionsToday
      },
      recentTransactions
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Error fetching dashboard stats' });
  }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Get all transactions
export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter: any = {};

    if (req.query.type) {
      filter.type = req.query.type;
    }

    if (req.query.startDate || req.query.endDate) {
      filter.createdAt = {};
      if (req.query.startDate) {
        filter.createdAt.$gte = new Date(req.query.startDate as string);
      }
      if (req.query.endDate) {
        filter.createdAt.$lte = new Date(req.query.endDate as string);
      }
    }

    if (req.query.minAmount || req.query.maxAmount) {
      filter.amount = {};
      if (req.query.minAmount) {
        filter.amount.$gte = parseInt(req.query.minAmount as string);
      }
      if (req.query.maxAmount) {
        filter.amount.$lte = parseInt(req.query.maxAmount as string);
      }
    }

    console.log('Applying filters:', filter); // Debug log

    const [transactions, total] = await Promise.all([
      Transaction.find(filter)
        .populate('from to', 'username')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(), // Convert to plain JavaScript objects
      Transaction.countDocuments(filter)
    ]);

    console.log(`Found ${transactions.length} transactions`); // Debug log

    res.json({
      transactions: transactions || [], // Ensure we always send an array
      pagination: {
        currentPage: page,
        totalPages: Math.max(Math.ceil(total / limit), 1), // Ensure at least 1 page
        totalItems: total,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    // Send a more detailed error response
    res.status(500).json({ 
      message: 'Error fetching transactions',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Only superuser can generate coins
export const generateCoins = async (req: Request, res: Response) => {
  try {
    // Check if user is superuser
    if (req.user?.role !== 'superuser') {
      return res.status(403).json({ 
        message: 'Only superusers can generate coins'
      });
    }

    const { amount, userId } = req.body;

    if (!amount || !userId) {
      return res.status(400).json({ message: 'Amount and userId are required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user balance
    user.balance += Number(amount);
    await user.save();

    // Create transaction record
    const transaction = new Transaction({
      type: 'system_generation',
      amount: Number(amount),
      to: userId,
      description: 'System coin generation'
    });
    await transaction.save();

    res.json({ message: 'Coins generated successfully', user, transaction });
  } catch (error) {
    console.error('Generate coins error:', error);
    res.status(500).json({ message: 'Error generating coins' });
  }
};

// Both admin and superuser can transfer coins
export const transferCoins = async (req: Request, res: Response) => {
  try {
    // Check if user is admin or superuser
    if (!['admin', 'superuser'].includes(req.user?.role || '')) {
      return res.status(403).json({ 
        message: 'Only admins and superusers can transfer coins'
      });
    }

    const { fromUserId, toUserId, amount } = req.body;

    // For superusers, skip the fromUserId check
    if (req.user?.role !== 'superuser') {
      // Only enforce the fromUserId check for regular admins
      if (fromUserId !== req.user?.userId) {
        return res.status(403).json({ 
          message: 'You can only transfer coins from your own account' 
        });
      }
    }

    if (!toUserId || !amount) {
      return res.status(400).json({ message: 'Recipient and amount are required' });
    }

    // Find users
    const fromUser = await User.findById(fromUserId);
    const toUser = await User.findById(toUserId);

    if (!fromUser || !toUser) {
      return res.status(404).json({ message: 'One or both users not found' });
    }

    if (fromUser.balance < Number(amount)) {
      return res.status(400).json({ 
        message: 'Insufficient balance',
        available: fromUser.balance,
        requested: amount
      });
    }

    // Update balances using findOneAndUpdate
    await User.findByIdAndUpdate(fromUserId, {
      $inc: { balance: -Number(amount) }
    });

    await User.findByIdAndUpdate(toUserId, {
      $inc: { balance: Number(amount) }
    });

    // Create transaction record
    const transaction = await Transaction.create({
      type: 'transfer',
      amount: Number(amount),
      from: fromUserId,
      to: toUserId,
      description: 'Admin transfer'
    });

    res.json({ 
      message: 'Transfer successful',
      transaction
    });
  } catch (error) {
    console.error('Transfer error:', error);
    res.status(500).json({ 
      message: 'Error transferring coins',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Aliases for compatibility with existing routes
export const getUserList = getAllUsers;
export const getTransactionHistory = getAllTransactions;

// Update user role
export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // Validate role
    const validRoles = ['user', 'admin', 'superuser'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent self-role modification
    if (id === req.user?.userId) {
      return res.status(403).json({ message: 'Cannot modify own role' });
    }

    // Only superusers can create other superusers
    if (role === 'superuser' && req.user?.role !== 'superuser') {
      return res.status(403).json({ message: 'Only superusers can create other superusers' });
    }

    // Prevent modifying superuser roles by non-superusers
    if (user.role === 'superuser' && req.user?.role !== 'superuser') {
      return res.status(403).json({ message: 'Cannot modify superuser roles' });
    }

    // Update user role
    user.role = role;
    await user.save();

    res.json({ message: 'User role updated successfully', user });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ message: 'Error updating user role' });
  }
};

// Update user status
export const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['active', 'suspended'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent self-status modification
    if (id === req.user?.userId) {
      return res.status(403).json({ message: 'Cannot modify own status' });
    }

    // Prevent modifying superuser status by non-superusers
    if (user.role === 'superuser' && req.user?.role !== 'superuser') {
      return res.status(403).json({ message: 'Cannot modify superuser status' });
    }

    // Update user status
    user.status = status;
    await user.save();

    res.json({ message: 'User status updated successfully', user });
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({ message: 'Error updating user status' });
  }
};

export const getServiceMetrics = async (req: Request, res: Response) => {
  try {
    const metrics = monitor.getMetrics();
    res.json({ success: true, metrics });
  } catch (error) {
    console.error('Error fetching metrics:', error);
    res.status(500).json({ success: false, message: 'Error fetching metrics' });
  }
};

export default {
  getDashboardStats,
  getAllUsers,
  getAllTransactions,
  generateCoins,
  transferCoins,
  getUserList,
  getTransactionHistory,
  updateUserRole,
  updateUserStatus,
  getServiceMetrics
}; 