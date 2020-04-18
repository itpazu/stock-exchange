class Compare {
  static count = 0;
  static arrayId = [];
  constructor(companySymbol, btn) {
    this.btnEvent = btn;
    this.companySymbol = companySymbol;
    this.limitSameCompany = true;
    this.compareCompaniesBtn = document.querySelector('#a-comp-comp');

    this.btnEvent.addEventListener('click', () => {
      if (Compare.count < 3 && this.limitSameCompany === true) {
        this.presentCompareBtn(this.companySymbol);
        Compare.count += 1;
        this.limitSameCompany = false;
        console.log(Compare.count);
        Compare.arrayId.push(companySymbol);
        this.updateNumberCompanyForConparison.innerHTML = ` ${Compare.count} companies`;
        this.compareCompaniesBtn.href = `comparison.html?symbols=${Compare.arrayId[0]}%2C ${Compare.arrayId[1]}%2C ${Compare.arrayId[2]}`;
        console.log(this.compareCompaniesBtn.href);
        this.compareCompaniesBtn.target = 'blank';
        console.log(Compare.arrayId);
        console.log(this.compareCompaniesBtn);
      } else {
        if (Compare.count === 3) {
          alert(
            'Maximum companies for comparison exceeded, only 3 are allowed each time'
          );
        } else {
          alert('same company chosen twice');
        }
      }
    });
    this.btnContainer = document.querySelector('#compare-box');
    this.btnCompareTop;
    this.buttonX;
    this.updateNumberCompanyForConparison = document.querySelector(
      '#span-comp-num'
    );
  }

  presentCompareBtn(symbol) {
    this.btnCompareTop = this.ElementCreator('button');
    this.btnCompareTop.classList = `btn btn-info ml-4 bt-compare d-flex ${symbol} justify-content-between btn-compare-top`;
    this.btnCompareTop.innerHTML = `${symbol}`;
    this.buttonX = this.ElementCreator('button');
    this.buttonX.id = `${symbol}`;
    this.buttonX.classList = 'close btn-x';
    this.buttonX.type = 'button';
    this.buttonX.setAttribute('aria-lable', 'Close');
    this.spanBtn = this.ElementCreator('span');
    this.spanBtn.setAttribute = ('aria-hidden', 'true');
    this.spanBtn.innerHTML = '&times;';

    this.appendChildren(this.btnContainer, this.btnCompareTop);
    this.appendChildren(this.btnCompareTop, this.buttonX);
    this.appendChildren(this.buttonX, this.spanBtn);
    this.buttonXEvent = document.getElementById(symbol);
    this.buttonXEvent.addEventListener('click', () => {
      Compare.count -= 1;
      let indexToRemove = Compare.arrayId.indexOf(symbol);
      Compare.arrayId.splice(indexToRemove, 1);
      console.log(Compare.arrayId);
      console.log(Compare.count);
      this.compareCompaniesBtn.href = `comparison.html?symbols=${Compare.arrayId[0]}%2C ${Compare.arrayId[1]}%2C ${Compare.arrayId[2]}`;
      this.updateNumberCompanyForConparison.innerHTML = ` ${Compare.count} companies`;
      let btnRemove = document.querySelector(`.${symbol}`);
      this.btnContainer.removeChild(btnRemove);
      this.limitSameCompany = true;
    });
  }

  ElementCreator(element) {
    return document.createElement(element);
  }

  appendChildren(parent, child) {
    parent.appendChild(child);
  }
}
