import { User } from "../models";
import BaseApi from "./baseApi";

class UserApi extends BaseApi {
  getUserInfo() {
    return super.execute(this.Methods.GET, this.Urls.users.me, null, true)
      .then((res) => {
        return res;
      });
  }

  async getListUser(param) {
    const method = this.Methods.GET;
    const endpoint = this.Urls.users.filter;

     let body = null;
     if (param) {
         const { pageCount, pageIndex, sortBy, orderBy } = param;

         body = {
             ...(((pageCount > -1) && (pageIndex > -1)) && {skip: (pageCount * pageIndex)}),
             ...((pageCount > -1) && {count: pageCount}),
             ...((sortBy && sortBy.length > 0) && {sortBy}),
             ...((orderBy && orderBy.length > 0) && {orderBy})
         }
     }

    const response = await super.execute(method, endpoint, null, true, body);
    const { data } = response;
    if (!data) {
      return {
        ...response,
        data: {
            total: 0,
            listUser: []
        }
      }
    }

    const { entities, totalEntities } = data

    return {
        ...response,
        data: {
            total: totalEntities,
            listUser: entities.map(item => { return new User(item) })
        }
    }
  }

  async updateUserRole(param) {
    const { userId, roleIds } = param;

    const method = this.Methods.PUT;
    const endpoint = `${this.Urls.users.role}`;
    
    const response = await super.execute(method, endpoint, null, true, {userId, roleIds})
    return {
        ...response,
    } 
  }

  async updateUser(param) {
    const { id, firstName, lastName, emailAddress, emailVerified } = param;

    const method = this.Methods.PUT;
    const endpoint = `${this.Urls.users.main}?id=${id}`;
    
    const response = await super.execute(method, endpoint, null, true, {firstName, lastName, emailAddress, emailVerified})
    return {
        ...response,
    } 
  }
}

export default new UserApi();
