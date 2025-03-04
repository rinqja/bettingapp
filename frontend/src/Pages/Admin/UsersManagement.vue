<template>
  <div class="users-management">
    <div class="header">
      <h2>User Management</h2>
      <div class="actions">
        <div class="search">
          <i class="fas fa-search"></i>
          <input type="text" v-model="searchQuery" placeholder="Search users..." />
        </div>
        <select v-model="roleFilter">
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="superuser">Superuser</option>
        </select>
      </div>
    </div>

    <div class="table-container">
      <table v-if="users.length">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Balance</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user._id">
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>
              <select 
                v-if="canEditRole(user)" 
                v-model="user.role" 
                @change="updateUserRole(user)"
                :disabled="loading"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="superuser" v-if="isSuperuser">Superuser</option>
              </select>
              <span v-else>{{ user.role }}</span>
            </td>
            <td>{{ user.balance }}</td>
            <td>
              <span :class="['status-badge', user.status]">
                {{ user.status }}
              </span>
            </td>
            <td>
              <button 
                class="btn-action" 
                @click="toggleUserStatus(user)"
                :disabled="loading || user._id === authStore.user?._id"
              >
                <i :class="user.status === 'active' ? 'fas fa-ban' : 'fas fa-check'"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else-if="loading" class="text-center">Loading users...</p>
      <p v-else class="text-center">No users found</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../../stores/auth';

interface User {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'admin' | 'superuser';
  balance: number;
  status: 'active' | 'suspended';
}

const authStore = useAuthStore();
const users = ref<User[]>([]);
const searchQuery = ref('');
const roleFilter = ref('');
const loading = ref(false);

const isSuperuser = computed(() => authStore.user?.role === 'superuser');

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch = 
      user.username.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesRole = !roleFilter.value || user.role === roleFilter.value;
    return matchesSearch && matchesRole;
  });
});

const canEditRole = (user: User) => {
  // Can't edit own role
  if (user._id === authStore.user?._id) return false;
  
  // Superuser can edit all roles except other superusers
  if (authStore.user?.role === 'superuser') {
    return user.role !== 'superuser' || user._id === authStore.user?._id;
  }
  
  // Admin can only edit regular users
  if (authStore.user?.role === 'admin') {
    return user.role === 'user';
  }
  
  return false;
};

const updateUserRole = async (user: User) => {
  try {
    loading.value = true;
    const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/users/${user._id}/role`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      },
      body: JSON.stringify({ role: user.role })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update user role');
    }

    alert('User role updated successfully');
  } catch (error) {
    console.error('Error updating user role:', error);
    alert(error instanceof Error ? error.message : 'Failed to update user role');
    // Revert the role change in the UI
    await fetchUsers();
  } finally {
    loading.value = false;
  }
};

const toggleUserStatus = async (user: User) => {
  try {
    loading.value = true;
    const newStatus = user.status === 'active' ? 'suspended' : 'active';
    
    const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/users/${user._id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      },
      body: JSON.stringify({ status: newStatus })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update user status');
    }

    user.status = newStatus;
    alert('User status updated successfully');
  } catch (error) {
    console.error('Error updating user status:', error);
    alert(error instanceof Error ? error.message : 'Failed to update user status');
  } finally {
    loading.value = false;
  }
};

const fetchUsers = async () => {
  try {
    loading.value = true;
    const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/users`, {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    
    const data = await response.json();
    console.log('Fetched users:', data); // Debug log
    users.value = data;
  } catch (error) {
    console.error('Error fetching users:', error);
    alert('Failed to fetch users');
  } finally {
    loading.value = false;
  }
};

// Fetch users when component mounts
onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
.users-management {
  background: var(--body-color);
  padding: 20px;
  max-width: 100%;
  overflow-x: hidden;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header h2 {
  color: var(--white);
}

.actions {
  display: flex;
  gap: 10px;
}

.search {
  position: relative;
}

.search i {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--textcolor);
}

.search input {
  padding: 8px 8px 8px 35px;
  border: 1px solid var(--leftpreborder);
  border-radius: 4px;
  width: 200px;
  background: var(--pointbox);
  color: var(--white);
}

select {
  padding: 8px;
  border: 1px solid var(--leftpreborder);
  border-radius: 4px;
  background: var(--pointbox);
  color: var(--white);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid var(--leftpreborder);
  color: var(--white);
}

th {
  background: var(--pointbox);
  font-weight: 600;
  color: var(--textcolor);
}

.status-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.status-badge.active {
  background: var(--active-color);
  color: var(--black);
}

.status-badge.suspended {
  background: var(--button-one);
  color: var(--white);
}

.btn-action {
  padding: 6px 12px;
  border: 1px solid var(--leftpreborder);
  border-radius: 4px;
  background: var(--pointbox);
  cursor: pointer;
  color: var(--white);
}

.btn-action:hover {
  background: var(--active-color);
  color: var(--black);
}

.table-container {
  background: var(--header);
  border-radius: 8px;
  padding: 20px;
  border: 1px solid var(--leftpreborder);
}

@media (max-width: 768px) {
  .users-management {
    padding: 10px;
  }

  .header {
    flex-direction: column;
    gap: 15px;
  }

  .actions {
    flex-direction: column;
    width: 100%;
    gap: 10px;
  }

  .search {
    width: 100%;
  }

  .search input {
    width: 100%;
  }

  select {
    width: 100%;
  }

  .table-responsive {
    margin: 0 -10px;
    padding: 0 10px;
    max-width: calc(100vw - 20px);
  }

  table {
    width: 100%;
    min-width: max-content;
  }

  .filters,
  .actions {
    max-width: 100%;
    overflow-x: hidden;
  }

  .btn-action {
    padding: 8px 16px; /* Larger touch target */
  }
}
</style> 