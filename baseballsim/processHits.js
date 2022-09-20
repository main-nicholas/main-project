const btnPitch = document.querySelector('.btn-pitch');
const awayHitsLog = document.querySelector('.awayTotalHits');
const homeHitsLog = document.querySelector('.homeTotalHits');
const pbpLabel = document.querySelector('.pbp');
const battingTeamArray = [curAwayBatter, curHomeBatter];
let skipZone = false;
let result;

let scoreLogTxt = '';
let atBatRuns = 0;
let batTeam = 0;
let baseRunners = [];
//Walk Event
const processWalk = function () {
  //Bases Empty

  if (manOnSecond === false && manOnFirst === false && manOnThird === false) {
    addFirst();
    baseRunners[0] = awayTeamBatting
      ? data.batters[teamsArray[0][curAwayBatter]].id
      : data.batters[teamsArray[1][curHomeBatter]].id;
  }
  //1st
  else if (
    manOnSecond === false &&
    manOnFirst === true &&
    manOnThird === false
  ) {
    addSecond();
    baseRunners[1] = baseRunners[0];
    baseRunners[0] = awayTeamBatting
      ? data.batters[teamsArray[0][curAwayBatter]].id
      : data.batters[teamsArray[1][curHomeBatter]].id;
  }
  //1st 2nd
  else if (
    manOnSecond === true &&
    manOnFirst === true &&
    manOnThird === false
  ) {
    addThird();
    baseRunners[2] = baseRunners[1];
    baseRunners[1] = baseRunners[0];
    baseRunners[0] = awayTeamBatting
      ? data.batters[teamsArray[0][curAwayBatter]].id
      : data.batters[teamsArray[1][curHomeBatter]].id;
  }
  //1st 2nd 3rd
  else if (manOnSecond === true && manOnFirst === true && manOnThird === true) {
    data.batters[baseRunners[2]]['r'] += 1;
    baseRunners[2] = baseRunners[1];
    baseRunners[1] = baseRunners[0];
    baseRunners[0] = awayTeamBatting
      ? data.batters[teamsArray[0][curAwayBatter]].id
      : data.batters[teamsArray[1][curHomeBatter]].id;
    processScore(1);
  }
  //1st 3rd
  else if (
    manOnFirst === true &&
    manOnSecond === false &&
    manOnThird === true
  ) {
    addSecond();

    baseRunners[1] = baseRunners[0];
    baseRunners[0] = awayTeamBatting
      ? data.batters[teamsArray[0][curAwayBatter]].id
      : data.batters[teamsArray[1][curHomeBatter]].id;
  }
  //2nd
  else if (
    manOnFirst === false &&
    manOnSecond === true &&
    manOnThird === false
  ) {
    addFirst();
    baseRunners[0] = awayTeamBatting
      ? data.batters[teamsArray[0][curAwayBatter]].id
      : data.batters[teamsArray[1][curHomeBatter]].id;
  }
  //2nd 3rd
  else if (
    manOnFirst === false &&
    manOnSecond === true &&
    manOnThird === true
  ) {
    addFirst();
    baseRunners[0] = awayTeamBatting
      ? data.batters[teamsArray[0][curAwayBatter]].id
      : data.batters[teamsArray[1][curHomeBatter]].id;
  }
  //third
  else if (
    manOnFirst === false &&
    manOnSecond === false &&
    manOnThird === true
  ) {
    addFirst();
    baseRunners[0] = awayTeamBatting
      ? data.batters[teamsArray[0][curAwayBatter]].id
      : data.batters[teamsArray[1][curHomeBatter]].id;
  }
  batterChange();
};
//Single Event
const processSingle = function () {
  //Bases Empty
  saveSeasonStats('singles');
  if (manOnSecond === false && manOnFirst === false && manOnThird === false) {
    addFirst();

    baseRunners[0] = awayTeamBatting
      ? data.batters[teamsArray[0][curAwayBatter]].id
      : data.batters[teamsArray[1][curHomeBatter]].id;
  }
  //1st
  else if (
    manOnSecond === false &&
    manOnFirst === true &&
    manOnThird === false
  ) {
    addSecond();
    baseRunners[1] = baseRunners[0];
    baseRunners[0] = awayTeamBatting
      ? data.batters[teamsArray[0][curAwayBatter]].id
      : data.batters[teamsArray[1][curHomeBatter]].id;
  }
  //1st 2nd
  else if (
    manOnSecond === true &&
    manOnFirst === true &&
    manOnThird === false
  ) {
    addThird();
    baseRunners[2] = baseRunners[1];
    baseRunners[1] = baseRunners[0];
    baseRunners[0] = awayTeamBatting
      ? data.batters[teamsArray[0][curAwayBatter]].id
      : data.batters[teamsArray[1][curHomeBatter]].id;
  }
  //1st 2nd 3rd
  else if (manOnSecond === true && manOnFirst === true && manOnThird === true) {
    data.batters[baseRunners[2]]['r'] += 1;
    baseRunners[2] = baseRunners[1];
    baseRunners[1] = baseRunners[0];
    baseRunners[0] = awayTeamBatting
      ? data.batters[teamsArray[0][curAwayBatter]].id
      : data.batters[teamsArray[1][curHomeBatter]].id;
    processScore(1);
  }
  //1st 3rd
  else if (
    manOnFirst === true &&
    manOnSecond === false &&
    manOnThird === true
  ) {
    addSecond();
    removeThird();

    data.batters[baseRunners[2]]['r'] += 1;
    baseRunners[2] = '';
    baseRunners[1] = baseRunners[0];
    baseRunners[0] = awayTeamBatting
      ? data.batters[teamsArray[0][curAwayBatter]].id
      : data.batters[teamsArray[1][curHomeBatter]].id;
    processScore(1);
  }
  //2nd
  else if (
    manOnFirst === false &&
    manOnSecond === true &&
    manOnThird === false
  ) {
    removeSecond();
    addFirst();
    addThird();
    baseRunners[2] = baseRunners[1];
    baseRunners[1] = '';
    baseRunners[0] = awayTeamBatting
      ? data.batters[teamsArray[0][curAwayBatter]].id
      : data.batters[teamsArray[1][curHomeBatter]].id;
  }
  //2nd 3rd
  else if (
    manOnFirst === false &&
    manOnSecond === true &&
    manOnThird === true
  ) {
    removeSecond();
    addFirst();

    data.batters[baseRunners[2]]['r'] += 1;
    baseRunners[2] = baseRunners[1];
    baseRunners[1] = '';
    baseRunners[0] = awayTeamBatting
      ? data.batters[teamsArray[0][curAwayBatter]].id
      : data.batters[teamsArray[1][curHomeBatter]].id;
    processScore(1);
  }
  //third
  else if (
    manOnFirst === false &&
    manOnSecond === false &&
    manOnThird === true
  ) {
    removeThird();
    addFirst();

    data.batters[baseRunners[2]]['r'] += 1;
    baseRunners[2] = '';
    baseRunners[0] = awayTeamBatting
      ? data.batters[teamsArray[0][curAwayBatter]].id
      : data.batters[teamsArray[1][curHomeBatter]].id;
    processScore(1);
  }
};
//Double Event
const processDouble = function () {
  //Bases Empty
  saveSeasonStats('doubles');
  if (manOnSecond === false && manOnFirst === false && manOnThird === false) {
    addSecond();

    baseRunners[1] = awayTeamBatting
      ? data.batters[teamsArray[0][curAwayBatter]].id
      : data.batters[teamsArray[1][curHomeBatter]].id;
  }
  //1st
  else if (
    manOnSecond === false &&
    manOnFirst === true &&
    manOnThird === false
  ) {
    removeFirst();
    addSecond();
    addThird();
    baseRunners[2] = baseRunners[0];
    baseRunners[0] = '';
    baseRunners[1] = awayTeamBatting
      ? data.batters[teamsArray[0][curAwayBatter]].id
      : data.batters[teamsArray[1][curHomeBatter]].id;
  }
  //1st 2nd
  else if (
    manOnSecond === true &&
    manOnFirst === true &&
    manOnThird === false
  ) {
    removeFirst();
    addThird();

    data.batters[baseRunners[1]]['r'] += 1;
    baseRunners[2] = baseRunners[0];
    baseRunners[0] = '';
    baseRunners[1] = awayTeamBatting
      ? data.batters[teamsArray[0][curAwayBatter]].id
      : data.batters[teamsArray[1][curHomeBatter]].id;
    processScore(1);
  }
  //1st 2nd 3rd
  else if (manOnSecond === true && manOnFirst === true && manOnThird === true) {
    removeFirst();

    data.batters[baseRunners[1]]['r'] += 1;
    data.batters[baseRunners[2]]['r'] += 1;
    baseRunners[2] = baseRunners[0];
    baseRunners[0] = '';
    baseRunners[1] = awayTeamBatting
      ? data.batters[teamsArray[0][curAwayBatter]].id
      : data.batters[teamsArray[1][curHomeBatter]].id;
    processScore(2);
  }
  //1st 3rd
  else if (
    manOnFirst === true &&
    manOnSecond === false &&
    manOnThird === true
  ) {
    removeFirst();
    addSecond();

    data.batters[baseRunners[2]]['r'] += 1;
    baseRunners[2] = baseRunners[0];
    baseRunners[0] = '';
    baseRunners[1] = awayTeamBatting
      ? data.batters[teamsArray[0][curAwayBatter]].id
      : data.batters[teamsArray[1][curHomeBatter]].id;
    processScore(1);
  }
  //2nd
  else if (
    manOnFirst === false &&
    manOnSecond === true &&
    manOnThird === false
  ) {
    data.batters[baseRunners[1]]['r'] += 1;
    baseRunners[1] = awayTeamBatting
      ? data.batters[teamsArray[0][curAwayBatter]].id
      : data.batters[teamsArray[1][curHomeBatter]].id;
    processScore(1);
  }
  //2nd 3rd
  else if (
    manOnFirst === false &&
    manOnSecond === true &&
    manOnThird === true
  ) {
    removeThird();

    data.batters[baseRunners[1]]['r'] += 1;
    data.batters[baseRunners[2]]['r'] += 1;
    baseRunners[2] = '';
    baseRunners[1] = awayTeamBatting
      ? data.batters[teamsArray[0][curAwayBatter]].id
      : data.batters[teamsArray[1][curHomeBatter]].id;
    processScore(2);
  }
  //third
  else if (
    manOnFirst === false &&
    manOnSecond === false &&
    manOnThird === true
  ) {
    removeThird();
    addSecond();

    data.batters[baseRunners[2]]['r'] += 1;
    baseRunners[2] = '';
    baseRunners[1] = awayTeamBatting
      ? data.batters[teamsArray[0][curAwayBatter]].id
      : data.batters[teamsArray[1][curHomeBatter]].id;
    processScore(1);
  }
};
//Triple Event
const processTriple = function () {
  saveSeasonStats('triples');
  //Bases Empty
  if (manOnSecond === false && manOnFirst === false && manOnThird === false) {
    addThird();

    baseRunners[2] = awayTeamBatting
      ? data.batters[teamsArray[0][curAwayBatter]].id
      : data.batters[teamsArray[1][curHomeBatter]].id;
  }
  //1st
  else if (
    manOnSecond === false &&
    manOnFirst === true &&
    manOnThird === false
  ) {
    removeFirst();
    addThird();

    data.batters[baseRunners[0]]['r'] += 1;
    baseRunners[0] = '';
    baseRunners[2] = awayTeamBatting
      ? data.batters[teamsArray[0][curAwayBatter]].id
      : data.batters[teamsArray[1][curHomeBatter]].id;
    processScore(1);
  }
  //1st 2nd
  else if (
    manOnSecond === true &&
    manOnFirst === true &&
    manOnThird === false
  ) {
    removeFirst();
    removeSecond();
    addThird();

    data.batters[baseRunners[0]]['r'] += 1;
    data.batters[baseRunners[1]]['r'] += 1;
    baseRunners[0] = '';
    baseRunners[1] = '';
    baseRunners[2] = awayTeamBatting
      ? data.batters[teamsArray[0][curAwayBatter]].id
      : data.batters[teamsArray[1][curHomeBatter]].id;
    processScore(2);
  }
  //1st 2nd 3rd
  else if (manOnSecond === true && manOnFirst === true && manOnThird === true) {
    removeFirst();
    removeSecond();

    data.batters[baseRunners[0]]['r'] += 1;
    data.batters[baseRunners[1]]['r'] += 1;
    data.batters[baseRunners[2]]['r'] += 1;
    baseRunners[0] = '';
    baseRunners[1] = '';
    baseRunners[2] = awayTeamBatting
      ? data.batters[teamsArray[0][curAwayBatter]].id
      : data.batters[teamsArray[1][curHomeBatter]].id;
    processScore(3);
  }
  //1st 3rd
  else if (
    manOnFirst === true &&
    manOnSecond === false &&
    manOnThird === true
  ) {
    removeFirst();

    data.batters[baseRunners[0]]['r'] += 1;
    data.batters[baseRunners[2]]['r'] += 1;
    baseRunners[0] = '';
    baseRunners[2] = awayTeamBatting
      ? data.batters[teamsArray[0][curAwayBatter]].id
      : data.batters[teamsArray[1][curHomeBatter]].id;
    processScore(2);
  }
  //2nd
  else if (
    manOnFirst === false &&
    manOnSecond === true &&
    manOnThird === false
  ) {
    removeSecond();
    addThird();

    data.batters[baseRunners[1]]['r'] += 1;

    baseRunners[1] = '';
    baseRunners[2] = awayTeamBatting
      ? data.batters[teamsArray[0][curAwayBatter]].id
      : data.batters[teamsArray[1][curHomeBatter]].id;
    processScore(1);
  }
  //2nd 3rd
  else if (
    manOnFirst === false &&
    manOnSecond === true &&
    manOnThird === true
  ) {
    removeSecond();

    data.batters[baseRunners[1]]['r'] += 1;
    data.batters[baseRunners[2]]['r'] += 1;
    baseRunners[1] = '';
    baseRunners[2] = awayTeamBatting
      ? data.batters[teamsArray[0][curAwayBatter]].id
      : data.batters[teamsArray[1][curHomeBatter]].id;
    processScore(2);
  }
  //third
  else if (
    manOnFirst === false &&
    manOnSecond === false &&
    manOnThird === true
  ) {
    data.batters[baseRunners[2]]['r'] += 1;
    baseRunners[2] = awayTeamBatting
      ? data.batters[teamsArray[0][curAwayBatter]].id
      : data.batters[teamsArray[1][curHomeBatter]].id;
    processScore(1);
  }
};
//HomeRun Event
const processHomeRun = function () {
  saveSeasonStats('hr');
  //Bases Empty
  if (manOnSecond === false && manOnFirst === false && manOnThird === false) {
    awayTeamBatting
      ? (data.batters[teamsArray[0][curAwayBatter]]['r'] += 1)
      : (data.batters[teamsArray[1][curHomeBatter]]['r'] += 1);
    clearBases();
    processScore(1);
  }
  //1st
  else if (
    manOnSecond === false &&
    manOnFirst === true &&
    manOnThird === false
  ) {
    data.batters[baseRunners[0]]['r'] += 1;
    awayTeamBatting
      ? (data.batters[teamsArray[0][curAwayBatter]]['r'] += 1)
      : (data.batters[teamsArray[1][curHomeBatter]]['r'] += 1);
    clearBases();
    processScore(2);
  }
  //1st 2nd
  else if (
    manOnSecond === true &&
    manOnFirst === true &&
    manOnThird === false
  ) {
    data.batters[baseRunners[1]]['r'] += 1;
    data.batters[baseRunners[0]]['r'] += 1;
    awayTeamBatting
      ? (data.batters[teamsArray[0][curAwayBatter]]['r'] += 1)
      : (data.batters[teamsArray[1][curHomeBatter]]['r'] += 1);
    clearBases();
    processScore(3);
  }
  //1st 2nd 3rd
  else if (manOnSecond === true && manOnFirst === true && manOnThird === true) {
    data.batters[baseRunners[2]]['r'] += 1;
    data.batters[baseRunners[1]]['r'] += 1;
    data.batters[baseRunners[0]]['r'] += 1;
    awayTeamBatting
      ? (data.batters[teamsArray[0][curAwayBatter]]['r'] += 1)
      : (data.batters[teamsArray[1][curHomeBatter]]['r'] += 1);
    clearBases();
    processScore(4);
  }
  //1st 3rd
  else if (
    manOnFirst === true &&
    manOnSecond === false &&
    manOnThird === true
  ) {
    data.batters[baseRunners[2]]['r'] += 1;
    data.batters[baseRunners[0]]['r'] += 1;
    awayTeamBatting
      ? (data.batters[teamsArray[0][curAwayBatter]]['r'] += 1)
      : (data.batters[teamsArray[1][curHomeBatter]]['r'] += 1);
    clearBases();
    processScore(3);
  }
  //2nd
  else if (
    manOnFirst === false &&
    manOnSecond === true &&
    manOnThird === false
  ) {
    data.batters[baseRunners[1]]['r'] += 1;
    awayTeamBatting
      ? (data.batters[teamsArray[0][curAwayBatter]]['r'] += 1)
      : (data.batters[teamsArray[1][curHomeBatter]]['r'] += 1);
    clearBases();
    processScore(2);
  }
  //2nd 3rd
  else if (
    manOnFirst === false &&
    manOnSecond === true &&
    manOnThird === true
  ) {
    data.batters[baseRunners[2]]['r'] += 1;
    data.batters[baseRunners[1]]['r'] += 1;
    awayTeamBatting
      ? (data.batters[teamsArray[0][curAwayBatter]]['r'] += 1)
      : (data.batters[teamsArray[1][curHomeBatter]]['r'] += 1);
    clearBases();
    processScore(3);
  }
  //third
  else if (
    manOnFirst === false &&
    manOnSecond === false &&
    manOnThird === true
  ) {
    data.batters[baseRunners[2]]['r'] += 1;
    awayTeamBatting
      ? (data.batters[teamsArray[0][curAwayBatter]]['r'] += 1)
      : (data.batters[teamsArray[1][curHomeBatter]]['r'] += 1);
    clearBases();
    processScore(2);
  }
};

