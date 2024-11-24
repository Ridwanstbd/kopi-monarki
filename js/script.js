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
    const cartStore = Alpine.store('cart');
    const cartButton = document.querySelector('#shopping-cart-button');
    const modal = document.querySelector('#cart-modal');
    const closeBtn = modal.querySelector('.close-btn');
    const cartItems = modal.querySelector('.cart-items');
    const cartTotalAmount = document.querySelector('#cart-total-amount');
    const cartQuantity = document.querySelector('#cart-quantity');
    const orderModal = document.getElementById('order-modal');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const closeOrderBtn = document.querySelector('.close-order-btn');
    const confirmOrderBtn = document.querySelector('.confirm-order-btn');

    feather.replace();
    // Cart
    function updateCartQuantityDisplay() {
        cartQuantity.textContent = cartStore.quantity;
    }
    document.addEventListener('click', function (e) {
        if (e.target.closest('.add-to-cart-btn')) {
            setTimeout(() => {
                updateCartQuantityDisplay();
                feather.replace();
            }, 0);
        }
    });
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
    // Order
    checkoutBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        orderModal.style.display = 'block';
        updateOrderSummary();
    })
    closeOrderBtn.addEventListener('click', () => {
        orderModal.style.display = 'none';
    })
    function updateOrderSummary() {
        const orderItems = document.querySelector('.order-items');
        const subtotalAmount = document.getElementById('subtotal-amount');
        const taxAmount = document.getElementById('tax-amount');
        const finalTotalAmount = document.getElementById('final-total-amount');
        orderItems.innerHTML = '';
        cartStore.items.forEach(item => {
            const orderItem = document.createElement('div');
            orderItem.innerHTML = `
            <div class="item-info">
                <img src="img/products/${item.img}" alt="${item.name}"  />
                <div>
                <h4>${item.name}</h4>
                <p>${item.quantity}x ${rupiah(item.price)}</p>
                </div>
            </div>
            <div class="item-total">
                ${rupiah(item.price * item.quantity)}
            </div>
            `
            orderItems.appendChild(orderItem);
        })
        const subtotal = cartStore.total;
        const shipping = 10000;
        const tax = subtotal * 0.11;
        const finalTotal = subtotal + shipping + tax;

        subtotalAmount.textContent = rupiah(subtotal);
        taxAmount.textContent = rupiah(tax);
        finalTotalAmount.textContent = rupiah(finalTotal);
    }
    confirmOrderBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const form = document.getElementById('customer-form');
        if (!form.checkValidity()) {
            alert('Mohon lengkapi semua informasi yang diperlukan');
            return;
        }

        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

        alert('Pesanan Anda telah berhasil dikonfirmasi! Terima kasih telah berbelanja di Kopi Monarki.');

        Alpine.store('cart').clear();
        updateCartQuantityDisplay();
        orderModal.style.display = 'none';
    });
    function updateCartDisplay() {
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
        updateCartQuantityDisplay();

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
    // Product
    document.addEventListener('show-modal', () => {
        document.querySelector('#product-modal').style.display = 'block';
    });

    const observer = new MutationObserver(() => {
        feather.replace();
    });

    observer.observe(document.querySelector('.product-modal-content'), {
        childList: true,
        subtree: true
    });
    updateCartQuantityDisplay();
});
