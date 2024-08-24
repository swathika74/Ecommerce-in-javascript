
const main = document.getElementById("loaded");
main.classList.add("loader");
fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(data => {
        main.classList.remove("loader");
        const productList = document.getElementById('product-container');
        data.products.forEach(product => {

            const productElem = document.createElement('div');
            productElem.classList.add('product');
            productElem.innerHTML = `
                <div style="display: flex; justify-content: flex-end; gap: 10px">
                <p>${product.rating}</p>
                 <div>
                  <i class="fa fa-star" style="color:gold"></i>
                  <i class="fa fa-star" style="color:gold"></i>
                  <i class="fa fa-star" style="color:gold"></i>
                  <i class="fa fa-star" style="color:gold"></i>
                  <i class="fa fa-star" style="color:grey"></i>
                 </div>
                </div>
                <img src="${product.thumbnail}" alt="${product.name}">
                <h2>${product.title}</h2>
                <p>$${product.price}</p>
                <button>Add to Cart</button>
                `;
            productList.appendChild(productElem);
        });
    })
    .catch(err => console.error('Error fetching data:', err));




const searchInput = document.getElementById('search');
const productContainer = document.getElementById('product-container');

searchInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        const query = searchInput.value;
        fetchProducts(query);
    }
});

function fetchProducts(query) {
    fetch(`https://dummyjson.com/products/search?q=${query}`)
        .then(response => response.json())
        .then(data => {
            displayProducts(data.products);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}

function displayProducts(products) {
    productContainer.innerHTML = ''; // Clear previous results
    if (products.length === 0) {
        productContainer.innerHTML = '<p>No products found</p>';
        return;
    }

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        productElement.innerHTML = `
                    <img src="${product.thumbnail}" alt="${product.title}">
                    <h4>${product.title}</h4>
                    <p>${product.description}</p>
                    <p>Price: $${product.price}</p>
                `;

        productContainer.appendChild(productElement);
    });
}



