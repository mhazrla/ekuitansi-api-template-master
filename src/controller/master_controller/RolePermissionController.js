const {
  groupAndConcatPermissions,
} = require("../../services/permission.service");
const model = require("../../model/role_permissions.model");
const api = require("../../tools/common");

getAllRolePermission = async (req, res) => {
  let data = await model.getAllRolePermissions();

  const result = groupAndConcatPermissions(data);

  return api.ok(res, result);
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

module.exports = {
  getAllRolePermission,
  insertRolePermission,
};
