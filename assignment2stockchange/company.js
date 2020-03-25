const urlCompany = new URLSearchParams(window.location.search);
const companySymbol = urlCompany.get('symbol');
const urlCompanyNew = `https://financialmodelingprep.com/api/v3/company/profile/${companySymbol}`;
const spinnerTwo = document.querySelector('#spinner-two');
const canvasChart = document.querySelector('#chart');
const urlChart = `https://financialmodelingprep.com/api/v3/historical-price-full/${companySymbol}?serietype=line`;
const backgroundImage = document.querySelector('.bkg-image');

hideElement(backgroundImage);

async function fetchCompanyProfile(url) {
  const fetchUrl = await fetch(url);
  const jsonUrlForFetch = await fetchUrl.json();
  return jsonUrlForFetch;
}
async function fetchDataChart(url) {
  const fetchChart = await fetch(urlChart);
  const jsonUrlForFetchChart = await fetchChart.json();
  return jsonUrlForFetchChart;
}

window.addEventListener('load', mainEventListenr);

function mainEventListenr() {
  fetchCompanyProfile(urlCompanyNew).then(data => {
    companyProfile(data);
    showElement(backgroundImage);
  });

  fetchDataChart(urlChart).then(chartData => {
    filterArrayChart(chartData);
  });
}

function filterArrayChart(chartData) {
  let array = chartData.historical;

  let startDate = new Date('2015-01-06').getTime();

  result = array.filter(i => {
    time = new Date(i.date).getTime();
    return time > startDate;
  });
  renderLables = [];
  renderDataSet = [];
  for (let i = 0; i < result.length; i++) {
    renderLables.push(result[i].date);
    renderDataSet.push(result[i].close);
  }
  displayTable(renderLables, renderDataSet);
}

function displayTable(labels, datasets) {
  let ctx = document.getElementById('chart');
  let myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: '#stock price',
          data: datasets,
          backgroundColor: [
            'rgba(211, 180, 242)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(66, 62, 70)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1,
          borderCapStyle: 'round'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            display: true,
            position: 'right',

            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });

  hideElement(spinnerTwo);
}

const divCompanyDescription = document.querySelector('.company-description');
const divCompanySector = document.querySelector('.company-sector');
const divcompanyName = document.querySelector('.company-name');
const divCompanyImage = document.querySelector('.container-company-image');
const divCompanyLink = document.querySelector('.company-link');
const divStockPrice = document.querySelector('.company-stock');

function companyProfile(data) {
  let imgCompanyImage = ElementCreator('img');
  attributeSetter(imgCompanyImage, 'class', 'image-company');
  imgCompanyImage.src = data.profile.image;
  appendChildren(divCompanyImage, imgCompanyImage);

  let companyName = createText(data.profile.companyName);
  appendChildren(divcompanyName, companyName);
  let companySector = createText(`(${data.profile.sector})`);
  appendChildren(divCompanySector, companySector);

  let divCompanyStockPrice = ElementCreator('div');
  attributeSetter(divCompanyStockPrice, 'class', 'stock-price');
  let companyStockPrice = createText(`stock price: $${data.profile.price}`);
  appendChildren(divStockPrice, divCompanyStockPrice);
  appendChildren(divCompanyStockPrice, companyStockPrice);

  let divCompanyStockChange = ElementCreator('div');
  divCompanyStockChange.class = 'stock-change';
  let companyStockChange = createText(data.profile.changesPercentage);

  if (data.profile.changesPercentage.includes('-', 1)) {
    divCompanyStockChange.style.color = 'red';
  } else if (data.profile.changesPercentage.includes('+', 1)) {
    divCompanyStockChange.style.color = 'green';
  } else {
    divCompanyStockChange.style.color = 'grey';
  }

  appendChildren(divStockPrice, divCompanyStockChange);
  appendChildren(divCompanyStockChange, companyStockChange);

  let companyDescription = createText(data.profile.description);
  appendChildren(divCompanyDescription, companyDescription);
  let divCompanyLink = document.querySelector('.company-link');
  let companyLinkATag = ElementCreator('a');
  attributeSetter(companyLinkATag, 'class', 'a-tag-link-company');
  companyLinkATag.href = data.profile.website;
  companyLinkATag.target = 'blank';
  appendChildren(divCompanyLink, companyLinkATag);
  let companyWebsiteATag = document.querySelector('.a-tag-link-company');
  let HomePage = createText('visit home-page >>');
  appendChildren(companyWebsiteATag, HomePage);
}
