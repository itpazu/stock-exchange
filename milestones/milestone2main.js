const body = document.getElementsByTagName('body');
const container = document.createElement('div');
body[0].prepend(container);

// add input and button

const userSearch = document.querySelector('#userSearch');

const searchBtn = document.querySelector('.search-btn');

const listSearch = document.querySelector('#list-search');

const loadingSpinner = document.querySelector('#spinner');

async function callServerForResults(urlsForAnyFetch) { /** 4 executes first fetch: fetches companies for search results uses url passed */
                                                        // 6) b) executes second fetch: fetches company info extended
  const serverResultAnyFetch = await fetch(urlsForAnyFetch); /* 4) a) fetches search and stores in serverResult*/
                                                            // 6) c) fetches search and stores in serverresult
  console.log(serverResultAnyFetch);

  const dataJsonForAnyFetch = await dataJsonForAnyFetch.json(); /**4) b) Json the results and stores them in variable */
  console.log(dataJsonForAnyFetch);
  return dataJsonForAnyFetch; /* 4) c) returns the data jasoned. > now results are ready retruns them in createUrlForFirstFetch function in eventlistiner.js line 19*/
}                             // 6) d) returns the data jasoned. > now results are ready, return them in createfor
// event listener - when clicking btn

// searchBtn.addEventListener('click', () => {
//   // shows spinner
//   loadingSpinner.classList.remove('d-none');
//   // clean previous list (if any)
//   listSearch.innerHTML = '';
//   // stores user's search input
//   const recordedSearch = userSearch.value;
//   // calls function which fetches info and JSON it
//   callServerForResults(recordedSearch)
//     .then(data => {
//       // then when async function reolves, calls a function which manipulates the data
//       presentDataToUser(data);
//       // and makes spinner disappear
//       loadingSpinner.classList.add('d-none');
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// iterationg over the array for fetching name and symbol
function presentDataToUser(data) {
  console.log(data)
  for (let currentItem of data) {
    // adding <li>
    let listItem = document.createElement('li');
    listItem.id = 'list-item';
    listItem.setAttribute(
      'class',
      'list-group-item'
    ); /*bootstrap class to li elements*/
    listSearch.appendChild(listItem);
    // adding <a>
    let aItem = document.createElement('a');
    aItem.id = 'link-item';
    aItem.setAttribute('class', 'link-item');
    aItem.setAttribute('href', `company.html?symbol=${currentItem.symbol}`);
    // aItem.setAttribute('href','company.html')
    aItem.setAttribute('target', 'blank');

    listItem.appendChild(aItem);

    // printing company name and symbol
    let textItems = document.createTextNode(
      `${currentItem.name} (${currentItem.symbol})`
    );
    aItem.appendChild(textItems);
  }
}
