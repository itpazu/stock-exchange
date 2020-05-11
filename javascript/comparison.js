(function () {
  let domElement = document.querySelector('.dom-parent');

  multipleCompaniesUrl = new URLSearchParams(location.search);
  let symbols = multipleCompaniesUrl.get('symbols');
  console.log(symbols);
  let arrayOfSymbols = symbols.split(',');
  let newArray = arrayOfSymbols.filter(filterArray);

  function filterArray(symbol) {
    if (symbol.includes('undefined')) {
      return false;
    }
    return true;
  }
  newArray.forEach((element) => {
    let parentElement = document.createElement('div');
    if (newArray.length > 2) {
      parentElement.classList = 'col-4 h-100';
    } else {
      parentElement.classList = 'col-6 h-100';
    }
    parentElement.id = `${element}`;
    domElement.appendChild(parentElement);
    new Company(element, parentElement);
  });
})();
