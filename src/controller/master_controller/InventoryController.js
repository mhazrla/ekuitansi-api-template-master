const model = require("./../../model/inventory.model");
const api = require("./../../tools/common");

getInventoryById = async (req, res) => {
  if (!isNaN(req.params.id)) {
    let data = await model.getById(req.params.id);
    return api.ok(res, data);
  } else {
    return api.error(res, "Bad Request", 400);
  }
};

getAllInventory = async (req, res) => {
  let data = await model.getAll();
  return api.ok(res, data);
};

insertInventory = async (req, res) => {
  let data = await model.insert(req.body.form_data);
  return api.ok(res, data);
};

updateInventory = async (req, res) => {
  let data = await model.update(req.params.id, req.body.form_data);
  return api.ok(res, data);
};

module.exports = {
  getInventoryById,
  getAllInventory,
  insertInventory,
  updateInventory,
};