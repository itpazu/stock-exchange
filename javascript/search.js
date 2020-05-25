class Search {
  constructor(inputElement) {
    this.userSearch = inputElement;
    this.recordedSearch = this.userSearch.value;
    this.loadingSpinner = document.querySelector('#spinner');
    this.listSearch = document.querySelector('#list-search');
    this.urlFirstFetch = `https://financialmodelingprep.com/api/v3/search?query=${this.recordedSearch}&limit=10&exchange=NASDAQ&apikey=86a851a5c0c9c89fc725cb957e620229`;
    this.showElement(this.loadingSpinner);
    this.clearElement(this.listSearch);
  }

  dataFetch(url) {
    return this.callServerForResults(url);
  }
  secondFetch(dataFirstFetch) {
    let loopForData = dataFirstFetch.map((company) => {
      this.urlSecondFetch = `https://financialmodelingprep.com/api/v3/company/profile/${company.symbol}?apikey=86a851a5c0c9c89fc725cb957e620229`;
      return this.callServerForResults(this.urlSecondFetch);
    });
    console.log(loopForData);
    return loopForData;
  }
  async callServerForResults(url) {
    const serverResult = await fetch(url);
    const dataJson = await serverResult.json();
    return dataJson;
  }
  showElement(element) {
    element.classList.remove('d-none');
  }
  clearElement(element) {
    element.innerHTML = '';
  }
}
