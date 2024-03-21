const model = require("./../../model/actor.model");
const api = require("./../../tools/common");

getActorById = async (req, res) => {
    if (!isNaN(req.params.id)) {
        let data = await model.getById(req.params.id);
        return api.ok(res, data);
    } else {
        return api.error(res, "Bad Request", 400);
    }
}

getAllActor = async (req, res) => {
    let data = await model.getAll();
    return api.ok(res, data);
}

insertActor = async (req, res) => {
    let data = await model.insert(req.body.form_data);
    return api.ok(res, data);
}

updateActor = async (req, res) => {
    let data = await model.update(req.params.id, req.body.form_data);
    return api.ok(res, data);
}

deleteActor = async (req, res) => {
    if (!isNaN(req.params.id)) {
        let data = await model.deleteActor(req.params.id)
        return api.ok(res, data)
    } else {
        return api.error(res, 'Bad Request', 400)
    }
}

module.exports = {
    getActorById,
    getAllActor,
    insertActor,
    updateActor,
    deleteActor
};