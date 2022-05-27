import {
    plans
} from './services.js';

// DOM elemek kiválasztása
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

// DOM elemek létrehozása
const createCard = (className) => {
    const row = document.querySelector('.pricing-row');

    // <div class="col-md-4 col-sm-6"></div>
    const card = document.createElement('div');
    card.className = 'col-md-4 col-sm-6';
    row.appendChild(card);

    const template = row.querySelector('div.col-sm-6');
    const sourceHTML = template.innerHTML;

    card.innerHTML = sourceHTML;
};

// DOM attribútumok
const setCardAttributes = () => {
    const tables = document.querySelectorAll('.pricingTable');

    // Class
    tables[1].classList.add('blue');
    tables[2].classList.add('red');

    // Fill
    tables[1].querySelector('svg path').setAttribute('fill', '#005c99');
    tables[2].querySelector('svg path').setAttribute('fill', '#db2c29');

    // Price
    tables[1].querySelector('.price-amount').textContent = '$20';
    tables[2].querySelector('.price-amount').textContent = '$30';
};

// DOM elemek tömeges módosítása
const updateServiceList = (selector, plan) => {
    const card = document.querySelector(selector);

    card.querySelector('svg text').textContent = `$${plan.price.monthly}`;
};

createCard('business-card');
createCard('premium-card');
setCardAttributes();

console.log( plans );
