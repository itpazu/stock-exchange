(function() {
  const searchBtn = document.querySelector('.search-btn');
  const marquee = document.querySelector('.marquee');

  window.addEventListener('load', new Marquee(marquee));
  searchBtn.addEventListener('click', clickFunc);
  async function clickFunc() {
    searchObj = new Search(document.querySelector('#userSearch'));
    resultsfetchOne = await searchObj.dataFetch(searchObj.urlFirstFetch);
    // console.log(resultsfetchOne)
    resultsFetchTwo = await searchObj.secondFetch(resultsfetchOne);
    resolveditems = await Promise.all(resultsFetchTwo);
    searchResults = new Results(
      resolveditems,
      document.querySelector('#list-search')
    );
  }
})();
