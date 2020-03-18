const body = document.getElementsByTagName('body');
const container = document.createElement('div');
body[0].prepend(container);

// add input and button

const userSearch = document.querySelector('#userSearch');

const searchBtn = document.querySelector('.search-btn');

const listSearch = document.querySelector('#list-search');

const loadingSpinner = document.querySelector('#spinner');

async function callServerForResults(recordedSearch) {
  const url = `https://financialmodelingprep.com/api/v3/search?query=${recordedSearch}&limit=10&exchange=NASDAQ`;
  const serverResult = await fetch(url);
  const dataJson = await serverResult.json();
  return dataJson;
}

// event listener - when clicking btn

searchBtn.addEventListener('click', () => {
  // shows spinner
  loadingSpinner.classList.remove('d-none');
  // clean previous list (if any)
  listSearch.innerHTML = '';
  // stores user's search input
  const recordedSearch = userSearch.value;
  // calls function which fetches info and JSON it
  callServerForResults(recordedSearch)
    .then(data => {
      // then when async function reolves, calls a function which manipulates the data
      presentDataToUser(data);
      // and makes spinner disappear
      loadingSpinner.classList.add('d-none');
    })
    .catch(err => {
      console.log(err);
    });
});

// iterationg over the array for fetching name and symbol
function presentDataToUser(data) {
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
    aItem.setAttribute('href', `/company.html?symbol=${currentItem.symbol}`);
    listItem.appendChild(aItem);

    // printing company name and symbol
    let textItems = document.createTextNode(
      `${currentItem.name} (${currentItem.symbol})`
    );
    aItem.appendChild(textItems);
  }
}
