var express = require("express");
var router = express.Router();
const AdminController = require("./../../controller/master_controller/AdminController");

router.get("/roles", AdminController.getAllRole);
router.get("/permissions", AdminController.getAllPermission);
router.get("/user-data/user", AdminController.getAllUserRole);
router.get("/user-data/role", AdminController.getAllUserPermission);
module.exports = router;
