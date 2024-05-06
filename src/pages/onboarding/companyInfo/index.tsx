import { useOnboardingContext } from "context";
import { CompanyInfoUI } from "modules";
import { CompanyFormData } from "types";

const CompanyInfo = () => {
  const { handleFormChange } = useOnboardingContext();
  const handleSubmit = (data: CompanyFormData) => {
    console.log(data);
  };

  return (
    <>
      <CompanyInfoUI
        initName={{ organisation: "" }}
        initSize={{ size: null }}
        initSector={{ sector: null }}
        submit={(data) => {
          handleSubmit(data);
          handleFormChange("companyWeb", ["fullname", "companyInfo"]);
        }}
      />
    </>
  );
};

export { CompanyInfo };
