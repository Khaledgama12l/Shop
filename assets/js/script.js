const img = new Image();
img.src = reader.result;

img.onload = function() {
    const canvas = document.createElement('canvas');
    const targetWidth = 200;
    const targetHeight = 150;
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

    const imageBase64 = canvas.toDataURL('image/jpeg', 0.7);
    // بعدها تخزن imageBase64 في localStorage
};
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
