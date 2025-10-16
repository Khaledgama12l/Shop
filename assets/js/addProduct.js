const productForm = document.getElementById("productForm");
const productsList = document.getElementById("productsList");

// تحميل المنتجات من localStorage
let products = JSON.parse(localStorage.getItem("products")) || [];

// عرض المنتجات
function displayProducts() {
    productsList.innerHTML = "";

    if (products.length === 0) {
        productsList.innerHTML = "<p style='text-align:center; width:100%;'>لا توجد منتجات بعد.</p>";
        return;
    }

    products.forEach((p, index) => {
        const card = document.createElement("div");
        card.style.width = "200px";
        card.style.border = "1px solid #222";
        card.style.borderRadius = "8px";
        card.style.padding = "10px";
        card.style.textAlign = "center";
        card.style.backgroundColor = "#111";
        card.style.display = "flex";
        card.style.flexDirection = "column";
        card.style.justifyContent = "space-between";

        card.innerHTML = `
            <img src="${p.image}" alt="${p.name}" style="width:180px; height:120px; object-fit:cover; border-radius:6px; margin:0 auto;">
            <h4 style="margin:10px 0 5px; color:#00BFFF;">${p.name}</h4>
            <p style="color:#ccc; margin-bottom:10px;">السعر: ${p.price} جنيه</p>
            <button class="delete" data-index="${index}" style="background-color:#FF4C4C; color:#fff; border:none; padding:6px; border-radius:5px; cursor:pointer;">حذف</button>
        `;
        productsList.appendChild(card);
    });
}

// إضافة منتج جديد
productForm.addEventListener("submit", e => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const price = document.getElementById("price").value.trim();
    const imageInput = document.getElementById("image");

    if (!name || !price || imageInput.files.length === 0) {
        alert("يرجى ملء جميع الحقول!");
        return;
    }

    const file = imageInput.files[0];
    const reader = new FileReader();
    reader.onload = function() {
        const imageBase64 = reader.result;
        products.push({ name, price, image: imageBase64 });
        localStorage.setItem("products", JSON.stringify(products));
        displayProducts();
        productForm.reset();
        alert("✅ تمت إضافة المنتج بنجاح!");
    }
    reader.readAsDataURL(file);
});

// حذف المنتج عند الضغط على زر الحذف
productsList.addEventListener("click", e => {
    if (e.target.classList.contains("delete")) {
        const index = e.target.dataset.index;
        products.splice(index, 1); // إزالة المنتج من المصفوفة
        localStorage.setItem("products", JSON.stringify(products));
        displayProducts(); // تحديث العرض بعد الحذف
    }
});

// عرض المنتجات عند تحميل الصفحة
displayProducts();
