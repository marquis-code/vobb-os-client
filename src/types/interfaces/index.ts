export interface optionType {
  label: string;
  value: string;
  isDisabled?: boolean
}

export interface ModalProps {
  close: () => void;
  show: boolean;
}
