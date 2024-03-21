const sakila = require('./../database/sakila.config');

getAll = async () => await sakila.select('*').from('country');

getById = async (id) => await sakila.select('*').from('country').where('country_id', id);

getWhere = async (column, value) => await sakila.select('*').from('country').where(column, value);

insert = async (data) => await sakila('country').insert(data);

update = async (id, data) => await sakila('country').where('country_id', id).update(data);

deleteData = async (id) => await sakila('country').where('id', id).del();


module.exports = {
    getAll,
    getById,
    getWhere,
    insert,
    update,
    deleteData
};