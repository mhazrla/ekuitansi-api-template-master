const db = require("./../database/sakila.config");

getAccount = async (nik) => await db("mst_user").where("nik", nik);

module.exports = {
  getAccount,
};
