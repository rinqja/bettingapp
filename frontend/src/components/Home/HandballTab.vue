<template>
  <div
    class="tab-pane mt__30 text-white fade"
    id="mainTab8"
    role="tabpanel"
    tabIndex="0"
  >
    <div class="main__body__wrap left__right__space pb-60">
      <div class="live__heightlight">
        <div class="height__table">
          <div class="main__table treanding__table">
            <div class="section__head b__bottom">
              <div class="left__head">
                <span class="icons">
                  <i class="icon-handball"></i>
                </span>
                <span>Handball</span>
              </div>
              <div class="right__catagoris">
                <div class="right__cate__items">
                  <Select :data="categoris"></Select>
                </div>
                <div class="right__cate__items">
                  <Select :data="categoris2"></Select>
                </div>
                <div class="right__cate__items">
                  <Select :data="categoris3"></Select>
                </div>
              </div>
            </div>
            <div class="table__wrap">
              <div class="table__items b__bottom">
                <div class="t__items">
                  <div class="t__items__left">
                    <h6>Ferencvarosi TC</h6>
                    <span class="text">Valur Reykjavik</span>
                    <p>
                      <RouterLink to="#">Today / 23:45</RouterLink>
                    </p>
                  </div>
                </div>
                <div class="mart__point__items">
                  <RouterLink to="#0box" class="point__box">
                    <span class="smallt">-2,5</span>
                    <span>1.15</span>
                  </RouterLink>
                  <RouterLink to="#0box" class="point__box">
                    <span class="smallt">+2,5</span>
                    <span>1.87</span>
                  </RouterLink>
                </div>
                <div class="mart__point__items">
                  <RouterLink to="#0box" class="point__box">
                    <span>1.48</span>
                  </RouterLink>
                  <RouterLink to="#0box" class="point__box">
                    <span>10.50</span>
                  </RouterLink>
                  <RouterLink to="#0box" class="point__box">
                    <span>3.25</span>
                  </RouterLink>
                </div>
                <div class="cart__point cart__point__two">67,5</div>
                <div class="mart__point__two">
                  <div class="mart__point__right">
                    <RouterLink to="#" class="point__box"> 1.87 </RouterLink>
                    <RouterLink to="#" class="point__box"> 1.80 </RouterLink>
                    <RouterLink
                      to="#"
                      class="point__box bg__none spacing__initial"
                    >
                      <i class="icon-star star"></i>
                    </RouterLink>
                  </div>
                </div>
              </div>
              <div class="table__items b__bottom">
                <div class="t__items">
                  <div class="t__items__left">
                    <h6>Fuchse Berlin</h6>
                    <span class="text">Skanderborg Aarhus</span>
                    <p>
                      <RouterLink to="#">Today / 23:45</RouterLink>
                    </p>
                  </div>
                </div>
                <div class="mart__point__items">
                  <RouterLink to="#0box" class="point__box">
                    <span class="smallt">-3,5</span>
                    <span>2.15</span>
                  </RouterLink>
                  <RouterLink to="#0box" class="point__box">
                    <span class="smallt">+3,5</span>
                    <span>2.87</span>
                  </RouterLink>
                </div>
                <div class="mart__point__items">
                  <RouterLink to="#0box" class="point__box">
                    <span>2.48</span>
                  </RouterLink>
                  <RouterLink to="#0box" class="point__box">
                    <span>20.50</span>
                  </RouterLink>
                  <RouterLink to="#0box" class="point__box">
                    <span>2.25</span>
                  </RouterLink>
                </div>
                <div class="cart__point cart__point__two">67,5</div>
                <div class="mart__point__two">
                  <div class="mart__point__right">
                    <RouterLink to="#" class="point__box"> 1.87 </RouterLink>
                    <RouterLink to="#" class="point__box"> 1.80 </RouterLink>
                    <RouterLink
                      to="#"
                      class="point__box bg__none spacing__initial"
                    >
                      <i class="icon-star star"></i>
                    </RouterLink>
                  </div>
                </div>
              </div>
              <div class="table__items b__bottom">
                <div class="t__items">
                  <div class="t__items__left">
                    <h6>Pauc Handball</h6>
                    <span class="text">Ystads IF</span>
                    <p>
                      <RouterLink to="#">Today / 23:45</RouterLink>
                    </p>
                  </div>
                </div>
                <div class="mart__point__items">
                  <RouterLink to="#0box" class="point__box">
                    <span class="smallt">-3,5</span>
                    <span>3.15</span>
                  </RouterLink>
                  <RouterLink to="#0box" class="point__box">
                    <span class="smallt">+3,5</span>
                    <span>3.87</span>
                  </RouterLink>
                </div>
                <div class="mart__point__items">
                  <RouterLink to="#0box" class="point__box">
                    <span>3.48</span>
                  </RouterLink>
                  <RouterLink to="#0box" class="point__box">
                    <span>30.50</span>
                  </RouterLink>
                  <RouterLink to="#0box" class="point__box">
                    <span>3.25</span>
                  </RouterLink>
                </div>
                <div class="cart__point cart__point__two">67,5</div>
                <div class="mart__point__two">
                  <div class="mart__point__right">
                    <RouterLink to="#" class="point__box"> 31.87 </RouterLink>
                    <RouterLink to="#" class="point__box"> 31.80 </RouterLink>
                    <RouterLink
                      to="#"
                      class="point__box bg__none spacing__initial"
                    >
                      <i class="icon-star star"></i>
                    </RouterLink>
                  </div>
                </div>
              </div>
              <div class="table__items b__bottom">
                <div class="t__items">
                  <div class="t__items__left">
                    <h6>RK Nexe</h6>
                    <span class="text">Fraikin BM. Granollers</span>
                    <p>
                      <RouterLink to="#">Today / 23:45</RouterLink>
                    </p>
                  </div>
                </div>
                <div class="mart__point__items">
                  <RouterLink to="#0box" class="point__box">
                    <span class="smallt">-4,5</span>
                    <span>4.15</span>
                  </RouterLink>
                  <RouterLink to="#0box" class="point__box">
                    <span class="smallt">+4,5</span>
                    <span>4.87</span>
                  </RouterLink>
                </div>
                <div class="mart__point__items">
                  <RouterLink to="#0box" class="point__box">
                    <span>5.48</span>
                  </RouterLink>
                  <RouterLink to="#0box" class="point__box">
                    <span>2.50</span>
                  </RouterLink>
                  <RouterLink to="#0box" class="point__box">
                    <span>7.25</span>
                  </RouterLink>
                </div>
                <div class="cart__point cart__point__two">67,5</div>
                <div class="mart__point__two">
                  <div class="mart__point__right">
                    <RouterLink to="#" class="point__box"> 5.87 </RouterLink>
                    <RouterLink to="#" class="point__box"> 8.80 </RouterLink>
                    <RouterLink
                      to="#"
                      class="point__box bg__none spacing__initial"
                    >
                      <i class="icon-star star"></i>
                    </RouterLink>
                  </div>
                </div>
              </div>
              <div class="table__items b__bottom">
                <div class="t__items">
                  <div class="t__items__left">
                    <h6>HC Midtjylland</h6>
                    <span class="text">Mors-Thy Handbold</span>
                    <p>
                      <RouterLink to="#">Today / 23:45</RouterLink>
                    </p>
                  </div>
                </div>
                <div class="mart__point__items">
                  <RouterLink to="#0box" class="point__box">
                    <span class="smallt">-1,5</span>
                    <span>1.15</span>
                  </RouterLink>
                  <RouterLink to="#0box" class="point__box">
                    <span class="smallt">+1,5</span>
                    <span>1.87</span>
                  </RouterLink>
                </div>
                <div class="mart__point__items">
                  <RouterLink to="#0box" class="point__box">
                    <span>6.48</span>
                  </RouterLink>
                  <RouterLink to="#0box" class="point__box">
                    <span>6.50</span>
                  </RouterLink>
                  <RouterLink to="#0box" class="point__box">
                    <span>6.25</span>
                  </RouterLink>
                </div>
                <div class="cart__point cart__point__two">67,5</div>
                <div class="mart__point__two">
                  <div class="mart__point__right">
                    <RouterLink to="#" class="point__box"> 7.87 </RouterLink>
                    <RouterLink to="#" class="point__box"> 7.80 </RouterLink>
                    <RouterLink
                      to="#"
                      class="point__box bg__none spacing__initial"
                    >
                      <i class="icon-star star"></i>
                    </RouterLink>
                  </div>
                </div>
              </div>
              <div class="table__items b__bottom">
                <div class="t__items">
                  <div class="t__items__left">
                    <h6>Aguas Santas</h6>
                    <span class="text">HC Motor Zaporozhye</span>
                    <p>
                      <RouterLink to="#">Today / 23:45</RouterLink>
                    </p>
                  </div>
                </div>
                <div class="mart__point__items">
                  <RouterLink to="#0box" class="point__box">
                    <span class="smallt">-1,5</span>
                    <span>1.15</span>
                  </RouterLink>
                  <RouterLink to="#0box" class="point__box">
                    <span class="smallt">+1,5</span>
                    <span>1.87</span>
                  </RouterLink>
                </div>
                <div class="mart__point__items">
                  <RouterLink to="#0box" class="point__box">
                    <span>6.48</span>
                  </RouterLink>
                  <RouterLink to="#0box" class="point__box">
                    <span>6.50</span>
                  </RouterLink>
                  <RouterLink to="#0box" class="point__box">
                    <span>6.25</span>
                  </RouterLink>
                </div>
                <div class="cart__point cart__point__two">67,5</div>
                <div class="mart__point__two">
                  <div class="mart__point__right">
                    <RouterLink to="#" class="point__box"> 7.87 </RouterLink>
                    <RouterLink to="#" class="point__box"> 7.80 </RouterLink>
                    <RouterLink
                      to="#"
                      class="point__box bg__none spacing__initial"
                    >
                      <i class="icon-star star"></i>
                    </RouterLink>
                  </div>
                </div>
              </div>
              <div class="table__items b__bottom">
                <div class="t__items">
                  <div class="t__items__left">
                    <h6>Tomorrow/ 01:45</h6>
                    <span class="text">Balatonfuredi KC</span>
                    <p>
                      <RouterLink to="#">Tomorrow / 01:45</RouterLink>
                    </p>
                  </div>
                </div>
                <div class="mart__point__items">
                  <RouterLink to="#0box" class="point__box">
                    <span class="smallt">-1,5</span>
                    <span>1.15</span>
                  </RouterLink>
                  <RouterLink to="#0box" class="point__box">
                    <span class="smallt">+1,5</span>
                    <span>1.87</span>
                  </RouterLink>
                </div>
                <div class="mart__point__items">
                  <RouterLink to="#0box" class="point__box">
                    <span>6.48</span>
                  </RouterLink>
                  <RouterLink to="#0box" class="point__box">
                    <span>6.50</span>
                  </RouterLink>
                  <RouterLink to="#0box" class="point__box">
                    <span>6.25</span>
                  </RouterLink>
                </div>
                <div class="cart__point cart__point__two">67,5</div>
                <div class="mart__point__two">
                  <div class="mart__point__right">
                    <RouterLink to="#" class="point__box"> 7.87 </RouterLink>
                    <RouterLink to="#" class="point__box"> 7.80 </RouterLink>
                    <RouterLink
                      to="#"
                      class="point__box bg__none spacing__initial"
                    >
                      <i class="icon-star star"></i>
                    </RouterLink>
                  </div>
                </div>
              </div>
              <div class="table__items b__bottom">
                <div class="t__items">
                  <div class="t__items__left">
                    <h6>BM. Benidorm</h6>
                    <span class="text">SG Flensburg-Handewitt</span>
                    <p>
                      <RouterLink to="#">Tomorrow / 01:45</RouterLink>
                    </p>
                  </div>
                </div>
                <div class="mart__point__items">
                  <RouterLink to="#0box" class="point__box">
                    <span class="smallt">-1,5</span>
                    <span>1.15</span>
                  </RouterLink>
                  <RouterLink to="#0box" class="point__box">
                    <span class="smallt">+1,5</span>
                    <span>1.87</span>
                  </RouterLink>
                </div>
                <div class="mart__point__items">
                  <RouterLink to="#0box" class="point__box">
                    <span>6.48</span>
                  </RouterLink>
                  <RouterLink to="#0box" class="point__box">
                    <span>6.50</span>
                  </RouterLink>
                  <RouterLink to="#0box" class="point__box">
                    <span>6.25</span>
                  </RouterLink>
                </div>
                <div class="cart__point cart__point__two">67,5</div>
                <div class="mart__point__two">
                  <div class="mart__point__right">
                    <RouterLink to="#" class="point__box"> 7.87 </RouterLink>
                    <RouterLink to="#" class="point__box"> 7.80 </RouterLink>
                    <RouterLink
                      to="#"
                      class="point__box bg__none spacing__initial"
                    >
                      <i class="icon-star star"></i>
                    </RouterLink>
                  </div>
                </div>
              </div>
              <div class="table__items b__bottom">
                <div class="t__items">
                  <div class="t__items__left">
                    <h6>Montpellier</h6>
                    <span class="text">Benfica</span>
                    <p>
                      <RouterLink to="#">Tomorrow / 01:45</RouterLink>
                    </p>
                  </div>
                </div>
                <div class="mart__point__items">
                  <RouterLink to="#0box" class="point__box">
                    <span class="smallt">-1,5</span>
                    <span>1.15</span>
                  </RouterLink>
                  <RouterLink to="#0box" class="point__box">
                    <span class="smallt">+1,5</span>
                    <span>1.87</span>
                  </RouterLink>
                </div>
                <div class="mart__point__items">
                  <RouterLink to="#0box" class="point__box">
                    <span>6.48</span>
                  </RouterLink>
                  <RouterLink to="#0box" class="point__box">
                    <span>6.50</span>
                  </RouterLink>
                  <RouterLink to="#0box" class="point__box">
                    <span>6.25</span>
                  </RouterLink>
                </div>
                <div class="cart__point cart__point__two">67,5</div>
                <div class="mart__point__two">
                  <div class="mart__point__right">
                    <RouterLink to="#" class="point__box"> 7.87 </RouterLink>
                    <RouterLink to="#" class="point__box"> 7.80 </RouterLink>
                    <RouterLink
                      to="#"
                      class="point__box bg__none spacing__initial"
                    >
                      <i class="icon-star star"></i>
                    </RouterLink>
                  </div>
                </div>
              </div>
              <div class="table__items b__bottom">
                <div class="t__items">
                  <div class="t__items__left">
                    <h6>Bidasoa Irun</h6>
                    <span class="text">Pelister Bitola</span>
                    <p>
                      <RouterLink to="#">Tomorrow / 01:45</RouterLink>
                    </p>
                  </div>
                </div>
                <div class="mart__point__items">
                  <RouterLink to="#0box" class="point__box">
                    <span class="smallt">-1,5</span>
                    <span>1.15</span>
                  </RouterLink>
                  <RouterLink to="#0box" class="point__box">
                    <span class="smallt">+1,5</span>
                    <span>1.87</span>
                  </RouterLink>
                </div>
                <div class="mart__point__items">
                  <RouterLink to="#0box" class="point__box">
                    <span>6.48</span>
                  </RouterLink>
                  <RouterLink to="#0box" class="point__box">
                    <span>6.50</span>
                  </RouterLink>
                  <RouterLink to="#0box" class="point__box">
                    <span>6.25</span>
                  </RouterLink>
                </div>
                <div class="cart__point cart__point__two">67,5</div>
                <div class="mart__point__two">
                  <div class="mart__point__right">
                    <RouterLink to="#" class="point__box"> 7.87 </RouterLink>
                    <RouterLink to="#" class="point__box"> 7.80 </RouterLink>
                    <RouterLink
                      to="#"
                      class="point__box bg__none spacing__initial"
                    >
                      <i class="icon-star star"></i>
                    </RouterLink>
                  </div>
                </div>
              </div>
              <div class="table__items b__bottom">
                <div class="t__items">
                  <div class="t__items__left">
                    <h6>Frisch Auf Goppingen</h6>
                    <span class="text">Kadetten Schaffhausen</span>
                    <p>
                      <RouterLink to="#">Tomorrow / 01:45</RouterLink>
                    </p>
                  </div>
                </div>
                <div class="mart__point__items">
                  <RouterLink to="#0box" class="point__box">
                    <span class="smallt">-1,5</span>
                    <span>1.15</span>
                  </RouterLink>
                  <RouterLink to="#0box" class="point__box">
                    <span class="smallt">+1,5</span>
                    <span>1.87</span>
                  </RouterLink>
                </div>
                <div class="mart__point__items">
                  <RouterLink to="#0box" class="point__box">
                    <span>6.48</span>
                  </RouterLink>
                  <RouterLink to="#0box" class="point__box">
                    <span>6.50</span>
                  </RouterLink>
                  <RouterLink to="#0box" class="point__box">
                    <span>6.25</span>
                  </RouterLink>
                </div>
                <div class="cart__point cart__point__two">67,5</div>
                <div class="mart__point__two">
                  <div class="mart__point__right">
                    <RouterLink to="#" class="point__box"> 7.87 </RouterLink>
                    <RouterLink to="#" class="point__box"> 7.80 </RouterLink>
                    <RouterLink
                      to="#"
                      class="point__box bg__none spacing__initial"
                    >
                      <i class="icon-star star"></i>
                    </RouterLink>
                  </div>
                </div>
              </div>
              <div class="table__items b__bottom">
                <div class="t__items">
                  <div class="t__items__left">
                    <h6>Skjern Håndbold</h6>
                    <span class="text">Sporting Clube de Portugal</span>
                    <p>
                      <RouterLink to="#">Tomorrow / 01:45</RouterLink>
                    </p>
                  </div>
                </div>
                <div class="mart__point__items">
                  <RouterLink to="#0box" class="point__box">
                    <span class="smallt">-1,5</span>
                    <span>1.15</span>
                  </RouterLink>
                  <RouterLink to="#0box" class="point__box">
                    <span class="smallt">+1,5</span>
                    <span>1.87</span>
                  </RouterLink>
                </div>
                <div class="mart__point__items">
                  <RouterLink to="#0box" class="point__box">
                    <span>6.48</span>
                  </RouterLink>
                  <RouterLink to="#0box" class="point__box">
                    <span>6.50</span>
                  </RouterLink>
                  <RouterLink to="#0box" class="point__box">
                    <span>6.25</span>
                  </RouterLink>
                </div>
                <div class="cart__point cart__point__two">67,5</div>
                <div class="mart__point__two">
                  <div class="mart__point__right">
                    <RouterLink to="#" class="point__box"> 7.87 </RouterLink>
                    <RouterLink to="#" class="point__box"> 7.80 </RouterLink>
                    <RouterLink
                      to="#"
                      class="point__box bg__none spacing__initial"
                    >
                      <i class="icon-star star"></i>
                    </RouterLink>
                  </div>
                </div>
              </div>
              <div class="table__footer">
                <RouterLink to="#" class="lobby text__opa">
                  Open Handball lobby
                </RouterLink>
                <RouterLink to="#" class="footerpoing">
                  <span>30</span>
                  <span>
                    <i class="fas fa-angle-right"></i>
                  </span>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <FooterHome />
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import FooterHome from "../Footer/FooterHome.vue";
import Select from "../Select/Select.vue";

const categoris = [
  { id: 1, name: "Result 1X2" },
  { id: 2, name: "Result 1X3" },
  { id: 3, name: "Result 1X4" },
  { id: 4, name: "Result 1X5" },
];
const categoris2 = [
  { id: 1, name: "Over/Under" },
  { id: 2, name: "...." },
  { id: 3, name: "...." },
  { id: 4, name: "...." },
];
const categoris3 = [
  { id: 1, name: "Both teams to score?" },
  { id: 2, name: "...." },
  { id: 3, name: "...." },
  { id: 4, name: "...." },
];
</script>

<style scoped></style>
