// ========== Header + Nav ==========
const headerHTML = `
<header class="top-header">
    <div class="logo">Dark Shop</div>
    <a href="/index.html" class="home"></a>

    <div class="addProduct" id="addProductContainer" style="display:none;">
        <a href="addProduct.html">إضافة منتج 🛠️</a>
    </div>
    
    <div class="search-bar">
        <input type="text" id="searchInput" placeholder="ابحث عن منتجات، علامات تجارية والمزيد...">
        <button id="searchBtn">بحث</button>
    </div>
    
    <div class="header-icons">
        <a href="/index.html">الرئيسية</a>
        <a href="/pages/Departments/account.html">الحساب</a>
        <a href="/pages/Departments/orders.html">الطلبات</a>
        <div id="count">
            <span id="counter">0</span>
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
        <button class="dropbtn">المزيد ▾</button>
        <div class="dropdown-content">
            <a href="/pages/Departments/sports.html">الرياضة</a>
            <a href="/pages/Departments/games.html">الألعاب</a>
            <a href="/pages/Departments/kids.html">الأطفال</a>
            <a href="/pages/Departments/beauty.html">العناية الشخصية</a>
            <a href="/pages/Departments/books.html">الكتب</a>
            <a href="#">بنادول</a>
        </div>
    </div>
</nav>

`;

document.addEventListener("DOMContentLoaded", () => {
    // ===== إدخال الهيدر والـnav =====
    const oldHeader = document.querySelector(".top-header");
    const oldNav = document.querySelector(".nav-bar");
    if (oldHeader) oldHeader.remove();
    if (oldNav) oldNav.remove();

    document.body.insertAdjacentHTML("afterbegin", headerHTML);

    // ===== القائمة المنسدلة =====
    const dropdown = document.querySelector('.dropdown');
    const dropdownBtn = document.querySelector('.dropbtn');

    if (dropdownBtn && dropdown) {
        dropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('open');
        });

        // إغلاق عند الضغط خارجها
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('open');
            }
        });
    }

    // ===== البحث =====
    const searchBtn = document.getElementById("searchBtn");
    const searchInput = document.getElementById("searchInput");

    if (searchBtn && searchInput) {
        searchBtn.addEventListener("click", () => {
            const query = searchInput.value.trim().toLowerCase();
            if (!query) {
                alert("من فضلك اكتب كلمة للبحث.");
                return;
            }

            let products = JSON.parse(localStorage.getItem("products")) || [];
            const results = products.filter(p => p.name?.toLowerCase().includes(query));

            localStorage.setItem("searchResults", JSON.stringify(results));
            window.location.href = "/pages/departments/search.html";
        });
    }
});
// التعامل مع كل القوائم المنسدلة
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const btn = dropdown.querySelector('.dropbtn');

    if (!btn) return;

    // فتح/غلق عند الضغط على الزر
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('open');
    });
});

// إغلاق كل القوائم عند الضغط في أي مكان خارجها
document.addEventListener('click', () => {
    dropdowns.forEach(drop => drop.classList.remove('open'));
});















// ===== Footer HTML =====
const footerHTML = `
<footer>
    <div class="footer-top">
        <div class="footer-section">
            <h4>عن Dark shop</h4>
            <a href="#">من نحن</a>
            <a href="#">انضم إلينا</a>
            <a href="#">المدونة</a>
            <a href="#">تواصل معنا</a>
        </div>
        <div class="footer-section">
            <h4>خدمة العملاء</h4>
            <a href="#">مساعدة</a>
            <a href="#">الأسئلة الشائعة</a>
            <a href="#">سياسة الإرجاع</a>
            <a href="#">طرق الدفع</a>
        </div>
        <div class="footer-section">
            <h4>حسابك</h4>
            <a href="login.html">تسجيل الدخول</a>
            <a href="/pages/Departments/orders.html">طلباتي</a>
            <a href="#">المفضلة</a>
            <a href="#">العناوين</a>
        </div>
        <div class="footer-section">
            <h4>سياسات</h4>
            <a href="#">الشروط والأحكام</a>
            <a href="#">سياسة الخصوصية</a>
            <a href="#">الأمان والبيانات</a>
        </div>
    </div>

    <div class="footer-bottom">
        <p>تابعنا على</p>
        <div class="social-links">
            <a href="https://www.facebook.com/?locale=ar_AR">فيسبوك</a>
            <a href="https://www.instagram.com/">إنستجرام</a>
            <a href="https://twitter.com/">تويتر</a>
            <a href="https://www.youtube.com/?app=desktop&hl=ar">يوتيوب</a>
        </div>
        <p class="copy">© 2025 Dark Shop - جميع الحقوق محفوظة</p>
    </div>
</footer>
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js"></script>
`;

// ===== إضافة الفوتر للصفحة =====
document.addEventListener("DOMContentLoaded", () => {
    document.body.insertAdjacentHTML("beforeend", footerHTML);
});
