import roleAPI from "../api/roleAPI";
import BaseService from "./baseService";

class RoleService extends BaseService {
  getListRole = async (param) => {
    return roleAPI.getListRole(param);
  }

  deleteRoleItem = async (id) => {
    return roleAPI.deleteRole(id);
  }

  addnewRoleItem = async (item) => {
    return roleAPI.addnewRole(item);
  }
}

export default new RoleService();
