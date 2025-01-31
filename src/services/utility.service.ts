import axios from "axios";
import Response from "@/model/response";

class UtilityService {
  async genders() {
    const response = await axios.get(process.env.API_URL + "genders");
    return await response.data.data;
  }

  async countries() {
    const response = await axios.get(process.env.API_URL + "countries");
    return await response.data.data;
  }

  async occupation() {
    const response = await axios.get(process.env.API_URL + "occupations");
    return await response.data.data;
  }

  storeResponse(response: Response | null | undefined) {
    sessionStorage.removeItem("response");
    if (
      response &&
      response!.response !== undefined &&
      response!.response!.data !== undefined
    ) {
      sessionStorage.setItem(
        "response",
        JSON.stringify(response.response.data || {})
      );
    } else if (response) {
      sessionStorage.setItem("response", JSON.stringify(response || {}));
      if (response!.token !== undefined) {
        localStorage.setItem("user", JSON.stringify(response || {}));
      }
    }
  }

  getSessionResponse(): Response | null | undefined {
    let res: Response | null | undefined = null;
    try {
      if (sessionStorage.getItem("response")) {
        res = JSON.parse(sessionStorage.getItem("response") || "");
      }
    } catch (e) {
      res = null;
    }
    return res;
  }

  deleteSessionResponse() {
    try {
      if (sessionStorage.getItem("response")) {
        sessionStorage.removeItem("response");
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default new UtilityService();
