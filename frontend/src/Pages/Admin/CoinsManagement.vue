<template>
  <div class="coins-management">
    <div class="page-header">
      <h1>Coins Management</h1>
      <p>Generate and transfer coins to users</p>
    </div>

    <!-- Transfer Coins Section - Show for both admin and superuser -->
    <div class="card">
      <div class="card-header">
        <h2>Transfer Coins</h2>
        <p class="current-balance">Your Balance: {{ currentUserBalance }} coins</p>
      </div>
      <div class="card-body">
        <form @submit.prevent="handleTransferCoins" class="transfer-form">
          <div class="form-group">
            <label for="fromUser">From User</label>
            <select 
              v-model="transferForm.fromUserId" 
              class="form-control" 
              id="fromUser"
              disabled
              required
            >
              <option 
                :value="authStore.user?._id"
              >
                {{ currentUserName }} ({{ currentUserBalance }} coins)
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="toUser">To User</label>
            <select 
              v-model="transferForm.toUserId" 
              class="form-control" 
              id="toUser"
              required
            >
              <option value="">Select destination user</option>
              <option 
                v-for="user in otherUsers" 
                :key="user._id" 
                :value="user._id"
              >
                {{ user.username }} ({{ user.balance }} coins)
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="transferAmount">Amount</label>
            <input 
              type="number" 
              v-model="transferForm.amount" 
              class="form-control" 
              id="transferAmount"
              min="1"
              :max="currentUserBalance"
              required
            >
          </div>
          <button 
            type="submit" 
            class="btn btn-primary" 
            :disabled="loading || !canTransfer"
          >
            <i class="fas fa-exchange-alt"></i>
            Transfer Coins
          </button>
        </form>
      </div>
    </div>

    <!-- Generate Coins Section - Show for both but handle permissions in UI -->
    <div class="card">
      <div class="card-header">
        <h2>Generate Coins</h2>
        <p v-if="!isSuperuser" class="permission-notice">
          <i class="fas fa-info-circle"></i>
          Only superusers can generate coins
        </p>
      </div>
      <div class="card-body">
        <form @submit.prevent="handleGenerateCoins" class="generate-form">
          <div class="form-group">
            <label for="generateAmount">Amount</label>
            <input
              type="number"
              id="generateAmount"
              v-model="generateForm.amount"
              min="1"
              required
              :disabled="!isSuperuser"
            />
          </div>
          <div class="form-group">
            <label for="generateUser">User</label>
            <select
              id="generateUser"
              v-model="generateForm.userId"
              required
              :disabled="!isSuperuser"
            >
              <option value="">Select user</option>
              <option v-for="user in users" :key="user._id" :value="user._id">
                {{ user.username }} ({{ user.balance }} coins)
              </option>
            </select>
          </div>
          <button 
            type="submit" 
            class="btn btn-primary" 
            :disabled="!isSuperuser || loading"
          >
            <i class="fas fa-plus-circle"></i>
            Generate Coins
          </button>
        </form>
      </div>
    </div>

    <!-- Recent Transactions -->
    <!-- <div class="card mt-4">
      <div class="card-header">
        <h2>Recent Transactions</h2>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="transaction in recentTransactions" :key="transaction._id">
                <td>{{ formatDate(transaction.createdAt) }}</td>
                <td>
                  <span :class="['badge', transaction.type]">
                    {{ transaction.type }}
                  </span>
                </td>
                <td>{{ transaction.from?.username || 'System' }}</td>
                <td>{{ transaction.to?.username }}</td>
                <td>{{ transaction.amount }} coins</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '../../stores/auth';
import axios from "axios";

interface User {
  _id: string;
  username: string;
  balance: number;
}

interface TransactionForm {
  userId: string;
  amount: number;
  type: 'add' | 'remove';
}

const authStore = useAuthStore();
const loading = ref(false);
const users = ref<User[]>([]);
const recentTransactions = ref([]);

const generateForm = ref({
  userId: '',
  amount: null as number | null
});

const transferForm = ref({
  fromUserId: '',
  toUserId: '',
  amount: null as number | null
});

const selectedUser = ref<User | null>(null);
const transactionForm = ref<TransactionForm>({
  userId: '',
  amount: 0,
  type: 'add'
});

const isAdminOrSuperuser = computed(() => {
  const role = authStore.user?.role;
  return role === 'admin' || role === 'superuser';
});

const isSuperuser = computed(() => authStore.user?.role === 'superuser');

const currentUserBalance = computed(() => {
  console.log('Auth store user:', authStore.user); // Debug the full user object
  const currentUser = users.value.find(u => u._id === authStore.user?._id);
  console.log('Found user:', currentUser); // Debug the found user
  return currentUser?.balance || 0;
});

// Update otherUsers computed property as well
const otherUsers = computed(() => {
  return users.value.filter(user => user._id !== authStore.user?._id);
});

const canTransfer = computed(() => {
  const amount = Number(transferForm.value.amount);
  return amount > 0 && amount <= currentUserBalance.value && transferForm.value.toUserId;
});

const formatDate = (date: string) => {
  return new Date(date).toLocaleString();
};

