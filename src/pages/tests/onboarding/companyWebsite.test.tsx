import { companyWebsiteService, companyWebsiteURL, patchRequest } from "api";

jest.mock("../../../api/requestProcessor", () => ({
  patchRequest: jest.fn()
}));

describe("companyWebsiteService", () => {
  it("should make a PATCH request and return the response data", async () => {
    const mockData = { website: "https://vobb.com" };

    const mockResponse = {
      status: 200,
      data: {
        message: "Company website saved sucessfully"
      }
    };
    (patchRequest as jest.Mock).mockResolvedValue(mockResponse);

    const response = await companyWebsiteService(mockData);

    expect(response).toEqual(mockResponse);
    expect(patchRequest).toHaveBeenCalledWith({
      url: companyWebsiteURL(),
      data: mockData
    });
  });
});
