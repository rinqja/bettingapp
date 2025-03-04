<template>
  <div class="dashboard__body__wrap">
    <h3 class="account__head mb__30">Account Settings</h3>
    <div class="row g-4">
      <div class="col-xl-4">
        <div class="user__box">
          <div class="img__change">
            <img :src="profile" alt="profile" />
            <div class="icons" id="profile-picture">
              <i class="fas fa-pen"></i>
            </div>
          </div>
          <div class="user__content">
            <h5 class="usertext__one">strdxc321</h5>
            <h6 class="usertext__two">UUID:</h6>
            <RouterLink to="#" class="link">
              ffbe99f2-7f4b-11ed-9e24-3ee8038fe302
            </RouterLink>
          </div>
          <div class="reset__wrap">
            <RouterLink to="#" class="reset"> Reset Password </RouterLink>
            <RouterLink to="#" class="change"> Change Gamertag </RouterLink>
          </div>
          <div class="user__dated">
            <span class="date">Joined December 19th, 2022</span>
            <RouterLink to="#" class="lastlogin"> Last Login on </RouterLink>
          </div>
        </div>
      </div>
      <div class="col-xl-8">
        <div class="account__body">
          <div class="account__strength__box mb__30">
            <div class="strength__box">
              <div class="circle__box">
                <div class="circle">
                  <div class="box">
                    <h3 class="text">70%</h3>
                  </div>
                </div>
              </div>
              <h5>Account Strength</h5>
            </div>
            <div class="strength__content">
              <div class="items">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="stre1c"
                  defaultChecked
                />
                <label class="form-check-label" for="stre1c">
                  Create account
                </label>
              </div>
              <div class="items">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="stre2"
                  defaultChecked
                />
                <label class="form-check-label" for="stre2">
                  Complete Account
                </label>
              </div>
              <div class="items">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="stre3"
                  defaultChecked
                />
                <label class="form-check-label" for="stre3">
                  Verify Identity
                </label>
              </div>
              <div class="items">
                <span class="icons">
                  <i class="icon-deposit"></i>
                </span>
                <span>Made a Deposit</span>
              </div>
              <div class="items">
                <span class="icons">
                  <i class="icon-user"></i>
                </span>
                <span>Upload Avatar</span>
              </div>
            </div>
          </div>
          <div class="account__email mb__30">
            <h5>Account Emails</h5>
            <span class="subtitle">Primary Emails</span>
            <div class="form__wrap">
              <form action="#">
                <input type="text" placeholder="fixad56534@paxven.com" />
                <i class="icon-lock"></i>
              </form>
              <div class="check__items">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="stre1"
                  defaultChecked
                />
                <label class="form-check-label" for="stre1"> Verified </label>
              </div>
            </div>
            <RouterLink to="#" class="add__email">
              <span>
                <img :src="plus" alt="icon" />
              </span>
              <span>Add email</span>
            </RouterLink>
          </div>
          <div class="account__email enroll__box mb__30">
            <h5>Multi_factor Authentication</h5>
            <p>
              Add an Extra Layer of security to your SportOdds account when
              logging in with Email/Passsword. A verrification code will be sent
              to your email each time you loin to secrely protect your account.
            </p>
            <RouterLink to="#" class="cmn--btn">
              <span>Enroll</span>
            </RouterLink>
          </div>
          <div class="account__email language__box mb__30">
            <h5>Language</h5>
            <span class="slanguage">Select Language</span>
            <div class="language__wrap">
              <Select :data="lang" />
              <RouterLink to="#" class="cmn--btn">
                <span>Save</span>
              </RouterLink>
            </div>
          </div>
          <div class="account__email social__box mb__30">
            <h5>Social Accounts</h5>
            <span class="slanguage">
              Connect your accounts for faster login.
            </span>
            <div class="social__wrap">
              <div class="social__left">
                <RouterLink to="#">
                  <span>
                    <img :src="goggle" alt="icon" />
                  </span>
                  <span>Connect Google</span>
                </RouterLink>
                <RouterLink to="#">
                  <span>
                    <img :src="steam" alt="icon" />
                  </span>
                  <span>Connect steam</span>
                </RouterLink>
                <RouterLink to="#">
                  <span>
                    <img :src="twitter" alt="icon" />
                  </span>
                  <span>Connect Twitter</span>
                </RouterLink>
              </div>
              <div class="social__left">
                <RouterLink to="#">
                  <span>
                    <img :src="facebook" alt="icon" />
                  </span>
                  <span>Connect facebook</span>
                </RouterLink>
                <RouterLink to="#">
                  <span>
                    <img :src="twitch" alt="icon" />
                  </span>
                  <span>Connect twitch</span>
                </RouterLink>
                <RouterLink to="#">
                  <span>
                    <img :src="vkonta" alt="icon" />
                  </span>
                  <span>Connect vkontakte</span>
                </RouterLink>
              </div>
            </div>
          </div>
          <div class="account__email enroll__box">
            <h5>Archive Account</h5>
            <p>Want to temporarily close your account?</p>
            <RouterLink to="#" class="cmn--btn">
              <span>Archive Account</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import facebook from "../../assets/img/profile/facebook.png";
import goggle from "../../assets/img/profile/goggle.png";
import plus from "../../assets/img/profile/plus.png";
import profile from "../../assets/img/profile/profile.png";
import steam from "../../assets/img/profile/steam.png";
import twitch from "../../assets/img/profile/twitch.png";
import twitter from "../../assets/img/profile/twitter.png";
import vkonta from "../../assets/img/profile/vkonta.png";
import Select from "../Select/Select.vue";

const lang = [
  { id: 1, name: "English" },
  { id: 2, name: "Turki" },
  { id: 3, name: "Spanish" },
];
</script>

<style scoped></style>
