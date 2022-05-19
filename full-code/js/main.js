import {
    plans
} from './services.js';

// DOM elemek kiválasztása.
const getPriceCardData = () => {
    const card = document.querySelector('.pricing-row > div.col-sm-6');
    const svg = card.querySelector('svg');

    const headerContents = svg.querySelectorAll('text');
    const priceValue = headerContents[0].textContent;
    const priceValue2 = headerContents[1].textContent;
    const period = headerContents[2].textContent;

    return {
        priceValue,
        priceValue2,
        period,
    };
};

// console.log( getPriceCardData() );

// DOM elemek létrehozása.
const createCard = (className) => {
    const pricingRow = document.querySelector('.pricing-row');

    // <div class="col-md-4 col-sm-6">
    const card = document.createElement('div');
    card.className = `col-md-4 col-sm-6 ${className}`;
    pricingRow.appendChild(card);

    // <div class="pricingTable">
    // const pricingTable = document.createElement('div');
    // pricingTable.className = 'pricingTable';
    // card.appendChild(pricingTable);

    const template = document.querySelector('.pricing-row > div.col-sm-6');
    const sourceHTML = template.innerHTML;

    card.innerHTML = sourceHTML;
};

// DOM attribútumok kezelése.
const setCardAttributes = () => {
    let tables = document.querySelectorAll('.pricingTable');

    // Class:
    tables[1].classList.add('blue');
    tables[2].classList.add('red');

    // Fill:
    tables[1].querySelector('svg path').setAttribute('fill', '#005c99');
    tables[2].querySelector('svg path').setAttribute('fill', '#db2c29');

    // Price:
    tables[1].querySelector('.price-amount').textContent = '$20';
    tables[2].querySelector('.price-amount').textContent = '$30';
};

// DOM elemek tömeges módosítása.
const service = { name: '', value: '' };
const updateServiceList = (selector, plan) => {
    const card = document.querySelector(selector);

    card.querySelector('svg text').textContent = `$${plan.price.monthly}`;

    const pricingContent = card.querySelector('.pricing-content');
    pricingContent.querySelector('h3').textContent = plan.name;

    const list = pricingContent.querySelector('ul.pricing-content');
    list.innerHTML = '';

    plan.services.forEach(item => {
        const listItem = document.createElement('li');
        list.appendChild(listItem);

        const itemValue = document.createElement('b');
        listItem.appendChild(itemValue);
        itemValue.textContent = item.value;

        const itemName = document.createElement('span');
        listItem.appendChild(itemName);
        itemName.textContent = ' ' + item.name;
    });
};

// DOM események.
const listenPeriod = (plans) => {
    const input = document.querySelector('.period-checkbox');
    input.addEventListener('change', changeEvent => {
        const target = changeEvent.target;
        const priceKey = !target.checked ? 'monthly' : 'annual';

        const svgs = document.querySelectorAll('.pricing-row svg');
        Array.from(svgs).forEach((svg, index) => {
            const texts = svg.querySelectorAll('text');
            texts[0].textContent = `$${plans[index].price[priceKey]}`;
            if (priceKey === 'annual') {
                texts[1].style.display = 'none';
                texts[2].innerHTML = '&nbsp;/Year';
            } else {
                texts[1].style.display = 'inherit';
                texts[2].textContent = '/Month';
            }
        });
    });
};

createCard('business-card');
createCard('premium-card');
setCardAttributes();
// updateServiceList('.standard-card', plans[0]);
// updateServiceList('.business-card', plans[1]);
// updateServiceList('.premium-card', plans[2]);
// listenPeriod(plans);

// Fetch - olvassuk be az adatokat.
fetch('https://raw.githubusercontent.com/Training360/JAVASCRIPT-alapok-dom-es6/main/json/plans.json')
    .then(response => response.json())
    .then(plans => {
        updateServiceList('.standard-card', plans[0]);
        updateServiceList('.business-card', plans[1]);
        updateServiceList('.premium-card', plans[2]);
        listenPeriod(plans);
    });
