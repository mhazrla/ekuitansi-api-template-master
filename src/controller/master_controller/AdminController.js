const { groupAndConcatPermissions } = require("../../services/permission.service");
const model = require("./../../model/role_permissions.model");
const api = require("./../../tools/common");

getStaffById = async (req, res) => {
  if (!isNaN(req.params.id)) {
    let data = await model.getById(req.params.id);
    return api.ok(res, data);
  } else {
    return api.error(res, "Bad Request", 400);
  }
};

getAllRole = async (req, res) => {
  let data = await model.getAllRoles();
  return api.ok(res, data);
};

getAllPermission = async (req, res) => {
  let data = await model.getAllPermissions();
  return api.ok(res, data);
};

getAllUserRole = async (req, res) => {
  let data = await model.getAllUserRoles();
  return api.ok(res, data);
};

getAllUserPermission = async (req, res) => {
  let data = await model.getAllRolePermissions();

  const result = groupAndConcatPermissions(data);

  return api.ok(res, result);
};

insertStaff = async (req, res) => {
  let data = await model.insert(req.body.form_data);
  return api.ok(res, data);
};

updateStaff = async (req, res) => {
  let data = await model.update(req.params.id, req.body.form_data);
  return api.ok(res, data);
};

module.exports = {
  getStaffById,
  getAllRole,
  getAllPermission,
  getAllStaff,
  getAllUserRole,
  getAllUserPermission,
  insertStaff,
  updateStaff,
};