const fetchUsers = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/admin/users`,
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      }
    );
    users.value = response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

const fetchTransactions = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/transactions`, {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    });
    recentTransactions.value = await response.json();
  } catch (error) {
    console.error('Error fetching transactions:', error);
  }
};

const handleGenerateCoins = async (event: Event) => {
  event.preventDefault();
  
  if (!isSuperuser.value) {
    alert('Only superusers can generate coins');
    return;
  }

  try {
    loading.value = true;
    const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/generate-coins`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      },
      body: JSON.stringify({
        userId: generateForm.value.userId,
        amount: generateForm.value.amount
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to generate coins');
    }

    generateForm.value = { userId: '', amount: null };
    await Promise.all([fetchUsers(), fetchTransactions()]);
    alert('Coins generated successfully!');
  } catch (error) {
    console.error('Error generating coins:', error);
    alert(error instanceof Error ? error.message : 'Failed to generate coins');
  } finally {
    loading.value = false;
  }
};

const handleTransferCoins = async () => {
  try {
    if (!canTransfer.value) {
      alert('Invalid transfer amount or insufficient balance');
      return;
    }

    loading.value = true;
    const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/transfer-coins`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      },
      body: JSON.stringify({
        fromUserId: authStore.user?._id,
        toUserId: transferForm.value.toUserId,
        amount: transferForm.value.amount
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to transfer coins');
    }

    transferForm.value = { 
      fromUserId: authStore.user?._id || '',
      toUserId: '', 
      amount: null 
    };
    await Promise.all([fetchUsers(), fetchTransactions()]);
    alert('Coins transferred successfully!');
  } catch (error) {
    console.error('Error transferring coins:', error);
    alert(error instanceof Error ? error.message : 'Failed to transfer coins');
  } finally {
    loading.value = false;
  }
};

const currentUserName = computed(() => {
  const currentUser = users.value.find(u => u._id === authStore.user?._id);
  return currentUser?.username || 'Current User';
});

const handleTransaction = async () => {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/admin/manage-coins`,
      transactionForm.value,
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      }
    );
    await fetchUsers();
    selectedUser.value = null;
    transactionForm.value = {
      userId: '',
      amount: 0,
      type: 'add'
    };
  } catch (error) {
    console.error("Error processing transaction:", error);
  }
};

onMounted(() => {
  transferForm.value.fromUserId = authStore.user?._id || '';
  fetchUsers();
  fetchTransactions();
});
</script>

<style scoped>
.coins-management {
  padding: 20px;
  background: var(--body-color);
}

.page-header {
  margin-bottom: 2rem;
}

.page-header h1 {
  margin: 0;
  font-size: 2rem;
  color: var(--white);
}

.page-header p {
  color: var(--textcolor);
  margin-top: 0.5rem;
}

.card {
  background: var(--header);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border: 1px solid var(--leftpreborder);
  margin-bottom: 20px;
}

.card-header {
  padding: 1rem;
  border-bottom: 1px solid var(--leftpreborder);
}

.card-header h2 {
  color: var(--white);
}

.card-body {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--textcolor);
}

.form-control {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--leftpreborder);
  border-radius: 4px;
  background: var(--pointbox);
  color: var(--white);
}

.form-control:focus {
  border-color: var(--active-color);
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background: var(--active-color);
  color: var(--black);
}

.btn-primary:hover {
  background: var(--active-color-hover);
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
}

.badge.system_generation {
  background: #28a745;
  color: white;
}

.badge.transfer {
  background: #007bff;
  color: white;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
  text-align: left;
}

.table th {
  font-weight: 600;
  color: var(--textcolor);
}

.table td {
  color: var(--white);
}

.current-balance {
  margin: 0.5rem 0 0 0;
  font-size: 1rem;
  color: var(--textcolor);
}

select {
  background: var(--pointbox);
  color: var(--white);
  border: 1px solid var(--leftpreborder);
}

select:disabled {
  background-color: #f8f9fa;
  cursor: not-allowed;
  opacity: 0.8;
}

/* Enhanced mobile responsiveness */
@media (max-width: 768px) {
  .coins-management {
    padding: 10px;
  }

  .card {
    margin-bottom: 15px;
  }

  .card-body {
    padding: 15px;
  }

  .form-group {
    margin-bottom: 15px;
  }

  .form-control {
    padding: 12px; /* Larger touch targets */
  }

  .btn {
    width: 100%;
    padding: 12px;
    justify-content: center;
  }

  .generate-form,
  .transfer-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .table-responsive {
    margin: 0 -15px;
    padding: 0 15px;
    max-width: calc(100vw - 20px);
  }

  table {
    min-width: 600px;
  }
}

.permission-notice {
  color: var(--textcolor);
  background: var(--pointbox);
  border: 1px solid var(--leftpreborder);
  padding: 8px 12px;
  border-radius: 4px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
}

.permission-notice i {
  font-size: 1.1rem;
}

/* Style disabled form elements */
input:disabled,
select:disabled,
button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  background-color: var(--pointbox);
  color: var(--textcolor);
}

button:disabled {
  background-color: var(--pointbox);
}

input[type="number"] {
  color: var(--white);
  background: var(--pointbox);
}
</style> 