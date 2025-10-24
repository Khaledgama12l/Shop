

// // جلب المنتجات والسلة من localStorage
// const products = JSON.parse(localStorage.getItem("products")) || [];
// let cart = JSON.parse(localStorage.getItem("cart")) || [];

// // تحديث عداد السلة
// function updateCartCounter() {
//     const counter = document.getElementById("counter");
//     if (!counter) return;

//     const total = cart.reduce((sum, item) => sum + item.quantity, 0);
//     counter.textContent = total;
//     counter.style.display = total > 0 ? "flex" : "none"; // يظهر فقط لو فيه منتجات
// }

// // عرض المنتجات لأي صفحة حسب القسم أو الصفحة الرئيسية
// function displayProducts() {
//     const container = document.getElementById("productsSection") || document.getElementById("productsContainer");
//     if (!container) return;

//     const sectionName = container.dataset.section; // يقرأ القسم من data-section
//     container.innerHTML = "";

//     // تصفية المنتجات حسب القسم
//     const filteredProducts = sectionName ? products.filter(p => p.section === sectionName) : products;

//     if (filteredProducts.length === 0) {
//         container.innerHTML = "<p style='text-align:center; color:#ccc;'>لا توجد منتجات بعد.</p>";
//         return;
//     }

//     const list = document.createElement("div");
//     list.classList.add("product-list");

//     filteredProducts.forEach((p, index) => {
//         const card = document.createElement("div");
//         card.classList.add("product-card");
//         card.innerHTML = `
//             <img src="${p.image}" alt="${p.name}">
//             <h4>${p.name}</h4>
//             <p style="margin:10px 0 5px; color:#00BFFF;">
//     ${p.desc || p.description ||  "لا يوجد وصف"}
// </p>
//             <p>السعر: ${p.price} جنيه</p>
//             <button class="buy" data-index="${index}" data-section="${sectionName || ''}">أضف إلى السلة 🛒</button>
//         `;
//         list.appendChild(card);
//     });

//     container.appendChild(list);
// }

// // Event delegation لإضافة المنتجات للسلة
// document.addEventListener("click", e => {
//     if (!e.target.classList.contains("buy")) return;

//     const section = e.target.dataset.section;
//     const index = parseInt(e.target.dataset.index);

//     const filtered = section ? products.filter(p => p.section === section) : products;
//     const selectedProduct = filtered[index];
//     if (!selectedProduct) return alert("❌ المنتج غير موجود!");

//     const existing = cart.find(item => item.name === selectedProduct.name && item.section === selectedProduct.section);
//     if (existing) existing.quantity += 1;
//     else cart.push({ ...selectedProduct, quantity: 1 });

//     localStorage.setItem("cart", JSON.stringify(cart));
//     updateCartCounter();
// });

// // استدعاء العرض وتحديث العداد عند تحميل الصفحة
// document.addEventListener("DOMContentLoaded", () => {
//     displayProducts();
//     updateCartCounter();
// });














// ======= productsAndCart.js =======

// تهيئة Supabase
  const supabaseClient = supabase.createClient(
  'https://uwlomazzncrejbgxifuc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3bG9tYXp6bmNyZWpiZ3hpZnVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzMDMwODYsImV4cCI6MjA3Njg3OTA4Nn0.2imMbjsn-7mHd28HvPTJk9BGEu04JqfcESDNoBV-pSM'
);

let products = []; // المنتجات من قاعدة البيانات
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// تحديث عداد السلة
function updateCartCounter() {
  const counter = document.getElementById("counter");
  if (!counter) return;

  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  counter.textContent = total;
  counter.style.display = total > 0 ? "flex" : "none"; // يظهر فقط لو فيه منتجات
}

// جلب المنتجات من Supabase
async function fetchProducts() {
  const { data, error } = await supabaseClient
    .from("products")
    .select("*");

  if (error) {
    console.error("❌ خطأ في جلب المنتجات:", error.message);
    return;
  }

  products = data || [];
  displayProducts();
}

// عرض المنتجات لأي صفحة حسب القسم أو الصفحة الرئيسية
function displayProducts() {
  const container =
    document.getElementById("productsSection") ||
    document.getElementById("productsContainer");
  if (!container) return;

  const sectionName = container.dataset.section; // يقرأ القسم من data-section
  container.innerHTML = "";

  // تصفية المنتجات حسب القسم
  const filteredProducts = sectionName
    ? products.filter((p) => p.section === sectionName)
    : products;

  if (filteredProducts.length === 0) {
    container.innerHTML =
      "<p style='text-align:center; color:#ccc;'>لا توجد منتجات بعد.</p>";
    return;
  }

  const list = document.createElement("div");
  list.classList.add("product-list");

  filteredProducts.forEach((p) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${p.image_url || 'https://via.placeholder.com/180x120'}" alt="${p.name}">
      <h4>${p.name}</h4>
      <p style="margin:10px 0 5px; color:#00BFFF;">
        ${p.description || "لا يوجد وصف"}
      </p>
      <p>السعر: ${Number(p.price) || 0} جنيه</p>
      <button class="buy" data-id="${p.id}">أضف إلى السلة 🛒</button>
    `;
    list.appendChild(card);
  });

  container.appendChild(list);
}

// Event delegation لإضافة المنتجات للسلة
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("buy")) return;

  const id = parseInt(e.target.dataset.id);
  const selectedProduct = products.find((p) => p.id === id);
  if (!selectedProduct) return alert("❌ المنتج غير موجود!");

  const existing = cart.find((item) => item.id === selectedProduct.id);
  if (existing) existing.quantity += 1;
  else cart.push({ ...selectedProduct, quantity: 1 });

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCounter();
});

// استدعاء العرض وتحديث العداد عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
  updateCartCounter();
});

















