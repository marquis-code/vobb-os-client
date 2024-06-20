import { patchRequest, personalDetailsService, personalDetailsURL } from "api";

jest.mock("../../../api/requestProcessor", () => ({
  patchRequest: jest.fn()
}));

describe("personalDetailsService", () => {
  it("should make a PATCH request and return the response data", async () => {
    const mockData = { first_name: "Adaeze", last_name: "IKemefuna" };

    const mockResponse = {
      status: 200,
      data: {
        message: "First name and Last name saved sucessfully"
      }
    };
    (patchRequest as jest.Mock).mockResolvedValue(mockResponse);

    const response = await personalDetailsService(mockData);

    expect(response).toEqual(mockResponse);
    expect(patchRequest).toHaveBeenCalledWith({
      url: personalDetailsURL(),
      data: mockData
    });
  });
});
