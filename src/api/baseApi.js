/* eslint-disable no-param-reassign */
import RestClient from "./restClient";
import { httpMethods } from "../constants";
import { DEFAULT_PAGE_SIZE } from "../constants/common";
import Urls from "./urls";

export default class BaseApi {
  constructor() {
    this.Urls = Urls;
    this.Methods = httpMethods;
  }

  handlePagination(data) {
    if (!data || (data.page == null && data.pageSize == null)) return data;

    const pageSize = data.pageSize || DEFAULT_PAGE_SIZE;
    const page = data.page || 0;
    const skip = ((page || 1) - 1) * pageSize;

    delete data.pageSize;
    delete data.page;

    return {
      ...data,
      skip,
      count: pageSize
    }
  }

  execute(
    method,
    endpoint,
    headers = undefined,
    isAuthen = true,
    body = undefined
  ) {
    if (method === this.Methods.GET) {
      body = this.handlePagination(body);
    }

    const restClient = new RestClient(method, endpoint);
    return restClient.execute(headers, body, isAuthen);
  }
}
