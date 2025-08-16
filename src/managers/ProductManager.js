import fs from 'fs/promises';
import path from 'path';

export class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = [];
        this.init();
    }

    async init() {
        try {
            await fs.access(this.path);
            const data = await fs.readFile(this.path, 'utf-8');
            this.products = JSON.parse(data);
        } catch (error) {
            await this.saveProducts();
        }
    }

    async saveProducts() {
        await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    }

    async getProducts() {
        await this.init();
        return this.products;
    }

    async getProductById(id) {
        await this.init();
        const product = this.products.find(p => p.id === id);
        if (!product) throw new Error('Producto no encontrado');
        return product;
    }

    async addProduct(productData) {
        const { title, description, code, price, stock, category } = productData;
        
        // Validación de campos obligatorios
        if (!title || !description || !code || !price || !stock || !category) {
            throw new Error('Todos los campos son obligatorios');
        }

        // Validar código único
        const codeExists = this.products.some(p => p.code === code);
        if (codeExists) throw new Error('El código del producto ya existe');

        const newProduct = {
            id: this.generateId(),
            title,
            description,
            code,
            price: Number(price),
            status: true,
            stock: Number(stock),
            category,
            thumbnails: productData.thumbnails || []
        };

        this.products.push(newProduct);
        await this.saveProducts();
        return newProduct;
    }

    async updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex === -1) throw new Error('Producto no encontrado');

        // Prevenir actualización del ID
        if ('id' in updatedFields) delete updatedFields.id;

        this.products[productIndex] = {
            ...this.products[productIndex],
            ...updatedFields
        };

        await this.saveProducts();
        return this.products[productIndex];
    }

    async deleteProduct(id) {
        const initialLength = this.products.length;
        this.products = this.products.filter(p => p.id !== id);
        
        if (this.products.length === initialLength) {
            throw new Error('Producto no encontrado');
        }

        await this.saveProducts();
        return { message: 'Producto eliminado exitosamente' };
    }
}