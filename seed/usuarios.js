import bcrypt from 'bcrypt'

const usuarios = [
    {
        nombre: 'Jurgen',
        email: 'jurgenmejias@admin.com',
        confirmado: 1,
        password: bcrypt.hashSync('admin123', 10),
    },
    {
        nombre: 'Daniel',
        email: 'jurgendaniel@admin.com',
        confirmado: 1,
        password: bcrypt.hashSync('admin123', 10),
    }
]

export default usuarios