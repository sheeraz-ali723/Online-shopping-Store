const products = [
  { name: "iPhone 15", type: "Phone", price: "$999", img:"https://images.unsplash.com/photo-1700805732158-6f1169780ca7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGlwaG9uZSUyMDE1JTIwd2FsbHBhcGVyfGVufDB8fDB8fHww" },
  { name: "iPhone 14", type: "Phone", price: "$799", img: "Assets/iphone 15.jpg" },
  { name: "iPhone 13", type: "Phone", price: "$699", img: "https://via.placeholder.com/200" },

  { name: "Apple Watch Ultra", type: "Watch", price: "$799", img: "https://via.placeholder.com/200" },
  { name: "Apple Watch Series 9", type: "Watch", price: "$399", img: "https://via.placeholder.com/200" },

  { name: "AirPods Pro 2", type: "AirPods", price: "$249", img: "https://via.placeholder.com/200" },
  { name: "AirPods 3", type: "AirPods", price: "$179", img: "https://via.placeholder.com/200" },

  { name: "iPhone 12", type: "Phone", price: "$599", img: "https://via.placeholder.com/200" },
  { name: "iPhone SE", type: "Phone", price: "$429", img: "https://via.placeholder.com/200" },

  { name: "Apple Watch SE", type: "Watch", price: "$249", img: "https://via.placeholder.com/200" },
  { name: "AirPods Max", type: "AirPods", price: "$549", img: "https://via.placeholder.com/200" },

  { name: "iPhone 15 Plus", type: "Phone", price: "$1099", img: "https://via.placeholder.com/200" },
  { name: "Apple Watch Series 8", type: "Watch", price: "$349", img: "https://via.placeholder.com/200" },

  { name: "AirPods 2", type: "AirPods", price: "$129", img: "https://via.placeholder.com/200" },
  { name: "iPhone 11", type: "Phone", price: "$499", img: "https://via.placeholder.com/200" }
];

const row = document.getElementById("product-row");

// 🟢 render function
function displayProducts(list) {
  row.innerHTML = "";

  list.forEach(product => {
    const card = document.createElement("div");
    card.className = "col-lg-3 col-md-4 col-sm-6 mb-4";
    card.setAttribute("data-aos", "flip-right");
    card.innerHTML = `
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
    `;

    row.appendChild(card);
  });
}

// 🟢 filter function
function filterProducts(category) {
  if (category === "All") {
    displayProducts(products);
  } else {
    const filtered = products.filter(p => p.type === category);
    displayProducts(filtered);
  }
}

// 🟢 cart function
function addToCart(name) {
  alert(name + " added to cart 🛒");
}

// initial load
displayProducts(products);