const awayUL = document.querySelector('.awayUL');
const homeUL = document.querySelector('.homeUL');
const strike_circles = document.querySelectorAll('.strikes');
const balls_circles = document.querySelectorAll('.balls');
const outs_circles = document.querySelectorAll('.outs');
let statResult;
const simGame = document.querySelector('.btn-simGame');

const reset_ball_str = document.querySelectorAll('.reset-ball-str');
const reset_bso = document.querySelectorAll('.reset');
const awayInningScore = document.querySelectorAll('.awayScoreBox');
const homeInningScore = document.querySelectorAll('.homeScoreBox');
const homeTotalRuns = document.querySelector('.homeTotalRuns');
const awayTotalRuns = document.querySelector('.awayTotalRuns');
const inningNumbers = document.querySelectorAll('.inningNumber');
const curInning = document.querySelector('.curInning');
const firstBase = document.querySelector('.firstBase');
const secondBase = document.querySelector('.secondBase');
const thirdBase = document.querySelector('.thirdBase');

const all_bases = document.querySelectorAll('.bases-img');

const scoreLogScores = document.querySelector('.scoreLogScores');

const btnNewGame = document.querySelector('.btn-nextGame');

const btnSimSeason = document.querySelector('.btn-simSeason');
const btnPlayerStats = document.querySelector('.btn-playerStats');
const playerSeasonStats = document.querySelector('.playerStats');
const bravesRecord = document.querySelector('.bravesRecord');
const cardinalsRecord = document.querySelector('.cardinalsRecord');

let strikeCount = 0;
let ballCount = 0;
let outCount = 0;
let awayTeamBatting = true;
let inning = 0;
let curScore = 0;
let topBottom = 'Top';
let gameOver = false;
let manOnFirst = false;
let manOnSecond = false;
let manOnThird = false;
let awayHits = 0;
let homeHits = 0;
let homeScore = 0;
let homeWins = 0;
let homeLosses = 0;
let awayWins = 0;
let awayLosses = 0;
let awayScore = 0;
let curAwayBatter = 0;
let curHomeBatter = 0;
let gameCount = 0;
let skipGames = false;
const tableHeaders = `<tr>
<th>Name</th>
          <th>Pos</th>
          <th>Age</th>
          <th>PA</th>
          <th>AB</th>

          <th>R</th>
          <th>H</th>
          <th>1B</th>
          <th>2B</th>
          <th>3B</th>
          <th>HR</th>
          <th>RBI</th>
          <th>BB</th>
          <th>SO</th>
          <th>AVG</th>
          <th>OBP</th>
          <th>SLG</th>
          <th>OPS</th>
          <th>OUTS</th>
</tr>`;

let awayScoreArray = [];
let homeScoreArray = [];
let inningsNumberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const teamsArray = [cardinalsLineUp, bravesLineUp];

const setLineUps = function () {
  teamsArray[0].forEach((player) => {
    awayUL.innerHTML += `<li>${data.batters[player].name}</li>`;
  });

  teamsArray[1].forEach((player) => {
    homeUL.innerHTML += `<li>${data.batters[player].name}</li>`;
  });
};
let totalSO = 0;
const processStrikes = function (count) {
  if (count === 3) {
    ballCount = 0;
    strikeCount = 0;
    totalSO++;
    // console.log('STRIKE OUT');

    outCount++;
    statResult = 'so';

    processOuts(outCount);

    reset_bs();
  } else {
    for (let i = 0; i < count; i++)
      strike_circles[i].classList.add('active-stat');
  }
};

const batterChange = function () {
  clearStrikeZone();

  if (awayTeamBatting) {
    if (curAwayBatter === 8) {
      curAwayBatter = 0;
    } else {
      curAwayBatter++;
    }
  }

  if (!awayTeamBatting) {
    if (curHomeBatter === 8) {
      curHomeBatter = 0;
    } else {
      curHomeBatter++;
    }
  }
};

const updateCurInning = function () {
  curInning.innerHTML = `${topBottom} ${Math.trunc(inning) + 1}`;
  // console.log(inning);
  if (inning >= 9 && inning % 1 === 0) {
    updateExtras();
    awayScoreArray.push('&nbsp;');
    homeScoreArray.push('&nbsp;');
    for (let i = 0; i < awayScoreArray.slice(-9).length; i++) {
      awayInningScore[i].innerHTML = awayScoreArray.slice(-9)[i];
    }
    for (let i = 0; i < homeScoreArray.slice(-9).length; i++) {
      homeInningScore[i].innerHTML = homeScoreArray.slice(-9)[i];
    }
  }
};

const updateExtras = function () {
  inningsNumberArray.push(Math.trunc(inning) + 1);
  inningNumbers.forEach((num, i) => {
    num.innerHTML = inningsNumberArray.slice(-9)[i];
  });
};

const clearBases = function () {
  all_bases.forEach((base) => {
    base.classList.remove('active-stat');
  });
  manOnFirst = false;
  manOnSecond = false;
  manOnThird = false;
  baseRunners[0] = '';
  baseRunners[1] = '';
  baseRunners[2] = '';
};

