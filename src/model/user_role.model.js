const aio_cms = require("./../database/sakila.config");

getAllUserRoles = async () =>
  await aio_cms("mst_user")
    .select(
      "mst_user.id as user_id",
      "mst_user.nik",
      "mst_user.name",
      "mst_user.email",
      "mst_user.phone_number",
      "mst_user.work_location",
      "mst_user_role.role_name"
    )
    .join("mst_user_role", "mst_user.role_id", "=", "mst_user_role.id");

getUserRole = async (id) =>
  await aio_cms("mst_user")
    .where("mst_user.id", id)
    .join("mst_user_role", "mst_user.role_id", "=", "mst_user_role.id")
    .select(
      "mst_user.id as user_id",
      "mst_user_role.id as role_id",
      "mst_user.nik",
      "mst_user.name",
      "mst_user.email",
      "mst_user.phone_number",
      "mst_user.work_location",
      "mst_user_role.role_name"
    );

insertUserRole = async (data) => await aio_cms("mst_user").insert(data);

updateUserRole = async (id, data) => {
  await aio_cms("mst_user").where("id", id).update(data);
};

deleteUserRole = async (id) =>
  await aio_cms("mst_user").where("id", id).del();

module.exports = {
  getUserRole,
  getAllUserRoles,
  insertUserRole,
  updateUserRole,
  deleteUserRole,
};
