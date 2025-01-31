import axios from "axios";
import { IEventType, EventTypes } from "@/model/IEventType";

export class HomeService {
  constructor() {}

  async getEventsForType(eventType: string) {
    const response = await axios.get<IEventType>(process.env.API_URL + `home-events?type=${eventType}`);
    return response.data;
  }
}
export default new HomeService();