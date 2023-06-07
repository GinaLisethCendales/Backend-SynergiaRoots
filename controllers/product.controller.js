const Product = require('../schemas/product');
const multer = require('multer');

async function GetProducts(req, res){
    try{
        // consulta uno 
        const { id } = req.query;

        // Si se proporciona un ID, se busca un producto específico
        if (id) {
            const product = await Product.findById(id);

            if (!product) {
                return res.status(404).send({
                    ok: false,
                    msg: `No se encontró ningún producto con el ID ${id}`
                });
            }

            return res.status(200).send({
                ok: true,
                msg: `Producto obtenido correctamente`,
                product: product
            });
        }



        // consulta todos
        const products = await Product.find({});


          return res.status(200).send({
            ok: true,
            msg: 'Productos obtenidos correctamente',
            products: products
          });

    


        
    }catch(e){
        console.log(e);
        return res.status(500).send({ok:false,msg: 'Error al obtener productos', e});
    }
}


async function RenderProducts() {

    // consulta todos
    try {
        const products = await Product.find({});

        const response = {
            ok: true,
            msg: `Productos consultado correctamente`,
            products: products

        }

        return response;
    }
    catch (error) {

        const response = {
            ok: false,
            msg: `Productos consultado error`
        }

        return response;

    }

}


async function InsertProduct(req, res){
    try{
        const product = new Product(req.body);
        await product.save();
        return res.status(200).send({
            ok: true,
            msg: `Productos registado correctamente`,
            product: product
        });    
    }catch(e){
        console.log(e);
        return res.status(500).send({ok:false,msg: 'Error al registrar productos', e});
    }
}

async function UpdateProduct(req, res){
    try {
        const { id } = req.params;
        const updateData = req.body;

        const product = await Product.findByIdAndUpdate(id, updateData, { new: true });

        if (!product) {
            return res.status(404).send({
                ok: false,
                msg: `No se encontró ningún producto con el ID ${id}`
            });
        }

        return res.status(200).send({
            ok: true,
            msg: `Producto actualizado correctamente`,
            product: product
        });

    } catch (e) {
        console.log(e);
        return res.status(500).send({ ok: false, msg: 'Error al actualizar el producto', error: e });
    }

}

async function DeleteProduct(req, res){
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).send({
                ok: false,
                msg: `No se encontró ningún producto con el ID ${id}`
            });
        }

        return res.status(200).send({
            ok: true,
            msg: `Producto eliminado correctamente`,
            product: product
        });

    } catch (e) {
        console.log(e);
        return res.status(500).send({ ok: false, msg: 'Error al eliminar el producto', error: e });
    }
    
}


module.exports = {
    GetProducts,
    InsertProduct,
    UpdateProduct,
    DeleteProduct,
    RenderProducts,
}