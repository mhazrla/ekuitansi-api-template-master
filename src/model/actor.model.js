const sakila = require('./../database/sakila.config');

getAll = async () => await sakila.select('*').from('actor');

getById = async ( id) => await sakila.select('*').from('actor').where('actor_id', id);

getWhere = async (column, value) => await sakila.select('*').from('actor').where(column, value);

insert = async (data) => await sakila('actor').insert(data);

update = async (id, data) => await sakila('actor').where('actor_id', id).update(data);

deleteData = async (id) => await sakila('actor').where('actor_id', id).del();

module.exports = {
    getAll,
    getById,
    getWhere,
    insert,
    update,
    deleteData
};