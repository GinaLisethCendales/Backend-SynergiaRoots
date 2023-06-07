const User = require('../schemas/user');
const jwt = require('../middlewares/jwt');
const bcrypt = require('bcrypt');

async function Getuser(req, res) {
    try {
        // consulta uno 
        const { id } = req.query;

        // Si se proporciona un ID, se busca un usero específico
        if (id) {
            const user = await User.findById(id);

            if (!user) {
                return res.status(404).send({
                    ok: false,
                    msg: `No se encontró ningún usero con el ID ${id}`
                });
            }

            return res.status(200).send({
                ok: true,
                msg: `usero obtenido correctamente`,
                user: user
            });
        }



        // consulta todos
        const user = await User.find({});

        return res.status(200).send({
            ok: true,
            msg: `useros obtenidos correctamente`,
            user: user
        });




    } catch (e) {
        console.log(e);
        return res.status(500).send({ ok: false, msg: 'Error al obtener useros', e });
    }
}

async function Insertuser(req, res) {

    try {

        const _user = req.body;
        // Verificar si el usuario ya existe en la base de datos
        const existingUser = await User.findOne({ username: _user["username"] });


        if (existingUser) {
            throw new Error('El usuario ya está registrado');
        }

        // Generar el hash de la contraseña
        const hashedPassword = await bcrypt.hash(_user["password"], 10);

        // Crear un nuevo usuario con la contraseña cifrada
        const newUser = new User(
            {
                username: _user["username"],
                password: hashedPassword,
                email: _user["email"],
                role: _user["role"]
            });


        await newUser.save();

        console.log('Registro exitoso');

        return res.status(200).send({
            ok: true,
            msg: `user registado correctamente`,
            user: newUser
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send({ ok: false, msg: 'Error al registrar user', e });
    }
}

async function Updateuser(req, res) {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const user = await User.findByIdAndUpdate(id, updateData, { new: true });

        if (!user) {
            return res.status(404).send({
                ok: false,
                msg: `No se encontró ningún usero con el ID ${id}`
            });
        }

        return res.status(200).send({
            ok: true,
            msg: `usero actualizado correctamente`,
            user: user
        });

    } catch (e) {
        console.log(e);
        return res.status(500).send({ ok: false, msg: 'Error al actualizar el usero', error: e });
    }

}

async function Deleteuser(req, res) {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).send({
                ok: false,
                msg: `No se encontró ningún user con el ID ${id}`
            });
        }

        return res.status(200).send({
            ok: true,
            msg: `usero eliminado correctamente`,
            user: user
        });

    } catch (e) {
        console.log(e);
        return res.status(500).send({ ok: false, msg: 'Error al eliminar el user', error: e });
    }

}


async function login(req, res) {
    try {
        const body = req.body
        // Buscar el usuario en la base de datos
        const user = await User.findOne({ email: body["email"] });

        if (!user) {
            // El usuario no existe
            throw new Error('Usuario no encontrado');
        }

        // Comparar la contraseña ingresada con la contraseña almacenada cifrada
        const passwordMatch = await bcrypt.compare(body["password"], user.password);

        if (!passwordMatch) {
            // Las contraseñas no coinciden
            return res.status(401).send({
                ok: true,
                msg: `Contraseña incorrecta.`
            });
        }

        // El usuario se ha autenticado exitosamente
        console.log('Inicio de sesión exitoso');
        // Aquí puedes generar y devolver el token JWT si es necesario
        const token = await jwt.auth(body["username"], body["password"]);

        return res.status(200).send({
            ok: true,
            msg: `inicio de sesion exitoso.`,
            token: token
        });


    } catch (error) {
        // Manejar cualquier error ocurrido durante el proceso de inicio de sesión
        console.error('Error en el inicio de sesión:', error.message);
        return res.status(500).send({
            ok: true,
            msg: `Error en el inicio de sesión.`
        });
    }
}



module.exports = {
    Getuser,
    Insertuser,
    Updateuser,
    Deleteuser,
    login
}