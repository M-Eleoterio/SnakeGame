const RankingTable = document.querySelector("#ranking-table-body")

const userData = JSON.parse(localStorage.getItem('userData'));

let RankingData = `
    <tr>
        <td>${userData.usuário}</td>
        <td>${userData.pontos}</td>
        <td>${userData.comida_saudavel}</td>
        <td>${userData.comida_nao_saudavel}</td>
    </tr>
`

RankingTable.innerHTML += RankingData