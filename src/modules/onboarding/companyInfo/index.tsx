import { Arrow, CompanyInfoIcon } from "assets";
import { useOnboardingContext } from "context";
import { CompanyFormData, CompanyFormProps } from "types/onboarding";
import { Button, CustomInput, SelectInput } from "components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { optionType } from "@/types/interfaces";

const sectorOptions: optionType[] = [
  {
    label: "Education",
    value: "Education"
  },
  {
    label: "Medical and Health",
    value: "Medical and Health"
  },
  {
    label: "Tourism",
    value: "Tourism"
  }
];

const teamSizeOptions: optionType[] = [
  {
    label: "0-5 Team members",
    value: "0-5"
  },
  {
    label: "6-10 Team members",
    value: "6-10"
  },
  {
    label: "11-20 Team members",
    value: "11-20"
  },
  {
    label: "21-50 Team members",
    value: "21-50"
  },
  {
    label: "50+ Team members",
    value: "50+"
  }
];

const CompanyInfo: React.FC<CompanyFormProps> = ({ initData, submit }) => {
  const { handleFormChange } = useOnboardingContext();
  const [activeCompanyInfo, setActiveCompanyInfo] = useState<string>("organisation");

  const handleFormDisplay = (newActiveCompanyInfo: string) => {
    setActiveCompanyInfo(newActiveCompanyInfo);
  };

  const handleFormSubmit = (data: CompanyFormData) => {
    if (activeCompanyInfo === "sector") {
      submit(data);
    }
  };

  const progressBtns = ["organisation", "teamSize", "sector"];
  return (
    <div className="max-w-[400px] h-[100dvh] m-auto ">
      <Arrow
        role="button"
        className="hidden absolute top-20 left-[40%] lg:block w-8 h-8 rotate-180 border border-neutral-400 rounded-full p-1 fill-neutral-400"
        onClick={() => handleFormChange("fullname", ["fullname"])}
      />
      <CompanyInfoIcon className="mb-6 m-auto" />
      <div className="mb-4 text-center mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-vobb-neutral-100 text-center">
          Company information
        </h2>
        <p>Help us get to know your organisation better</p>
      </div>
      <div>
        {activeCompanyInfo === "organisation" && (
          <OrganisationForm
            initData={initData}
            submit={handleFormSubmit}
            changeActiveState={handleFormDisplay}
          />
        )}
        {activeCompanyInfo === "teamSize" && (
          <TeamSizeForm
            initData={initData}
            submit={handleFormSubmit}
            changeActiveState={handleFormDisplay}
          />
        )}
        {activeCompanyInfo === "sector" && (
          <SectorForm initData={initData} submit={handleFormSubmit} />
        )}
      </div>
      <div className="flex justify-center items-center gap-4 mt-8">
        {progressBtns.map((btn) => (
          <div
            key={btn}
            className={`w-3 h-3 rounded-full bg-vobb-neutral-10 cursor-pointer ${
              btn === activeCompanyInfo ? "bg-vobb-primary-70" : ""
            }`}
            onClick={() => setActiveCompanyInfo(btn)}></div>
        ))}
      </div>
    </div>
  );
};

export { CompanyInfo };

// OrganisationForm.tsx
interface OrganisationFormProps {
  initData?: CompanyFormData;
  submit: (data: CompanyFormData) => void;
  changeActiveState: (newActiveCompanyInfo: string) => void;
}

const OrganisationForm: React.FC<OrganisationFormProps> = ({
  initData,
  submit,
  changeActiveState
}) => {
  const organisationSchema = yup.object().shape({
    organisation: yup.string().required("Required")
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CompanyFormData>({
    resolver: yupResolver(organisationSchema),
    defaultValues: initData
  });

  const onSubmit = (data: CompanyFormData) => {
    submit(data);
    changeActiveState("teamSize");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        type="text"
        placeholder="Name of organisation"
        name="organisation"
        register={register}
        validatorMessage={errors.organisation?.message}
      />
      <Button type="submit" className="w-full mt-6" size={"default"} variant="fill">
        Continue
      </Button>
    </form>
  );
};

// TeamSizeForm.tsx
interface TeamSizeFormProps {
  initData?: CompanyFormData;
  submit: (data: CompanyFormData) => void;
  changeActiveState: (newActiveCompanyInfo: string) => void;
}

const TeamSizeForm: React.FC<TeamSizeFormProps> = ({ initData, submit, changeActiveState }) => {
  const teamSizeSchema = yup.object().shape({
    teamSize: yup
      .object()
      .shape({
        label: yup.string().required("Required"),
        value: yup.string().required("Required")
      })
      .required("Required")
  });
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<CompanyFormData>({
    resolver: yupResolver<any>(teamSizeSchema),
    defaultValues: initData
  });

  const onSubmit = (data: CompanyFormData) => {
    submit(data);
    changeActiveState("sector");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SelectInput
        name="teamSize"
        options={teamSizeOptions}
        onChange={(value) => setValue("teamSize", value)}
        value={watch("teamSize")}
        validatorMessage={
          errors.teamSize?.message ??
          errors.teamSize?.value?.message ??
          errors.teamSize?.label?.message
        }
      />
      <Button type="submit" className="w-full mt-6" size={"default"} variant="fill">
        Continue
      </Button>
    </form>
  );
};

// SectorForm.tsx
interface SectorFormProps {
  initData?: CompanyFormData;
  submit: (data: CompanyFormData) => void;
}

const SectorForm: React.FC<SectorFormProps> = ({ initData, submit }) => {
  const sectorSchema = yup.object().shape({
    sector: yup
      .object()
      .shape({
        label: yup.string().required("Required"),
        value: yup.string().required("Required")
      })
      .required("Required")
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<CompanyFormData>({
    resolver: yupResolver<any>(sectorSchema),
    defaultValues: initData
  });

  const onSubmit = (data: CompanyFormData) => {
    submit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SelectInput
        name="sector"
        options={sectorOptions}
        value={watch("sector")}
        onChange={(value) => setValue("sector", value)}
        validatorMessage={
          errors.sector?.message ?? errors.sector?.value?.message ?? errors.sector?.label?.message
        }
      />
      <Button type="submit" className="w-full mt-6" size={"default"} variant="fill">
        Submit
      </Button>
    </form>
  );
};
