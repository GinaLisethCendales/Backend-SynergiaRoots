const Order = require('../schemas/order');

async function Getorder(req, res){
    try{
        // consulta uno 
        const { id } = req.query;

        // Si se proporciona un ID, se busca un ordero específico
        if (id) {
            const order = await Order.findById(id);

            if (!order) {
                return res.status(404).send({
                    ok: false,
                    msg: `No se encontró ningún ordero con el ID ${id}`
                });
            }

            return res.status(200).send({
                ok: true,
                msg: `ordero obtenido correctamente`,
                order: order
            });
        }



        // consulta todos
        const order = await Order.find({});

        return res.status(200).send({
            ok: true,
            msg: `orderos obtenidos correctamente`,
            order: order
        });



        
    }catch(e){
        console.log(e);
        return res.status(500).send({ok:false,msg: 'Error al obtener orderos', e});
    }
}

async function Insertorder(req, res){
    try{
        const order = new Order(req.body);
        await order.save();
        return res.status(200).send({
            ok: true,
            msg: `orderos registado correctamente`,
            order: order
        });    
    }catch(e){
        console.log(e);
        return res.status(500).send({ok:false,msg: 'Error al registrar orderos', e});
    }
}

async function Updateorder(req, res){
    try {
        const { id } = req.params;
        const updateData = req.body;

        const order = await Order.findByIdAndUpdate(id, updateData, { new: true });

        if (!order) {
            return res.status(404).send({
                ok: false,
                msg: `No se encontró ningún ordero con el ID ${id}`
            });
        }

        return res.status(200).send({
            ok: true,
            msg: `ordero actualizado correctamente`,
            order: order
        });

    } catch (e) {
        console.log(e);
        return res.status(500).send({ ok: false, msg: 'Error al actualizar el ordero', error: e });
    }

}

async function Deleteorder(req, res){
    try {
        const { id } = req.params;

        const order = await Order.findByIdAndDelete(id);

        if (!order) {
            return res.status(404).send({
                ok: false,
                msg: `No se encontró ningún order con el ID ${id}`
            });
        }

        return res.status(200).send({
            ok: true,
            msg: `ordero eliminado correctamente`,
            order: order
        });

    } catch (e) {
        console.log(e);
        return res.status(500).send({ ok: false, msg: 'Error al eliminar el order', error: e });
    }
    
}

module.exports = {
    Getorder,
    Insertorder,
    Updateorder,
    Deleteorder
}