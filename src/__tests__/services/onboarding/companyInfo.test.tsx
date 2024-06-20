import {
  companyNameService,
  companyNameURL,
  companySectorService,
  companySectorURL,
  companySizeService,
  companySizeURL,
  patchRequest
} from "api";

jest.mock("../../../api/requestProcessor", () => ({
  patchRequest: jest.fn()
}));

describe("Company Info Services", () => {
  describe("companyNameService", () => {
    it("should make a PATCH request and return the response data", async () => {
      const mockData = {
        name: "Vobb llc"
      };

      const mockResponse = {
        status: 200,
        data: {
          message: "Company name saved successfully"
        }
      };

      (patchRequest as jest.Mock).mockResolvedValue(mockResponse);

      const response = await companyNameService(mockData);

      expect(response).toEqual(mockResponse);
      expect(patchRequest).toHaveBeenCalledWith({
        url: companyNameURL(),
        data: mockData
      });
    });
  });

  describe("companySizeService", () => {
    it("should make a PATCH request and return the response data", async () => {
      const mockResponse = {
        status: 200,
        data: {
          message: "Company size saved successfully"
        }
      };

      (patchRequest as jest.Mock).mockResolvedValue(mockResponse);

      const response = await companySizeService({ size: "11-20" });

      expect(response).toEqual(mockResponse);
      expect(patchRequest).toHaveBeenCalledWith({
        url: companySizeURL(),
        data: { size: "11-20" }
      });
    });
  });
  describe("companySectorService", () => {
    it("should make a PATCH request and return the response data", async () => {
      const mockResponse = {
        status: 200,
        data: {
          message: "Company SEctor saved successfully"
        }
      };

      (patchRequest as jest.Mock).mockResolvedValue(mockResponse);

      const response = await companySectorService({
        sector: "Tourism"
      });

      expect(response).toEqual(mockResponse);
      expect(patchRequest).toHaveBeenCalledWith({
        url: companySectorURL(),
        data: {
          sector: "Tourism"
        }
      });
    });
  });
});
