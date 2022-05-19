// Tábla oszlopai.
const columns = [
    {title: 'Name', key: 'name'},
    {title: 'Monthly', key: 'price.monthly'},
    {title: 'Annual', key: 'price.annual'},
    {title: 'Disk space', key: 'services[0].value'},
    {title: 'Email Accounts', key: 'services[1].value'},
    {title: 'Bandwidth', key: 'services[2].value'},
    {title: 'Subdomains', key: 'services[3].value'},
    {title: 'Domains', key: 'services[4].value'},
];

// Tábla létrehozása.
const generatePricingTable = (plans) => {
    const container = document.querySelector('.container');
    const table = document.createElement('table');
    table.className = 'table table-striped';
    container.appendChild(table);

    const thead = document.createElement('tbody');
    table.appendChild(thead);
    const theadRow = document.createElement('tr');
    thead.appendChild(theadRow);

    columns.forEach( col => {
        const th = document.createElement('th');
        theadRow.appendChild(th);
        th.textContent = col.title;
    });

    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    plans.forEach(plan => {
        const tr = document.createElement('tr');
        tbody.appendChild(tr);

        columns.forEach(col => {
            const td = document.createElement('td');
            tr.appendChild(td);
            td.textContent = _.get(plan, col.key);
        });
    });
};

// Fetch - olvassuk be az adatokat.
fetch('https://raw.githubusercontent.com/Training360/JAVASCRIPT-alapok-dom-es6/main/json/plans.json')
    .then(response => response.json())
    .then(plans => {
        generatePricingTable(plans);
    });
