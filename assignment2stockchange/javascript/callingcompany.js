(function() {
  const urlCompany = new URLSearchParams(location.search);
  console.log(urlCompany);
  const companySymbol = urlCompany.get('symbol');
  console.log(companySymbol);
  const companyObj = new Company(companySymbol);
  companyObj.launcCompany();
})();
