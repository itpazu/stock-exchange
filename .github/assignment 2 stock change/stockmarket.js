const body = document.getElementsByTagName('body');
const container = document.createElement('div');
body[0].prepend(container);

// add input and button

const userSearch = document.querySelector('#userSearch');

const searchBtn = document.querySelector('.search-btn');

// eventlistenr on click

// callback should be the function to use the the input un the url and fetch the results
// function callServerForResults(recordedSearch) {
//   console.log(recordedSearch);
//   let url = `https://financialmodelingprep.com/api/v3/search?query=${recordedSearch}&limit=10&exchange=NASDAQ`;
//   console.log(url);
//   fetch(url)
//     .then(response => {
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//     })
//     .catch(err => {
//       err.text();
//       console.log(err);
//     });
// }

async function callServerForResults(recordedSearch) {
  const url = `https://financialmodelingprep.com/api/v3/search?query=${recordedSearch}&limit=10&exchange=NASDAQ`;
  const serverResult = await fetch(url);
  console.log(url);
  const dataJson = await serverResult.json();
  return dataJson;
}
// callServerForResults()
//   .then(data => {
//     console.log(data);
//   })
//   .catch(err => {
//     console.log(err);
//   });

searchBtn.addEventListener('click', () => {
  const recordedSearch = userSearch.value;
  console.log(recordedSearch);
  callServerForResults(recordedSearch)
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
});
