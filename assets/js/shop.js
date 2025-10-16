const productsSection = document.getElementById("products");
const counter = document.getElementById("counter");

// تحميل المنتجات والسلة
let products = JSON.parse(localStorage.getItem("products")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// تحديث عداد السلة
function updateCounter() {
    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    counter.innerText = totalQuantity;
    counter.style.display = totalQuantity > 0 ? "flex" : "none";
}

// عرض المنتجات
function displayProducts() {
    productsSection.innerHTML = "";

    if (products.length === 0) {
        productsSection.innerHTML = "<p style='text-align:center;'>لا توجد منتجات بعد.</p>";
        return;
    }

    products.forEach((p, index) => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML = `
            <img src="${p.image}" alt="${p.name}">
            <h4>${p.name}</h4>
            <p>السعر: ${p.price} جنيه</p>
            <button class="buy" data-index="${index}">أضف إلى السلة</button>
        `;
        productsSection.appendChild(card);
    });
}

// إضافة منتج للسلة عند الضغط
document.addEventListener("click", e => {
    if (e.target.classList.contains("buy")) {
        const index = e.target.dataset.index;
        const product = products[index];

        const existing = cart.find(item => item.name === product.name);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCounter();

        e.target.innerText = "تمت الإضافة ✅";
        setTimeout(() => { e.target.innerText = "أضف إلى السلة"; }, 1000);
    }
});

// عند تحميل الصفحة
displayProducts();
updateCounter();
