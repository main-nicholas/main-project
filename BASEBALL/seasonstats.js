const seasonStats = document.querySelector('.seasonStats');
const seasonStatsRow = document.querySelector('.seasonStatsRow');

let teamStatsChoice = 'bravesLineUp';
const lineUpArray = {
  cardinalsLineUp,
  bravesLineUp,
};

function chooseTeam() {
  teamStatsChoice = document.getElementById('chooseTeamStats').value;
  seasonStats.innerHTML = tableHeaders;
  updateStatsPage();
}
// (1B + 2Bx2 + 3Bx3 + HRx4)/AB.
const updateStatsPage = function () {
  if (!skipGames) {
    lineUpArray[teamStatsChoice].forEach((player) => {
      let playerOBP = (
        (data.batters[player].h + data.batters[player].bb) /
        data.batters[player].pa
      ).toFixed(3);
      let playerAVG = (
        data.batters[player].h / data.batters[player].ab
      ).toFixed(3);

      let playerSLG = (
        (data.batters[player].singles +
          data.batters[player].doubles * 2 +
          data.batters[player].triples * 3 +
          data.batters[player].hr * 4) /
        data.batters[player].ab
      ).toFixed(3);

      let playerOPS = (Number(playerSLG) + Number(playerOBP)).toFixed(3);

      if (data.batters[player].pa === 0) {
        playerOBP = 0;
        playerAVG = 0;
        playerSLG = 0;
        playerOPS = 0;
      }
      seasonStats.innerHTML += `
    
    <tr>
        <td>${data.batters[player].name}</td>
        <td>${data.batters[player].pos}</td>
        <td>${data.batters[player].age}</td>
        <td>${data.batters[player].pa}</td>
        <td>${data.batters[player].ab}</td>
        <td>${data.batters[player].r}</td>
        <td>${data.batters[player].h}</td>
        <td>${data.batters[player].singles}</td>
        <td>${data.batters[player].doubles}</td>
        <td>${data.batters[player].triples}</td>
        <td>${data.batters[player].hr}</td>
        <td>${data.batters[player].rbi}</td>
        <td>${data.batters[player].bb}</td>
        <td>${data.batters[player].so}</td>
        <td>${playerAVG}</td>
        <td>${playerOBP}</td>
        <td>${playerSLG}</td>
        <td>${playerOPS}</td>


        
        <td>${data.batters[player].out}</td>
       
      </tr>`;
    });
  }
};

updateStatsPage();
