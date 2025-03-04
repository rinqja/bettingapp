<template>
  <div class="world__point__table">
    <div class="world__point__tab">
      <ul class="nav nav-pills" :id="`pills-pints${id}`" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            data-bs-toggle="pill"
            :data-bs-target="`#pointw1${id}`"
            type="button"
            role="tab"
            aria-selected="true"
          >
            <span>10:44</span>
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            data-bs-toggle="pill"
            :data-bs-target="`#pointw2${id}`"
            type="button"
            role="tab"
            aria-selected="false"
          >
            <span>10:47</span>
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            data-bs-toggle="pill"
            :data-bs-target="`#pointw3${id}`"
            type="button"
            role="tab"
            aria-selected="false"
          >
            <span>10:50</span>
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            data-bs-toggle="pill"
            :data-bs-target="`#pointw4${id}`"
            type="button"
            role="tab"
            aria-selected="false"
          >
            <span>10:53</span>
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            data-bs-toggle="pill"
            :data-bs-target="`#pointw5${id}`"
            type="button"
            role="tab"
            aria-selected="false"
          >
            <span>10:56</span>
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            data-bs-toggle="pill"
            :data-bs-target="`#pointw6${id}`"
            type="button"
            role="tab"
            aria-selected="false"
          >
            <span>10:59</span>
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            data-bs-toggle="pill"
            :data-bs-target="`#pointw7${id}`"
            type="button"
            role="tab"
            aria-selected="false"
          >
            <span>11:02</span>
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            data-bs-toggle="pill"
            :data-bs-target="`#pointw8${id}`"
            type="button"
            role="tab"
            aria-selected="false"
          >
            <span>11:05</span>
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            data-bs-toggle="pill"
            :data-bs-target="`#pointw9${id}`"
            type="button"
            role="tab"
            aria-selected="false"
          >
            <span>11:08</span>
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            data-bs-toggle="pill"
            :data-bs-target="`#pointw10${id}`"
            type="button"
            role="tab"
            aria-selected="false"
          >
            <span>11:11</span>
          </button>
        </li>
      </ul>
    </div>
    <div class="tab-content" :id="`pills-tabContentpoint${id}`">
      <div
        class="tab-pane fade active show"
        :id="`pointw1${id}`"
        role="tabpanel"
        :aria-labelledby="`pointw1${id}`"
        tabIndex="0"
      >
        <div class="world__point__text">
          <span>United States - Wales</span>
          <RouterLink to="#">Bets closed</RouterLink>
        </div>
      </div>
      <div
        class="tab-pane fade"
        :id="`pointw2${id}`"
        role="tabpanel"
        :aria-labelledby="`pointw2${id}`"
        tabIndex="0"
      >
        <div class="world__point__text">
          <span>Portugal-Uruguay</span>
          <RouterLink to="#">Bets closed</RouterLink>
        </div>
        <div class="ecuador__match__fixing">
          <div class="equador__head">
            <span>Tunisia - France</span>
            <span>Bets closing in 3:08</span>
          </div>
          <div class="row g-4">
            <div class="col-xl-6">
              <div class="equator__match__result">
                <div class="match__box mb__30">
                  <span class="title">Match Result</span>
                  <div class="devaided__box">
                    <RouterLink to="#">Qatar 2.38</RouterLink>
                    <RouterLink to="#">X 3.25</RouterLink>
                    <RouterLink to="#">Ecuador 2.80</RouterLink>
                  </div>
                </div>
                <div class="match__box mb__30">
                  <span class="title">Total Goals</span>
                  <div class="devaided__box">
                    <RouterLink to="#">0 12.00</RouterLink>
                    <RouterLink to="#">1 4.33</RouterLink>
                    <RouterLink to="#">2 3.20</RouterLink>
                  </div>
                  <div class="devaided__box">
                    <RouterLink to="#">3 3.40</RouterLink>
                    <RouterLink to="#">4 5.00</RouterLink>
                    <RouterLink to="#"></RouterLink>
                  </div>
                </div>
                <div class="match__box">
                  <span class="title mb__1">
                    Match Result and Both Teams to Score
                  </span>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>Ecuador to win and both teams to score</span>
                      <span class="poin">6.50</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>Ecuador to win to nil</span>
                      <span class="poin">3.75</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>
                        Both teams to score and the match to end in a draw
                      </span>
                      <span class="poin">4.50</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>Both teams not to score</span>
                      <span class="poin">10.00</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>Senegal to win and both teams to score</span>
                      <span class="poin">7.50</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box">
                    <RouterLink to="#" class="d__box">
                      <span>Senegal to win to nil</span>
                      <span class="poin">4.33</span>
                    </RouterLink>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-6">
              <div class="equator__match__result">
                <div class="match__box mb__30">
                  <span class="title mb__1"> Over/Under - Total Goals </span>
                  <div class="devaided__box">
                    <RouterLink to="#"></RouterLink>
                    <RouterLink to="#">Over</RouterLink>
                    <RouterLink to="#">Under</RouterLink>
                  </div>
                </div>
                <div class="match__box mb__30">
                  <span class="title mb__1">Correct Score</span>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">1</RouterLink>
                    <RouterLink to="#">2</RouterLink>
                    <RouterLink to="#">3</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">1-0 7.00</RouterLink>
                    <RouterLink to="#">0-0 10.00</RouterLink>
                    <RouterLink to="#">0-1 8.00</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">2-0 11.00</RouterLink>
                    <RouterLink to="#">1-1 6.00</RouterLink>
                    <RouterLink to="#">0-2 13.00</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">2-1 9.00</RouterLink>
                    <RouterLink to="#">1-2 10.00</RouterLink>
                    <RouterLink to="#">2-2 15.00</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">3-0 26.00</RouterLink>
                    <RouterLink to="#"></RouterLink>
                    <RouterLink to="#">0-3 34.00</RouterLink>
                  </div>
                  <div class="devaided__box">
                    <RouterLink to="#">3-1 21.00</RouterLink>
                    <RouterLink to="#"></RouterLink>
                    <RouterLink to="#">1-3 26.00</RouterLink>
                  </div>
                </div>
                <div class="match__box mb__30">
                  <span class="title">Double Chance</span>
                  <div class="devaided__box">
                    <RouterLink to="#">Ecuador or X 1.33</RouterLink>
                    <RouterLink to="#">X or Senegal 1.44</RouterLink>
                    <RouterLink to="#">Ecuador or Senegal 1.25</RouterLink>
                  </div>
                </div>
                <div class="match__box mb__30">
                  <span class="title mb__1"> Over/Under - Total Goals </span>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#"></RouterLink>
                    <RouterLink to="#">Over</RouterLink>
                    <RouterLink to="#">Under</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">0.5</RouterLink>
                    <RouterLink to="#">1.01</RouterLink>
                    <RouterLink to="#">12.00</RouterLink>
                  </div>
                  <div class="devaided__box">
                    <RouterLink to="#">1.5</RouterLink>
                    <RouterLink to="#">1.29</RouterLink>
                    <RouterLink to="#">3.25</RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        :id="`pointw3${id}`"
        role="tabpanel"
        :aria-labelledby="`pointw3${id}`"
        tabIndex="0"
      >
        <div class="world__point__text">
          <span>Ecuador - Senegal</span>
          <RouterLink to="#">Bets closing in 3:08</RouterLink>
        </div>
        <div class="ecuador__match__fixing">
          <div class="equador__head">
            <span>Ecuador - Senegal</span>
            <span>Bets closing in 3:08</span>
          </div>
          <div class="row g-4">
            <div class="col-xl-6">
              <div class="equator__match__result">
                <div class="match__box mb__30">
                  <span class="title">Match Result</span>
                  <div class="devaided__box">
                    <RouterLink to="#">Ecuador 2.40</RouterLink>
                    <RouterLink to="#">X 3.20</RouterLink>
                    <RouterLink to="#">Senegal 2.75</RouterLink>
                  </div>
                </div>
                <div class="match__box mb__30">
                  <span class="title">Total Goals</span>
                  <div class="devaided__box">
                    <RouterLink to="#">Ecuador 2.40</RouterLink>
                    <RouterLink to="#">4 6.00</RouterLink>
                    <RouterLink to="#"></RouterLink>
                  </div>
                </div>
                <div class="match__box mb__30">
                  <span class="title">Total Goals</span>
                  <div class="devaided__box">
                    <RouterLink to="#">3 3.75</RouterLink>
                  </div>
                </div>
                <div class="match__box">
                  <span class="title mb__1">
                    Match Result and Both Teams to Score
                  </span>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>Ecuador to win and both teams to score</span>
                      <span class="poin">6.50</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>Ecuador to win to nil</span>
                      <span class="poin">3.75</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>
                        Both teams to score and the match to end in a draw
                      </span>
                      <span class="poin">4.50</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>Both teams not to score</span>
                      <span class="poin">10.00</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>Senegal to win and both teams to score</span>
                      <span class="poin">7.50</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box">
                    <RouterLink to="#" class="d__box">
                      <span>Senegal to win to nil</span>
                      <span class="poin">4.33</span>
                    </RouterLink>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-6">
              <div class="equator__match__result">
                <div class="match__box mb__30">
                  <span class="title mb__1"> Over/Under - Total Goals </span>
                  <div class="devaided__box">
                    <RouterLink to="#"></RouterLink>
                    <RouterLink to="#">Over</RouterLink>
                    <RouterLink to="#">Under</RouterLink>
                  </div>
                </div>
                <div class="match__box mb__30">
                  <span class="title mb__1">Correct Score</span>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">1</RouterLink>
                    <RouterLink to="#">2</RouterLink>
                    <RouterLink to="#">3</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">1-0 7.00</RouterLink>
                    <RouterLink to="#">0-0 10.00</RouterLink>
                    <RouterLink to="#">0-1 8.00</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">2-0 11.00</RouterLink>
                    <RouterLink to="#">1-1 6.00</RouterLink>
                    <RouterLink to="#">0-2 13.00</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">2-1 9.00</RouterLink>
                    <RouterLink to="#">1-2 10.00</RouterLink>
                    <RouterLink to="#">2-2 15.00</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">3-0 26.00</RouterLink>
                    <RouterLink to="#"></RouterLink>
                    <RouterLink to="#">0-3 34.00</RouterLink>
                  </div>
                  <div class="devaided__box">
                    <RouterLink to="#">3-1 21.00</RouterLink>
                    <RouterLink to="#"></RouterLink>
                    <RouterLink to="#">1-3 26.00</RouterLink>
                  </div>
                </div>
                <div class="match__box mb__30">
                  <span class="title">Double Chance</span>
                  <div class="devaided__box">
                    <RouterLink to="#">Ecuador or X 1.33</RouterLink>
                    <RouterLink to="#">X or Senegal 1.44</RouterLink>
                    <RouterLink to="#">Ecuador or Senegal 1.25</RouterLink>
                  </div>
                </div>
                <div class="match__box mb__30">
                  <span class="title mb__1">Half Time/Full Time</span>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">Ecuador / Ecuador 3.50</RouterLink>
                    <RouterLink to="#">Ecuador / Draw 15.00</RouterLink>
                    <RouterLink to="#">Ecuador/Senegal 67.00</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">Draw / Ecuador 6.50</RouterLink>
                    <RouterLink to="#">Draw / Senegal 7.00</RouterLink>
                    <RouterLink to="#">Draw / Draw 4.50</RouterLink>
                  </div>
                  <div class="devaided__box">
                    <RouterLink to="#">Senegal / Ecuador 51.00</RouterLink>
                    <RouterLink to="#">Senegal / Draw 15.00</RouterLink>
                    <RouterLink to="#">Senegal / Senegal 4.00</RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        :id="`pointw4${id}`"
        role="tabpanel"
        :aria-labelledby="`pointw4${id}`"
        tabIndex="0"
      >
        <div class="world__point__text">
          <span>Portugal-Uruguay</span>
          <RouterLink to="#">Bets closed</RouterLink>
        </div>
        <div class="ecuador__match__fixing">
          <div class="equador__head">
            <span>Qatar - Ecuador</span>
            <span>Bets closing in 3:08</span>
          </div>
          <div class="row g-4">
            <div class="col-xl-6">
              <div class="equator__match__result">
                <div class="match__box mb__30">
                  <span class="title">Match Result</span>
                  <div class="devaided__box">
                    <RouterLink to="#">Qatar 2.38</RouterLink>
                    <RouterLink to="#">X 3.25</RouterLink>
                    <RouterLink to="#">Ecuador 2.80</RouterLink>
                  </div>
                </div>
                <div class="match__box mb__30">
                  <span class="title">Total Goals</span>
                  <div class="devaided__box">
                    <RouterLink to="#">0 12.00</RouterLink>
                    <RouterLink to="#">1 4.33</RouterLink>
                    <RouterLink to="#">2 3.20</RouterLink>
                  </div>
                  <div class="devaided__box">
                    <RouterLink to="#">3 3.40</RouterLink>
                    <RouterLink to="#">4 5.00</RouterLink>
                    <RouterLink to="#"></RouterLink>
                  </div>
                </div>
                <div class="match__box">
                  <span class="title mb__1">
                    Match Result and Both Teams to Score
                  </span>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>Ecuador to win and both teams to score</span>
                      <span class="poin">6.50</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>Ecuador to win to nil</span>
                      <span class="poin">3.75</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>
                        Both teams to score and the match to end in a draw
                      </span>
                      <span class="poin">4.50</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>Both teams not to score</span>
                      <span class="poin">10.00</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>Senegal to win and both teams to score</span>
                      <span class="poin">7.50</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box">
                    <RouterLink to="#" class="d__box">
                      <span>Senegal to win to nil</span>
                      <span class="poin">4.33</span>
                    </RouterLink>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-6">
              <div class="equator__match__result">
                <div class="match__box mb__30">
                  <span class="title mb__1"> Over/Under - Total Goals </span>
                  <div class="devaided__box">
                    <RouterLink to="#"></RouterLink>
                    <RouterLink to="#">Over</RouterLink>
                    <RouterLink to="#">Under</RouterLink>
                  </div>
                </div>
                <div class="match__box mb__30">
                  <span class="title mb__1">Correct Score</span>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">1</RouterLink>
                    <RouterLink to="#">2</RouterLink>
                    <RouterLink to="#">3</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">1-0 7.00</RouterLink>
                    <RouterLink to="#">0-0 10.00</RouterLink>
                    <RouterLink to="#">0-1 8.00</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">2-0 11.00</RouterLink>
                    <RouterLink to="#">1-1 6.00</RouterLink>
                    <RouterLink to="#">0-2 13.00</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">2-1 9.00</RouterLink>
                    <RouterLink to="#">1-2 10.00</RouterLink>
                    <RouterLink to="#">2-2 15.00</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">3-0 26.00</RouterLink>
                    <RouterLink to="#"></RouterLink>
                    <RouterLink to="#">0-3 34.00</RouterLink>
                  </div>
                  <div class="devaided__box">
                    <RouterLink to="#">3-1 21.00</RouterLink>
                    <RouterLink to="#"></RouterLink>
                    <RouterLink to="#">1-3 26.00</RouterLink>
                  </div>
                </div>
                <div class="match__box mb__30">
                  <span class="title">Double Chance</span>
                  <div class="devaided__box">
                    <RouterLink to="#">Ecuador or X 1.33</RouterLink>
                    <RouterLink to="#">X or Senegal 1.44</RouterLink>
                    <RouterLink to="#">Ecuador or Senegal 1.25</RouterLink>
                  </div>
                </div>
                <div class="match__box mb__30">
                  <span class="title mb__1"> Over/Under - Total Goals </span>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#"></RouterLink>
                    <RouterLink to="#">Over</RouterLink>
                    <RouterLink to="#">Under</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">0.5</RouterLink>
                    <RouterLink to="#">1.01</RouterLink>
                    <RouterLink to="#">12.00</RouterLink>
                  </div>
                  <div class="devaided__box">
                    <RouterLink to="#">1.5</RouterLink>
                    <RouterLink to="#">1.29</RouterLink>
                    <RouterLink to="#">3.25</RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        :id="`pointw5${id}`"
        role="tabpanel"
        :aria-labelledby="`pointw5${id}`"
        tabIndex="0"
      >
        <div class="world__point__text">
          <span>Portugal-Uruguay</span>
          <RouterLink to="#">Bets closed</RouterLink>
        </div>
        <div class="ecuador__match__fixing">
          <div class="equador__head">
            <span>Portugal - Uruguay</span>
            <span>Bets closing in 3:08</span>
          </div>
          <div class="row g-4">
            <div class="col-xl-6">
              <div class="equator__match__result">
                <div class="match__box mb__30">
                  <span class="title">Match Result</span>
                  <div class="devaided__box">
                    <RouterLink to="#">Qatar 2.38</RouterLink>
                    <RouterLink to="#">X 3.25</RouterLink>
                    <RouterLink to="#">Ecuador 2.80</RouterLink>
                  </div>
                </div>
                <div class="match__box mb__30">
                  <span class="title">Total Goals</span>
                  <div class="devaided__box">
                    <RouterLink to="#">0 12.00</RouterLink>
                    <RouterLink to="#">1 4.33</RouterLink>
                    <RouterLink to="#">2 3.20</RouterLink>
                  </div>
                  <div class="devaided__box">
                    <RouterLink to="#">3 3.40</RouterLink>
                    <RouterLink to="#">4 5.00</RouterLink>
                    <RouterLink to="#"></RouterLink>
                  </div>
                </div>
                <div class="match__box">
                  <span class="title mb__1">
                    Match Result and Both Teams to Score
                  </span>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>Ecuador to win and both teams to score</span>
                      <span class="poin">6.50</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>Ecuador to win to nil</span>
                      <span class="poin">3.75</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>
                        Both teams to score and the match to end in a draw
                      </span>
                      <span class="poin">4.50</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>Both teams not to score</span>
                      <span class="poin">10.00</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>Senegal to win and both teams to score</span>
                      <span class="poin">7.50</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box">
                    <RouterLink to="#" class="d__box">
                      <span>Senegal to win to nil</span>
                      <span class="poin">4.33</span>
                    </RouterLink>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-6">
              <div class="equator__match__result">
                <div class="match__box mb__30">
                  <span class="title mb__1"> Over/Under - Total Goals </span>
                  <div class="devaided__box">
                    <RouterLink to="#"></RouterLink>
                    <RouterLink to="#">Over</RouterLink>
                    <RouterLink to="#">Under</RouterLink>
                  </div>
                </div>
                <div class="match__box mb__30">
                  <span class="title mb__1">Correct Score</span>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">1</RouterLink>
                    <RouterLink to="#">2</RouterLink>
                    <RouterLink to="#">3</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">1-0 7.00</RouterLink>
                    <RouterLink to="#">0-0 10.00</RouterLink>
                    <RouterLink to="#">0-1 8.00</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">2-0 11.00</RouterLink>
                    <RouterLink to="#">1-1 6.00</RouterLink>
                    <RouterLink to="#">0-2 13.00</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">2-1 9.00</RouterLink>
                    <RouterLink to="#">1-2 10.00</RouterLink>
                    <RouterLink to="#">2-2 15.00</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">3-0 26.00</RouterLink>
                    <RouterLink to="#"></RouterLink>
                    <RouterLink to="#">0-3 34.00</RouterLink>
                  </div>
                  <div class="devaided__box">
                    <RouterLink to="#">3-1 21.00</RouterLink>
                    <RouterLink to="#"></RouterLink>
                    <RouterLink to="#">1-3 26.00</RouterLink>
                  </div>
                </div>
                <div class="match__box mb__30">
                  <span class="title">Double Chance</span>
                  <div class="devaided__box">
                    <RouterLink to="#">Ecuador or X 1.33</RouterLink>
                    <RouterLink to="#">X or Senegal 1.44</RouterLink>
                    <RouterLink to="#">Ecuador or Senegal 1.25</RouterLink>
                  </div>
                </div>
                <div class="match__box mb__30">
                  <span class="title mb__1"> Over/Under - Total Goals </span>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#"></RouterLink>
                    <RouterLink to="#">Over</RouterLink>
                    <RouterLink to="#">Under</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">0.5</RouterLink>
                    <RouterLink to="#">1.01</RouterLink>
                    <RouterLink to="#">12.00</RouterLink>
                  </div>
                  <div class="devaided__box">
                    <RouterLink to="#">1.5</RouterLink>
                    <RouterLink to="#">1.29</RouterLink>
                    <RouterLink to="#">3.25</RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        :id="`pointw6${id}`"
        role="tabpanel"
        :aria-labelledby="`pointw6${id}`"
        tabIndex="0"
      >
        <div class="world__point__text">
          <span>Portugal-Uruguay</span>
          <RouterLink to="#">Bets closed</RouterLink>
        </div>
        <div class="ecuador__match__fixing">
          <div class="equador__head">
            <span>Netherlands - Qatar</span>
            <span>Bets closing in 3:08</span>
          </div>
          <div class="row g-4">
            <div class="col-xl-6">
              <div class="equator__match__result">
                <div class="match__box mb__30">
                  <span class="title">Match Result</span>
                  <div class="devaided__box">
                    <RouterLink to="#">Qatar 2.38</RouterLink>
                    <RouterLink to="#">X 3.25</RouterLink>
                    <RouterLink to="#">Ecuador 2.80</RouterLink>
                  </div>
                </div>
                <div class="match__box mb__30">
                  <span class="title">Total Goals</span>
                  <div class="devaided__box">
                    <RouterLink to="#">0 12.00</RouterLink>
                    <RouterLink to="#">1 4.33</RouterLink>
                    <RouterLink to="#">2 3.20</RouterLink>
                  </div>
                  <div class="devaided__box">
                    <RouterLink to="#">3 3.40</RouterLink>
                    <RouterLink to="#">4 5.00</RouterLink>
                    <RouterLink to="#"></RouterLink>
                  </div>
                </div>
                <div class="match__box">
                  <span class="title mb__1">
                    Match Result and Both Teams to Score
                  </span>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>Ecuador to win and both teams to score</span>
                      <span class="poin">6.50</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>Ecuador to win to nil</span>
                      <span class="poin">3.75</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>
                        Both teams to score and the match to end in a draw
                      </span>
                      <span class="poin">4.50</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>Both teams not to score</span>
                      <span class="poin">10.00</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>Senegal to win and both teams to score</span>
                      <span class="poin">7.50</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box">
                    <RouterLink to="#" class="d__box">
                      <span>Senegal to win to nil</span>
                      <span class="poin">4.33</span>
                    </RouterLink>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-6">
              <div class="equator__match__result">
                <div class="match__box mb__30">
                  <span class="title mb__1"> Over/Under - Total Goals </span>
                  <div class="devaided__box">
                    <RouterLink to="#"></RouterLink>
                    <RouterLink to="#">Over</RouterLink>
                    <RouterLink to="#">Under</RouterLink>
                  </div>
                </div>
                <div class="match__box mb__30">
                  <span class="title mb__1">Correct Score</span>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">1</RouterLink>
                    <RouterLink to="#">2</RouterLink>
                    <RouterLink to="#">3</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">1-0 7.00</RouterLink>
                    <RouterLink to="#">0-0 10.00</RouterLink>
                    <RouterLink to="#">0-1 8.00</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">2-0 11.00</RouterLink>
                    <RouterLink to="#">1-1 6.00</RouterLink>
                    <RouterLink to="#">0-2 13.00</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">2-1 9.00</RouterLink>
                    <RouterLink to="#">1-2 10.00</RouterLink>
                    <RouterLink to="#">2-2 15.00</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">3-0 26.00</RouterLink>
                    <RouterLink to="#"></RouterLink>
                    <RouterLink to="#">0-3 34.00</RouterLink>
                  </div>
                  <div class="devaided__box">
                    <RouterLink to="#">3-1 21.00</RouterLink>
                    <RouterLink to="#"></RouterLink>
                    <RouterLink to="#">1-3 26.00</RouterLink>
                  </div>
                </div>
                <div class="match__box mb__30">
                  <span class="title">Double Chance</span>
                  <div class="devaided__box">
                    <RouterLink to="#">Ecuador or X 1.33</RouterLink>
                    <RouterLink to="#">X or Senegal 1.44</RouterLink>
                    <RouterLink to="#">Ecuador or Senegal 1.25</RouterLink>
                  </div>
                </div>
                <div class="match__box mb__30">
                  <span class="title mb__1"> Over/Under - Total Goals </span>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#"></RouterLink>
                    <RouterLink to="#">Over</RouterLink>
                    <RouterLink to="#">Under</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">0.5</RouterLink>
                    <RouterLink to="#">1.01</RouterLink>
                    <RouterLink to="#">12.00</RouterLink>
                  </div>
                  <div class="devaided__box">
                    <RouterLink to="#">1.5</RouterLink>
                    <RouterLink to="#">1.29</RouterLink>
                    <RouterLink to="#">3.25</RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        :id="`pointw${id}`"
        role="tabpanel"
        :aria-labelledby="`pointw${id}`"
        tabIndex="0"
      >
        <div class="world__point__text">
          <span>Portugal-Uruguay</span>
          <RouterLink to="#">Bets closed</RouterLink>
        </div>
        <div class="ecuador__match__fixing">
          <div class="equador__head">
            <span>Ecuador - Senegal</span>
            <span>Bets closing in 3:08</span>
          </div>
          <div class="row g-4">
            <div class="col-xl-6">
              <div class="equator__match__result">
                <div class="match__box mb__30">
                  <span class="title">Match Result</span>
                  <div class="devaided__box">
                    <RouterLink to="#">Qatar 2.38</RouterLink>
                    <RouterLink to="#">X 3.25</RouterLink>
                    <RouterLink to="#">Ecuador 2.80</RouterLink>
                  </div>
                </div>
                <div class="match__box mb__30">
                  <span class="title">Total Goals</span>
                  <div class="devaided__box">
                    <RouterLink to="#">0 12.00</RouterLink>
                    <RouterLink to="#">1 4.33</RouterLink>
                    <RouterLink to="#">2 3.20</RouterLink>
                  </div>
                  <div class="devaided__box">
                    <RouterLink to="#">3 3.40</RouterLink>
                    <RouterLink to="#">4 5.00</RouterLink>
                    <RouterLink to="#"></RouterLink>
                  </div>
                </div>
                <div class="match__box">
                  <span class="title mb__1">
                    Match Result and Both Teams to Score
                  </span>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>Ecuador to win and both teams to score</span>
                      <span class="poin">6.50</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>Ecuador to win to nil</span>
                      <span class="poin">3.75</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>
                        Both teams to score and the match to end in a draw
                      </span>
                      <span class="poin">4.50</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>Both teams not to score</span>
                      <span class="poin">10.00</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>Senegal to win and both teams to score</span>
                      <span class="poin">7.50</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box">
                    <RouterLink to="#" class="d__box">
                      <span>Senegal to win to nil</span>
                      <span class="poin">4.33</span>
                    </RouterLink>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-6">
              <div class="equator__match__result">
                <div class="match__box mb__30">
                  <span class="title mb__1"> Over/Under - Total Goals </span>
                  <div class="devaided__box">
                    <RouterLink to="#"></RouterLink>
                    <RouterLink to="#">Over</RouterLink>
                    <RouterLink to="#">Under</RouterLink>
                  </div>
                </div>
                <div class="match__box mb__30">
                  <span class="title mb__1">Correct Score</span>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">1</RouterLink>
                    <RouterLink to="#">2</RouterLink>
                    <RouterLink to="#">3</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">1-0 7.00</RouterLink>
                    <RouterLink to="#">0-0 10.00</RouterLink>
                    <RouterLink to="#">0-1 8.00</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">2-0 11.00</RouterLink>
                    <RouterLink to="#">1-1 6.00</RouterLink>
                    <RouterLink to="#">0-2 13.00</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">2-1 9.00</RouterLink>
                    <RouterLink to="#">1-2 10.00</RouterLink>
                    <RouterLink to="#">2-2 15.00</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">3-0 26.00</RouterLink>
                    <RouterLink to="#"></RouterLink>
                    <RouterLink to="#">0-3 34.00</RouterLink>
                  </div>
                  <div class="devaided__box">
                    <RouterLink to="#">3-1 21.00</RouterLink>
                    <RouterLink to="#"></RouterLink>
                    <RouterLink to="#">1-3 26.00</RouterLink>
                  </div>
                </div>
                <div class="match__box mb__30">
                  <span class="title">Double Chance</span>
                  <div class="devaided__box">
                    <RouterLink to="#">Ecuador or X 1.33</RouterLink>
                    <RouterLink to="#">X or Senegal 1.44</RouterLink>
                    <RouterLink to="#">Ecuador or Senegal 1.25</RouterLink>
                  </div>
                </div>
                <div class="match__box mb__30">
                  <span class="title mb__1"> Over/Under - Total Goals </span>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#"></RouterLink>
                    <RouterLink to="#">Over</RouterLink>
                    <RouterLink to="#">Under</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">0.5</RouterLink>
                    <RouterLink to="#">1.01</RouterLink>
                    <RouterLink to="#">12.00</RouterLink>
                  </div>
                  <div class="devaided__box">
                    <RouterLink to="#">1.5</RouterLink>
                    <RouterLink to="#">1.29</RouterLink>
                    <RouterLink to="#">3.25</RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        :id="`pointw8${id}`"
        role="tabpanel"
        :aria-labelledby="`pointw8${id}`"
        tabIndex="0"
      >
        <div class="world__point__text">
          <span>Portugal-Uruguay</span>
          <RouterLink to="#">Bets closed</RouterLink>
        </div>
        <div class="ecuador__match__fixing">
          <div class="equador__head">
            <span>Wales - England</span>
            <span>Bets closing in 3:08</span>
          </div>
          <div class="row g-4">
            <div class="col-xl-6">
              <div class="equator__match__result">
                <div class="match__box mb__30">
                  <span class="title">Match Result</span>
                  <div class="devaided__box">
                    <RouterLink to="#">Qatar 2.38</RouterLink>
                    <RouterLink to="#">X 3.25</RouterLink>
                    <RouterLink to="#">Ecuador 2.80</RouterLink>
                  </div>
                </div>
                <div class="match__box mb__30">
                  <span class="title">Total Goals</span>
                  <div class="devaided__box">
                    <RouterLink to="#">0 12.00</RouterLink>
                    <RouterLink to="#">1 4.33</RouterLink>
                    <RouterLink to="#">2 3.20</RouterLink>
                  </div>
                  <div class="devaided__box">
                    <RouterLink to="#">3 3.40</RouterLink>
                    <RouterLink to="#">4 5.00</RouterLink>
                    <RouterLink to="#"></RouterLink>
                  </div>
                </div>
                <div class="match__box">
                  <span class="title mb__1">
                    Match Result and Both Teams to Score
                  </span>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>Ecuador to win and both teams to score</span>
                      <span class="poin">6.50</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>Ecuador to win to nil</span>
                      <span class="poin">3.75</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>
                        Both teams to score and the match to end in a draw
                      </span>
                      <span class="poin">4.50</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>Both teams not to score</span>
                      <span class="poin">10.00</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>Senegal to win and both teams to score</span>
                      <span class="poin">7.50</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box">
                    <RouterLink to="#" class="d__box">
                      <span>Senegal to win to nil</span>
                      <span class="poin">4.33</span>
                    </RouterLink>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-6">
              <div class="equator__match__result">
                <div class="match__box mb__30">
                  <span class="title mb__1"> Over/Under - Total Goals </span>
                  <div class="devaided__box">
                    <RouterLink to="#"></RouterLink>
                    <RouterLink to="#">Over</RouterLink>
                    <RouterLink to="#">Under</RouterLink>
                  </div>
                </div>
                <div class="match__box mb__30">
                  <span class="title mb__1">Correct Score</span>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">1</RouterLink>
                    <RouterLink to="#">2</RouterLink>
                    <RouterLink to="#">3</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">1-0 7.00</RouterLink>
                    <RouterLink to="#">0-0 10.00</RouterLink>
                    <RouterLink to="#">0-1 8.00</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">2-0 11.00</RouterLink>
                    <RouterLink to="#">1-1 6.00</RouterLink>
                    <RouterLink to="#">0-2 13.00</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">2-1 9.00</RouterLink>
                    <RouterLink to="#">1-2 10.00</RouterLink>
                    <RouterLink to="#">2-2 15.00</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">3-0 26.00</RouterLink>
                    <RouterLink to="#"></RouterLink>
                    <RouterLink to="#">0-3 34.00</RouterLink>
                  </div>
                  <div class="devaided__box">
                    <RouterLink to="#">3-1 21.00</RouterLink>
                    <RouterLink to="#"></RouterLink>
                    <RouterLink to="#">1-3 26.00</RouterLink>
                  </div>
                </div>
                <div class="match__box mb__30">
                  <span class="title">Double Chance</span>
                  <div class="devaided__box">
                    <RouterLink to="#">Ecuador or X 1.33</RouterLink>
                    <RouterLink to="#">X or Senegal 1.44</RouterLink>
                    <RouterLink to="#">Ecuador or Senegal 1.25</RouterLink>
                  </div>
                </div>
                <div class="match__box mb__30">
                  <span class="title mb__1"> Over/Under - Total Goals </span>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#"></RouterLink>
                    <RouterLink to="#">Over</RouterLink>
                    <RouterLink to="#">Under</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">0.5</RouterLink>
                    <RouterLink to="#">1.01</RouterLink>
                    <RouterLink to="#">12.00</RouterLink>
                  </div>
                  <div class="devaided__box">
                    <RouterLink to="#">1.5</RouterLink>
                    <RouterLink to="#">1.29</RouterLink>
                    <RouterLink to="#">3.25</RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        :id="`pointw9${id}`"
        role="tabpanel"
        :aria-labelledby="`pointw9${id}`"
        tabIndex="0"
      >
        <div class="world__point__text">
          <span>Portugal-Uruguay</span>
          <RouterLink to="#">Bets closed</RouterLink>
        </div>
        <div class="ecuador__match__fixing">
          <div class="equador__head">
            <span>Iran - United States</span>
            <span>Bets closing in 3:08</span>
          </div>
          <div class="row g-4">
            <div class="col-xl-6">
              <div class="equator__match__result">
                <div class="match__box mb__30">
                  <span class="title">Match Result</span>
                  <div class="devaided__box">
                    <RouterLink to="#">Qatar 2.38</RouterLink>
                    <RouterLink to="#">X 3.25</RouterLink>
                    <RouterLink to="#">Ecuador 2.80</RouterLink>
                  </div>
                </div>
                <div class="match__box mb__30">
                  <span class="title">Total Goals</span>
                  <div class="devaided__box">
                    <RouterLink to="#">0 12.00</RouterLink>
                    <RouterLink to="#">1 4.33</RouterLink>
                    <RouterLink to="#">2 3.20</RouterLink>
                  </div>
                  <div class="devaided__box">
                    <RouterLink to="#">3 3.40</RouterLink>
                    <RouterLink to="#">4 5.00</RouterLink>
                    <RouterLink to="#"></RouterLink>
                  </div>
                </div>
                <div class="match__box">
                  <span class="title mb__1">
                    Match Result and Both Teams to Score
                  </span>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>Ecuador to win and both teams to score</span>
                      <span class="poin">6.50</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>Ecuador to win to nil</span>
                      <span class="poin">3.75</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>
                        Both teams to score and the match to end in a draw
                      </span>
                      <span class="poin">4.50</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>Both teams not to score</span>
                      <span class="poin">10.00</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>Senegal to win and both teams to score</span>
                      <span class="poin">7.50</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box">
                    <RouterLink to="#" class="d__box">
                      <span>Senegal to win to nil</span>
                      <span class="poin">4.33</span>
                    </RouterLink>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-6">
              <div class="equator__match__result">
                <div class="match__box mb__30">
                  <span class="title mb__1"> Over/Under - Total Goals </span>
                  <div class="devaided__box">
                    <RouterLink to="#"></RouterLink>
                    <RouterLink to="#">Over</RouterLink>
                    <RouterLink to="#">Under</RouterLink>
                  </div>
                </div>
                <div class="match__box mb__30">
                  <span class="title mb__1">Correct Score</span>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">1</RouterLink>
                    <RouterLink to="#">2</RouterLink>
                    <RouterLink to="#">3</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">1-0 7.00</RouterLink>
                    <RouterLink to="#">0-0 10.00</RouterLink>
                    <RouterLink to="#">0-1 8.00</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">2-0 11.00</RouterLink>
                    <RouterLink to="#">1-1 6.00</RouterLink>
                    <RouterLink to="#">0-2 13.00</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">2-1 9.00</RouterLink>
                    <RouterLink to="#">1-2 10.00</RouterLink>
                    <RouterLink to="#">2-2 15.00</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">3-0 26.00</RouterLink>
                    <RouterLink to="#"></RouterLink>
                    <RouterLink to="#">0-3 34.00</RouterLink>
                  </div>
                  <div class="devaided__box">
                    <RouterLink to="#">3-1 21.00</RouterLink>
                    <RouterLink to="#"></RouterLink>
                    <RouterLink to="#">1-3 26.00</RouterLink>
                  </div>
                </div>
                <div class="match__box mb__30">
                  <span class="title">Double Chance</span>
                  <div class="devaided__box">
                    <RouterLink to="#">Ecuador or X 1.33</RouterLink>
                    <RouterLink to="#">X or Senegal 1.44</RouterLink>
                    <RouterLink to="#">Ecuador or Senegal 1.25</RouterLink>
                  </div>
                </div>
                <div class="match__box mb__30">
                  <span class="title mb__1"> Over/Under - Total Goals </span>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#"></RouterLink>
                    <RouterLink to="#">Over</RouterLink>
                    <RouterLink to="#">Under</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">0.5</RouterLink>
                    <RouterLink to="#">1.01</RouterLink>
                    <RouterLink to="#">12.00</RouterLink>
                  </div>
                  <div class="devaided__box">
                    <RouterLink to="#">1.5</RouterLink>
                    <RouterLink to="#">1.29</RouterLink>
                    <RouterLink to="#">3.25</RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        :id="`pointw10${id}`"
        role="tabpanel"
        :aria-labelledby="`pointw10${id}`"
        tabIndex="0"
      >
        <div class="world__point__text">
          <span>Portugal-Uruguay</span>
          <RouterLink to="#">Bets closed</RouterLink>
        </div>
        <div class="ecuador__match__fixing">
          <div class="equador__head">
            <span>Tunisia - France</span>
            <span>Bets closing in 3:08</span>
          </div>
          <div class="row g-4">
            <div class="col-xl-6">
              <div class="equator__match__result">
                <div class="match__box mb__30">
                  <span class="title">Match Result</span>
                  <div class="devaided__box">
                    <RouterLink to="#">Qatar 2.38</RouterLink>
                    <RouterLink to="#">X 3.25</RouterLink>
                    <RouterLink to="#">Ecuador 2.80</RouterLink>
                  </div>
                </div>
                <div class="match__box mb__30">
                  <span class="title">Total Goals</span>
                  <div class="devaided__box">
                    <RouterLink to="#">0 12.00</RouterLink>
                    <RouterLink to="#">1 4.33</RouterLink>
                    <RouterLink to="#">2 3.20</RouterLink>
                  </div>
                  <div class="devaided__box">
                    <RouterLink to="#">3 3.40</RouterLink>
                    <RouterLink to="#">4 5.00</RouterLink>
                    <RouterLink to="#"></RouterLink>
                  </div>
                </div>
                <div class="match__box">
                  <span class="title mb__1">
                    Match Result and Both Teams to Score
                  </span>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>Ecuador to win and both teams to score</span>
                      <span class="poin">6.50</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>Ecuador to win to nil</span>
                      <span class="poin">3.75</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>
                        Both teams to score and the match to end in a draw
                      </span>
                      <span class="poin">4.50</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>Both teams not to score</span>
                      <span class="poin">10.00</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#" class="d__box">
                      <span>Senegal to win and both teams to score</span>
                      <span class="poin">7.50</span>
                    </RouterLink>
                  </div>
                  <div class="devaided__box">
                    <RouterLink to="#" class="d__box">
                      <span>Senegal to win to nil</span>
                      <span class="poin">4.33</span>
                    </RouterLink>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-6">
              <div class="equator__match__result">
                <div class="match__box mb__30">
                  <span class="title mb__1"> Over/Under - Total Goals </span>
                  <div class="devaided__box">
                    <RouterLink to="#"></RouterLink>
                    <RouterLink to="#">Over</RouterLink>
                    <RouterLink to="#">Under</RouterLink>
                  </div>
                </div>
                <div class="match__box mb__30">
                  <span class="title mb__1">Correct Score</span>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">1</RouterLink>
                    <RouterLink to="#">2</RouterLink>
                    <RouterLink to="#">3</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">1-0 7.00</RouterLink>
                    <RouterLink to="#">0-0 10.00</RouterLink>
                    <RouterLink to="#">0-1 8.00</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">2-0 11.00</RouterLink>
                    <RouterLink to="#">1-1 6.00</RouterLink>
                    <RouterLink to="#">0-2 13.00</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">2-1 9.00</RouterLink>
                    <RouterLink to="#">1-2 10.00</RouterLink>
                    <RouterLink to="#">2-2 15.00</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">3-0 26.00</RouterLink>
                    <RouterLink to="#"></RouterLink>
                    <RouterLink to="#">0-3 34.00</RouterLink>
                  </div>
                  <div class="devaided__box">
                    <RouterLink to="#">3-1 21.00</RouterLink>
                    <RouterLink to="#"></RouterLink>
                    <RouterLink to="#">1-3 26.00</RouterLink>
                  </div>
                </div>
                <div class="match__box mb__30">
                  <span class="title">Double Chance</span>
                  <div class="devaided__box">
                    <RouterLink to="#">Ecuador or X 1.33</RouterLink>
                    <RouterLink to="#">X or Senegal 1.44</RouterLink>
                    <RouterLink to="#">Ecuador or Senegal 1.25</RouterLink>
                  </div>
                </div>
                <div class="match__box mb__30">
                  <span class="title mb__1"> Over/Under - Total Goals </span>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#"></RouterLink>
                    <RouterLink to="#">Over</RouterLink>
                    <RouterLink to="#">Under</RouterLink>
                  </div>
                  <div class="devaided__box mb__1">
                    <RouterLink to="#">0.5</RouterLink>
                    <RouterLink to="#">1.01</RouterLink>
                    <RouterLink to="#">12.00</RouterLink>
                  </div>
                  <div class="devaided__box">
                    <RouterLink to="#">1.5</RouterLink>
                    <RouterLink to="#">1.29</RouterLink>
                    <RouterLink to="#">3.25</RouterLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";

defineProps({
  id: {
    type: Number,
  },
});
</script>

<style scoped></style>
