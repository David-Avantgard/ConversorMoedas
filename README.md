# 💱 Conversor de Moedas — Projeto DevClub

Projeto de estudo desenvolvido durante a jornada **Full Stack** no **DevClub**, com foco em lógica de programação, consumo de API e boas práticas de front-end.

Permite a conversão entre **BRL, USD, EUR, GBP e BTC**, utilizando **cotações em tempo real**, com indicadores visuais de alta, baixa ou estabilidade do mercado.

🔗 **Demo online:**  
https://david-avantgard.github.io/ConversorMoedas/

---

## 📌 Funcionalidades

- Conversão entre qualquer par de moedas suportadas
- Entrada de valor em qualquer moeda
- Saída formatada conforme moeda escolhida
- Cotações em tempo real via API
- Ticker contínuo (loop infinito sem reset visual)
- Indicadores visuais:
  - 🔼 Alta → verde
  - 🔽 Baixa → vermelho
  - ➖ Estável → amarelo
- Bloqueio para evitar conversão da mesma moeda
- Interface responsiva
- Identidade visual própria

---

## 🧠 Lógica de Funcionamento

1. As cotações são buscadas em tempo real via API
2. O valor de origem é convertido para BRL
3. O valor em BRL é convertido para a moeda de destino
4. O resultado é formatado conforme localidade e símbolo da moeda
5. O ticker exibe continuamente as cotações atualizadas

---

## ⚙️ Tecnologias Utilizadas

- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
- **Consumo de API REST**
- **Intl.NumberFormat**
- **Git & GitHub**
- **GitHub Pages**

> 📘 **C#**: Linguagem em estudo paralelo para evolução back-end e lógica estruturada.

---

## 🧪 Exemplo de Código (Conversão Universal)

```javascript
// Converte qualquer moeda para qualquer moeda
const valueInBRL = inputValue * getRate(valueFrom)
const finalValue = valueInBRL / getRate(valueTo)







