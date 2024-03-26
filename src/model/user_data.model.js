const aio_cms = require("./../database/sakila.config");

getAccount = async (nik) => await aio_cms("v_users").where("nik", nik);

module.exports = {
  getAccount,
};
