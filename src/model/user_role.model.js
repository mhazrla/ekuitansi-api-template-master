const aio_cms = require("./../database/sakila.config");

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

insertUserRole = async (data) => await aio_cms("mst_user").insert(data);

updateUserRole = async (nik, data) => {
  await aio_cms("mst_user").where("nik", nik).update(data);
};

deleteUserRole = async (nik) =>
  await aio_cms("mst_user").where("nik", nik).del();

module.exports = {
  getUserRole,
  getAllUserRoles,
  insertUserRole,
  updateUserRole,
  deleteUserRole,
};
