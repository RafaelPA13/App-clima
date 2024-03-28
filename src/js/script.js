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

const termometro = document.getElementById('termometro')
const clima = document.getElementById('clima')
const erro = document.getElementById('erro')

//Lista de capitais do mundo
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

//Ler as capitais do mundo e imprimir a temperatura
capitais.map((capital) => {
  const div = document.querySelector(".listaDeCapitais");
  const btn = document.createElement("button");
  const h2 = document.createElement("h2");
  const img = document.createElement("img");

  img.src = `https://flagsapi.com/${capital.bandeira}/flat/64.png`;
  h2.textContent = capital.nome;

  btn.appendChild(img);
  btn.appendChild(h2);
  div.appendChild(btn);
  btn.addEventListener("click", () => {mostrarDados(capital.nome);});
});

//Função de mudança de classes
function mudarClasses({classeClima, classeErro, classeTermometro}) {
  const classesParaRemover = [
    'clima', 
    'esconder',
    'erro'
  ]

  classesParaRemover.forEach((classeParaRemover)=>{
    clima.classList.remove(classeParaRemover)
    erro.classList.remove(classeParaRemover)
    termometro.classList.remove(classeParaRemover)
  })

  clima.classList.add(classeClima)
  erro.classList.add(classeErro)
  termometro.classList.add(classeTermometro)
}

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

    mudarClasses({classeClima: 'clima', classeErro: 'esconder', classeTermometro: 'esconder'})

    elementoCidade.textContent = data.name;
    elementoPais.setAttribute("src", `https://flagsapi.com/${data.sys.country}/flat/64.png`);
    iconeDeTemperatura.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    elementoTemperatura.textContent = `${parseInt(data.main.temp)}°C`;
    condicaoDoTempo.textContent = data.weather[0].description;
    elementoUmidade.textContent = `${data.main.humidity}%`;
    elementoVento.textContent = `${parseInt(data.wind.speed)}km/h`;
  } catch (error) {
    mudarClasses({classeClima: 'esconder', classeErro: 'erro', classeTermometro: 'esconder'})
  }
}

//Funcionalidade do botão
botaoPesquisa.addEventListener("click", (e) => {
  e.preventDefault();
  mostrarDados(barraDePesquisa.value);
});

//Permitindo dar enter na barra de pesquisa
barraDePesquisa.addEventListener("keyup", (e) => {
  if (e.code == "Enter") {
    mostrarDados(e.target.value);
  }
});