const addFirst = function () {
  firstBase.classList.add('active-stat');
  manOnFirst = true;
};
const addSecond = function () {
  secondBase.classList.add('active-stat');
  manOnSecond = true;
};

const addThird = function () {
  thirdBase.classList.add('active-stat');
  manOnThird = true;
};

const removeFirst = function () {
  firstBase.classList.remove('active-stat');
  manOnFirst = false;
};
const removeSecond = function () {
  secondBase.classList.remove('active-stat');
  manOnSecond = false;
};

const removeThird = function () {
  thirdBase.classList.remove('active-stat');
  manOnThird = false;
};

const reset_bs = function () {
  ballCount = 0;
  strikeCount = 0;
  reset_ball_str.forEach((player) => {
    player.classList.remove('active-stat');
  });
};

const reset__bso = function () {
  reset_bso.forEach((circle) => {
    circle.classList.remove('active-stat');
  });
};

const processBalls = function (count) {
  if (count === 4) {
    ballCount = 0;
    strikeCount = 0;
    statResult = 'bb';
    if (awayTeamBatting) {
      data.batters[teamsArray[0][curAwayBatter]]['pa'] += 1;
    } else if (!awayTeamBatting) {
      data.batters[teamsArray[1][curHomeBatter]]['pa'] += 1;
    }
    saveSeasonStats(statResult);
    processWalk();
    reset_bs();
  } else {
    for (let i = 0; i < count; i++)
      balls_circles[i].classList.add('active-stat');
  }
};

const processOuts = function (count) {
  // console.log(outCount);
  if (awayTeamBatting) {
    data.batters[teamsArray[0][curAwayBatter]]['pa'] += 1;
    data.batters[teamsArray[0][curAwayBatter]]['ab'] += 1;
  } else if (!awayTeamBatting) {
    data.batters[teamsArray[1][curHomeBatter]]['pa'] += 1;
    data.batters[teamsArray[1][curHomeBatter]]['ab'] += 1;
  }
  saveSeasonStats(statResult);
  batterChange();
  // h:log(statResult);
  for (let i = 0; i < count; i++) {
    outs_circles[i].classList.add('active-stat');
  }
  if (outCount === 3) {
    reset__bso();
    clearBases();
    checkGame();

    if (gameOver === false) {
      if (awayTeamBatting) {
        displayAwayScore();
        topBottom = 'Bot';
        awayTeamBatting = false;
      } else {
        displayHomeScore();
        topBottom = 'Top';
        awayTeamBatting = true;
      }
      inning = inning + 0.5;
      curScore = 0;
      updateCurInning();
      // h:log(inning);

      outCount = 0;
    }
  }
};

const checkGame = function () {
  if (inning >= 8 && homeScore > awayScore) {
    updateCurInning();
    // alert('Braves Wins!');
    if (outCount === 3) {
      displayAwayScore();

      homeInningScore[inning].innerHTML = 'X';
    }
    clearBases();
    curInning.innerHTML = 'Final';
    // console.log(totalSO);
    gameCount++;
    homeWins++;
    awayLosses++;

    gameOver = true;

    // console.log(data.batters);
  }

  if (
    inning >= 8.5 &&
    awayScore > homeScore &&
    outCount === 3 &&
    inning % 1 !== 0
  ) {
    displayHomeScore();
    // alert('Cardinals Wins!');
    curInning.innerHTML = 'Final';
    clearBases();
    // console.log(totalSO);
    homeLosses++;
    awayWins++;
    gameCount++;

    gameOver = true;
    // console.log(data.batters);
  }
};

const displayAwayScore = function () {
  awayScoreArray[Math.trunc(inning)] = curScore;

  for (let i = 0; i < awayScoreArray.slice(-9).length; i++) {
    awayInningScore[i].innerHTML = awayScoreArray.slice(-9)[i];
  }

  awayScore = awayScoreArray.reduce((partialSum, a) => partialSum + a, 0);
  awayTotalRuns.innerHTML = awayScore;
};

const displayHomeScore = function () {
  homeScoreArray[Math.trunc(inning)] = curScore;
  for (let i = 0; i < homeScoreArray.slice(-9).length; i++) {
    homeInningScore[i].innerHTML = homeScoreArray.slice(-9)[i];
  }

  homeScore = homeScoreArray.reduce((partialSum, a) => partialSum + a, 0);
  homeTotalRuns.innerHTML = homeScore;
};

