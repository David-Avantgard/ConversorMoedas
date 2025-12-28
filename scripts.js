/****************************************************************************************************
Autor: David Carvalho
Fecha: 26/12/2025
Proyecto: Conversor de Monedas
Descripción: Proyecto de estudio desarrollado durante el proceso de desarrollo full stack en DevClub.
Monedas utilizadas: BRL, USD, EUR, GBP, BTC
*****************************************************************************************************/

// Variaveis
const convertButton = document.querySelector(".convertButton")
const currencyFrom = document.querySelector(".currency-from")
const currencyTo = document.querySelector(".currency-select")

// Variaveis para a cotação 
let dolarToday = 0
let euroToday = 0
let libraToday = 0
let bitcoinToday = 0

// Carregan a cotação 
async function getCurrencyRates() {
  const response = await fetch(
    "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL,BTC-BRL"
  )
  const data = await response.json()

  dolarToday = Number(data.USDBRL.bid)
  euroToday = Number(data.EURBRL.bid)
  libraToday = Number(data.GBPBRL.bid)
  bitcoinToday = Number(data.BTCBRL.bid)
}

// Listagem das cotações
function getRate(currency) {
  switch (currency) {
    case "BRL": return 1
    case "USD": return dolarToday
    case "EUR": return euroToday
    case "GBP": return libraToday
    case "BTC": return bitcoinToday
  }
}

// Formatação  
function formatCurrency(value, currency) {
  if (currency === "BTC") {
    return value.toFixed(6) + " BTC"
  }

  const map = {
    BRL: ["pt-BR", "BRL"],
    USD: ["en-US", "USD"],
    EUR: ["de-DE", "EUR"],
    GBP: ["en-GB", "GBP"]
  }

  return new Intl.NumberFormat(map[currency][0], {
    style: "currency",
    currency: map[currency][1]
  }).format(value)
}

// Conversores 
async function convertValues() {
  await getCurrencyRates()

  const inputValue = Number(document.querySelector(".input-currency").value)

  if (!inputValue) return

  const from = currencyFrom.value
  const to = currencyTo.value

  const valueInBRL = inputValue * getRate(from)
  const finalValue = valueInBRL / getRate(to)

  document.querySelector(".currency-value-to-convert").innerHTML =
    formatCurrency(inputValue, from)

  document.querySelector(".currency-value").innerHTML =
    formatCurrency(finalValue, to)
}

// Troca textos e imagens  
function updateCurrencyUI() {
  const map = {
    BRL: ["Real Brasileiro", "./assets/real.png"],
    USD: ["Dólar Americano", "./assets/dolar.png"],
    EUR: ["Euro", "./assets/euro.png"],
    GBP: ["Libra Esterlina", "./assets/libra.png"],
    BTC: ["Bitcoin", "./assets/bitcoin.png"]
  }

// Origem
  document.getElementById("currency-name-from").innerHTML = map[currencyFrom.value][0]
  document.querySelector(".currency-img-from").src = map[currencyFrom.value][1]

// Destino
  document.getElementById("currency-name").innerHTML = map[currencyTo.value][0]
  document.querySelector(".currency-img").src = map[currencyTo.value][1]

  convertValues()
}

// Eventos
convertButton.addEventListener("click", convertValues)
currencyFrom.addEventListener("change", updateCurrencyUI)
currencyTo.addEventListener("change", updateCurrencyUI)

// Ticker com indicadores (setas)
async function updateTicker() {
  const response = await fetch(
    "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL,BTC-BRL"
  )
  const data = await response.json()

  function trend(change) {
    const value = Number(change)
    if (value > 0) return { cls: "up", icon: "▲" }
    if (value < 0) return { cls: "down", icon: "▼" }
    return { cls: "stable", icon: "►" }
  }

  const usd = trend(data.USDBRL.pctChange)
  const eur = trend(data.EURBRL.pctChange)
  const gbp = trend(data.GBPBRL.pctChange)
  const btc = trend(data.BTCBRL.pctChange)

  const tickerText = `
    💱 Mercado en tiempo real • 
    USD/BRL <span class="${usd.cls}">${usd.icon} ${Number(data.USDBRL.bid).toFixed(2)} (${data.USDBRL.pctChange}%)</span> |
    EUR/BRL <span class="${eur.cls}">${eur.icon} ${Number(data.EURBRL.bid).toFixed(2)} (${data.EURBRL.pctChange}%)</span> |
    GBP/BRL <span class="${gbp.cls}">${gbp.icon} ${Number(data.GBPBRL.bid).toFixed(2)} (${data.GBPBRL.pctChange}%)</span> |
    BTC/BRL <span class="${btc.cls}">${btc.icon} ${Number(data.BTCBRL.bid).toLocaleString("pt-BR")}</span> •
    
    Proyecto DevClub Converter Monedas | David Carvalho | 27 de diciembre de 2025 •
    Estudio práctico de JavaScript, HTML, CSS y API
  `

  document.getElementById("ticker-content").innerHTML = tickerText
  document.getElementById("ticker-content-clone").innerHTML = tickerText
}

// Inicialização
updateTicker()
setInterval(updateTicker, 60000)
