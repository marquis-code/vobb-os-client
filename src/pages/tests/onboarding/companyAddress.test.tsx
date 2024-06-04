import {
  companyAddressesService,
  companyAddressesURL,
  companyCountryService,
  companyCountryURL,
  companyStateService,
  companyStateURL,
  companyZipcodeService,
  companyZipcodeURL,
  patchRequest
} from "api";

jest.mock("../../../api/requestProcessor", () => ({
  patchRequest: jest.fn()
}));

describe("Company Address Services", () => {
  describe("companyCountryService", () => {
    it("should make a PATCH request and return the response data", async () => {
      const mockData = {
        country: "Nigeria"
      };

      const mockResponse = {
        status: 200,
        data: {
          message: "Company country saved successfully"
        }
      };

      (patchRequest as jest.Mock).mockResolvedValue(mockResponse);

      const response = await companyCountryService(mockData);

      expect(response).toEqual(mockResponse);
      expect(patchRequest).toHaveBeenCalledWith({
        url: companyCountryURL(),
        data: mockData
      });
    });
  });

  describe("companyZipcodeService", () => {
    it("should make a PATCH request and return the response data", async () => {
      const mockData = {
        zip_code: "654321"
      };
      const mockResponse = {
        status: 200,
        data: {
          message: "Company size saved successfully"
        }
      };

      (patchRequest as jest.Mock).mockResolvedValue(mockResponse);

      const response = await companyZipcodeService(mockData);

      expect(response).toEqual(mockResponse);
      expect(patchRequest).toHaveBeenCalledWith({
        url: companyZipcodeURL(),
        data: mockData
      });
    });
  });

  describe("companyStateService", () => {
    it("should make a PATCH request and return the response data", async () => {
      const mockData = {
        state: "Lagos"
      };
      const mockResponse = {
        status: 200,
        data: {
          message: "Company state saved successfully"
        }
      };

      (patchRequest as jest.Mock).mockResolvedValue(mockResponse);

      const response = await companyStateService(mockData);

      expect(response).toEqual(mockResponse);
      expect(patchRequest).toHaveBeenCalledWith({
        url: companyStateURL(),
        data: mockData
      });
    });
  });

  describe("companyAddressesService", () => {
    it("should make a PATCH request and return the response data", async () => {
      const mockData = {
        address_line_1: "Ogudu",
        address_line_2: "Apata",
        city: "Lagos mainland"
      };
      const mockResponse = {
        status: 200,
        data: {
          message: "Company address saved successfully"
        }
      };

      (patchRequest as jest.Mock).mockResolvedValue(mockResponse);

      const response = await companyAddressesService(mockData);

      expect(response).toEqual(mockResponse);
      expect(patchRequest).toHaveBeenCalledWith({
        url: companyAddressesURL(),
        data: mockData
      });
    });
  });
});
