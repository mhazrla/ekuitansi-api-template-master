const sakila = require('./../database/sakila.config');

getAll = async () => await sakila.select('*').from('address');

getById = async ( id) => await sakila.select('*').from('address').where('address_id', id);

getWhere = async (column, value) => await sakila.select('*').from('address').where(column, value);

insert = async (data) => await sakila('address').insert(data);

update = async (id, data) => await sakila('address').where('address_id', id).update(data);

deleteData = async (id) => await sakila('address').where('address_id', id).del();

module.exports = {
    getAll,
    getById,
    getWhere,
    insert,
    update,
    deleteData
};