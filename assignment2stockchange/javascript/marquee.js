class Marquee {
  constructor(HTMLelement) {
    this.urlMarquee =
      'https://financialmodelingprep.com/api/v3/stock/real-time-price';
    this.divMarquee = HTMLelement;
    this.fetchMarqueeInput(this.urlMarquee);
  }
  async fetchMarqueeInput(url) {
    let stockPriceData = await this.callServerForResults(url);
    let stockPriceDataSliced = stockPriceData.stockList.slice(0, 50);
    this.prepareMarqueeData(stockPriceDataSliced);
  }

  async callServerForResults(url) {
    const serverResult = await fetch(url);
    const dataJson = await serverResult.json();
    return dataJson;
  }

  prepareMarqueeData(data) {
    data.forEach((element) => {
      let divElementMarquee = this.ElementCreator('li');
      divElementMarquee.classList = 'li-marquee-item';
      this.appendChildren(this.divMarquee, divElementMarquee);
      divElementMarquee.innerHTML = `${element.symbol}  <span style="color: green"> ${element.price}</span>`;
    });
  }
  ElementCreator(element) {
    return document.createElement(element);
  }

  appendChildren(parent, child) {
    parent.appendChild(child);
  }
}
