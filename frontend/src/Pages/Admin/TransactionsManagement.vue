<template>
  <div class="transactions-management">
    <div class="page-header">
      <h1>Transactions Management</h1>
      <p>View and manage all system transactions</p>
    </div>

    <!-- Filters -->
    <div class="filters card mb-4">
      <div class="card-body">
        <div class="filter-grid">
          <div class="form-group">
            <label>Type</label>
            <select v-model="filters.type" class="form-control">
              <option value="">All Types</option>
              <option value="transfer">Transfer</option>
              <option value="system_generation">System Generation</option>
              <option value="bet_placement">Bet Placement</option>
              <option value="bet_win">Bet Win</option>
            </select>
          </div>
          <div class="form-group">
            <label>Date Range</label>
            <input 
              type="date" 
              v-model="filters.startDate" 
              class="form-control"
            >
            <input 
              type="date" 
              v-model="filters.endDate" 
              class="form-control mt-2"
            >
          </div>
          <div class="form-group">
            <label>Amount Range</label>
            <div class="amount-range">
              <input 
                type="number" 
                v-model="filters.minAmount" 
                class="form-control" 
                placeholder="Min"
              >
              <input 
                type="number" 
                v-model="filters.maxAmount" 
                class="form-control" 
                placeholder="Max"
              >
            </div>
          </div>
          <div class="form-group">
            <label>&nbsp;</label>
            <button @click="applyFilters" class="btn btn-primary">
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Transactions Table -->
    <div class="card">
      <div class="card-body">
        <div v-if="loading" class="text-center py-4">
          <div class="spinner"></div>
          Loading transactions...
        </div>
        
        <div v-else-if="transactions.length === 0" class="text-center py-4">
          No transactions found.
        </div>
        
        <div v-else class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="transaction in transactions" :key="transaction._id">
                <td>{{ formatDate(transaction.createdAt) }}</td>
                <td>
                  <span :class="['badge', transaction.type]">
                    {{ formatTransactionType(transaction.type) }}
                  </span>
                </td>
                <td>{{ transaction.from?.username || 'System' }}</td>
                <td>{{ transaction.to?.username }}</td>
                <td>{{ transaction.amount }} coins</td>
                <td>{{ transaction.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="pagination-controls" v-if="totalPages > 1">
          <button 
            class="btn btn-secondary"
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
          >
            Previous
          </button>
          <span class="page-info">
            Page {{ currentPage }} of {{ totalPages }}
          </span>
          <button 
            class="btn btn-secondary"
            :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();
const loading = ref(false);
const transactions = ref<any[]>([]);
const currentPage = ref(1);
const totalPages = ref(1);
const itemsPerPage = 20;

const filters = ref({
  type: '',
  startDate: '',
  endDate: '',
  minAmount: '',
  maxAmount: ''
});

const formatDate = (date: string) => {
  return new Date(date).toLocaleString();
};

const formatTransactionType = (type: string) => {
  return type.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

const fetchTransactions = async () => {
  try {
    loading.value = true;
    
    let url = `${import.meta.env.VITE_API_URL}/admin/transactions?page=${currentPage.value}&limit=${itemsPerPage}`;
    
    // Add filters to URL if they exist
    if (filters.value.type) url += `&type=${filters.value.type}`;
    if (filters.value.startDate) url += `&startDate=${filters.value.startDate}`;
    if (filters.value.endDate) url += `&endDate=${filters.value.endDate}`;
    if (filters.value.minAmount) url += `&minAmount=${filters.value.minAmount}`;
    if (filters.value.maxAmount) url += `&maxAmount=${filters.value.maxAmount}`;

    console.log('Fetching transactions from:', url); // Debug log

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Received data:', data); // Debug log

    // Handle both array and paginated response formats
    if (Array.isArray(data)) {
      transactions.value = data;
      totalPages.value = 1;
    } else if (data.transactions) {
      transactions.value = data.transactions;
      totalPages.value = data.pagination?.totalPages || 1;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('Error fetching transactions:', error);
    transactions.value = []; // Reset to empty array on error
    totalPages.value = 1;
  } finally {
    loading.value = false;
  }
};

const changePage = (page: number) => {
  currentPage.value = page;
  fetchTransactions();
};

const applyFilters = () => {
  currentPage.value = 1;
  fetchTransactions();
};

onMounted(() => {
  fetchTransactions();
});
</script>

<style scoped>
.transactions-management {
  padding: 20px;
  max-width: 100%;
  overflow-x: hidden;
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
  margin-bottom: 1rem;
}

.card-body {
  padding: 1.5rem;
  background: var(--header);
  border-radius: 0 0 8px 8px;
  color: var(--white);
}

.filter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
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

.amount-range {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background: var(--header);
}

.table th {
  background: var(--header);
  color: var(--textcolor);
  border-bottom: 1px solid var(--leftpreborder);
}

.table td {
  background: var(--header);
  color: var(--white);
  border-bottom: 1px solid var(--leftpreborder);
}

.badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
}

.badge.transfer {
  background: var(--pointbox);
  color: var(--white);
}

.badge.system_generation {
  background: var(--active-color);
  color: var(--black);
}

.badge.bet_placement {
  background: var(--button-one);
  color: var(--white);
}

.badge.bet_win {
  background: var(--active-color);
  color: var(--black);
}

.pagination-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

.page-info {
  font-size: 0.875rem;
  color: var(--textcolor);
}

.spinner {
  width: 2rem;
  height: 2rem;
  border: 3px solid var(--leftpreborder);
  border-top: 3px solid var(--active-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--leftpreborder);
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.btn-primary {
  background: var(--active-color);
  color: var(--black);
}

.btn-secondary {
  background: var(--pointbox);
  color: var(--white);
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  background: var(--pointbox);
  color: var(--textcolor);
}

.text-center {
  text-align: center;
  color: var(--white);
}

/* Loading and error states */
.loading, .error {
  color: var(--textcolor);
}

/* Date inputs specific styling */
input[type="date"] {
  background: var(--pointbox);
  color: var(--white);
  border: 1px solid var(--leftpreborder);
}

/* Responsive styles */
@media (max-width: 768px) {
  .transactions-management {
    padding: 10px;
  }

  .filter-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .form-control {
    padding: 12px;
  }

  .amount-range {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .btn {
    width: 100%;
    padding: 12px;
    justify-content: center;
  }

  .table-responsive {
    margin: 0 -15px;
    padding: 0 15px;
    max-width: calc(100vw - 20px);
  }

  table {
    min-width: 600px;
  }

  .pagination-controls {
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }

  .pagination-controls button {
    width: 100%;
  }
}

.table-container {
  max-width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

@media (max-width: 768px) {
  .table-responsive {
    margin: 0 -10px;
    padding: 0 10px;
    max-width: calc(100vw - 20px);
  }

  table {
    width: 100%;
    min-width: max-content;
  }

  .filters {
    max-width: 100%;
    overflow-x: hidden;
  }
}

.filters.card {
  background: var(--header);
  border: 1px solid var(--leftpreborder);
}
</style> 