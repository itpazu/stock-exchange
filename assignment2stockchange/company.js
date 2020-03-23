const urlCompany = new URLSearchParams(window.location.search);
const companySymbol = urlCompany.get('symbol');
const urlCompanyNew = `https://financialmodelingprep.com/api/v3/company/profile/${companySymbol}`;
const spinnerTwo = document.querySelector('#spinner-two');
const canvasChart = document.querySelector('#chart');
const urlChart = `https://financialmodelingprep.com/api/v3/historical-price-full/${companySymbol}?serietype=line`;

// function fetchCompanyProfile(url) {
//   fetch(url)
//     .then(data => data.json())
//     .then(data => console.log(data));

// }

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

window.addEventListener('load', () => {
  fetchCompanyProfile(urlCompanyNew).then(data => {
    console.log(data);
    companyProfile(data);
  });

  fetchDataChart(urlChart).then(chartData => {
    filterArrayChart(chartData);
  });
});

function filterArrayChart(chartData) {
  let array = chartData.historical;
  console.log(array);

  let startDate = new Date('2015-01-06').getTime();
  console.log(startDate);
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
  displayTable(renderLables, renderDataSet )
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

spinnerTwo.classList.add('d-none');
console.log(spinnerTwo)
}
//   console.log(myChart.data.labels);
//   console.log(myChart.data.datasets[0].data);

const divCompanyDescription = document.querySelector('.company-description');
const divCompanySector = document.querySelector('.company-sector');
const divCompanyName = document.querySelector('.company-name');
const divCompanyImage = document.querySelector('.container-company-image');
const divCompanyLink = document.querySelector('.company-link');
const divStockPrice = document.querySelector('.company-stock');

function companyProfile(data) {
  let imgCompanyImage = document.createElement('img');
  imgCompanyImage.setAttribute('class', 'image-company');
  imgCompanyImage.setAttribute('src', data.profile.image);
  imgCompanyImage.setAttribute('class', 'company-icon');

  divCompanyImage.appendChild(imgCompanyImage);
  let CompanyName = document.createTextNode(data.profile.companyName);
  divCompanyName.appendChild(CompanyName);
  let companySector = document.createTextNode(`(${data.profile.sector})`);
  divCompanySector.appendChild(companySector);

  let divCompanyStockPrice = document.createElement('div');
  divCompanyStockPrice.setAttribute('class', 'stock-price');
  let companyStockPrice = document.createTextNode(
    `stock price: $${data.profile.price}`
  );
  divStockPrice
    .appendChild(divCompanyStockPrice)
    .appendChild(companyStockPrice);

  let divCompanyStockChange = document.createElement('div');
  divCompanyStockChange.setAttribute('class', 'stock-change');
  let companyStockChange = document.createTextNode(
    data.profile.changesPercentage
  );

  if (data.profile.changesPercentage.includes('-', 1)) {
    divCompanyStockChange.style.color = 'red';
  } else if (!data.profile.changesPercentage.includes('-', 1)) {
    divCompanyStockChange.style.color = 'green';
  } else {
    divCompanyStockChange.style.color = 'grey';
  }

  divStockPrice
    .appendChild(divCompanyStockChange)
    .appendChild(companyStockChange);

  let companyDescription = document.createTextNode(data.profile.description);
  divCompanyDescription.appendChild(companyDescription);
  let divCompanyLink = document.querySelector('.company-link');
  let companyLinkATag = document.createElement('a');
  companyLinkATag.setAttribute('class', 'a-tag-link-company');
  companyLinkATag.setAttribute('href', data.profile.website);
  companyLinkATag.setAttribute('target', 'blank');
  divCompanyLink.appendChild(companyLinkATag);
  let companyWebsiteATag = document.querySelector('.a-tag-link-company');
  let HomePage = document.createTextNode('visit home-page >>');
  companyWebsiteATag.appendChild(HomePage);
}

// console.log(result)
