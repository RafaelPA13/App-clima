//Chave da API
const chaveDaAPI = "50370f8fc277225beccc7b9ab548f30a";

//Importe de componentes
const barraDePesquisa = document.getElementById('barraPesquisa')
const botaoPesquisa = document.getElementById('btnPesquisa')

const elementoCidade = document.getElementById('cidade')
const elementoPais = document.getElementById('pais')
const iconeDeTemperatura = document.getElementById('iconeTemperatura')
const elementoTemperatura = document.getElementById('temperatura')
const condicaoDoTempo = document.getElementById('condicaoTempo')
const elementoUmidade = document.querySelector('#umidade span')
const elementoVento = document.querySelector('#vento span')

const elementoData = document.getElementById('data')
const elementoHora = document.getElementById('hora')

//Pegando e mostrando data e hora de hoje
const data = new Date()
const dataDeHoje = data.toLocaleDateString('pt-br')
elementoData.innerText = dataDeHoje

const horas = data.getHours()
const minutos = data.getMinutes() 
if(horas < 10 || minutos < 10){
    elementoHora.innerText == `0${horas}:0${minutos}`
}
else{
    elementoHora.innerText = `${horas}:${minutos}`
}

//Array com as 10 maiores capitais
const capitais = [
    {Nome: 'Londres', Bandeira: 'https://flagsapi.com/GB/flat/64.png'},
    {Nome: 'Paris', Bandeira: 'https://flagsapi.com/FR/flat/64.png'},
    {Nome: 'Hong Kong', Bandeira: 'https://flagsapi.com/CH/flat/64.png'},
    {Nome: 'Madri', Bandeira: 'https://flagsapi.com/ES/flat/64.png'},
    {Nome: 'Roma', Bandeira: 'https://flagsapi.com/IT/flat/64.png'},
    {Nome: 'Seul', Bandeira: 'https://flagsapi.com/KR/flat/64.png'},
    {Nome: 'Nova York', Bandeira: 'https://flagsapi.com/US/flat/64.png'},
    {Nome: 'Amisterdã', Bandeira: 'https://flagsapi.com/NL/flat/64.png'},
    {Nome: 'Tóquio', Bandeira: 'https://flagsapi.com/JP/flat/64.png'},
    {Nome: 'Brasília', Bandeira: 'https://flagsapi.com/BR/flat/64.png'}
]

//Função para pegar os dados da api
async function pegarDados(cidade){
    const urlDaAPI = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${chaveDaAPI}&lang=pt_br`
    const res = await fetch(urlDaAPI)
    const data = await res.json()
    
    return data
}

//Função que imprime os dados coletados na tela do usuário
async function mostrarDados(cidade){
    try {
        const data = await pegarDados(cidade)
    
        elementoCidade.innerText = data.name
        elementoPais.setAttribute('src', `https://flagsapi.com/${data.sys.country}/flat/64.png`)
        iconeDeTemperatura.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
        elementoTemperatura.innerText = `${parseInt(data.main.temp)}°C`
        condicaoDoTempo.innerText = data.weather[0].description
        elementoUmidade.innerText = `${data.main.humidity}%`
        elementoVento.innerText = `${parseInt(data.wind.speed)}km/h`        
    } catch (error) {
        console.log('A forma como você digitou o nome da cidade pode estar errada, tente escrevê-la novamente.')
    }
}

//Funcionalidade do botão
botaoPesquisa.addEventListener('click', (e)=>{
    e.preventDefault()
    const cidade = barraDePesquisa.value
    mostrarDados(cidade)
})

//Permitindo dar enter na barra de pesquisa
barraDePesquisa.addEventListener('keyup', (e)=>{
    if(e.code == 'Enter'){
        const cidade = e.target.value
        mostrarDados(cidade)
    }
})
