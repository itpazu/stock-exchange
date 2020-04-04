class Company {
  constructor(companySymbol) {
    this.urlCompanyNew = `https://financialmodelingprep.com/api/v3/company/profile/${companySymbol}`;
    this.spinnerTwo = document.querySelector('#spinner-two');
    //  this.canvasChart = document.querySelector('#chart');
    this.urlChart = `https://financialmodelingprep.com/api/v3/historical-price-full/${companySymbol}?serietype=line`;
    this.backgroundImage = document.querySelector('.bkg-image');
    this.hideElement(this.backgroundImage);
    this.divCompanyDescription = document.querySelector('.company-description');
    this.divCompanySector = document.querySelector('.company-sector');
    this.divcompanyName = document.querySelector('.company-name');
    this.divCompanyImage = document.querySelector('.container-company-image');
    this.divCompanyLink = document.querySelector('.company-link');
    this.divStockPrice = document.querySelector('.company-stock');
  }
  launcCompany() {
    this.fetchCompanyProfile(this.urlCompanyNew).then(data => {
      this.companyProfile(data);
      this.showElement(this.backgroundImage);
    });

    this.fetchDataChart(this.urlChart).then(chartData => {
      this.filterArrayChart(chartData);
    });
  }
  async fetchCompanyProfile(url) {
    const fetchUrl = await fetch(url);
    const jsonUrlForFetch = await fetchUrl.json();
    return jsonUrlForFetch;
  }
  async fetchDataChart(url) {
    const fetchChart = await fetch(this.urlChart);
    const jsonUrlForFetchChart = await fetchChart.json();
    return jsonUrlForFetchChart;
  }
  filterArrayChart(chartData) {
    let array = chartData.historical;
    let startDate = new Date('2015-01-06').getTime();

    let result = array.filter(i => {
      let time = new Date(i.date).getTime();
      return time > startDate;
    });
    let renderLables = [];
    let renderDataSet = [];
    for (let i = 0; i < result.length; i++) {
      renderLables.push(result[i].date);
      renderDataSet.push(result[i].close);
    }
    this.displayTable(renderLables, renderDataSet);
  }
  displayTable(labels, datasets) {
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

    this.hideElement(this.spinnerTwo);
  }
  companyProfile(data) {
    let imgCompanyImage = this.ElementCreator('img');
    imgCompanyImage.classList = 'image-company';
    imgCompanyImage.src = data.profile.image;
    this.appendChildren(this.divCompanyImage, imgCompanyImage);

    let companyName = this.createText(data.profile.companyName);
    this.appendChildren(this.divcompanyName, companyName);
    let companySector = this.createText(`(${data.profile.sector})`);
    this.appendChildren(this.divCompanySector, companySector);

    let divCompanyStockPrice = this.ElementCreator('div');
    divCompanyStockPrice.classList = 'stock-price';
    let companyStockPrice = this.createText(
      `stock price: $${data.profile.price}`
    );
    this.appendChildren(this.divStockPrice, divCompanyStockPrice);
    this.appendChildren(divCompanyStockPrice, companyStockPrice);

    let divCompanyStockChange = this.ElementCreator('div');
    divCompanyStockChange.classList = 'stock-change';
    let companyStockChange = this.createText(data.profile.changesPercentage);

    if (data.profile.changesPercentage.includes('-', 1)) {
      divCompanyStockChange.style.color = 'red';
    } else if (data.profile.changesPercentage.includes('+', 1)) {
      divCompanyStockChange.style.color = 'green';
    } else {
      divCompanyStockChange.style.color = 'grey';
    }

    this.appendChildren(this.divStockPrice, divCompanyStockChange);
    this.appendChildren(divCompanyStockChange, companyStockChange);

    let companyDescription = this.createText(data.profile.description);
    this.appendChildren(this.divCompanyDescription, companyDescription);
    let companyLinkATag = this.ElementCreator('a');
    companyLinkATag.classList = 'a-tag-link-company';
    companyLinkATag.href = data.profile.website;
    companyLinkATag.target = 'blank';
    this.appendChildren(this.divCompanyLink, companyLinkATag);
    let companyWebsiteATag = document.querySelector('.a-tag-link-company');
    let HomePage = this.createText('visit home-page >>');
    this.appendChildren(companyWebsiteATag, HomePage);
  }
  hideElement(element) {
    element.classList.add('d-none');
  }
  ElementCreator(element) {
    return document.createElement(element);
  }

  createText(text) {
    return document.createTextNode(text);
  }

  appendChildren(parent, child) {
    parent.appendChild(child);
  }

  showElement(element) {
    element.classList.remove('d-none');
  }
}
