
import { Role } from "../models";
import BaseApi from "./baseApi";

class RoleApi extends BaseApi {

    async getListRole(param) {
        const method = this.Methods.GET;
        const endpoint = this.Urls.role.listPaging;

        let body = null;
        if (param) {
            const { pageCount, pageIndex } = param;

            body = {
                ...(((pageCount > -1) && (pageIndex > -1)) && {skip: (pageCount * pageIndex)}),
                ...((pageCount > -1) && {count: pageCount}),
                // ...({sortBy}),
            }
        }

        const response = await super.execute(method, endpoint, null, true, body);
        const { data } = response;
                
        if (!data) {
            return {
              ...response,
              data: {
                  total: 0,
                  listRole: []
              }
            }
        }

        const { entities, totalEntities } = data

        return {
            ...response,
            data: {
                total: totalEntities,
                listRole: entities.map(item => { return new Role(item) })
            }
        }
    }

    async deleteRole(id) {
        const method = this.Methods.DELETE;
        const endpoint = `${this.Urls.role.listPaging}?id=${id}`;

        const response = await super.execute(method, endpoint, null, true)
        return {
            ...response
        }
    }

    async addnewRole(roleItem) {
        const { roleType, displayName } = roleItem;
        const method = this.Methods.POST;
        const endpoint = this.Urls.role.listPaging;
        const body = {
            ...({roleType}),
            ...({displayName}),
        }
        
        const response = await super.execute(method, endpoint, null, true, body)

        const { success, data: roleItemUpdated } = response
        if (!success) return response
        return {
            ...response,
            data: new Role(roleItemUpdated),
        }
    }

}

export default new RoleApi();
