const sakila = require('./../database/sakila.config');

getAll = async () => await sakila.select('*').from('inventory');

getById = async ( id) => await sakila.select('*').from('inventory').where('inventory_id', id);

getWhere = async (column, value) => await sakila.select('*').from('inventory').where(column, value);

insert = async (data) => await sakila('inventory').insert(data);

update = async (id, data) => await sakila('inventory').where('inventory_id', id).update(data);

deleteData = async (id) => await sakila('inventory').where('id', id).del();


module.exports = {
    getAll,
    getById,
    getWhere,
    insert,
    update,
    deleteData
};