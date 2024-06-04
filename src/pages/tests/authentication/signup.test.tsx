import {
  axiosInstanceUnauth,
  googleSignupService,
  googleSignupURL,
  signupService,
  signupURL
} from "api";

jest.mock("../../../api/requestProcessor", () => ({
  axiosInstanceUnauth: {
    post: jest.fn()
  }
}));

describe("Signup Services", () => {
  describe("signupService", () => {
    it("should make a POST request and return the response data", async () => {
      const mockData = {
        email: "test@example.com",
        password: "password123",
        recaptcha: "recaptcha-token"
      };

      const mockResponse = {
        status: 201,
        data: {
          data: {
            token: "mock-token",
            email: "test@example.com"
          },
          message: "Signup successful"
        }
      };

      (axiosInstanceUnauth.post as jest.Mock).mockResolvedValue(mockResponse);

      const response = await signupService(mockData);

      expect(response).toEqual(mockResponse);
      expect(axiosInstanceUnauth.post).toHaveBeenCalledWith(signupURL(), mockData);
    });
  });

  describe("googleSignupService", () => {
    it("should make a POST request and return the response data", async () => {
      const mockData = {
        code: "auth-code-123"
      };

      const mockResponse = {
        status: 201,
        data: {
          data: {
            token: "mock-token"
          },
          message: "Signup successful"
        }
      };

      (axiosInstanceUnauth.post as jest.Mock).mockResolvedValue(mockResponse);

      const response = await googleSignupService(mockData);

      expect(response).toEqual(mockResponse);
      expect(axiosInstanceUnauth.post).toHaveBeenCalledWith(googleSignupURL(), mockData);
    });
  });
});
