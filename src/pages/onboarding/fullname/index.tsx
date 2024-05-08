import { personalDetailsService } from "api";
import { toast } from "components";
import { useOnboardingContext } from "context";
import { useApiRequest } from "hooks";
import { FullnameUI } from "modules";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { FullnameFormData } from "types";

const initDat: FullnameFormData = {
  first_name: "",
  last_name: ""
};
const Fullname = () => {
  const { handleFormChange } = useOnboardingContext();
  const { run, data: response, error, requestStatus } = useApiRequest({});
  const navigate = useNavigate();
  const handleSubmit = (data: FullnameFormData) => {
    run(personalDetailsService(data));
  };

  useMemo(() => {
    if (response?.status === 200) {
      navigate(Routes.onboarding_company_info);
      toast({
        description: response?.data?.message
      });
    } else if (error) {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error
      });
    }
  }, [response, error, navigate]);
  return (
    <>
      <FullnameUI
        initData={initDat}
        submit={(data) => {
          handleSubmit(data);
          handleFormChange("companyInfo", ["fullname"]);
        }}
        loading={requestStatus?.isPending}
      />
    </>
  );
};

export { Fullname };
