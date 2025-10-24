// ======= productsWithCart.js =======

// جلب المنتجات والسلة من localStorage
const products = JSON.parse(localStorage.getItem("products")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// تحديث عداد السلة
function updateCartCounter() {
    const counter = document.getElementById("counter");
    if (!counter) return;

    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    counter.textContent = total;
    counter.style.display = total > 0 ? "flex" : "none"; // يظهر فقط لو فيه منتجات
}

// عرض المنتجات لأي صفحة حسب القسم أو الصفحة الرئيسية
function displayProducts() {
    const container = document.getElementById("productsSection") || document.getElementById("productsContainer");
    if (!container) return;

    const sectionName = container.dataset.section; // يقرأ القسم من data-section
    container.innerHTML = "";

    // تصفية المنتجات حسب القسم
    const filteredProducts = sectionName ? products.filter(p => p.section === sectionName) : products;

    if (filteredProducts.length === 0) {
        container.innerHTML = "<p style='text-align:center; color:#ccc;'>لا توجد منتجات بعد.</p>";
        return;
    }

    const list = document.createElement("div");
    list.classList.add("product-list");

    filteredProducts.forEach((p, index) => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML = `
            <img src="${p.image}" alt="${p.name}">
            <h4>${p.name}</h4>
            <p>السعر: ${p.price} جنيه</p>
            <button class="buy" data-index="${index}" data-section="${sectionName || ''}">أضف إلى السلة 🛒</button>
        `;
        list.appendChild(card);
    });

    container.appendChild(list);
}

// Event delegation لإضافة المنتجات للسلة
document.addEventListener("click", e => {
    if (!e.target.classList.contains("buy")) return;

    const section = e.target.dataset.section;
    const index = parseInt(e.target.dataset.index);

    const filtered = section ? products.filter(p => p.section === section) : products;
    const selectedProduct = filtered[index];
    if (!selectedProduct) return alert("❌ المنتج غير موجود!");

    const existing = cart.find(item => item.name === selectedProduct.name && item.section === selectedProduct.section);
    if (existing) existing.quantity += 1;
    else cart.push({ ...selectedProduct, quantity: 1 });

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCounter();
});

// استدعاء العرض وتحديث العداد عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    displayProducts();
    updateCartCounter();
});
// ====== كود البحث ======
const searchInput = document.querySelector('.search-bar input');
const searchButton = document.querySelector('.search-bar button');

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
        alert("من فضلك اكتب اسم المنتج الذي تريد البحث عنه.");
        return;
    }

    // جلب المنتجات من localStorage
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // فلترة النتائج بناءً على الاسم
    const results = products.filter(p =>
        p.name.toLowerCase().includes(query)
    );

    // حفظ نتائج البحث مؤقتًا في localStorage
    localStorage.setItem('searchResults', JSON.stringify(results));

    // الانتقال إلى صفحة نتائج البحث
    window.location.href = 'search.html';
});
