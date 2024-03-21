const {
  groupAndConcatPermissions,
} = require("../../services/permission.service");
const model = require("./../../model/role_permissions.model");
const api = require("./../../tools/common");

getAllUserRole = async (req, res) => {
  let data = await model.getAllUserRoles();
  return api.ok(res, data);
};

getAllRolePermission = async (req, res) => {
  let data = await model.getAllRolePermissions();

  const result = groupAndConcatPermissions(data);

  return api.ok(res, result);
};


insertUserRole = async (req, res) => {
  const body = ({ name, nik, role_id } = req.body);
  const role = await model.getRole(role_id);
  if (role.length === 0) return api.error(res, "Role not found!", 404);

  const user = await model.insertUserRole(body);
  if (user.length === 0) return api.error(res, "Bad Request", 400);

  const data = await model.getUserRole(nik);
  if (data.length === 0) {
    return api.error(res, "User Not Found", 404);
  }
  return api.ok(res, data);
};

insertRolePermission = async (req, res) => {
  const body = ({ name, nik, role_id } = req.body);
  const role = await model.getRole(role_id);
  if (role.length === 0) return api.error(res, "Role not found!", 404);

  await model.insertUserRole(body);
  const data = await model.getUserRole(nik);
  if (data.length === 0) {
    return api.error(res, "User Not Found", 404);
  }
  return api.ok(res, data);
};

updateUserRole = async (req, res) => {
  const { nik } = req.params;
  const body = ({ name, role_id } = req.body);
  const role = await model.getRole(role_id);

  if (role.length === 0) return api.error(res, "Role not found!", 404);
  const data = await model.updateUserRole(nik, body);
  return api.ok(res, data);
};

deleteUserRole = async (req, res) => {
  const { nik } = req.params;
  const user = await model.getUserRole(nik);
  if (user.length === 0) {
    return api.error(res, "User Not Found", 404);
  }

  const data = await model.deleteUserRole(nik);
  if (data.length === 0) {
    return api.error(res, "Bad Request", 400);
  }
  return api.ok(res, data);
};

module.exports = {
  getAllUserRole,
  getAllRolePermission,
  insertUserRole,
  insertRolePermission,
  updateUserRole,
  deleteUserRole,
};
