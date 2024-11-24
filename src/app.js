document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
            { id: 1, name: 'Americano', img: 'americano.png', price: 20000 },
            { id: 2, name: 'Cappucino', img: 'cappucino.png', price: 25000 },
            { id: 3, name: 'Ekspresso', img: 'espresso.png', price: 30000 },
            { id: 4, name: 'Latte', img: 'latte.png', price: 35000 },
            { id: 5, name: 'Flatwhite', img: 'flatwhite.png', price: 36000 },
            { id: 6, name: 'Machiatto', img: 'machiatto.png', price: 40000 },
            { id: 7, name: 'Mocha', img: 'mocha.png', price: 40000 },
        ]
    }))

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        add(newItem) {
            const existingItem = this.items.find((item) => item.id === newItem.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                this.items.push({ ...newItem, quantity: 1 });
            }
            this.calculateCart();
        },
        remove(index) {
            if (this.items[index].quantity > 1) {
                this.items[index].quantity--;
            } else {
                this.items.splice(index, 1);
            }
            this.calculateCart();
        },
        calculateCart() {
            this.quantity = this.items.reduce((sum, item) => sum + item.quantity, 0);
            this.total = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        },

        clear() {
            this.items = [];
            this.total = 0;
            this.quantity = 0;
        },
    })
})
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number)
}