// class Marquee {
// constructor(marquee) {
//   this.marquee = marquee
//   this.valuesMarquee = []
//   this.startTheMarquee()
// }

// elementCreator(element) {
//   return document.createElement(element);
// }

// appendChildren(parent, child) {
//   parent.appendChild(child);
// }

// async fetchMarqueeInput() {
//   let urlMarquee = 'https://financialmodelingprep.com/api/v3/stock/real-time-price'
//   let stockPriceData = await callServerForResults(urlMarquee) 
//   let stockPriceDataSliced = stockPriceData.stockList.slice(0, 50)
//   console.log(stockPriceDataSliced)
//   this.valuesMarquee = stockPriceDataSliced
//   this.presentMarqueeData(stockPriceDataSliced)
// }

// presentMarqueeData() {
//   console.log(this.valuesMarquee)
//   this.valuesMarquee.forEach(element => {
//   let divElementMarquee = this.elementCreator('li')
//   divElementMarquee.classList= 'li-marquee-item';
//   divElementMarquee.innerHTML =`${element.symbol} <span style="color: green">${element.price}</span>` 
//   this.appendChildren(this.marquee, divElementMarquee)
//   })
// }

// async startTheMarquee(){
//   await this.fetchMarqueeInput()
// }

// }
