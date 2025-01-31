import axiosInstance from "./axiosConfig";

export class AuthService {
  async login(email: string, password: string) {
    const response = await axiosInstance.post("login", { email, password });
    return response.data;
  }

  async sociallogin(
    driver: string,
    code: string,
    scope: string,
    state: string
  ) {
    if (driver === "apple") {
      const response = await axiosInstance.post(
        `socialauth-callback/${driver}`,
        {
          code,
          scope,
          state,
        }
      );
      return response.data;
    } else {
      const codeStr = code ? `code=${code}&` : "";
      const scopeStr = scope ? `scope=${scope}&` : "";
      const stateStr = state ? `state=${state}&` : "";
      const response = await axiosInstance.get(
        `socialauth-callback/${driver}?${codeStr}${scopeStr}${stateStr}`
      );
      return response.data;
    }
  }

  async signup(data: any) {
    const response = await axiosInstance.post("register", data);
    return response.data;
  }

  async forgotPassword(email: string) {
    const response = await axiosInstance.post("forgot-password", { email });
    return response.data;
  }

  async resetPassword(
    token: string,
    password: string,
    confirm_password: string
  ) {
    const response = await axiosInstance.post("complete-password-reset", {
      token,
      password,
      confirm_password,
    });
    return response.data;
  }

  async emailVerification(token: string) {
    const response = await axiosInstance.get(
      `complete-email-verification?token=${token}`
    );
    return response.data;
  }

  async logout() {
    sessionStorage.removeItem("response");
    localStorage.removeItem("user");
    const response = await axiosInstance.post("logout", {});
    return response.data;
  }

  authUser(redirectToLogin?: () => void): any {
    try {
      const userData = JSON.parse(localStorage.getItem("user") || "null");
      if (userData) {
        const expirationDate = new Date(userData.expires_in);
        if (expirationDate < new Date()) {
          localStorage.removeItem("user");
          redirectToLogin && redirectToLogin();
          return null;
        }
        return userData;
      }
    } catch {
      return null;
    }
  }

  async changePassword(
    current_password: string,
    password: string,
    confirm_password: string
  ) {
    const response = await axiosInstance.post("change-password", {
      current_password,
      password,
      confirm_password,
    });
    return response.data;
  }
}

export default new AuthService();
