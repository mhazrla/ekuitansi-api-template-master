const model = require("./../../model/country.model");
const api = require("./../../tools/common");

getCountryById = async (req, res) => {
    if (!isNaN(req.params.id)) {
        let data = await model.getById(req.params.id);
        return api.ok(res, data);
    } else {
        return api.error(res, "Bad Request", 400);
    }
}

getAllCountry = async (req, res) => {
    let data = await model.getAll();
    return api.ok(res, data);
}

insertCountry = async (req, res) => {
    let data = await model.insert(req.body.form_data);
    return api.ok(res, data);
}

updateCountry = async (req, res) => {
    let data = await model.update(req.params.id, req.body.form_data);
    return api.ok(res, data);
}
module.exports = {
    getCountryById,
    getAllCountry,
    insertCountry,
    updateCountry,
}