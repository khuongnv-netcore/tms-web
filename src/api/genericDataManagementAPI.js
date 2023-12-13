
import { GenericDataManagement } from "../models";
import BaseApi from "./baseApi";

class GenericDataManagementAPI extends BaseApi {

    async getList(param) {
        const method = this.Methods.GET;
        const endpoint = this.Urls.genericDataManagement.listPaging;

        let body = null;
        if (param) {
            const { pageCount, pageIndex, orderBy } = param;

            body = {
                ...(((pageCount > -1) && (pageIndex > -1)) && {skip: (pageCount * pageIndex)}),
                ...((pageCount > -1) && {count: pageCount}),
                //...({sortBy}),
                ...({orderBy})
            }
        }

        const response = await super.execute(method, endpoint, null, true, body);
        const { data } = response;
                
        if (!data) {
            return {
              ...response,
              data: {
                  total: 0,
                  list: []
              }
            }
        }

        const { entities, totalEntities } = data

        return {
            ...response,
            data: {
                total: totalEntities,
                list: entities.map(item => { return new GenericDataManagement(item) })
            }
        }
    }

    async delete(id) {
        const method = this.Methods.DELETE;
        const endpoint = `${this.Urls.genericDataManagement.listPaging}?id=${id}`;

        const response = await super.execute(method, endpoint, null, true)
        return {
            ...response
        }
    }

    async addItem(item) {
        const { genericDataManagementType, displayName } = item;
        const method = this.Methods.POST;
        const endpoint = this.Urls.genericDataManagement.listPaging;
        const body = {
            ...({genericDataManagementType}),
            ...({displayName}),
        }
        
        const response = await super.execute(method, endpoint, null, true, body)

        const { success, data: itemUpdated } = response
        if (!success) return response
        return {
            ...response,
            data: new GenericDataManagement(itemUpdated),
        }
    }

    async update(param) {
        const { id, displayName } = param;
    
        const method = this.Methods.PUT;
        const endpoint = `${this.Urls.genericDataManagement.listPaging}?id=${id}`;
        const body = {
            ...({displayName}),
        }
        
        const response = await super.execute(method, endpoint, null, true, body)
        return {
            ...response,
        } 
      }

}

export default new GenericDataManagementAPI();
