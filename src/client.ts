import axios, { AxiosInstance, AxiosRequestConfig, Method } from "axios";
import axiosRetry from "axios-retry";

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

    axiosRetry(this.axiosInstance, {
      retries: 5,
      retryDelay: axiosRetry.exponentialDelay,
      retryCondition: (error: any): boolean => {
        return (
          axiosRetry.isNetworkError(error) ||
          error.response?.status === 429 ||
          error.response?.status >= 500
        );
      },
      onRetry: (retryCount, error, requestConfig) => {
        console.warn(
          `Retrying request ${requestConfig.method} ${requestConfig.url} (${retryCount}) due to: ${error.message}!`
        );
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
