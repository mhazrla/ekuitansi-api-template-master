const sakila = require('../database/sakila.config');

getAll = async () => await sakila.select('*').from('language');

getById = async ( id) => await sakila.select('*').from('language').where('language_id', id);

getWhere = async (column, value) => await sakila.select('*').from('language').where(column, value);

insert = async (data) => await sakila('language').insert(data);

update = async (id, data) => await sakila('language').where('language_id', id).update(data);

deleteData = async (id) => await sakila('language').where('id', id).del();


module.exports = {
    getAll,
    getById,
    getWhere,
    insert,
    update,
    deleteData
};