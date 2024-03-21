const model = require("./../../model/film.model");
const api = require("./../../tools/common");

getFilmById = async (req, res) => {
    if (!isNaN(req.params.id)) {
        let data = await model.getById(req.params.id);
        return api.ok(res, data);
    } else {
        return api.error(res, "Bad Request", 400);
    }
}   

getAllFilm = async (req, res) => {
    // const { nik, name } = req.user;
    let data = await model.getAll();
    // res.json({ message: 'Access Granted', userlogin: { nik, name } });
    return api.ok(res, data);
}

insertFilm = async (req, res) => {
    let data = await model.insert(req.body.form_data);
    return api.ok(res, data);
}

updateFilm = async (req, res) => {
    let data = await model.update(req.params.id, req.body.form_data);
    return api.ok(res, data);
}

module.exports = {
    getFilmById,
    getAllFilm,
    insertFilm,
    updateFilm,
};