let resultHit = '';
let modifier = 0.0204;

function weighted_random(options) {
  var i;

  var weights = [];

  for (i = 0; i < options.length; i++)
    weights[i] = options[i].weight + (weights[i - 1] || 0);

  var random = Math.random() * weights[weights.length - 1];

  for (i = 0; i < weights.length; i++) if (weights[i] > random) break;

  return options[i].item;
}

const processPitchResult = function () {
  const eyeRating =
    data.batters[
      teamsArray[awayTeamBatting ? 0 : 1][
        awayTeamBatting ? curAwayBatter : curHomeBatter
      ]
    ]['eye'];

  const contactRating =
    data.batters[
      teamsArray[awayTeamBatting ? 0 : 1][
        awayTeamBatting ? curAwayBatter : curHomeBatter
      ]
    ]['con'];

  let pitchResults = [
    {
      item: 'ball',
      weight: eye[eyeRating],
    },
    {
      item: 'strike',
      weight: 0.24,
    },

    {
      item: 'foul',
      weight: 0.15,
    },

    {
      item: 'out',
      weight: 0.145,
    },

    {
      item: 'hit',
      weight: contact[contactRating],
    },
  ];
  batTeam = awayTeamBatting ? 0 : 1;

  result = weighted_random(pitchResults);
  //   console.log(result);
  switch (result) {
    case 'foul':
      drawStrike();
      if (strikeCount === 2) {
        strikeCount = 2;
        processStrikes(strikeCount);
      } else {
        strikeCount++;
        processStrikes(strikeCount);
      }
      break;
    case 'strike':
      // code block
      drawStrike();
      strikeCount++;
      processStrikes(strikeCount);
      break;
    case 'ball':
      // code block

      drawBall();

      ballCount++;
      processBalls(ballCount);
      break;
    case 'out':
      // code block

      drawHitOut();

      statResult = 'out';
      outCount++;

      reset_bs();

      processOuts(outCount);

      break;
    case 'hit':
      // code block
      drawHitOut();

      reset_bs();
      processHitResult();
      batterChange();
      break;
  }

  awayHitsLog.innerHTML = awayHits;
  homeHitsLog.innerHTML = homeHits;
};

