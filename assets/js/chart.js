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
