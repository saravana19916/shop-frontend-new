import axios from "axios";

class NewsLetterService {
  async subscribeForNewsLetter(email: string) {
    try {
      const response = await axios.post(
        process.env.API_URL + "subscribe-newsletter",
        {
          email,
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}
export default new NewsLetterService();
