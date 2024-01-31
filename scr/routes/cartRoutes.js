const express = require('express');
const router = express.Router();
module.exports = router;

const cartSchema = new mongoose.Schema({
    // Otras propiedades de carrito...
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  });
  
  const Cart = mongoose.model("Cart", cartSchema);
  const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Cart = require('../models/Cart'); // Asegúrate de tener la ruta correcta al modelo Cart
const Product = require('../models/Product'); // Asegúrate de tener la ruta correcta al modelo Product

// Ruta para obtener todos los carritos
router.get('/', async (req, res) => {
  try {
    const carts = await Cart.find().populate('products'); // Popula los productos en el carrito
    res.json({ carts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para obtener un carrito por ID
router.get('/:id', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id).populate('products'); // Popula los productos en el carrito
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    res.json({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para crear un nuevo carrito
router.post('/', async (req, res) => {
  try {
    const newCart = new Cart(req.body);
    await newCart.save();
    res.json({ message: 'Carrito creado exitosamente', cart: newCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para agregar un producto al carrito
router.post('/:cartId/products/:productId', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId);
    const product = await Product.findById(req.params.productId);

    if (!cart || !product) {
      return res.status(404).json({ error: 'Carrito o producto no encontrado' });
    }

    cart.products.push(product);
    await cart.save();

    res.json({ message: 'Producto agregado al carrito', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Otras rutas y operaciones CRUD según sea necesario

module.exports = router;
