import axiosInstance from "./axiosConfig"; // Import the configured axios instance
import { AxiosError } from "axios";

// Interfaces for payloads
export interface IPostCartPayload {
  event_id: number;
  performance_id: number;
  ticket_id: number;
  block_id?: number;
  row_id?: number;
  seat_id?: number;
  quantity?: number;
}

export interface IDeleteFromCartPayload {
  event_id: number;
  performance_id: number;
  ticket_id: number;
  block_id?: number;
  row_id?: number;
  seat_id?: number;
  quantity?: number;
}

// Cart API with axiosInstance
const CartAPI = {
  addToCart: async (payload: IPostCartPayload) => {
    try {
      const response = await axiosInstance.post("addtocart", payload);
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      return {
        status: axiosError.response?.status || 500,
        data: axiosError.response?.data || "An error occurred",
      };
    }
  },

  getCart: async (eventId: number) => {
    try {
      const response = await axiosInstance.get(`getcart/${eventId}`);
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      return {
        status: axiosError.response?.status || 500,
        data: axiosError.response?.data || "An error occurred",
      };
    }
  },
  getAllCart: async () => {
    try {
      const response = await axiosInstance.get(`getcart`);
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      return {
        status: axiosError.response?.status || 500,
        data: axiosError.response?.data || "An error occurred",
      };
    }
  },

  deleteFromCart: async (payload: IDeleteFromCartPayload) => {
    try {
      const response = await axiosInstance.post("deletefromcart", payload);
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      return {
        status: axiosError.response?.status || 500,
        data: axiosError.response?.data || "An error occurred",
      };
    }
  },
};

export default CartAPI;
