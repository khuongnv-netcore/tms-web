import genericDataManagementAPI from "../api/genericDataManagementAPI";
import BaseService from "./baseService";

class GenericDataManagementService extends BaseService {
  getList = async (param) => {
    return genericDataManagementAPI.getList(param);
  }

  deleteItem = async (id) => {
    return genericDataManagementAPI.delete(id);
  }

  addItem = async (item) => {
    return genericDataManagementAPI.addItem(item);
  }

  updateItem = async (param) => {
    return genericDataManagementAPI.update(param);
  }
}

export default new GenericDataManagementService();