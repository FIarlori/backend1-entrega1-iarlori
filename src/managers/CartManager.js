import fs from 'fs/promises';
import path from 'path';

export class CartManager {
    constructor(filePath) {
        this.path = filePath;
        this.carts = [];
        this.init();
    }

    async init() {
        try {
            await fs.access(this.path);
            const data = await fs.readFile(this.path, 'utf-8');
            this.carts = JSON.parse(data);
        } catch (error) {
            await this.saveCarts();
        }
    }

    async saveCarts() {
        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
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
        const cart = this.carts.find(c => c.id === id);
        if (!cart) throw new Error('Carrito no encontrado');
        return cart;
    }

    async addProductToCart(cartId, productId) {
        const cart = await this.getCartById(cartId);
        const existingProduct = cart.products.find(p => p.product === productId);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.products.push({
                product: productId,
                quantity: 1
            });
        }

        const cartIndex = this.carts.findIndex(c => c.id === cartId);
        this.carts[cartIndex] = cart;
        await this.saveCarts();
        return cart;
    }
}