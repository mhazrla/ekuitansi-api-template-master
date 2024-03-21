const model = require("../model/role_permissions.model");

const hasAccess = (permissionCode) => {
  return async (req, res, next) => {
    try {
      const { nik } = req.user;
      const userPermissions = await model.getUserPermission(nik);
      const permissionFound = userPermissions.some((permission) => {
        return permission.permission_code === permissionCode;
      });

      if (permissionFound) {
        next();
      } else {
        res.status(403).json({ error: "Forbidden" });
      }
    } catch (error) {
      console.error("Error checking permissions:", error);
      throw new Error("Internal Server Error");
    }
  };
};

const groupAndConcatPermissions = (data) => {
  const result = {};
  data.forEach((row) => {
    if (!result[row.role_name]) {
      result[row.role_name] = {
        role_name: row.role_name,
        role_detail: row.role_detail,
        permission_code: "",
      };
    }

    result[row.role_name].permission_code += row.permission_code + ", ";
  });

  Object.keys(result).forEach((role) => {
    result[role].permission_code = result[role].permission_code.slice(0, -2);
  });

  return Object.values(result);
};

module.exports = {
  groupAndConcatPermissions,
  hasAccess,
};
