<template>
  <div class="dashboard__body__wrap">
    <h3 class="account__head mb__30">Bet History</h3>
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
            <h4 class="f__title">Until</h4>
            <div class="calender-bar">
              <input type="date" />
              <i class="icon-calender"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="casinoform__tabe bethistory__table">
      <table>
        <thead>
          <tr>
            <th>Game</th>
            <th>Team</th>
            <th>Payment Methods</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Ratio</th>
            <th>More</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Football</td>
            <td>
              <span>Prachuap FC</span>
              <span>Lampun Warrior FC</span>
            </td>
            <td>Bank / CC</td>
            <td>5,591 USD</td>
            <td class="cancel">Cancel</td>
            <td>8.55</td>
            <td class="bold">...</td>
          </tr>
          <tr>
            <td>Tennis</td>
            <td>
              <span>Cristina Bucsa ESP</span>
              <span>Pedro Sousa POR</span>
            </td>
            <td>Credit Card</td>
            <td>5,591 USD</td>
            <td class="pending">Prnding</td>
            <td>2.70</td>
            <td class="bold">...</td>
          </tr>
          <tr>
            <td>Basketball</td>
            <td>
              <span>Tokyo United BC</span>
              <span>Rizing Fukuoka</span>
            </td>
            <td>Bank / CC</td>
            <td>5,591 USD</td>
            <td class="cancel">Cancel</td>
            <td>8.50</td>
            <td class="bold">...</td>
          </tr>
          <tr>
            <td>Volleyball</td>
            <td>
              <span>Tokyo Great Bears</span>
              <span>JT Thunders</span>
            </td>
            <td>Bank</td>
            <td>5,591 USD</td>
            <td class="complate">Complete</td>
            <td>7.05</td>
            <td class="bold">...</td>
          </tr>
          <tr>
            <td>Cricket</td>
            <td>
              <span>Pakistan</span>
              <span>England</span>
            </td>
            <td>Credit Card</td>
            <td>5,591 USD</td>
            <td class="cancel">Cancel</td>
            <td>3.05</td>
            <td class="bold">...</td>
          </tr>
          <tr>
            <td>Football</td>
            <td>
              <span>England</span>
              <span>USA</span>
            </td>
            <td>Bank / CC</td>
            <td>5,591 USD</td>
            <td class="pending">Prnding</td>
            <td>3.20</td>
            <td class="bold">...</td>
          </tr>
          <tr>
            <td>Tennis</td>
            <td>
              <span>Victoria Kan RUS</span>
              <span>Denisa Hindova CZE</span>
            </td>
            <td>Bank</td>
            <td>5,591 USD</td>
            <td class="complate">Complete</td>
            <td>2.40</td>
            <td class="bold">...</td>
          </tr>
          <tr>
            <td>Basketball</td>
            <td>
              <span>Saitama Broncos</span>
              <span>Kagawa Five Arrows</span>
            </td>
            <td>Bank / CC</td>
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