const processScore = function (runs) {
  if (awayTeamBatting) {
    data.batters[teamsArray[0][curAwayBatter]]['rbi'] += runs;
  } else if (!awayTeamBatting) {
    data.batters[teamsArray[1][curHomeBatter]]['rbi'] += runs;
  }
  curScore += runs;
  if (awayTeamBatting) {
    displayAwayScore();
    checkGame();
  } else {
    displayHomeScore();
    checkGame();
  }

  scoreLogTxt += ` <span class="caret ${
    awayTeamBatting ? 'up' : 'down'
  }"></span> <p>${Math.trunc(inning) + 1}</p>
  <p class="textAL">${
    awayTeamBatting
      ? data.batters[teamsArray[0][curAwayBatter]].name
      : data.batters[teamsArray[1][curHomeBatter]].name
  } hits a ${resultHit} to score ${runs} runs</p>
  <p>${awayScore}</p>
  <p>${homeScore}</p>`;
  if (!skipGames === true) {
    scoreLogScores.innerHTML = scoreLogTxt;
  }
};

const newGame = function () {
  seasonStats.innerHTML = tableHeaders;

  updateStatsPage();

  clearBases();
  reset__bso();
  strikeCount = 0;
  ballCount = 0;
  outCount = 0;
  awayTeamBatting = true;
  inning = 0;
  curScore = 0;
  topBottom = 'Top';
  gameOver = false;
  manOnFirst = false;
  manOnSecond = false;
  manOnThird = false;
  awayHits = 0;
  scoreLogTxt = '';
  homeHits = 0;
  homeScore = 0;
  awayScore = 0;
  curAwayBatter = 0;
  curHomeBatter = 0;
  awayScoreArray = [];
  homeScoreArray = [];
  inningsNumberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  awayHitsLog.innerHTML = '\u00A0';
  homeHitsLog.innerHTML = '\u00A0';
  inningNumbers.forEach((num, i) => {
    num.innerHTML = inningsNumberArray.slice(-9)[i];
  });
  updateCurInning();
  displayAwayScore();
  displayHomeScore();
  awayInningScore.forEach((inning) => {
    inning.innerHTML = '\u00A0';
  });
  homeInningScore.forEach((inning) => {
    inning.innerHTML = '\u00A0';
  });
  scoreLogScores.innerHTML = ' ';
  awayTotalRuns.innerHTML = '\u00A0';
  homeTotalRuns.innerHTML = '\u00A0';
};

btnNewGame?.addEventListener('click', newGame);

btnSimSeason?.addEventListener('click', (e) => {
  e.preventDefault();
  skipGames = true;
  while (gameCount <= 162) {
    newGame();

    while (gameOver === false) {
      processPitchResult();
    }
  }
  bravesRecord.innerHTML = ` <td>Braves</td>
    <td>${homeWins}</td>
    <td>${homeLosses}</td>
    <td>0</td>
    <td>0</td>`;

  cardinalsRecord.innerHTML = ` <td>Cardinals</td>
    <td>${awayWins}</td>
    <td>${awayLosses}</td>
    <td>0</td>
    <td>0</td>`;

  skipGames = false;
  updateStatsPage();
  gameCount = 0;
});

function showStats() {
  playerSeasonStats.classList.toggle('playerStats');
}

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const btnCircle = document.querySelector('.circle');
const btnStrike = document.querySelector('.strike');

function drawSZ() {
  ctx.beginPath();
  ctx.rect(canvas.width / 2 - 75 / 2, 100, 75, 100);
  ctx.stroke();
}
drawSZ();

// function drawSZ2() {
//   ctx.beginPath();
// ctx.rect(canvas.width/2 - (75/2), 100, 75, 125);
// ctx.stroke();
// }

// drawSZ2();

function drawCircle(ctx, x, y, radius, fill, stroke, strokeWidth) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = stroke;
    ctx.stroke();
  }
}

function drawBall() {
  if (!skipGames && !skipZone) {
    let x = Math.floor(Math.random() * (270 - 120 + 1) + 120);
    let y = Math.floor(Math.random() * (235 - 60 + 1) + 60);

    while (x >= 150 && x <= 250 && y >= 85 && y <= 213) {
      x = Math.floor(Math.random() * (270 - 120 + 1) + 120);
      y = Math.floor(Math.random() * (235 - 60 + 1) + 60);
    }

    drawCircle(ctx, x, y, 10, 'green', 'black', 2);
  }
}

function drawStrike() {
  if (!skipGames && !skipZone) {
    let strikeX = Math.floor(Math.random() * (230 - 160 + 1) + 160);
    let strikeY = Math.floor(Math.random() * (200 - 100 + 1) + 100);

    drawCircle(ctx, strikeX, strikeY, 10, 'red', 'black', 2);
  }
}

function drawHitOut() {
  if (!skipGames && !skipZone) {
    let strikeX = Math.floor(Math.random() * (230 - 160 + 1) + 160);
    let strikeY = Math.floor(Math.random() * (200 - 100 + 1) + 100);

    drawCircle(ctx, strikeX, strikeY, 10, 'blue', 'black', 2);
  }
}

function clearStrikeZone() {
  if (!skipGames && !skipZone) {
    btnPitch.disabled = true;
    setTimeout(function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawSZ();
      btnPitch.disabled = false;
      //your code to be executed after 1 second
    }, 1000);
  }
}

setLineUps();
