const {
  groupAndConcatPermissions,
} = require("../../services/permission.service");
const model = require("../../model/role_permissions.model");
const permissionModel = require("../../model/permission.model");
const roleModel = require("../../model/role.model");
const api = require("../../tools/common");

getAllRolePermission = async (req, res) => {
  let data = await model.getAllRolePermissions();

  const result = groupAndConcatPermissions(data);

  return api.ok(res, result);
};

insertRolePermission = async (req, res) => {
  const { role_id, permission_id } = req.body;
  const uniquePermissionIds = new Set(permission_id);

  const role = await roleModel.getRole(role_id);
  if (role.length === 0) {
    return api.error(res, "Role Not Found", 404);
  }

  // Verify Permission
  const checkPermissions = await permissionModel.getAllPermissions();
  const permissionIds = checkPermissions.map((perm) => perm.id);

  // Check if each permission_id of the request exists in the database
  const allPermissionsExist = [...uniquePermissionIds].every((pid) => {
    const permissionExists = permissionIds.includes(pid);
    return permissionExists;
  });

  if (!allPermissionsExist) {
    return api.error(res, "Permission Code tidak ditemukan!", 404);
  }

  await model.deleteRolePermission(role_id);

  for (let pid of uniquePermissionIds) {
    await model.insertRolePermission({ role_id, permission_id: pid });
  }

  return api.ok(res, { message: "Role permissions assigned successfully." });
};

updateRolePermission = async (req, res) => {
  const { role_id } = req.params;
  const { permission_id } = req.body;
  const uniquePermissionIds = new Set(permission_id);

  const role = await roleModel.getRole(role_id);
  if (role.length === 0) {
    return api.error(res, "Role Not Found", 404);
  }

  // Verify Permission
  const checkPermissions = await permissionModel.getAllPermissions();
  const permissionIds = checkPermissions.map((perm) => perm.id);

  // Check if each permission_id of the request exists in the database
  const allPermissionsExist = [...uniquePermissionIds].every((pid) => {
    return permissionIds.includes(pid);
  });

  if (!allPermissionsExist) {
    return api.error(res, "Some permission code not found!", 404);
  }

  await model.deleteRolePermission(role_id);

  for (let pid of uniquePermissionIds) {
    await model.insertRolePermission({ role_id, permission_id: pid });
  }

  return api.ok(res, { message: "Role permissions updated successfully." });
};

deleteRolePermission = async (req, res) => {
  const { role_id } = req.params;

  const role = await model.getRolePermission(role_id);
  if (role.length === 0) {
    return api.error(res, "Role ID in Role Permission Table Not Found", 404);
  }

  let data = await model.deleteRolePermission(role_id);
  if (!data) {
    return api.ok(res, data);
  }
};

module.exports = {
  getAllRolePermission,
  insertRolePermission,
  updateRolePermission,
  deleteRolePermission,
};
