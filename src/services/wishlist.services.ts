import axiosInstance from "./axiosConfig";
import { AxiosError } from "axios";
import { Event } from "@/model/IEventType";

export class WishlistService {
  constructor() {}

  // Convert response data to an array
  convertDataToArray(data: any) {
    return Object.values(data.data);
  }

  // Fetch wishlist from API
  async getMyWishlist() {
    try {
      const response = await axiosInstance.get("my-wishlist");
      return {
        status: response.status,
        data: this.convertDataToArray(response.data),
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      return {
        status: axiosError.response?.status || 500,
        data: axiosError.response?.data || "An error occurred",
      };
    }
  }

  // Add or remove item from the wishlist
  async handleWishlist(payload: IPostWishlistPayload) {
    try {
      const response = await axiosInstance.post("inverse-wishlist", payload);
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      return {
        status: axiosError.response?.status || 500,
        data: axiosError.response?.data,
      };
    }
  }
}

export default new WishlistService();

export interface IPostWishlistPayload {
  event_id: number;
}
