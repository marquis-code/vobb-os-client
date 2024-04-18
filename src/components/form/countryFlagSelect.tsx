import ReactFlagsSelect from "react-flags-select";

interface CountryFlagSelectProps {
  selectedOption: string | undefined;
  handleSelectChange: (country: string) => void;
  placeholder?: string;
  validatorMessage?: string;
  label?: string;
  name?: string;
}
const CountryFlagSelect: React.FC<CountryFlagSelectProps> = ({
  selectedOption,
  handleSelectChange,
  placeholder,
  validatorMessage,
  label
}) => {
  const selectedValue = selectedOption || "";
  return (
    <div>
      {label && <label>{label}</label>}{" "}
      <ReactFlagsSelect
        selected={selectedValue}
        onSelect={handleSelectChange}
        placeholder={placeholder}
      />
      ;
      {validatorMessage && (
        <small className="block text=-xs mt-1 text-error-10">{validatorMessage}</small>
      )}
    </div>
  );
};

export { CountryFlagSelect };
