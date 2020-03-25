const body = document.getElementsByTagName('body');
const container = document.createElement('div');
body[0].prepend(container);

// add input and button

const userSearch = document.querySelector('#userSearch');

const searchBtn = document.querySelector('.search-btn');

const listSearch = document.querySelector('#list-search');

const loadingSpinner = document.querySelector('#spinner');

function showElement(element) {
  element.classList.remove('d-none');
}
function hideElement(element) {
  element.classList.add('d-none');
}

// this function was called by the eventlistner- aftermthe user typed his search clicked search
/*returns data jasoned goes back to the eventlistener were subsequent steps are defined*/

async function callServerForResults(url) {
  const serverResult = await fetch(url);
  const dataJson = await serverResult.json();
  return dataJson;
}

function presentDataToUser(arrayCompanyDetails) {
  let listItem = ElementCreator('li');
  attributeSetter(listItem, 'li', 'list-item');
  attributeSetter(listItem, 'class', 'list-group-item');

  appendChildren(listSearch, listItem);
  let divImg = ElementCreator('div');
  attributeSetter(divImg, 'class', 'div-img');

  appendChildren(listItem, divImg);
  let imgItem = ElementCreator('img');
  attributeSetter(imgItem, 'class', 'imgTag');
  attributeSetter(imgItem, 'src', arrayCompanyDetails[0].secondFetch.image);
  appendChildren(divImg, imgItem);

  // adding <a>
  let aItem = ElementCreator('a');
  aItem.id = 'link-item';
  aItem.classList = 'link-item';
  aItem.href = `company.html?symbol=${arrayCompanyDetails[0].symbol}`;

  aItem.target = 'blank';
  appendChildren(listItem, aItem);

  let divArrayItem = ElementCreator('div');
  attributeSetter(divArrayItem, 'class', 'company-info-wrapper');
  appendChildren(aItem, divArrayItem);

  let divCompanyName = ElementCreator('div');
  attributeSetter(divCompanyName, 'class', 'div-company');
  appendChildren(divArrayItem, divCompanyName);

  let companyName = createText(
    `${arrayCompanyDetails[0].secondFetch.companyName} `
  );
  appendChildren(divCompanyName, companyName);

  let divCompanySymbolAndStockChange = ElementCreator('div');
  attributeSetter(
    divCompanySymbolAndStockChange,
    'class',
    'div-comapny-symbol-stock'
  );
  appendChildren(listItem, divCompanySymbolAndStockChange);

  let divcompanySymbol = ElementCreator('div');
  attributeSetter(divcompanySymbol, 'class', 'div-symbol');
  appendChildren(divCompanySymbolAndStockChange, divcompanySymbol);
  let companySymbol = createText(`(${arrayCompanyDetails[0].symbol}) `);
  appendChildren(divcompanySymbol, companySymbol);

  let divcompanyStockChange = ElementCreator('div');
  attributeSetter(divcompanyStockChange, 'class', 'div-stock');
  appendChildren(divCompanySymbolAndStockChange, divcompanyStockChange);
  let companyStock = createText(
    `${arrayCompanyDetails[0].secondFetch.changesPercentage} `
  );
  appendChildren(divCompanySymbolAndStockChange, divcompanyStockChange);
  appendChildren(divcompanyStockChange, companyStock);
  changeColorForStockChange(
    arrayCompanyDetails[0].secondFetch.changesPercentage,
    divcompanyStockChange
  );
}

function ElementCreator(element) {
  return document.createElement(element);
}

function attributeSetter(any, attributeKey, attributeValue) {
  any.setAttribute(attributeKey, attributeValue);
}

function createText(text) {
  return document.createTextNode(text);
}

function appendChildren(parent, child) {
  parent.appendChild(child);
}

function changeColorForStockChange(companyStock, div) {
  if (companyStock.includes('+', 1)) {
    div.style.color = 'green';
  } else if (companyStock.includes('-', 1)) {
    div.style.color = 'red';
  } else {
    div.style.color = 'grey';
  }
}
