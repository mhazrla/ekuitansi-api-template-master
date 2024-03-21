var express = require("express");
var router = express.Router();
const RolePermissionController = require("../../controller/master_controller/RolePermissionController");
const UserRoleController = require("./../../controller/master_controller/UserRoleController");
const RoleController = require("./../../controller/master_controller/RoleController");
const PermissionController = require("./../../controller/master_controller/PermissionController");

// Roles
router.get("/roles", RoleController.getAllRole);
router.post("/role", RoleController.insertRole);
router.put("/role/:id", RoleController.updateRole);
router.delete("/role/:id", RoleController.deleteRole);

// Permissions
router.get("/permissions", PermissionController.getAllPermission);
router.post("/permission", PermissionController.insertPermission);
router.put("/permission/:id", PermissionController.updatePermission);
router.delete("/permission/:id", PermissionController.deletePermission);

// User Role
router.get("/user-data/user", UserRoleController.getAllUserRole);
router.post("/user-data/user", UserRoleController.insertUserRole);
router.put("/user-data/user/:nik", UserRoleController.updateUserRole);
router.delete("/user-data/user/:nik", UserRoleController.deleteUserRole);

// User Permission
router.get("/user-data/role", RolePermissionController.getAllRolePermission);
module.exports = router;
