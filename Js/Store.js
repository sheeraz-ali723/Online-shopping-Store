let cart = [];
let currentCategory = "All";
let searchText = "";

const products = [
  { name: "iPhone 15", type: "Phone", price: "$999", img:"https://images.unsplash.com/photo-1700805732158-6f1169780ca7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGlwaG9uZSUyMDE1JTIwd2FsbHBhcGVyfGVufDB8fDB8fHww" },
  { name: "iPhone 14", type: "Phone", price: "$799", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ7r-S0RoNejo3V1UXW45derIFieBseMFGjA&s"  },
  { name: "iPhone 13", type: "Phone", price: "$699", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSLph1w1A6M_x7QYX1eObjCBZzLiLaB5Qqhw&s" },

  { name: "Apple Watch Ultra", type: "Watch", price: "$799", img:  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbY94Bg5iOww8RsUoi7mK2ZHJWZ6Ymq5iUTg&s" },
  { name: "Apple Watch Series 9", type: "Watch", price: "$399", img:  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-t-qihbPOzUwilW1FyAoNIDJPXCP8g6cU0g&s" },

  { name: "AirPods Pro 2", type: "AirPods", price: "$249", img:  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHdK9KTQkMpQC1aVC4a2RZb60P2gaeVXCNjQ&s" },
  { name: "AirPods 3", type: "AirPods", price: "$179", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHdK9KTQkMpQC1aVC4a2RZb60P2gaeVXCNjQ&s" },

  { name: "iPhone 12", type: "Phone", price: "$599", img:  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0L8RU_G2K63wbvVl3fL34bpSFlomOUC7VSA&s" },
  { name: "iPhone SE", type: "Phone", price: "$429", img: "https://media.wired.com/photos/68d1e224d4f5f78f3b59aa43/4:3/w_640%2Cc_limit/iPhone%252017%2520SOURCE%2520Julian%2520Chokkattu.jpg" },

  { name: "Apple Watch SE", type: "Watch", price: "$249", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbY94Bg5iOww8RsUoi7mK2ZHJWZ6Ymq5iUTg&s" },
  { name: "AirPods Max", type: "AirPods", price: "$549", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpzeXeb2rQ0dlYBudouHFm2UxeCY8peTDlAg&s" },

  { name: "iPhone 15 Plus", type: "Phone", price: "$1099", img: "https://media.wired.com/photos/68d1e224d4f5f78f3b59aa43/4:3/w_640%2Cc_limit/iPhone%252017%2520SOURCE%2520Julian%2520Chokkattu.jpg" },
  { name: "Apple Watch Series 8", type: "Watch", price: "$349", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-t-qihbPOzUwilW1FyAoNIDJPXCP8g6cU0g&s"  },

  { name: "AirPods 2", type: "AirPods", price: "$129", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS22Z3Xvgp9lUqZVf7BNrTouZSwvllHVu_CLg&s" },
  { name: "iPhone 11", type: "Phone", price: "$499", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSLph1w1A6M_x7QYX1eObjCBZzLiLaB5Qqhw&s" }
];

const row = document.getElementById("product-row");

/* =======================
   DISPLAY PRODUCTS
======================= */
function displayProducts(list) {
  row.innerHTML = list.map(product => `
    <div data-aos="flip-right" class="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div class="card text-center p-2 shadow">
        <img src="${product.img}" class="card-img-top" style="height:150px; object-fit:contain;">
        <div class="card-body">
          <h5>${product.name}</h5>
          <p>${product.type}</p>
          <p>${product.price}</p>
          <button class="btn btn-primary" onclick="addToCart('${product.name}')">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

/* =======================
   RENDER FILTERS
======================= */
function render() {
  let filtered = products;

  if (currentCategory !== "All") {
    filtered = filtered.filter(p => p.type === currentCategory);
  }

 if (searchText !== "") {
  filtered = filtered.filter(p =>
    p.name.toLowerCase().includes(searchText) ||
    p.type.toLowerCase().includes(searchText)
  );
}

  displayProducts(filtered);
}

/* =======================
   FILTER CATEGORY
======================= */
function filterProducts(category) {
  currentCategory = category;
  render();
}

/* =======================
   SEARCH
======================= */
function searchProducts(value) {
  searchText = value.trim().toLowerCase();
  render();
}

/* =======================
   ADD TO CART
======================= */
function addToCart(name) {
  const selectedProduct = products.find(p => p.name === name);

  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...selectedProduct, qty: 1 });
  }

  
  updateCart();
updateCartCount();
updateTotal();
}


// Remove function//
function removeItem(name) {
  cart = cart.filter(item => item.name !== name);

  updateCart();
  updateCartCount();
  updateTotal();
}


/* =======================
   UPDATE CART UI
======================= */
function updateCart() {
  const cartBody = document.getElementById("cart-body");

  if (!cartBody) return;

  if (cart.length === 0) {
    cartBody.innerHTML = "<p>Your cart is empty</p>";
    return;
  }

  cartBody.innerHTML = cart.map(item => `
    <div class="d-flex align-items-center justify-content-between border-bottom p-2">

      <img src="${item.img}" width="60" height="60" style="object-fit:contain;">

      <div class="ms-2 flex-grow-1">
        <h6 class="mb-1">${item.name}</h6>
        <p class="mb-1">${item.price}</p>

        <div class="d-flex align-items-center gap-2">
          <button class="btn btn-sm btn-danger" onclick="decreaseQty('${item.name}')">-</button>

          <span class="fw-bold">${item.qty}</span>

          <button class="btn btn-sm btn-success" onclick="increaseQty('${item.name}')">+</button>
            <!-- 🗑 REMOVE BUTTON -->
        <button class="btn btn-sm btn-dark" onclick="removeItem('${item.name}')">
          🗑
        </div>
      </div>

    </div>
  `).join("");
}
// TOtal function//

function updateTotal() {
  const totalEl = document.getElementById("cart-total");

  let total = 0;

  cart.forEach(item => {
    let priceNumber = parseInt(item.price.replace("$", ""));
    total += priceNumber * item.qty;
  });

  const pkr = total * 280;

  if (totalEl) {
    totalEl.innerText = "PKR " + pkr.toLocaleString();
  }
}

// Update the cart money//
function getPriceNumber(price) {
  return Number(price.replace("$", ""));
}
let total = 0;
function increaseQty(name) {
  const item = cart.find(p => p.name === name);

  if (item) {
    item.qty += 1;

    total += getPriceNumber(item.price); // 🔥 ADD

    updateCart();
    updateCartCount();
    updateTotal(); // 🔥 ADD
  }
}
function decreaseQty(name) {
  const item = cart.find(p => p.name === name);

  if (!item) return;

  item.qty -= 1;

  total -= getPriceNumber(item.price); // 🔥 ADD

  if (item.qty <= 0) {
    cart = cart.filter(p => p.name !== name);
  }

  updateCart();
  updateCartCount();
  updateTotal(); // 🔥 ADD
}
function updateTotal() {
  const totalEl = document.getElementById("cart-total");

  let total = 0;

  cart.forEach(item => {
    const price = Number(item.price.replace("$", ""));
    total += price * item.qty;
  });

  const pkr = total * 280;

  if (totalEl) {
    totalEl.innerText = "PKR " + pkr.toLocaleString();
  }
}
/* =======================
   CART COUNT BADGE
======================= */
function updateCartCount() {
  const countEl = document.getElementById("cart-count");

  if (countEl) {
    countEl.innerText = cart.reduce((total, item) => total + item.qty, 0);
  }
}

/* =======================
   INITIAL LOAD
======================= */
render();
updateCartCount();
updateTotal();