<template>
  <div class="dashboard__body__wrap">
    <h3 class="account__head mb__30">Casino bets</h3>
    <div class="cainoform__wrap">
      <div class="row g-4">
        <div class="col-xl-6">
          <div class="casino__date">
            <h4 class="f__title">From</h4>
            <div class="calender-bar">
              <input type="date" />
              <i class="icon-calender"></i>
            </div>
          </div>
        </div>
        <div class="col-xl-6">
          <div class="casino__date">
            <h4 class="f__title">From</h4>
            <div class="calender-bar">
              <input type="date" />
              <i class="icon-calender"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="casinoform__tabe">
      <table>
        <thead>
          <tr>
            <th>Game</th>
            <th>Payment Methods</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Ratio</th>
            <th>More</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Casino</td>
            <td>Skill</td>
            <td>5,591 USD</td>
            <td class="cancel">Cancel</td>
            <td>8.55</td>
            <td class="bold">...</td>
          </tr>
          <tr>
            <td>Jackpot</td>
            <td>Bank Transfer</td>
            <td>5,591 USD</td>
            <td class="pending">Prnding</td>
            <td>2.70</td>
            <td class="bold">...</td>
          </tr>
          <tr>
            <td>table game</td>
            <td>Fast QR</td>
            <td>5,591 USD</td>
            <td class="cancel">Cancel</td>
            <td>8.50</td>
            <td class="bold">...</td>
          </tr>
          <tr>
            <td>Jackpot</td>
            <td>Bitcoin</td>
            <td>5,591 USD</td>
            <td class="complate">Complete</td>
            <td>7.05</td>
            <td class="bold">...</td>
          </tr>
          <tr>
            <td>Casino</td>
            <td>Card Payments</td>
            <td>5,591 USD</td>
            <td class="cancel">Cancel</td>
            <td>3.05</td>
            <td class="bold">...</td>
          </tr>
          <tr>
            <td>Casino</td>
            <td>Jeton</td>
            <td>5,591 USD</td>
            <td class="pending">Prnding</td>
            <td>3.20</td>
            <td class="bold">...</td>
          </tr>
          <tr>
            <td>teble game</td>
            <td>paypal</td>
            <td>5,591 USD</td>
            <td class="complate">Complete</td>
            <td>2.40</td>
            <td class="bold">...</td>
          </tr>
          <tr>
            <td>Casino</td>
            <td>papara</td>
            <td>5,591 USD</td>
            <td class="complate">Complete</td>
            <td>1.95</td>
            <td class="bold">...</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
