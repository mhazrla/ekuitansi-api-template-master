const {
  groupAndConcatPermissions,
} = require("../../services/permission.service");
const roleModel = require("./../../model/role.model");
const userRoleModel = require("./../../model/user_role.model");
const api = require("./../../tools/common");

getAllUserRole = async (req, res) => {
  try {
    let data = await userRoleModel.getAllUserRoles();
    return api.ok(res, data);
  } catch (error) {
    console.error("Error in getAllUserRole:", error);
    return api.error(res, "An error occurred while fetching users .");
  }
};

getUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await userRoleModel.getUserRole(id);
    if (data.length === 0) return api.error(res, "User not found!", 404);
    return api.ok(res, data);
  } catch (error) {
    console.error("Error in getUserRole:", error);
    return api.error(res, "An error occurred while fetching user .");
  }
};

insertUserRole = async (req, res) => {
  try {
    const { name, nik, email, phone_number, work_location, role_id } = req.body;

    const role = await roleModel.getRole(role_id);
    if (role.length === 0) return api.error(res, "Role not found!", 404);

    const user = await userRoleModel.insertUserRole({
      name,
      nik,
      role_id,
      email,
      phone_number,
      work_location,
    });

    if (user.length === 0) return api.error(res, "Bad Request", 400);
    const data = await userRoleModel.getUserRole(user[0]); // user[0] = user id from created user
    return api.ok(res, data);
  } catch (error) {
    console.error("Error in insertUserRole:", error);
    return api.error(res, "An error occurred while fetching add user.");
  }
};

updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const body = ({ name, role_id } = req.body);
    const user = await userRoleModel.getUserRole(id);
    if (user.length === 0) return api.error(res, "User not found!", 404);

    const role = await roleModel.getRole(role_id);
    if (role.length === 0) return api.error(res, "Role not found!", 404);

    await userRoleModel.updateUserRole(id, body);
    const data = await userRoleModel.getUserRole(id); //
    return api.ok(res, data);
  } catch (error) {
    console.error("Error in updateUserRole:", error);
    return api.error(res, "An error occurred while udpate user.");
  }
};

deleteUserRole = async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Error in deleteUserRole:", error);
    return api.error(res, "An error occurred while delete user.");
  }
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
