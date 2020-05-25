(function () {
  const searchBtn = document.querySelector('.search-btn');
  const marquee = document.querySelector('.marquee');
  const inputBox = document.querySelector('#userSearch');
  const listSearch = document.querySelector('#list-search');

  window.addEventListener('load', new Marquee(marquee));
  let debounceTimeout;
  inputBox.addEventListener('keyup', () => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    debounceTimeout = setTimeout(() => clickFunc(), 600);
  });
  // console.log(searchBtn)
  searchBtn.addEventListener('click', clickFunc);
  async function clickFunc() {
    const searchObj = new Search(inputBox); //stage 1- instantiates search
    const resultsfetchOne = await searchObj.dataFetch(searchObj.urlFirstFetch); //calls first fetch
    console.log(resultsfetchOne);
    const resultsFetchTwo = searchObj.secondFetch(resultsfetchOne); //calss second fetch with results from first
    console.log(resultsFetchTwo);
    const resolveditems = await Promise.all(resultsFetchTwo); //resolves both fetches
    console.log(resolveditems);
    const searchResults = new Results(resolveditems, listSearch, searchObj); //instantiates results
  }
})();
