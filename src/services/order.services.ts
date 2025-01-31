import { IPerformance } from "@/model/IEventDetail";
import moment from "moment";

export class OrderService {
  constructor() {}

  getAllPerformancesDates(performances: IPerformance[]): Date[] {
    let dates: Date[] = performances?.map((x) => {
      return x.start_date;
    });
    return dates;
  }
  getPerformancesTime(
    performances: IPerformance[],
    date: Date
  ): IPerformance[] {
    const performancesTime: IPerformance[] = [];
    performances?.map((x) => {
      if (
        moment(date).format("yyyy-MM-DD") ==
        moment(x.start_date).format("yyyy-MM-DD")
      ) {
        performancesTime.push(x);
      }
    });
    return performancesTime;
  }
}
export default new OrderService();
