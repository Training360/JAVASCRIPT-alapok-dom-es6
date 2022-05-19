import {
    standardList,
    businessList,
    premiumList,
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

createCard('business-card');
createCard('premium-card');

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

setCardAttributes();

// DOM elemek tömeges módosítása.
const service = { name: '', value: '' };
const updateServiceList = (selector, title, serviceList = [service]) => {
    const card = document.querySelector(selector);
    const pricingContent = card.querySelector('.pricing-content');

    pricingContent.querySelector('h3').textContent = title;

    const list = pricingContent.querySelector('ul.pricing-content');
    list.innerHTML = '';

    serviceList.forEach(item => {
        const listItem = document.createElement('li');
        list.appendChild(listItem);

        const itemValue = document.createElement('b');
        listItem.appendChild(itemValue);
        itemValue.textContent = item.value;

        const itemName = document.createElement('b');
        listItem.appendChild(itemName);
        itemName.textContent = item.name;
    });
};

updateServiceList('.standard-card', 'STANDARD', standardList);
updateServiceList('.business-card', 'BUSINESS', businessList);
updateServiceList('.premium-card', 'PREMIUM', premiumList);

// DOM események.
const listenPeriod = () => {
    const values = [10, 20, 30];
    const input = document.querySelector('.period-checkbox');
    input.addEventListener('change', changeEvent => {
        const target = changeEvent.target;
        const multiplier = target.checked ? 10 : 1;
        const svgs = document.querySelectorAll('.pricing-row svg');
        Array.from(svgs).forEach((svg, index) => {
            const texts = svg.querySelectorAll('text');
            texts[0].textContent = `$${ values[index] * multiplier }`;
            if (multiplier === 10) {
                texts[1].style.display = 'none';
                texts[2].innerHTML = '&nbsp;/Year';
            } else {
                texts[1].style.display = 'inherit';
                texts[2].textContent = '/Month';
            }
        });
    });
};

listenPeriod();

