import { companyWebsiteService } from "api";
import { toast } from "components";
import { useOnboardingContext } from "context";
import { useApiRequest } from "hooks";
import { CompanyWebsiteUI } from "modules";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { CompanyWebsiteData } from "types";

const CompanyWebsite = () => {
  const { handleFormChange } = useOnboardingContext();
  const navigate = useNavigate();
  const { run, data: response, error, requestStatus } = useApiRequest({});

  const handleSubmit = (data: CompanyWebsiteData) => {
    run(companyWebsiteService(data));
  };
  useMemo(() => {
    if (response?.status === 200) {
      toast({
        description: response?.data?.message
      });
      navigate(Routes.onboarding_operating_address);
    } else if (error) {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error
      });
    }
  }, [response, error, navigate]);
  return (
    <>
      <CompanyWebsiteUI
        initData={{ website: "" }}
        submit={(data) => {
          handleSubmit(data);
          handleFormChange("address", ["fullname", "companyInfo", "companyWeb"]);
        }}
        loading={requestStatus.isPending}
      />
    </>
  );
};

export { CompanyWebsite };
