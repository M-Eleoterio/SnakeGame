export default function ranking(userData) {

    var RankingData = `
    <tr>
    <td>${userData.usuário}</td>
    <td>${userData.pontos}</td>
    <td>${userData.comida_saudavel}</td>
    <td>${userData.comida_nao_saudavel}</td>
    </tr>
    `   
    document.querySelector("#ranking-table-body").innerHTML += RankingData
}