

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

console.log( getPriceCardData() );
