const model = require("../../model/category.model");
const api = require("../../tools/common");

getCategoryById = async (req, res) => {
    if(!isNaN(req.params.id)){
        let data = await model.getById(req.params.id);
        return api.ok(res, data);
    } else {
        return api.error(res, "Bad Request", 400);
    }
}

getAllCategory = async (req, res) => {
    let data = await model.getAll();
    return api.ok(res, data);
}

insertCategory = async (req, res) => {
    let data = await model.insert(req.body.form_data);
    return api.ok(res, data);
}

updateCategory = async (req, res) => {
    let data = await model.update(req.params.id, req.body.form_data);
    return api.ok(res, data);
}

module.exports = {
    getCategoryById,
    getAllCategory,
    insertCategory,
    updateCategory,
};