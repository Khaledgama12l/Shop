// ========== Header + Nav ==========
const headerHTML = `
<header class="top-header">
    <div class="logo">Dark Shop</div>
    <a href="/index.html" class="home"></a>

    <div class="addProduct" id="addProductContainer" style="display:none;">
        <a href="/addProduct.html">إضافة منتج 🛠️</a>
    </div>
    
    <div class="search-bar">
        <input type="text" id="searchInput" placeholder="ابحث عن منتجات، علامات تجارية والمزيد...">
        <button id="searchBtn">بحث</button>
    </div>
    
    <div class="header-icons">
        <a href="/index.html">الرئيسية</a>
        <a href="/pages/departments/account.html">الحساب</a>
        <a href="/pages/Departments/orders.html">الطلبات</a>
        <div id="count">
            🛒 <span id="counter">0</span>
            <a href="/pages/Departments/chart.html">السلة</a>
        </div>
    </div>
</header>

<nav class="nav-bar">
    <a href="/pages/Departments/offers.html">العروض</a>
    <a href="/pages/Departments/electronics.html">الإلكترونيات</a>
    <a href="/pages/Departments/mobiles.html">الموبايلات</a>
    <a href="/pages/Departments/fashion.html">الموضة</a>
    <a href="/pages/Departments/home.html">الأجهزة المنزلية</a>
    <a href="/pages/Departments/food.html">الأكل</a>

    <div class="dropdown">
        <button class="dropbtn">المزيد </button>
        <div class="dropdown-content">
            <a href="pages/Departments/sports.html">الرياضة</a>
            <a href="pages/Departments/games.html">الألعاب</a>
            <a href="pages/Departments/kids.html">الأطفال</a>
            <a href="pages/Departments/beauty.html">العناية الشخصية</a>
            <a href="pages/Departments/books.html">الكتب</a>
            <a href="pages/Departments/books.html">بنادول</a>
        </div>
    </div>
</nav>
`;

// ========== إدخال الهيدر والـnav ==========
document.addEventListener("DOMContentLoaded", () => {
    const headerEl = document.querySelector("header.top-header");
    const navEl = document.querySelector("nav.nav-bar");

    if (headerEl) headerEl.outerHTML = headerHTML; // استبدل العنصر بالكامل
    if (navEl) navEl.outerHTML = ""; // نحذف القديم ثم نضيف الجديد بعده

    document.body.insertAdjacentHTML("afterbegin", headerHTML);

    // ===== تفعيل القائمة المنسدلة =====
    const dropdownBtn = document.querySelector('.dropbtn');
    if (dropdownBtn) {
        dropdownBtn.addEventListener('click', () => {
            document.querySelector('.dropdown').classList.toggle('open');
        });
    }

    // ===== تفعيل البحث =====
    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");

    if (searchBtn) {
        searchBtn.addEventListener("click", () => {
            const query = searchInput.value.trim().toLowerCase();
            if (!query) {
                alert("من فضلك اكتب كلمة للبحث.");
                return;
            }

            let products = JSON.parse(localStorage.getItem("products")) || [];
            const results = products.filter(p => p.name.toLowerCase().includes(query));

            localStorage.setItem("searchResults", JSON.stringify(results));
            window.location.href = "/search.html";
        });
    }
});
