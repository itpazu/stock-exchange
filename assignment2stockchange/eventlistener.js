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