const processHitResult = function () {
  const powerRating =
    data.batters[
      teamsArray[awayTeamBatting ? 0 : 1][
        awayTeamBatting ? curAwayBatter : curHomeBatter
      ]
    ]['pow'];
  let hitResults = [
    {
      item: 'single',
      weight: 0.63,
    },
    {
      item: 'double',
      weight: 0.2,
    },
    {
      item: 'triple',
      weight: 0.02,
    },
    {
      item: 'homerun',
      weight: powerHR[powerRating],
    },
  ];
  resultHit = weighted_random(hitResults);

  if (awayTeamBatting) {
    data.batters[teamsArray[0][curAwayBatter]]['pa'] += 1;
    data.batters[teamsArray[0][curAwayBatter]]['ab'] += 1;
    data.batters[teamsArray[0][curAwayBatter]]['h'] += 1;

    awayHits++;
  } else if (!awayTeamBatting) {
    data.batters[teamsArray[1][curHomeBatter]]['pa'] += 1;
    data.batters[teamsArray[1][curHomeBatter]]['ab'] += 1;
    data.batters[teamsArray[1][curHomeBatter]]['h'] += 1;
    homeHits++;
  }

  //   console.log(resultHit);
  switch (resultHit) {
    case 'single':
      // code block

      reset_bs();
      processSingle();
      break;
    case 'double':
      // code block

      reset_bs();
      processDouble();
      break;
    case 'triple':
      // code block

      reset_bs();
      processTriple();
      break;
    case 'homerun':
      // code block

      processHomeRun();
      break;
  }
};

btnPitch?.addEventListener('click', processPitchResult);

simGame?.addEventListener('click', (e) => {
  e.preventDefault();
  skipZone = true;
  while (gameOver === false) {
    processPitchResult();
  }
  skipZone = false;

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
});

const saveSeasonStats = function (res) {
  if (awayTeamBatting) {
    data.batters[teamsArray[0][curAwayBatter]][res] += 1;
  } else if (!awayTeamBatting) {
    data.batters[teamsArray[1][curHomeBatter]][res] += 1;
  }
};

const postPlayByPlay = function (type) {};
// console.log(
//   data.batters[teamsArray][0][awayTeamBatting ? curAwayBatter : curHomeBatter]
// );
