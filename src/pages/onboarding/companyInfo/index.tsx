import { companyNameService, companySectorService, companySizeService } from "api";
import { toast } from "components";
import { useOnboardingContext } from "context";
import { useApiRequest } from "hooks";
import { CompanyInfoUI } from "modules";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { CompanyFormData } from "types";

const CompanyInfo = () => {
  const { handleFormChange } = useOnboardingContext();
  const [activeCompanyInfo, setActiveCompanyInfo] = useState<string>("organisation");
  const handleCompanyChange = (step: string) => {
    setActiveCompanyInfo(step);
  };
  const navigate = useNavigate();
  const {
    run: runName,
    data: nameResponse,
    error: nameError,
    requestStatus: nameStatus
  } = useApiRequest({});
  const {
    run: runSize,
    data: sizeResponse,
    error: sizeError,
    requestStatus: sizeStatus
  } = useApiRequest({});
  const {
    run: runSector,
    data: sectorResponse,
    error: sectorError,
    requestStatus: sectorStatus
  } = useApiRequest({});

  const handleSubmit = (data: CompanyFormData) => {
    switch (activeCompanyInfo) {
      case "organisation":
        runName(companyNameService({ name: data.organisation }));
        break;
      case "teamSize":
        runSize(companySizeService({ size: (data?.size as { value: any })?.value }));
        break;
      case "sector":
        runSector(companySectorService({ sector: (data?.sector as { value: any })?.value }));
        break;
      default:
        break;
    }
  };

  useMemo(() => {
    if (nameResponse?.status === 200) {
      toast({
        description: nameResponse?.data?.message
      });
      handleCompanyChange("teamSize");
    } else if (nameError) {
      toast({
        variant: "destructive",
        description: nameError?.response?.data?.error
      });
    }
  }, [nameResponse, nameError]);

  useMemo(() => {
    if (sizeResponse?.status === 200) {
      toast({
        description: sizeResponse?.data?.message
      });
      handleCompanyChange("sector");
    } else if (sizeError) {
      toast({
        variant: "destructive",
        description: sizeError?.response?.data?.error
      });
    }
  }, [sizeResponse, sizeError]);

  useMemo(() => {
    if (sectorResponse?.status === 200) {
      toast({
        description: sectorResponse?.data?.message
      });
      navigate(Routes.onboarding_company_website);
    } else if (sectorError) {
      toast({
        variant: "destructive",
        description: sectorError?.response?.data?.error
      });
    }
  }, [sectorResponse, sectorError, navigate]);

  return (
    <>
      <CompanyInfoUI
        initName={{ organisation: "" }}
        initSize={{ size: null }}
        initSector={{ sector: null }}
        activeCompanyInfo={activeCompanyInfo}
        handleCompanyChange={handleCompanyChange}
        loading={nameStatus.isPending || sizeStatus.isPending || sectorStatus.isPending}
        submit={(data) => {
          handleSubmit(data);
          handleFormChange("companyWeb", ["fullname", "companyInfo"]);
        }}
      />
    </>
  );
};

export { CompanyInfo };
