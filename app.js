let productsArray = [...products];

const productContainer = document.querySelector('.products-container');
const form = document.querySelector('.input-form');
const searchInput = document.querySelector('.search-input');
const companies = document.querySelector('.companies');

const displayProducts = () => {
  if (productsArray.length < 1) {
    productContainer.innerHTML = `<h6>Sorry, no product matched your search...</h6>`;
    return;
  }

  productContainer.innerHTML = productsArray
    .map((product) => {
      const { id, title, image, price } = product;
      return `<article class="product" key=${id}>
          <img
            src=${image}
            class="product-img img"
          />
          <footer>
            <h5 class="product-name">${title}</h5>
            <span class="product-price">$${price}</span>
          </footer>
        </article>`;
    })
    .join('');
};
displayProducts();

form.addEventListener('keyup', () => {
  const inputValue = searchInput.value;
  productsArray = products.filter((product) => {
    return product.title.toLowerCase().includes(inputValue);
  });

  displayProducts();
});

const displayButtons = () => {
  const buttons = [
    'all',
    ...new Set(products.map((product) => product.company)),
  ];
  companies.innerHTML = buttons
    .map((company) => {
      return ` <button class="company-btn" data-id="${company}">${company}</button>`;
    })
    .join('');
};
displayButtons();

companies.addEventListener('click', (e) => {
  const el = e.target;
  if (el.classList.contains('company-btn')) {
    if (el.dataset.id === 'all') {
      productsArray = [...products];
    } else {
      productsArray = products.filter((product) => {
        return product.company === el.dataset.id;
      });
    }
    searchInput.value = '';
    displayProducts();
  }
});
