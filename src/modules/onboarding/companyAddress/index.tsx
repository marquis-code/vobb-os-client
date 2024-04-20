import { Arrow, LocationIcon } from "assets";
import { useOnboardingContext } from "context";
import {
  CompanyAddressFormData,
  CompanyAddressFormErrors,
  CompanyAddressProps
} from "types/onboarding";
import { Button, CountryFlagSelect, CustomInput } from "components";
import { useEffect, useState } from "react";

const initCompanyAddressData: CompanyAddressFormData = {
  country: "",
  zipcode: "",
  state: "",
  addressline1: "",
  addressline2: "",
  city: ""
};

const CompanyAddress: React.FC<CompanyAddressProps> = ({ initData, submit }) => {
  const { handleFormChange } = useOnboardingContext();
  const [activeCompanyAddress, setActiveCompanyAddress] = useState<string>("country");

  const [state, setState] = useState<CompanyAddressFormData>(initCompanyAddressData);
  const { country, zipcode, state: province, addressline1, city } = state;
  const [error, setError] = useState<CompanyAddressFormErrors>();

  useEffect(() => {
    initData && setState(initData);
  }, [initData]);

  const handleSubmitFormInfo = (current: string, next: string) => {
    const errors: CompanyAddressFormErrors = {};

    if (current === "zipcode") {
      if (zipcode?.trim().length === 0) errors.zipcode = "Required";
    } else if (current === "city") {
      if (addressline1?.trim().length === 0) errors.addressline1 = "Required";
      if (city?.trim().length === 0) errors.city = "Required";
    } else if (current === "country") {
      if (country?.trim().length === 0) errors.country = "Required";
    } else if (current === "province") {
      if (province?.trim().length === 0) errors.state = "Required";
    }
    if (Object.keys(errors).length > 0) {
      setError(errors);
    } else {
      current !== "city" ? setActiveCompanyAddress(next) : submit(state);
    }
  };

  const progressBtns = ["country", "zipcode", "province", "city"];

  return (
    <div className="max-w-[400px] h-[100dvh] m-auto ">
      <Arrow
        role="button"
        className="hidden absolute top-20 left-[40%] md:block w-8 h-8 rotate-180 border border-neutral-400 rounded-full p-1 fill-neutral-400"
        onClick={() => handleFormChange("companyWeb", ["fullname", "companyInfo", "companyWeb"])}
      />
      <LocationIcon className="mb-6 m-auto" />
      <div className="mb-4 text-center mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-vobb-neutral-100 text-center">
          Company Address
        </h2>
        <p>Help us get to know your organisation better</p>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        {activeCompanyAddress === "country" && (
          <aside>
            <CountryFlagSelect
              placeholder={"Select Country"}
              selectedOption={country}
              handleSelectChange={(value) => setState((prev) => ({ ...prev, country: value }))}
              validatorMessage={error?.country}
            />
            <Button
              onClick={() => handleSubmitFormInfo("country", "zipcode")}
              className="w-full mt-6"
              size={"default"}
              variant="fill">
              Continue
            </Button>
          </aside>
        )}

        {activeCompanyAddress === "zipcode" && (
          <aside>
            <CustomInput
              type="text"
              placeholder="Zip code"
              name="zipcode"
              onChange={(e) => setState((prev) => ({ ...prev, zipcode: e.target.value }))}
              validatorMessage={error?.zipcode}
            />
            <Button
              onClick={() => handleSubmitFormInfo("zipcode", "province")}
              className="w-full mt-6"
              size={"default"}
              variant="fill">
              Continue
            </Button>
          </aside>
        )}

        {activeCompanyAddress === "province" && (
          <aside>
            <CustomInput
              type="text"
              placeholder="State/Province"
              name="state"
              onChange={(e) => setState((prev) => ({ ...prev, state: e.target.value }))}
              validatorMessage={error?.state}
            />
            <Button
              onClick={() => handleSubmitFormInfo("province", "city")}
              className="w-full mt-6"
              size={"default"}
              variant="fill">
              Continue
            </Button>
          </aside>
        )}

        {activeCompanyAddress === "city" && (
          <aside>
            <CustomInput
              type="text"
              placeholder="Address line 1"
              name="addressline1"
              onChange={(e) => setState((prev) => ({ ...prev, addressline1: e.target.value }))}
              validatorMessage={error?.zipcode}
            />
            <CustomInput
              type="text"
              placeholder="Address line 2 (optional)"
              name="addressline2"
              onChange={(e) => setState((prev) => ({ ...prev, addressline2: e.target.value }))}
            />
            <CustomInput
              type="text"
              placeholder="city"
              name="city"
              onChange={(e) => setState((prev) => ({ ...prev, city: e.target.value }))}
              validatorMessage={error?.zipcode}
            />
            <Button
              onClick={() => handleSubmitFormInfo("city", "")}
              className="w-full mt-6"
              size={"default"}
              variant="fill">
              Continue
            </Button>
          </aside>
        )}

        <div className="flex justify-center items-center gap-4 mt-8">
          {progressBtns.map((btn) => (
            <div
              key={btn}
              className={`w-3 h-3 rounded-full bg-vobb-neutral-10 cursor-pointer ${
                btn === activeCompanyAddress ? "bg-vobb-primary-70" : ""
              }`}
              onClick={() => setActiveCompanyAddress(btn)}></div>
          ))}
        </div>
      </form>
    </div>
  );
};

export { CompanyAddress };
