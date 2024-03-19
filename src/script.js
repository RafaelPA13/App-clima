//Chave da API
const chaveDaAPI = "50370f8fc277225beccc7b9ab548f30a";

//Importe de componentes
const barraDePesquisa = document.getElementById("barraPesquisa");
const botaoPesquisa = document.getElementById("btnPesquisa");

const elementoCidade = document.getElementById("cidade");
const elementoPais = document.getElementById("pais");
const iconeDeTemperatura = document.getElementById("iconeTemperatura");
const elementoTemperatura = document.getElementById("temperatura");
const condicaoDoTempo = document.getElementById("condicaoTempo");
const elementoUmidade = document.querySelector("#umidade span");
const elementoVento = document.querySelector("#vento span");

//Ler as capitais do mundo e imprimir a temperatura
const capitais = [
  { nome: "Londres", bandeira: "GB" },
  { nome: "Paris", bandeira: "FR" },
  { nome: "Pequim", bandeira: "CN" },
  { nome: "Madrid", bandeira: "ES" },
  { nome: "Milão", bandeira: "IT" },
  { nome: "Seul", bandeira: "KR" },
  { nome: "Nova York", bandeira: "US" },
  { nome: "Amsterdam", bandeira: "NL" },
  { nome: "Tóquio", bandeira: "JP" },
  { nome: "Brasília", bandeira: "BR" },
];

capitais.map((capital) => {
  const ul = document.querySelector("ul");
  const li = document.createElement("li");
  const h2 = document.createElement("h2");
  const img = document.createElement("img");

  img.src = `https://flagsapi.com/${capital.bandeira}/flat/64.png`;
  h2.textContent = capital.nome;

  li.appendChild(img);
  li.appendChild(h2);
  ul.appendChild(li)

  li.addEventListener("click", () => {mostrarDados(capital.nome);});
});

//Função para pegar os dados da api
async function pegarDados(cidade) {
  const urlDaAPI = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${chaveDaAPI}&lang=pt_br`;
  const res = await fetch(urlDaAPI);
  const data = await res.json();
  return data;
}

//Função que imprime os dados coletados na tela do usuário
async function mostrarDados(cidade) {
  try {
    const data = await pegarDados(cidade);

    elementoCidade.innerText = data.name;
    elementoPais.setAttribute(
      "src",
      `https://flagsapi.com/${data.sys.country}/flat/64.png`
    );
    iconeDeTemperatura.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );
    elementoTemperatura.innerText = `${parseInt(data.main.temp)}°C`;
    condicaoDoTempo.innerText = data.weather[0].description;
    elementoUmidade.innerText = `${data.main.humidity}%`;
    elementoVento.innerText = `${parseInt(data.wind.speed)}km/h`;
  } catch (error) {
    console.log(
      "A forma como você digitou o nome da cidade pode estar errada, tente escrevê-la novamente."
    );
  }
}

//Funcionalidade do botão
botaoPesquisa.addEventListener("click", (e) => {
  e.preventDefault();
  const cidade = barraDePesquisa.value;
  mostrarDados(cidade);
});

//Permitindo dar enter na barra de pesquisa
barraDePesquisa.addEventListener("keyup", (e) => {
  if (e.code == "Enter") {
    const cidade = e.target.value;
    mostrarDados(cidade);
  }
});
