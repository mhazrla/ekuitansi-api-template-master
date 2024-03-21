const sakila = require('./../database/sakila.config');

getAll = async () => await sakila.select('*').from('film');

getById = async ( id) => await sakila.select('*').from('film').where('film_id', id);

getWhere = async (column, value) => await sakila.select('*').from('film').where(column, value);

insert = async (data) => await sakila('film').insert(data);

update = async (id, data) => await sakila('film').where('film_id', id).update(data);

deleteData = async (id) => await sakila('film').where('id', id).del();


module.exports = {
    getAll,
    getById,
    getWhere,
    insert,
    update,
    deleteData
};
