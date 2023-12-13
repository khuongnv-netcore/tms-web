import BaseService from "./baseService";
import userApi from "../api/userApi";
import { User } from '../models'

class UserService extends BaseService {
  getUserInfo() {
    return userApi.getUserInfo().then(response => {
      return {
        data: new User(response.data),
        message: response.message,
        success: response.success
      };
    }, this.handleError);
  }

  getListUser = async (param) => {
    return userApi.getListUser(param);
  }

  updateUserRole = async (param) => {
    return userApi.updateUserRole(param);
  }

  updateUser = async (param) => {
    return userApi.updateUser(param);
  }
}

export default new UserService();
