
const productController = require('../controllers/product.controller')
require('dotenv').config();

async function renderProducts(req, res) {
    try {
      const response = await productController.RenderProducts();
      
      if (response) {
        return res.render('productsTable', { products: response.products });
      } else {
        return res.render('error', { message: response.msg });
      }
    } catch (error) {
      console.error('Error al renderizar productos:', error);
      return res.render('error', { message: 'Error al renderizar productos' });
    }
  }
  
async function renderCardProducts(req, res){
  try {
    const response = await productController.RenderProducts();
    
    if (response) {
      return res.render('productCards', { products: response.products, env: process.env });
    } else {
      return res.render('error', { message: response.msg });
    }
  } catch (error) {
    console.error('Error al renderizar productos cards:', error);
    return res.render('error', { message: 'Error al renderizar productos cards' });
  }
}

module.exports = {
    renderProducts,
    renderCardProducts
  }