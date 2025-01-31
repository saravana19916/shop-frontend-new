import axiosInstance from "@/services/axiosConfig";
import { IEventType, EventTypes } from "@/model/IEventType";

export const fetchHomeEvents = async (
  eventType: string
): Promise<IEventType> => {
  const response = await axiosInstance.get<IEventType>(
    `home-events?type=${eventType}`
  );
  return response.data;
};
