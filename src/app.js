document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
            {
                id: 1,
                name: 'Tubruk',
                img: 'tubruk.png',
                desc: "Kopi tradisional khas Indonesia yang diseduh langsung dengan air panas, menghasilkan cita rasa yang kuat dan authentic.",
                price: 20000
            },
            {
                id: 2,
                name: 'Americano',
                img: 'americano.png',
                desc: "Perpaduan sempurna espresso dan air panas yang menghasilkan kopi hitam dengan karakter yang halus dan seimbang.",
                price: 25000
            },
            {
                id: 3,
                name: 'Cappucino',
                img: 'cappucino.png',
                desc: "Kombinasi klasik dari espresso, steamed milk, dan foam susu yang lembut, ditaburi bubuk coklat untuk sentuhan manis.",
                price: 25000
            },
            {
                id: 4,
                name: 'Ekspresso',
                img: 'espresso.png',
                desc: "Shot kopi pekat yang intens, dihasilkan dari tekanan tinggi air panas melalui biji kopi yang digiling halus.",
                price: 30000
            },
            {
                id: 5,
                name: 'Latte',
                img: 'latte.png',
                desc: "Paduan espresso dengan steamed milk yang creamy, dihiasi dengan latte art yang menawan di atasnya.",
                price: 35000
            },
            {
                id: 6,
                name: 'Flatwhite',
                img: 'flatwhite.png',
                desc: "Espresso dengan mikro-foam susu yang halus, menghasilkan tekstur yang lebih pekat dari latte dengan rasa kopi yang lebih menonjol.",
                price: 36000
            },
            {
                id: 7,
                name: 'Machiatto',
                img: 'machiatto.png',
                desc: "Espresso yang 'ditandai' dengan sedikit foam susu, menciptakan kontras yang sempurna antara kekuatan kopi dan kelembutan susu.",
                price: 40000
            },
            {
                id: 8,
                name: 'Mocha',
                img: 'mocha.png',
                desc: "Perpaduan menggoda antara espresso, coklat premium, dan steamed milk, topped dengan whipped cream untuk sensasi dessert dalam secangkir kopi.",
                price: 40000
            },
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