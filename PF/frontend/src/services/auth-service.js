class AuthService {
  static isAuthenticated() {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken === null) {
      return false;
    }
    return !this.isExpired(accessToken);
  }

  static isExpired(accessToken) {
    const payload = JSON.parse(atob(accessToken.split(".")[1]));
    return payload.exp < Date.now() / 1000;
  }
}

export default AuthService;
