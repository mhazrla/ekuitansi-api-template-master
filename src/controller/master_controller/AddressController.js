const model = require("./../../model/address.model");
const api = require("./../../tools/common");

getAddressById = async (req, res) => {
    if (!isNaN(req.params.id)) {
        let data = await model.getById(req.params.id);
        return api.ok(res, data);
    } else {
        return api.error(res, "Bad Request", 400);
    }
}

getAllAddress = async (req, res) => {
    let data = await model.getAll();
    return api.ok(res, data);
}

insertAddress = async (req, res) => {
    let data = await model.insert(req.body.form_data);
    return api.ok(res, data);
}

updateAddress = async (req, res) => {
    let data = await model.update(req.params.id, req.body.form_data);
    return api.ok(res, data);
}

deleteAddress = async (req, res) => {
    if (!isNaN(req.params.id)) {
        let data = await model.deleteActor(req.params.id)
        return api.ok(res, data)
    } else {
        return api.error(res, 'Bad Request', 400)
    }
}

module.exports = {
    getAddressById,
    getAllAddress,
    insertAddress,
    updateAddress,
    deleteAddress
};