const {
  groupAndConcatPermissions,
} = require("../../services/permission.service");
const roleModel = require("./../../model/role.model");
const userRoleModel = require("./../../model/user_role.model");
const api = require("./../../tools/common");

// User Role
getAllUserRole = async (req, res) => {
  let data = await userRoleModel.getAllUserRoles();
  return api.ok(res, data);
};

insertUserRole = async (req, res) => {
  const body = ({ name, nik, role_id } = req.body);
  const role = await roleModel.getRole(role_id);
  if (role.length === 0) return api.error(res, "Role not found!", 404);

  const user = await userRoleModel.insertUserRole(body);
  if (user.length === 0) return api.error(res, "Bad Request", 400);

  const data = await userRoleModel.getUserRole(nik);
  if (data.length === 0) {
    return api.error(res, "User Not Found", 404);
  }
  return api.ok(res, data);
};

updateUserRole = async (req, res) => {
  const { nik } = req.params;
  const body = ({ name, role_id } = req.body);
  const role = await roleModel.getRole(role_id);

  if (role.length === 0) return api.error(res, "Role not found!", 404);
  const data = await userRoleModel.updateUserRole(nik, body);
  return api.ok(res, data);
};

deleteUserRole = async (req, res) => {
  const { nik } = req.params;
  const user = await userRoleModel.getUserRole(nik);
  if (user.length === 0) {
    return api.error(res, "User Not Found", 404);
  }

  const data = await userRoleModel.deleteUserRole(nik);
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
