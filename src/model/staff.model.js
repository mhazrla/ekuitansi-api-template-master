const sakila = require('./../database/sakila.config');

getAll = async () => await sakila.select('*').from('staff');

getById = async ( id) => await sakila.select('*').from('staff').where('staff_id', id);

getWhere = async (column, value) => await sakila.select('*').from('staff').where(column, value);

insert = async (data) => await sakila('staff').insert(data);

update = async (id, data) => await sakila('staff').where('staff_id', id).update(data);

deleteData = async (id) => await sakila('staff').where('id', id).del();


module.exports = {
    getAll,
    getById,
    getWhere,
    insert,
    update,
    deleteData
};