import axiosInstance from "@/services/axiosConfig";
import { IPurchaseSession } from "@/model/IPurchaseSessionType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "./QueryKeys";

export const createPurchaseSession = async (
  eventId: number
): Promise<IPurchaseSession> => {
  const response = await axiosInstance.get<IPurchaseSession>(
    `createpurchasesession/${eventId}`
  );
  return response.data;
};

export const useCreatePurchaseSession = () => {
  return useMutation({
    mutationKey: [QueryKeys?.CREATE_PURCHASE_SESSION],
    mutationFn: (eventId: number) => createPurchaseSession(eventId),
    onSuccess: () => {},
    onError: () => {},
  });
};
