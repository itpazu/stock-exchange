class Results {
  constructor(companies, listSearch, inputBox) {
    this.companies = companies;
    this.inputBox = inputBox;
    this.listSearch = listSearch;
    this.formItem = document.querySelector('#form');
    this.loadingSpinner = document.querySelector('#spinner');
    this.companies.forEach(company => {
      let listItem = this.ElementCreator('li');
      listItem.classList = 'list-group-item';

      this.appendChildren(this.listSearch, listItem);
      let divImg = this.ElementCreator('div');
      divImg.classList = 'div-img';

      this.appendChildren(listItem, divImg);
      let imgItem = this.ElementCreator('img');
      imgItem.classList = 'imgTag';
      imgItem.src = company.profile.image;
      imgItem.samesite = 'none';
      this.appendChildren(divImg, imgItem);

      let aItem = this.ElementCreator('a');
      aItem.id = 'link-item';
      aItem.classList = 'link-item';
      aItem.href = `company.html?symbol=${company.symbol}`;

      aItem.target = 'blank';
      this.appendChildren(listItem, aItem);

      let divCompanyName = this.ElementCreator('div');
      divCompanyName.classList = 'div-company';
      this.appendChildren(aItem, divCompanyName);

      let companyName = `${company.profile.companyName}`;
      let searchedElement = searchObj.recordedSearch;
      companyName = companyName.replace(
        new RegExp(searchedElement, 'gi'),
        match => {
          return `<span class ="span-match">${match}</span>`;
        }
      );
      divCompanyName.innerHTML = companyName;

      let divCompanySymbolAndStockChange = this.ElementCreator('div');
      divCompanySymbolAndStockChange.classList = 'div-comapny-symbol-stock';
      this.appendChildren(listItem, divCompanySymbolAndStockChange);

      let divcompanySymbol = this.ElementCreator('div');
      divcompanySymbol.classList = 'div-symbol';
      this.appendChildren(divCompanySymbolAndStockChange, divcompanySymbol);

      let companySymbol = `${company.symbol}`;
      companySymbol = companySymbol.replace(
        new RegExp(searchedElement, 'gi'),
        match => {
          return `<span class ="span-match">${match}</span>`;
        }
      );
      divcompanySymbol.innerHTML = `(${companySymbol})`;

      let divcompanyStockChange = this.ElementCreator('div');
      divcompanyStockChange.classList = 'div-stock';
      this.appendChildren(
        divCompanySymbolAndStockChange,
        divcompanyStockChange
      );

      let companyStock = this.createText(
        `${company.profile.changesPercentage} `
      );

      this.appendChildren(
        divCompanySymbolAndStockChange,
        divcompanyStockChange
      );

      this.appendChildren(divcompanyStockChange, companyStock);
      this.changeColorForStockChange(
        company.profile.changesPercentage,
        divcompanyStockChange
      );

      this.hideElement(this.loadingSpinner);

      let btnCompare = this.ElementCreator('btn');
      btnCompare.classList =
        'btn btn-info ml-4 bt-compare d-flex justify-content-end btn-compare';
      btnCompare.id = `${company.symbol}`;
      btnCompare.innerHTML = 'compare';
      this.appendChildren(listItem, btnCompare);

      let butnEventListener = document.querySelectorAll('.btn-compare');
      butnEventListener.forEach(btn =>
        btn.addEventListener('click', this.lookIntoObject)
      );

      if (searchObj.recordedSearch == '') {
        listSearch.innerHTML = '';
      }
    });
  }

  lookIntoObject(e) {
    let url = `https://financialmodelingprep.com/api/v3/company/profile/${e.target.id}`;
    fetch(url)
      .then(data => data.json())
      .then(data => console.log(data.profile));
  }

  hideElement(element) {
    element.classList.add('d-none');
  }
  ElementCreator(element) {
    return document.createElement(element);
  }

  createText(text) {
    return document.createTextNode(text);
  }

  appendChildren(parent, child) {
    parent.appendChild(child);
  }

  changeColorForStockChange(companyStock, div) {
    if (companyStock.includes('+', 1)) {
      div.style.color = 'green';
    } else if (companyStock.includes('-', 1)) {
      div.style.color = 'red';
    } else {
      div.style.color = 'grey';
    }
  }
}
