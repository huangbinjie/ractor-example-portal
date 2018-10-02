import axios, { AxiosResponse, AxiosError } from "axios"

export class Http {
  private defaultHeaders = {};

  /** 请求发出之前，也就是拦截器 */
  protected requestWillSend() { }

  /** 请求发出之后 */
  protected requestDidSend(response: AxiosResponse) { }

  /** 请求之前会调用，这个函数的返回值是你的url */
  protected processUrl(url: string) {
    return url;
  }

  /** 请求之前会调用，这个函数的返回值是你的headers */
  protected processRequestHeaders(headers = this.defaultHeaders) {
    return headers;
  }

  protected processRequestBody(body: any) {
    return body;
  }

  protected processResponseBody(body: object) {
    return body;
  }

  protected processError(error: AxiosError) {
    throw error
  }

  protected get(url: string, headers?: object) {
    this.requestWillSend();
    const processedUrl = this.processUrl(url);
    const processedHeaders = this.processRequestHeaders(headers);
    return axios
      .get(processedUrl, {
        headers: processedHeaders
      })
      .then(response => (this.requestDidSend(response), response.data))
      .catch((err: AxiosError) => this.processError(err))
  }

  protected post(url: string, body?: any, headers?: object) {
    this.requestWillSend();
    const processedUrl = this.processUrl(url);
    const processedHeaders = this.processRequestHeaders(headers);
    const processedBody = this.processRequestBody(body);
    return axios
      .post(processedUrl, processedBody, {
        headers: processedHeaders
      })
      .then(response => (this.requestDidSend(response), response.data))
      .catch((err: AxiosError) => this.processError(err))
  }

  protected put(url: string, body?: any, headers?: object) {
    this.requestWillSend();
    const processedUrl = this.processUrl(url);
    const processedHeaders = this.processRequestHeaders(headers);
    const processedBody = this.processRequestBody(body);
    return axios
      .put(processedUrl, processedBody, {
        headers: processedHeaders
      })
      .then(response => (this.requestDidSend(response), response.data))
      .catch((err: AxiosError) => this.processError(err))
  }

  protected delete(url: string, headers?: object) {
    this.requestWillSend();
    const processedUrl = this.processUrl(url);
    const processedHeaders = this.processRequestHeaders(headers);
    return axios
      .delete(processedUrl, {
        headers: processedHeaders
      })
      .then(response => (this.requestDidSend(response), response.data))
      .catch((err: AxiosError) => this.processError(err))
  }
}
