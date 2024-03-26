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

getUserRole = async (req, res) => {
  const { id } = req.params;
  let data = await userRoleModel.getUserRole(id);
  if (data.length === 0) return api.error(res, "User not found!", 404);
  return api.ok(res, data);
};

insertUserRole = async (req, res) => {
  const body = ({ name, nik, role_id } = req.body);
  const role = await roleModel.getRole(role_id);
  if (role.length === 0) return api.error(res, "Role not found!", 404);

  const user = await userRoleModel.insertUserRole(body);
  if (user.length === 0) return api.error(res, "Bad Request", 400);

  const data = await userRoleModel.getUserRole(user[0]); // user[0] = user id from created user
  return api.ok(res, data);
};

updateUserRole = async (req, res) => {
  const { id } = req.params;
  const body = ({ name, role_id } = req.body);
  const user = await userRoleModel.getUserRole(id);
  if (user.length === 0) return api.error(res, "User not found!", 404);

  const role = await roleModel.getRole(role_id);
  if (role.length === 0) return api.error(res, "Role not found!", 404);

  await userRoleModel.updateUserRole(id, body);
  const data = await userRoleModel.getUserRole(id); //
  return api.ok(res, data);
};

deleteUserRole = async (req, res) => {
  const { id } = req.params;
  const user = await userRoleModel.getUserRole(id);
  if (user.length === 0) {
    return api.error(res, "User Not Found", 404);
  }

  const data = await userRoleModel.deleteUserRole(id);
  if (data.length === 0) {
    return api.error(res, "Bad Request", 400);
  }
  return api.ok(res, data);
};

module.exports = {
  getAllUserRole,
  userRoleModel,
  getUserRole,
  getAllRolePermission,
  insertUserRole,
  insertRolePermission,
  updateUserRole,
  deleteUserRole,
};
