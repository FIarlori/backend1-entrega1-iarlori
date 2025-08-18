const { Router } = require('express');
const { CartManager } = require('../managers/CartManager.js');

const router = Router();
const cartManager = new CartManager('./data/carts.json');

router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const cart = await cartManager.getCartById(req.params.cid);
        res.json(cart);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cart = await cartManager.addProductToCart(
            req.params.cid, 
            req.params.pid
        );
        res.json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;