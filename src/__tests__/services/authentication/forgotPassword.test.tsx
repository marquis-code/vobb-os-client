import {
  axiosInstanceUnauth,
  forgotPasswordService,
  resetPasswordService,
  forgotPasswordVerifyService,
  forgotPasswordURL,
  resetPasswordURL,
  forgotPasswordVerifyURL,
  postRequest
} from "api";

jest.mock("../../../api/requestProcessor", () => ({
  postRequest: jest.fn(),
  axiosInstanceUnauth: {
    post: jest.fn()
  }
}));

describe("Forgot Password Services", () => {
  describe("forgotPasswordService", () => {
    it("should make a POST request and return the response data", async () => {
      const mockData = { email: "test@example.com" };

      const mockResponse = {
        status: 200,
        data: {
          data: {
            token: "mock-token"
          },
          message: "Forgot password email sent"
        }
      };
      (axiosInstanceUnauth.post as jest.Mock).mockResolvedValue(mockResponse);

      const response = await forgotPasswordService(mockData);

      expect(response).toEqual(mockResponse);
      expect(axiosInstanceUnauth.post).toHaveBeenCalledWith(forgotPasswordURL(), mockData);
    });
  });

  describe("resetPasswordService", () => {
    it("should make a POST request and return the response data", async () => {
      const mockData = {
        newPassword: "new-password",
        confirmPassword: "new-password"
      };

      const mockResponse = {
        status: 200,
        data: {
          message: "Password reset successful"
        }
      };

      (postRequest as jest.Mock).mockResolvedValue(mockResponse);

      const response = await resetPasswordService(mockData);

      expect(response).toEqual(mockResponse);
      expect(postRequest).toHaveBeenCalledWith({
        url: resetPasswordURL(),
        data: mockData
      });
    });
  });

  describe("forgotPasswordVerifyService", () => {
    it("should make a POST request and return the response data", async () => {
      const mockData = { token: "test-token", otp: "123456" };

      const mockResponse = {
        status: 200,
        data: {
          data: {
            token: "mock-token"
          },
          message: "Verification successful"
        }
      };

      (axiosInstanceUnauth.post as jest.Mock).mockResolvedValue(mockResponse);

      const response = await forgotPasswordVerifyService(mockData);

      expect(response).toEqual(mockResponse);
      expect(axiosInstanceUnauth.post).toHaveBeenCalledWith(forgotPasswordVerifyURL(mockData));
    });
  });
});
