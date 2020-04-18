(function () {
  const urlCompany = new URLSearchParams(location.search);
  console.log(urlCompany);
  const companySymbol = urlCompany.get('symbol');
  let parentEl = document.querySelector('.parent-element');
  const companyObj = new Company(companySymbol, parentEl);
})();
