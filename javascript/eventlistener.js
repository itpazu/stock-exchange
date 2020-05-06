(function () {
  const searchBtn = document.querySelector('.search-btn');
  const marquee = document.querySelector('.marquee');
  const inputBox = document.querySelector('#userSearch');
  const listSearch = document.querySelector('#list-search');

  let debounceTimeout;
  window.addEventListener('load', new Marquee(marquee));
  inputBox.addEventListener('keyup', () => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    debounceTimeout = setTimeout(() => clickFunc(), 600);
  });
  // console.log(searchBtn)
  searchBtn.addEventListener('click', clickFunc);
  async function clickFunc() {
    searchObj = new Search(inputBox);
    resultsfetchOne = await searchObj.dataFetch(searchObj.urlFirstFetch);
    // console.log(resultsfetchOne)
    resultsFetchTwo = await searchObj.secondFetch(resultsfetchOne);
    resolveditems = await Promise.all(resultsFetchTwo);
    searchResults = new Results(resolveditems, listSearch, inputBox);
  }
})();
