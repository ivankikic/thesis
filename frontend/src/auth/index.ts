import axiosClient from "./apiClient";
import { DeleteArguments, GetArguments, PostArguments } from "../assets/types";

export const Api = {
  get: async ({ url, options }: GetArguments) => {
    const onSuccess = (response: any) => {
      return response.data;
    };

    const onError = (error: any) => {
      return Promise.reject(error.response);
    };

    return axiosClient.get(url, options).then(onSuccess).catch(onError);
  },

  post: async ({ url, data, options }: PostArguments) => {
    const onSuccess = (response: any) => {
      return response.data;
    };

    const onError = (error: any) => {
      return Promise.reject(error.response);
    };

    return axiosClient.post(url, data, options).then(onSuccess).catch(onError);
  },

  put: async ({ url, data, options }: PostArguments) => {
    const onSuccess = (response: any) => {
      return response.data;
    };

    const onError = (error: any) => {
      return Promise.reject(error.response);
    };

    return axiosClient.put(url, data, options).then(onSuccess).catch(onError);
  },

  delete: async ({ url, options }: DeleteArguments) => {
    const onSuccess = (response: any) => {
      return response.data;
    };

    const onError = (error: any) => {
      return Promise.reject(error.response);
    };

    return axiosClient.delete(url, options).then(onSuccess).catch(onError);
  },
};
