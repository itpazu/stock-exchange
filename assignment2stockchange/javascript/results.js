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

      let divArrayItem = this.ElementCreator('div');
      divArrayItem.classList = 'company-info-wrapper';
      this.appendChildren(aItem, divArrayItem);

      let divCompanyName = this.ElementCreator('div');
      divCompanyName.classList = 'div-company';
      this.appendChildren(divArrayItem, divCompanyName);

      let companyName = `${company.profile.companyName}`;
      let searchedElement = searchObj.recordedSearch;
      companyName = companyName.replace(new RegExp(searchedElement, 'gi'), match => {
       return `<span class ="span-match">${match}</span>`;    
      });
      divCompanyName.innerHTML = companyName;


      let divCompanySymbolAndStockChange = this.ElementCreator('div');
      divCompanySymbolAndStockChange.classList = 'div-comapny-symbol-stock';
      this.appendChildren(listItem, divCompanySymbolAndStockChange);

      let divcompanySymbol = this.ElementCreator('div');
      divcompanySymbol.classList = 'div-symbol';
      this.appendChildren(divCompanySymbolAndStockChange, divcompanySymbol);

      let companySymbol = `${company.symbol}`;
      companySymbol = companySymbol.replace(new RegExp(searchedElement, 'gi'), match => {
       return `<span class ="span-match">${match}</span>`;   
      });
      divcompanySymbol.innerHTML = `(${companySymbol})`
      
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

      if (searchObj.recordedSearch == '') {
        listSearch.innerHTML = '';
      }
    });
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
