import game from "./pages/scripts/game.js";

//quando a tela toda carregar, faça...
window.onload = () => {
  // pegando o caminho da URL e separando por / (meusite.com/*caminho1/subcaminho1*)
  const path = window.location.pathname.split("/");
  //caso o segundo caminho (nesse caso o caminho1, pois o primeiro sempre vai ser blank) for igual a tal, rode a função loadPage e envie essa variável para o mesmo
  switch (path[0]) {
    case "":
      loadPage("login");
      break;
    case "game":
      loadPage("game");
      break;
    case "ranking":
      loadPage("ranking");
      break;
    //se for qualquer coisa alem dos casos acima, carrege a pagina 404
    default:
      loadPage("404");
      break;
  }
  //pega cada item que contenha a classe "menu-item" e adiciona para uma variavel unica temporária chamada "item"
  document.querySelectorAll(".list-item").forEach((item) => {
    //adiciona um evento de clique nela
    item.addEventListener("click", () => {
      //quando ativado, irá criar uma variável "path" e seu valor vai ser o mesmo que o atributo "value" do item (<li *value=blablabla*></li>)
      const path = item.getAttribute("value");
      //e vai rodar a função loadPage com essa variável path
      loadPage(path);
      //se o path for vazio (meusite.com/), retorna ele pra pagina principal
      if (path == "") {
        window.history.pushState("", "", "/");
        return;
      }
      //se não, joga ele pra página correspondente
      window.history.pushState("", "", path);
    });
  });
  //FINALMENTE a função que carrega as páginas
};

function loadPage($path) {
  // denovo se o caminho for vazio, só retorna pra pagina principal
  if ($path == "") return;

  const container = document.querySelector("#container");
  //realiza uma request para o site
  const req = new XMLHttpRequest();
  //essa request é um GET da variavel $path (previamente enviada por outros function calls). Ele vai na pasta pages e busca pelo arquivo que contenha o nome da variavel + .html no final
  req.open("GET", "pages/" + $path + ".html");
  //retorna o que recebeu
  req.send();
  //se, quando carregar, o resultado for SUCESSO (status code 200), o innerhtml do container principal da pagina muda pra resposta recebida do request, que no caso é o conteudo da pagina
  req.onload = () => {
    if (req.status == 200) {
      container.innerHTML = req.responseText;
      document.title = $path;

      document.querySelectorAll(".script").forEach((script) => {
        script.remove();
      });
      document.querySelectorAll(".style").forEach((style) => {
        style.remove();
      });

      switch($path) {
        case "game":
          game()
      }

    }
  };
}
function login() {
  const loginField = document.querySelector("#login-text");
  let user = document.querySelector("#login-user").value.trim();
  let pass = document.querySelector("#login-pass").value.trim();
  const loginBox = document.querySelector(".login-container");
  let loged;

  if (user == "" || pass == "") {
    loged = `Por favor, preencha todos os campos.`;
    loginField.style.backgroundColor = "red";
    loginField.innerHTML = loged;
    return;
  }

  if (user === "admin" && pass === "admin") {
    loged = `Login encontrado! Redirecionando...`;
    loginField.style.backgroundColor = "green";
    loginField.innerHTML = loged;
  } else {
    loged = `Login NÃO encontrado, verifique suas credenciais.`;
    loginField.style.backgroundColor = "red";
    loginField.innerHTML = loged;
    return;
  }

  setTimeout(() => {
    loadPage("game");
  }, 3000);
  return;
}
