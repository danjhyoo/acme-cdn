const API = 'https://acme-users-api-rev.herokuapp.com/api'

const dataPromise = Promise.all([
    axios.get(`${API}/products`),
    axios.get(`${API}/companies`)
]).then(responses => responses.map(response => response.data));

dataPromise.then(results => {
    renderNav(results);
    renderTable(results[0]);
    return results;
})

const nav = document.querySelector('.nav');
const tableHeader = document.querySelector('.tableHeader');
const tableBody = document.querySelector('.tableBody');

const renderNav = (results) => {
    const [products, companies] = results;
    const hash = window.location.hash.slice(1);

    const html = `
    <li class='nav-item'>
        <a class='nav-link products ${!hash || hash === 'products' ? 'active' : ''}' href='#products'>Products (${products.length})</a>
    </li>
    <li class='nav-item'>
        <a class='nav-link companies ${hash === 'companies' ? 'active' : ''}' href='#companies'>Companies (${companies.length})</a>
    </li>
    `
    nav.innerHTML = html;
}

const renderTable = (entries) => {
        const properties = Object.keys(entries[0]);
        const headerHTML = properties.map(property => {
            return `<th>${property.toUpperCase()}</th>`
        }).join('');
        tableHeader.innerHTML = headerHTML;

        const dataHTML = entries.map(entry => {
            return `<tr>${Object.values(entry).map(value => {
                return `<td>${value}</td>`
            }).join('')}</tr>`;
        }).join('');
        tableBody.innerHTML = dataHTML;
}


window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1);
    if (!hash || hash === 'products') {
        hash === 'products'
        dataPromise.then(result => {
            renderNav(result);
            renderTable(result[0]);
        })
    } else if (hash === 'companies') {
        dataPromise.then(result => {
            renderNav(result);
            renderTable(result[1]);
        })
    }
})


// const header = document.querySelector('.header');
// const entries = document.querySelector('.entries');
// const productsNav = document.querySelector('.products');
// const companiesNav = document.querySelector('.companies');

// const API = 'https://acme-users-api-rev.herokuapp.com/api'

// const dataPromise = Promise.all([
//     axios.get(`${API}/products`),
//     axios.get(`${API}/companies`)
// ]).then(responses => responses.map(response => response.data));

// dataPromise.then(results => {
//     const [products, companies] = results;
//     renderNav(products, companies);
//     renderProducts(products);
//     return results;
// })

// const renderNav = (products, companies) => {
//     productsNav.innerHTML = `Products (${products.length})`;
//     companiesNav.innerHTML = `Companies (${companies.length})`;
// }


// const renderProducts = (products) => {
//     const properties = Object.keys(products[0])
//     const headerHTML = properties.map(property => {
//         return `<th>${property.toUpperCase()}</th>`
//     }).join('');
//     header.innerHTML = headerHTML;

//     const dataHTML = products.map(product => {
//         return `
//         <tr class="entry">
//             <td>${product.id}</td>
//             <td>${product.name}</td>
//             <td>${product.description}</td>
//             <td>${product.suggestedPrice}</td>
//             <td>${product.createdAt}</td>
//             <td>${product.updatedAt}</td>
//         </tr>
//         `
//     }).join('');
//     entries.innerHTML = dataHTML;
// }

// const renderCompanies = (companies) => {
//     const properties = Object.keys(companies[0])
//     const headerHTML = properties.map(property => {
//         return `<th>${property.toUpperCase()}</th>`
//     }).join('');
//     header.innerHTML = headerHTML;

//     const dataHTML = companies.map(company => {
//         return `
//         <tr>
//             <td>${company.id}</td>
//             <td>${company.name}</td>
//             <td>${company.phone}</td>
//             <td>${company.state}</td>
//             <td>${company.catchPhrase}</td>
//             <td>${company.createdAt}</td>
//             <td>${company.updatedAt}</td>
//         </tr>
//         `
//     }).join('');
//     entries.innerHTML = dataHTML;
// }

// window.addEventListener('hashchange', () => {
//     const hash = window.location.hash.slice(1);

//     if (hash === 'companies') {
//         companiesNav.classList.add('active');
//         productsNav.classList.remove('active');
//         dataPromise.then(results => renderCompanies(results[1]));
//     } else if (hash === 'products') {
//         companiesNav.classList.remove('active')
//         productsNav.classList.add('active');
//         dataPromise.then(results => renderProducts(results[0]));
//     }
// })



// ${hash === 'products' ? 'active' : ''}


// const renderTable = (results) => {
//         const [products, companies] = results;
//         console.log(products)
//             // const items = results[hash];

//         // const keys = Object.keys(items)

//         // const tableHead = Object.keys(Object.values(results));
//         // console.log(tableHead);

//         // const tableBody = Object.values(Object.values(results))
//         const html = `
//     <thead>
//         <tr>
//             <th>${products.id}</th>
//             <th>${products.name}</th>
//             <th>${products.description}</th>
//             <th>${products.suggestPrice}</th>
//             <th>${products.createdAt}</th>
//             <th>${products.updatedAt}</th>
//         </tr>
//     </thead>
//     <tbody>
//         <tr>
//             <th>
//         </tr>
//     </tbody>
//     `
//     table.innerHTML = html;
// }



// if(!hash) {
//     window.location.hash === 'products';
// } else {
//     render()
// }

// const renderProducts = (products) => {
//     let html = products.map(product => {
//         return `
//         <td>${product.id}</td>
//         <td>${product.name}</td>
//         <td>${product.description}</td>
//         <td>${product.suggestedPrice}</td>
//         <td>${product.createdAt}</td>
//         <td>${product.updatedAt}</td>
//         `
//     }).join('')
//     products.innerHTML = html;
// }

// const renderCompanies = (company) => {
//     let html = companies.map(company => {
//         return `
//         <td>${product.id}</td>
//         <td>${product.name}</td>
//         <td>${product.description}</td>
//         <td>${product.suggestedPrice}</td>
//         <td>${product.createdAt}</td>
//         <td>${product.updatedAt}</td>
//         `
//     }).join('');
//     companies.innerHTML = html;
// }