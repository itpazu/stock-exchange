class Company {
  constructor(companySymbol, parentEl) {
    this.parentEl = parentEl;
    this.spinnerTwo = document.querySelector('.spinner-two');

    this.urlCompanyNew = `https://financialmodelingprep.com/api/v3/company/profile/${companySymbol}`;
    this.urlChart = `https://financialmodelingprep.com/api/v3/historical-price-full/${companySymbol}?serietype=line`;

    this.backgroundImage = this.ElementCreator('div');
    this.backgroundImage.classList = 'bkg-image';

    this.hideElement(this.backgroundImage);

    this.divFlexCompany = this.ElementCreator('div');
    this.divFlexCompany.classList = 'deflex';

    this.divCompanyImage = this.ElementCreator('div');
    this.divCompanyImage.classList = 'company-image';

    this.divcompanyName = this.ElementCreator('div');
    this.divcompanyName.classList = 'company-name';

    this.divCompanySector = this.ElementCreator('div');
    this.divCompanySector.classList = 'company-sector';

    this.divStockPrice = this.ElementCreator('div');
    this.divStockPrice.classList = 'company-stock';

    this.divContDescription = this.ElementCreator('div');
    this.divContDescription.classList = 'div-cont-description';

    this.divCompanyDescription = this.ElementCreator('div');
    this.divCompanyDescription.classList = 'company-description mb-4';

    this.divCompanyLink = this.ElementCreator('div');
    this.divCompanyLink.classList = 'company-link';

    this.containerCanvas = this.ElementCreator('div');
    this.containerCanvas.classList = 'container canvas-cont';

    this.canvasChart = this.ElementCreator('canvas');
    this.canvasChart.classList = 'chart col-12';
    this.canvasChart.id = `canvas-${companySymbol}`;
    this.canvasChart.setAttribute('width', '400');
    this.canvasChart.setAttribute('height', '400');

    this.appendChildren(this.parentEl, this.backgroundImage);
    this.appendChildren(this.backgroundImage, this.divFlexCompany);
    this.appendChildren(this.divFlexCompany, this.divCompanyImage);
    this.appendChildren(this.divFlexCompany, this.divcompanyName);
    this.appendChildren(this.divFlexCompany, this.divCompanySector);

    this.appendChildren(this.backgroundImage, this.divStockPrice);

    this.appendChildren(this.backgroundImage, this.divContDescription);
    this.appendChildren(this.divContDescription, this.divCompanyDescription);
    this.appendChildren(this.divContDescription, this.divCompanyLink);

    this.appendChildren(this.backgroundImage, this.containerCanvas);
    this.appendChildren(this.containerCanvas, this.canvasChart);
    this.launcCompany(companySymbol);
  }
  launcCompany(companySymbol) {
    this.fetchCompanyProfile(this.urlCompanyNew).then((data) => {
      this.companyProfile(data, companySymbol);

      this.showElement(this.backgroundImage);
    });

    this.fetchDataChart(this.urlChart).then((chartData) => {
      this.filterArrayChart(chartData, companySymbol);
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
  filterArrayChart(chartData, companySymbol) {
    let array = chartData.historical;
    let startDate = new Date('2015-01-06').getTime();

    let result = array.filter((i) => {
      let time = new Date(i.date).getTime();
      return time > startDate;
    });
    let renderLables = [];
    let renderDataSet = [];
    for (let i = 0; i < result.length; i++) {
      renderLables.push(result[i].date);
      renderDataSet.push(result[i].close);
    }
    this.displayTable(renderLables, renderDataSet, companySymbol);
  }
  displayTable(labels, datasets, companySymbol) {
    let ctx = document.getElementById(`canvas-${companySymbol}`);
    new Chart(ctx, {
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
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(66, 62, 70)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
            borderCapStyle: 'round',
          },
        ],
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
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });

    this.spinnerTwo.innerHTML =
      '<div class="d-flex justify-content-center mt-5 spinner-two">';
  }
  companyProfile(data, companySymbol) {
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
    companyLinkATag.classList = `a-tag-link-${companySymbol}`;
    companyLinkATag.href = data.profile.website;
    companyLinkATag.target = 'blank';
    this.appendChildren(this.divCompanyLink, companyLinkATag);
    let homePage = this.createText('visit home-page >>');
    this.appendChildren(companyLinkATag, homePage);
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
