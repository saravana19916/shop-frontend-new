import { IPurchaseSession } from "@/model/IPurchaseSessionType";
import axiosInstance from "./axiosConfig";
import { AxiosError } from "axios";

const PurchaseSessionAPI = {
  getCreatePurchaseSession: async (eventId: number) => {
    try {
      const response = await axiosInstance.get<IPurchaseSession>(
        `createpurchasesession/${eventId}`
      );
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
  },
};

export default PurchaseSessionAPI;
