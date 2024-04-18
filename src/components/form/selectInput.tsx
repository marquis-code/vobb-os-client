import Select from "react-select";
export type OptionType = { value: string; label: string };

interface SelectInputProps {
  options: OptionType[];
  selectedOption: OptionType | null | undefined;
  handleSelectChange: (newValue: OptionType | null) => void;
  placeholder?: string;
  validatorMessage?: string;
  label?: string;
  name: string;
}
const SelectInput: React.FC<SelectInputProps> = ({
  options,
  selectedOption,
  handleSelectChange,
  placeholder,
  label,
  name,
  validatorMessage
}) => {
  return (
    <div>
      {label && <label>{label}</label>}{" "}
      <Select
        defaultValue={selectedOption}
        onChange={handleSelectChange}
        options={options}
        value={selectedOption}
        placeholder={placeholder}
        name={name}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            border: validatorMessage ? "1px solid border-error-10" : "1px solid #d0d5dd",
            boxShadow: "0px 1px 2px 0px #1018280d",
            padding: "3px",
            height: "42px",
            borderRadius: 6,
            fontSize: "14px",
            color: "var(--neutral-40)"
          }),
          placeholder: (baseStyles, state) => ({
            ...baseStyles,
            color: "#d0d5dd"
          })
        }}
      />
      {validatorMessage && (
        <small className="block text=-xs mt-1 text-error-10">{validatorMessage}</small>
      )}
    </div>
  );
};

export { SelectInput };
