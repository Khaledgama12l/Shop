// ======= unifiedCartAndDisplay.js =======

// جلب المنتجات والسلة من localStorage
const products = JSON.parse(localStorage.getItem("products")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// تحديث عداد السلة
function updateCartCounter() {
    const counter = document.getElementById("counter");
    if (!counter) return;
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    counter.textContent = total;
    counter.style.display = total > 0 ? "flex" : "none";
}

// الأقسام للصفحة الرئيسية
const sections = [
    { name: "العروض", link: "pages/Departments/offers.html" },
    { name: "الإلكترونيات", link: "pages/Departments/electronics.html" },
    { name: "الموبايلات", link: "pages/Departments/mobiles.html" },
    { name: "الموضة", link: "pages/Departments/fashion.html" },
    { name: "الأجهزة المنزلية", link: "pages/Departments/home.html" },
    { name: "الأكل بقا", link: "pages/Departments/food.html" }
];

const MAX_PRODUCTS = 4; // عدد الكروت المعروضة لكل سكشن

// عرض المنتجات للصفحة الرئيسية أو أي صفحة حسب القسم
function displayHomeProducts(containerId = "productsContainer") {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";

    sections.forEach(section => {
        const sectionProducts = products
            .filter(p => p.section === section.name)
            .slice(0, MAX_PRODUCTS);

        if (sectionProducts.length === 0) return;

        const sectionDiv = document.createElement("div");
        sectionDiv.classList.add("section-block");

        sectionDiv.innerHTML = `
            <div class="section-header">
                <h2>${section.name}</h2>
                <a href="${section.link}" class="view-all">عرض الكل →</a>
            </div>
            <div class="product-list"></div>
        `;

        const list = sectionDiv.querySelector(".product-list");

        sectionProducts.forEach((p, index) => {
            const card = document.createElement("div");
            card.classList.add("product-card");
            card.innerHTML = `
                <img src="${p.image}" alt="${p.name}">
                <h4>${p.name}</h4>
                <p>السعر: ${p.price} جنيه</p>
                <button class="buy" data-index="${index}" data-section="${section.name}">أضف إلى السلة 🛒</button>
            `;
            list.appendChild(card);
        });

        container.appendChild(sectionDiv);
    });

    updateCartCounter();
}

// Event delegation لإضافة المنتجات للسلة من أي صفحة
document.addEventListener("click", e => {
    if (!e.target.classList.contains("buy")) return;

    const section = e.target.dataset.section;
    const index = parseInt(e.target.dataset.index);

    const filteredProducts = section ? products.filter(p => p.section === section) : products;
    const selectedProduct = filteredProducts[index];
    if (!selectedProduct) return alert("❌ المنتج غير موجود!");

    const existing = cart.find(item => item.name === selectedProduct.name && item.section === selectedProduct.section);
    if (existing) existing.quantity += 1;
    else cart.push({ ...selectedProduct, quantity: 1 });

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCounter();
    // يمكنك استبدال alert بتلميح بصري لاحقًا
});

// تحديث العداد عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    updateCartCounter();
    // إذا كان هناك container رئيسي للصفحة الرئيسية
    const homeContainer = document.getElementById("productsContainer");
    if (homeContainer) displayHomeProducts();
});




const dropdown = document.querySelector('.dropdown');
const dropBtn = document.querySelector('.dropbtn');

dropBtn.addEventListener('click', (e) => {
    e.preventDefault();
    dropdown.classList.toggle('open');
});


