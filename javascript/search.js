class Search {
  constructor(inputElement) {
    this.userSearch = inputElement;
    this.recordedSearch = this.userSearch.value;
    this.loadingSpinner = document.querySelector('#spinner');
    this.listSearch = document.querySelector('#list-search');
    // console.log(this.recordedSearch)
    this.urlFirstFetch = `https://financialmodelingprep.com/api/v3/search?query=${this.recordedSearch}&limit=10&exchange=NASDAQ`;
    // console.log(this.urlFirstFetch)
    this.showElement(this.loadingSpinner);
    this.clearElement(this.listSearch);
  }

  async dataFetch(url) {
    return await this.callServerForResults(url);
  }
  secondFetch(dataFirstFetch) {
    let loopForData = dataFirstFetch.map((company) => {
      this.urlSecondFetch = `https://financialmodelingprep.com/api/v3/company/profile/${company.symbol}`;
      return this.dataFetch(this.urlSecondFetch);
    });
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
