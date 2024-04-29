import $api from "../http";

export default class AuthService {
  static async login(email, password,platform,browser,device_id) {
    return $api
      .post("/auth/login", { email, password,platform,browser,device_id })
     
  }
  static async register(email, password) {
    return $api
      .post("/auth/register", { email, password })
     
  }
  static async logout(email, password) {
    return $api
      .post("/auth/logut")
     
  }
}
