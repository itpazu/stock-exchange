// const body = document.getElementsByTagName('body');
// const container = document.createElement('div');
// body[0].prepend(container);


// const searchBtn = document.querySelector('.search-btn');

// const loadingSpinner = document.querySelector('#spinner');
// const marquee = document.querySelector('.marquee');

// function showElement(element) {
//   element.classList.remove('d-none');
// }
// function hideElement(element) {
//   element.classList.add('d-none');
// }
// function clearElement(element) {
//   element.innerHTML = '';
// }


// async function callServerForResults(url) {
//   const serverResult = await fetch(url);
//   const dataJson = await serverResult.json();
//   return dataJson;
// // }


// function ElementCreator(element) {
//   return document.createElement(element);
// }


// function createText(text) {
//   return document.createTextNode(text);
// }

// function appendChildren(parent, child) {
//   parent.appendChild(child);
// }

// function changeColorForStockChange(companyStock, div) {
//   if (companyStock.includes('+', 1)) {
//     div.style.color = 'green';
//   } else if (companyStock.includes('-', 1)) {
//     div.style.color = 'red';
//   } else {
//     div.style.color = 'grey';
//   }
// }


// beginging version two for milestone 6

// eventlistener file

// (function () {
//   // window.addEventListener('load', new Marquee(marquee));
//   // searchBtn.addEventListener('click', clickFunc);

//   // async function clickFunc() {
//   //   showElement(loadingSpinner);
//   //   clearElement(listSearch);
//     searchObj = new Search(document.querySelector('#userSearch'))
//     // resultsfetchOne = await searchObj.dataFetch(searchObj.urlFirstFetch)
//     // // console.log(resultsfetchOne)
//     // resultsFetchTwo = await searchObj.secondFetch(resultsfetchOne)
//     // console.log(resultsFetchTwo)
//     // resolveditems = await Promise.all(resultsFetchTwo)
//     // console.log(resolveditems)
//     // searchResults= new Results(resolveditems, document.querySelector('#list-search'))
// // }
// })()
  
  //search file:
  // / class Search {
    //     constructor (inputElement) {
    // this.userSearch = inputElement;
    // this.recordedSearch = this.userSearch.value; 
    // // console.log(this.recordedSearch)
    // this.loadingSpinner = document.querySelector('#spinner');
    
    // this.urlFirstFetch= `https://financialmodelingprep.com/api/v3/search?query=${this.recordedSearch}&limit=10&exchange=NASDAQ`;
    // // console.log(this.urlFirstFetch)
    // this.searchBtn = document.querySelector('.search-btn');
    // this.listSearch = document.querySelector('#list-search');
    
    // this.eventListnerIntilization()
    
    
    // } 
    
    // eventListnerIntilization = () => {
    // this.searchBtn.addEventListener('click', this.clickFunc);
    // }
    
    // clickFunc = async () => {
    //     console.log('click')
    //     this.showElement(this.loadingSpinner);
    //     this.clearElement(this.listSearch);
    
    //     // resultsfetchOne = await searchObj.dataFetch(searchObj.urlFirstFetch)
    //     // // console.log(resultsfetchOne)
    //     // resultsFetchTwo = await searchObj.secondFetch(resultsfetchOne)
    //     // console.log(resultsFetchTwo)
    //     // resolveditems = await Promise.all(resultsFetchTwo)
    //     // console.log(resolveditems)
    //     // searchResults= new Results(resolveditems, document.querySelector('#list-search'))
    //   }
    
    // async callServerForResults(url) {
    //   const serverResult = await fetch(url);
    //   const dataJson = await serverResult.json();
    //   return dataJson;
    // }
    
    // async dataFetch(url) {
    //    return await callServerForResults(url) 
    // }
    // async secondFetch (dataFirstFetch) {
        
    //     let loopForData = dataFirstFetch.map(company => {
    //     this.urlSecondFetch = `https://financialmodelingprep.com/api/v3/company/profile/${company.symbol}`
    //     return this.dataFetch(this.urlSecondFetch)})
    //     console.log(loopForData) 
    //     return loopForData
        
    // }
    //  showElement(element) {
    //     element.classList.remove('d-none');
    //   }
    
    // clearElement(element) {
    //     element.innerHTML = '';
    //   }
      
    // }
        
    