let counter = document.getElementById("counter");

function updateCounter(event) {
  let button = event.target;
  button.innerHTML = "تمت الإضافة ✅";
  let count = parseInt(counter.innerText);
  count += 1;
  counter.innerText = count;
  counter.style.display = "flex";
}

// عرض المنتجات من localStorage
let productsSection = document.getElementById("products");
let products = JSON.parse(localStorage.getItem("products")) || [];

if (products.length === 0) {
  productsSection.innerHTML = "<p style='text-align:center;'>لا توجد منتجات بعد.</p>";
} else {
  products.forEach(p => {
    let card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h4>${p.name}</h4>
      <p>السعر: ${p.price} جنيه</p>
      <button class="buy">أضف إلى السلة</button>
    `;
    productsSection.appendChild(card);
  });
}

// ربط كل زرار بالدالة
let buyButtons = document.querySelectorAll(".buy");
buyButtons.forEach(btn => btn.addEventListener("click", updateCounter));

// إضافة منتج جديد (لو النموذج موجود)
let form = document.getElementById("productForm");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    let name = document.getElementById("name").value.trim();
    let price = document.getElementById("price").value.trim();
    let image = document.getElementById("image").value.trim();

    if (!name || !price || !image) {
      alert("من فضلك املأ جميع الحقول!");
      return;
    }

    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.push({ name, price, image });
    localStorage.setItem("products", JSON.stringify(products));
    alert("✅ تمت إضافة المنتج بنجاح!");
    e.target.reset();
  });
}
