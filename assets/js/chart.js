let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

function renderCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItemsContainer.innerHTML += `
            <tr>
                <td><img src="${item.image}" alt="${item.name}" width="50"></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>
                    <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="quantity-input">
                </td>
                <td>${itemTotal}</td>
                <td><button data-index="${index}" class="remove-btn">حذف</button></td>
            </tr>
        `;
    });

    cartTotal.textContent = total;
    attachEvents();
}

function attachEvents() {
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        });
    });

    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', (e) => {
            const index = e.target.dataset.index;
            cart[index].quantity = parseInt(e.target.value);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        });
    });
}

renderCart();
const products = JSON.parse(localStorage.getItem("products")) || [];

function updateCartCounter() {
    const counter = document.getElementById("counter");
    if (counter) counter.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// دالة عرض المنتجات مع إضافة زر الشراء
function displayProductsBySection(sectionName, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    const sectionProducts = products.filter(p => p.section === sectionName);

    if (sectionProducts.length === 0) {
        container.innerHTML = "<p style='text-align:center; color:#ccc;'>لا توجد منتجات حالياً.</p>";
        return;
    }

    sectionProducts.forEach((p, index) => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML = `
            <img src="${p.image}" alt="${p.name}">
            <h4>${p.name}</h4>
            <p>السعر: ${p.price} جنيه</p>
            <button class="buy" data-index="${index}" data-section="${sectionName}">أضف إلى السلة 🛒</button>
        `;
        container.appendChild(card);
    });
}

// Event delegation لإضافة المنتجات للسلة
document.addEventListener("click", e => {
    if (!e.target.classList.contains("buy")) return;

    const sectionName = e.target.dataset.section;
    const index = parseInt(e.target.dataset.index);

    const filteredProducts = products.filter(p => p.section === sectionName);
    const selectedProduct = filteredProducts[index];

    if (!selectedProduct) return alert("❌ المنتج غير موجود!");

    const existing = cart.find(item => item.name === selectedProduct.name && item.section === selectedProduct.section);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...selectedProduct, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCounter();
    alert(`✅ تم إضافة ${selectedProduct.name} إلى السلة!`);
});

// تحديث العداد عند تحميل الصفحة
updateCartCounter();
