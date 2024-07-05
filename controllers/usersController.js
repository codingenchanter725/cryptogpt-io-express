const supabase = require('../lib/supabase');
require('dotenv').config();

async function getAllUsers(req, res, next) {
    try {
        const {data, error} = await supabase.from('users').select('*');
        if (error) {
            next(error)
            return
        }
        res.status(200).json(data);
    } catch(error) {
        next(error)
    }
}

module.exports = {getAllUsers}