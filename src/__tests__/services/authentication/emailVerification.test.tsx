import {
  patchRequest,
  verifyEmailService,
  verifyEmailURL,
  resendVerifyEmailService,
  resendVerifyEmailURL
} from "api";

jest.mock("../../../api/requestProcessor", () => ({
  patchRequest: jest.fn()
}));

describe("Email Verification Services", () => {
  describe("verifyEmailService", () => {
    it("should make a PATCH request and return the response data", async () => {
      const mockData = { token: 123456 };

      const mockResponse = {
        status: 200,
        data: {
          data: {
            token: "mock-token"
          },
          message: "Email Verified"
        }
      };
      (patchRequest as jest.Mock).mockResolvedValue(mockResponse);

      const response = await verifyEmailService(mockData);

      expect(response).toEqual(mockResponse);
      expect(patchRequest).toHaveBeenCalledWith({
        url: verifyEmailURL(),
        data: mockData
      });
    });
  });

  describe("resendVerifyEmailService", () => {
    it("should make a PATCH request and return the response data", async () => {
      const mockData = {
        email: "test@example.com"
      };

      const mockResponse = {
        status: 200,
        data: {
          message: "Password reset successful"
        }
      };

      (patchRequest as jest.Mock).mockResolvedValue(mockResponse);

      const response = await resendVerifyEmailService(mockData);

      expect(response).toEqual(mockResponse);
      expect(patchRequest).toHaveBeenCalledWith({
        url: resendVerifyEmailURL(),
        data: mockData
      });
    });
  });
});
