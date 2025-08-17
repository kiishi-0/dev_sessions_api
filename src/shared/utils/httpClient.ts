// src/common/http-client/http-client.service.ts

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

@Injectable()
export class HttpClientService {
  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios(config);
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'HTTP Request Failed',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async get<T>(
    url: string,
    params?: Record<string, any>,
    headers?: Record<string, string>,
  ): Promise<T> {
    return this.request<T>({
      method: 'GET',
      url,
      params,
      headers,
    });
  }

  async post<T>(
    url: string,
    data?: any,
    params?: Record<string, any>,
    headers?: Record<string, string>,
  ): Promise<T> {
    return this.request<T>({
      method: 'POST',
      url,
      data,
      params,
      headers,
    });
  }

  async put<T>(
    url: string,
    data?: any,
    params?: Record<string, any>,
    headers?: Record<string, string>,
  ): Promise<T> {
    return this.request<T>({
      method: 'PUT',
      url,
      data,
      params,
      headers,
    });
  }

  async delete<T>(
    url: string,
    params?: Record<string, any>,
    headers?: Record<string, string>,
  ): Promise<T> {
    return this.request<T>({
      method: 'DELETE',
      url,
      params,
      headers,
    });
  }

  async patch<T>(
    url: string,
    data?: any,
    params?: Record<string, any>,
    headers?: Record<string, string>,
  ): Promise<T> {
    return this.request<T>({
      method: 'PATCH',
      url,
      data,
      params,
      headers,
    });
  }
}
