const aio_cms = require("./../database/sakila.config");

// User Roles

getAllUserRoles = async () =>
  await aio_cms("mst_user")
    .select(
      "mst_user.id as user_id",
      "mst_user.nik",
      "mst_user.name",
      "mst_user_role.role_name"
    )
    .join("mst_user_role", "mst_user.role_id", "=", "mst_user_role.id");

getUserRole = async (nik) => await aio_cms("mst_user").where("nik", nik);

getAllRolePermissions = async () => {
  const result = await aio_cms("mst_user_role")
    .join(
      "map_role_permission",
      "mst_user_role.id",
      "map_role_permission.role_id"
    )
    .join(
      "mst_user_permission",
      "map_role_permission.permission_id",
      "mst_user_permission.id"
    )
    .select(
      "mst_user_role.role_name",
      "mst_user_role.detail as role_detail",
      "mst_user_permission.code as permission_code"
    );

  return result;
};

getUserPermission = async (nik) => {
  const result = await aio_cms("mst_user")
    .where("nik", nik)
    .select(
      "mst_user.id as user_id",
      "mst_user.nik",
      "mst_user.role_id",
      "mst_user_role.id as role_id",
      "mst_user_role.role_name",
      "mst_user_permission.id as permission_id",
      "mst_user_permission.code as permission_code",
      "mst_user_permission.detail as permission_detail"
    )
    .join("mst_user_role", "mst_user.role_id", "=", "mst_user_role.id")
    .join(
      "map_role_permission",
      "mst_user.role_id",
      "=",
      "map_role_permission.role_id"
    )
    .join(
      "mst_user_permission",
      "map_role_permission.permission_id",
      "=",
      "mst_user_permission.id"
    );

  return result;
};

insertUserRole = async (data) => await aio_cms("mst_user").insert(data);

updateUserRole = async (nik, data) => {
  await aio_cms("mst_user").where("nik", nik).update(data);
};

deleteUserRole = async (nik) =>
  await aio_cms("mst_user").where("nik", nik).del();

module.exports = {
  getUserRole,
  getAllUserRoles,
  getAllRolePermissions,
  getAllRolePermissions,
  getUserPermission,
  insertUserRole,
  updateUserRole,
  deleteUserRole,
};
