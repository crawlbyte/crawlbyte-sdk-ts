import axios, { AxiosInstance, AxiosRequestConfig, Method } from "axios";

export class Client {
  private baseUrl: string;
  private apiKey: string;
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;

    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      timeout: 30000,
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  async doRequest<T = any>(
    method: Method,
    path: string,
    body?: unknown
  ): Promise<T> {
    const config: AxiosRequestConfig = {
      method,
      url: path,
      data: body,
    };

    try {
      const response = await this.axiosInstance.request<T>(config);

      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(
          `HTTP ${error.response.status}: ${JSON.stringify(error.response.data)}`
        );
      }

      throw error;
    }
  }
}
