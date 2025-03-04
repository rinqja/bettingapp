<template>
  <div class="dashboard-page">
    <!-- Overview Section -->
    <section class="overview-section">
      <div class="overview-card verification">
        <div class="card-header">
          <i class="fas fa-shield-alt"></i>
          <h3>Verification Status</h3>
        </div>
        <div class="card-content">
          <span class="amount" :class="verificationStatus.toLowerCase()">
            {{ verificationStatus }}
          </span>
          <span class="subtitle">Identity Check</span>
        </div>
      </div>

      <div class="overview-card documents">
        <div class="card-header">
          <i class="fas fa-file-alt"></i>
          <h3>Documents</h3>
        </div>
        <div class="card-content">
          <span class="amount">{{ uploadedDocuments }}/3</span>
          <span class="subtitle">Uploaded Files</span>
        </div>
      </div>

      <div class="overview-card completion">
        <div class="card-header">
          <i class="fas fa-tasks"></i>
          <h3>Profile Completion</h3>
        </div>
        <div class="card-content">
          <span class="amount">{{ profileCompletion }}%</span>
          <span class="subtitle">Completed</span>
        </div>
      </div>
    </section>

    <!-- Identity Details Section -->
    <section class="identity-section">
      <div class="section-header">
        <h2>Personal Information</h2>
        <button class="save-button" @click="saveIdentity">Save Changes</button>
      </div>
      
      <div class="identity-form">
        <div class="form-group">
          <h3>Basic Details</h3>
          <div class="form-row">
            <div class="form-field">
              <label>First Name</label>
              <input type="text" v-model="identity.firstName" placeholder="Enter first name">
            </div>
            <div class="form-field">
              <label>Last Name</label>
              <input type="text" v-model="identity.lastName" placeholder="Enter last name">
            </div>
          </div>
          <div class="form-row">
            <div class="form-field">
              <label>Date of Birth</label>
              <input type="date" v-model="identity.dateOfBirth">
            </div>
            <div class="form-field">
              <label>Nationality</label>
              <select v-model="identity.nationality">
                <option value="">Select nationality</option>
                <option v-for="country in countries" :key="country" :value="country">
                  {{ country }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="form-group">
          <h3>Contact Information</h3>
          <div class="form-row">
            <div class="form-field">
              <label>Email Address</label>
              <input type="email" v-model="identity.email" placeholder="Enter email">
            </div>
            <div class="form-field">
              <label>Phone Number</label>
              <input type="tel" v-model="identity.phone" placeholder="Enter phone number">
            </div>
          </div>
        </div>

        <div class="form-group">
          <h3>Address Details</h3>
          <div class="form-row">
            <div class="form-field">
              <label>Street Address</label>
              <input type="text" v-model="identity.address" placeholder="Enter street address">
            </div>
          </div>
          <div class="form-row">
            <div class="form-field">
              <label>City</label>
              <input type="text" v-model="identity.city" placeholder="Enter city">
            </div>
            <div class="form-field">
              <label>Postal Code</label>
              <input type="text" v-model="identity.postalCode" placeholder="Enter postal code">
            </div>
            <div class="form-field">
              <label>Country</label>
              <select v-model="identity.country">
                <option value="">Select country</option>
                <option v-for="country in countries" :key="country" :value="country">
                  {{ country }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Mock data
const verificationStatus = ref('Pending');
const uploadedDocuments = ref(2);
const profileCompletion = ref(75);

const countries = [
  'United States',
  'United Kingdom',
  'Germany',
  'France',
  'Spain',
  'Italy',
  // Add more countries as needed
];

const identity = ref({
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  nationality: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  country: ''
});

const saveIdentity = () => {
  // Implement save logic here
  console.log('Saving identity:', identity.value);
};
</script>

<style scoped>
.dashboard-page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.identity-section {
  background: var(--header);
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid var(--leftpreborder);
}

.form-group {
  margin-bottom: 2rem;
}

.form-group h3 {
  color: var(--white);
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-field label {
  color: var(--textcolor);
  font-size: 0.9rem;
}

.form-field input,
.form-field select {
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid var(--leftpreborder);
  background: var(--body-color);
  color: var(--white);
}

.form-field input:focus,
.form-field select:focus {
  outline: none;
  border-color: var(--active-color);
}

.amount.verified {
  color: var(--success);
}

.amount.pending {
  color: var(--warning);
}

.amount.rejected {
  color: var(--error);
}

.save-button {
  background: var(--active-color);
  color: var(--black);
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.save-button:hover {
  transform: translateY(-1px);
  opacity: 0.9;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
