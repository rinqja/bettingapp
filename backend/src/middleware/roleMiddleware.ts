import { Request, Response, NextFunction } from 'express';

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const userRole = req.user.role;

    if (userRole !== 'admin' && userRole !== 'superuser') {
      return res.status(403).json({ 
        message: 'Access denied: Admin privileges required' 
      });
    }

    next();
  } catch (error) {
    res.status(403).json({ message: 'Access denied' });
  }
};

export const superuserMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const userRole = req.user.role;

    if (userRole !== 'superuser') {
      return res.status(403).json({ 
        message: 'Access denied: Superuser privileges required' 
      });
    }

    next();
  } catch (error) {
    res.status(403).json({ message: 'Access denied' });
  }
}; 