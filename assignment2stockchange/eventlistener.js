searchBtn.addEventListener('click', launchSearch); /**1 click */

async function launchSearch() {
  /**2 a) show spinner, b) remove content */
  showElement(loadingSpinner);
  clearElement(listSearch);

  let fetchedData = await createUrlForFirstFetch(); //  2 c) call first fetch function  > line 27 //
  // 5) now the json from first fetch is stored here
  fetchedData.map(async company => {
    // 6) looping over the jsoned data from the first fetch
    const urlForSecondFetch = `https://financialmodelingprep.com/api/v3/company/profile/${company.symbol}`; //6) a)create url for second fetch
    let newData = [];
    let fetchDataFromSecondFetch = await callServerForResults(
      urlForSecondFetch
    ); //6) b) calling function for second fetch main.js line 15
    // 6) e) returns here the jasoned object from second fetch
    //6 e) store the profile object from jsoned object in the company object
    company.secondFetch = fetchDataFromSecondFetch.profile;
    newData.push(company);
    //  console.log(newData)
    // const companySymbol = company.symbol
    presentDataToUser(newData);
    // console.log(newData)

    // console.log(newData)
  });

  // presentDataToUser(fetchedData);
  hideElement(loadingSpinner);
}

async function createUrlForFirstFetch() {
  /** 3 */
  const recordedSearch =
    userSearch.value; /**  3 a) checks userinput line 20    */
  const urlForFirstFetch = `https://financialmodelingprep.com/api/v3/search?query=${recordedSearch}&limit=10&exchange=NASDAQ`; /**b) creates template URL line 21 */
  return await callServerForResults(
    urlForFirstFetch
  ); /*  3 c) calls function for fetch and returns the results > line 15 in main.js*/
} /**5) return this results >>>> when this function resolves it returns the jsondata from the first fetch and goes back to the launch search function which called it line 7*/

function clearElement(element) {
  element.innerHTML = '';
}
