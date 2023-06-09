
const userController = require('../controllers/user.controller')


async function RenderUsers(req, res) {
    try {
        const response = await userController.RenderUsers();

        const users = response.users.map((user) => {
            const _user = { ...user._doc };
            _user.createdAt = formatDate(_user.createdAt)
            return _user
          });

        if (response) {
            return res.render('usersTable', { users: users });
        } else {
            return res.render('error', { message: response.msg });
        }
    } catch (error) {
        console.error('Error al renderizar usuarios:', error);
        return res.render('error', { message: 'Error al renderizar usuarios' });
    }
}

function formatDate(inputDate){

    let Date = "";
    if(inputDate){
        const day = inputDate.getDate();
        const month = inputDate.getMonth() + 1;
        const year = inputDate.getFullYear();
    
        Date = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;    
    }
    return Date;
}


module.exports = {
    RenderUsers,
    formatDate
}