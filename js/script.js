const navbarNav = document.querySelector('.navbar-nav')
document.querySelector('#hamburger-menu').onclick = () => {
    navbarNav.classList.toggle('active')
}
// klik diluar side bar untuk menghilangkan nav
const hamburger = document.querySelector('#hamburger-menu')
document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
        navbarNav.classList.remove('active')
    }
})
document.addEventListener('DOMContentLoaded', function () {
    const cartButton = document.querySelector('#shopping-cart-button');
    const modal = document.querySelector('#cart-modal');
    const closeBtn = modal.querySelector('.close-btn');
    const cartItems = modal.querySelector('.cart-items');
    const cartTotalAmount = document.querySelector('#cart-total-amount');

    feather.replace();
    cartButton.addEventListener('click', () => {
        modal.style.display = 'block';
        setTimeout(() => modal.classList.add('active'), 10);
        updateCartDisplay();
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => modal.style.display = 'none', 300);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.style.display = 'none', 300);
        }
    });

    function updateCartDisplay() {
        const cartStore = Alpine.store('cart');
        cartItems.innerHTML = '';

        cartStore.items.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="img/products/${item.img}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>${rupiah(item.price)}</p>
                    <div class="item-quantity">
                        <button class="quantity-btn minus" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn plus" data-index="${index}">+</button>
                    </div>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });

        cartTotalAmount.textContent = rupiah(cartStore.total);

        cartItems.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                if (e.target.classList.contains('minus')) {
                    Alpine.store('cart').remove(index);
                } else {
                    Alpine.store('cart').add(Alpine.store('cart').items[index]);
                }
                updateCartDisplay();
            });
        });
    }
});
