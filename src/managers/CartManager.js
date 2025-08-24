const fs = require('fs/promises');
const path = require('path');
const { ProductManager } = require('./ProductManager.js');
const productManager = new ProductManager('./data/products.json');

class CartManager {
    constructor(filePath) {
        this.path = filePath;
        this.carts = [];
        this.lastId = 0;
        this.init();
    }

    async init() {
        try {
            await fs.access(this.path);
            const data = await fs.readFile(this.path, 'utf-8');
            this.carts = JSON.parse(data);
            if (this.carts.length > 0) {
                this.lastId = Math.max(...this.carts.map(c => typeof c.id === 'number' ? c.id : 0));
            }
        } catch (error) {
            await this.saveCarts();
        }
    }

    async saveCarts() {
        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
    }

    generateId() {
        this.lastId += 1;
        return this.lastId;
    }

    async createCart() {
        const newCart = {
            id: this.generateId(),
            products: []
        };

        this.carts.push(newCart);
        await this.saveCarts();
        return newCart;
    }

    async getCartById(id) {
        await this.init();
        const cart = this.carts.find(c => c.id == id);
        if (!cart) throw new Error('Carrito no encontrado');
        return cart;
    }

    async addProductToCart(cartId, productId) {
        await productManager.init();
        const product = productManager.products.find(p => p.id == productId);
        if (!product) {
            throw new Error('El producto no existe');
        }

        const cart = await this.getCartById(cartId);
        const existingProduct = cart.products.find(p => p.product == productId);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.products.push({
                product: productId,
                quantity: 1
            });
        }

        const cartIndex = this.carts.findIndex(c => c.id == cartId);
        this.carts[cartIndex] = cart;
        await this.saveCarts();
        return cart;
    }
}

module.exports = { CartManager };