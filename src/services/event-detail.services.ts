import axios from "axios";
import { IEventDetails } from "@/model/IEventDetail";
import axiosInstance from "./axiosConfig";

export class EventDetailService {
  constructor() {}

  async getEventDetail(id: number) {
    const response = await axios.get<IEventDetails>(
      process.env.API_URL + `event-detail/${id}`
    );
    return response.data;
  }

  async getPromoterDetail(id: number) {
    const response = await axios.get<IEventDetails>(
      process.env.API_URL + `promoter-detail/${id}`
    );
    return response.data;
  }
}
export default new EventDetailService();

export async function fetchEventDetails(id: string | number) {
  try {
    const response = await axiosInstance.get(
      `${process.env.API_URL}event-detail/${id}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching event details:", error);
    throw new Error(
      error?.response?.data?.message || "Failed to fetch event details."
    );
  }
}
