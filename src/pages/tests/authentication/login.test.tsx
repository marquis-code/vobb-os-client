import {
  emailLoginService,
  emailLoginURL,
  googleLoginURL,
  googleSigninService,
  login2faService,
  login2faURL,
  postRequest,
  axiosInstanceUnauth
} from "api";

jest.mock("../../../api/requestProcessor", () => ({
  postRequest: jest.fn(),
  axiosInstanceUnauth: {
    post: jest.fn()
  }
}));

describe("Login Services", () => {
  describe("emailLoginService", () => {
    it("should make a POST request and return the response data", async () => {
      const mockData = {
        email: "test@example.com",
        password: "password123",
        rememberMe: true,
        recaptcha: "recaptcha-token"
      };

      const mockResponse = {
        status: 200,
        data: {
          data: {
            access_token: "mock-access-token",
            refresh_token: "mock-refresh-token"
          },
          message: "Login successful"
        }
      };

      (axiosInstanceUnauth.post as jest.Mock).mockResolvedValue(mockResponse);

      const response = await emailLoginService(mockData);

      expect(response).toEqual(mockResponse);
      expect(axiosInstanceUnauth.post).toHaveBeenCalledWith(emailLoginURL(), mockData);
    });
  });

  describe("googleSigninService", () => {
    it("should make a POST request and return the response data", async () => {
      const mockData = {
        code: "auth-code-123"
      };

      const mockResponse = {
        status: 200,
        data: {
          data: {
            access_token: "mock-access-token",
            refresh_token: "mock-refresh-token"
          },
          message: "Login successful"
        }
      };

      (axiosInstanceUnauth.post as jest.Mock).mockResolvedValue(mockResponse);

      const response = await googleSigninService(mockData);

      expect(response).toEqual(mockResponse);
      expect(axiosInstanceUnauth.post).toHaveBeenCalledWith(googleLoginURL(), mockData);
    });
  });

  describe("login2faService", () => {
    it("should make a POST request and return the response data", async () => {
      const mockData = {
        otp: "123456"
      };

      const mockResponse = {
        status: 200,
        data: {
          data: {
            access_token: "mock-access-token",
            refresh_token: "mock-refresh-token"
          },
          message: "2FA login successful"
        }
      };

      (postRequest as jest.Mock).mockResolvedValue(mockResponse);

      const response = await login2faService(mockData);

      expect(response).toEqual(mockResponse);
      expect(postRequest).toHaveBeenCalledWith({
        url: login2faURL(),
        data: mockData
      });
    });
  });
});
