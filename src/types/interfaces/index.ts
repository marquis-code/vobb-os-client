export interface optionType {
  label: string;
  value: string;
  isDisabled?: boolean;
}

export interface ModalProps {
  close: () => void;
  show: boolean;
}

export interface ChangePasswordData {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

export interface MetaDataProps {
  currentPage: number;
  totalCount: number;
  totalPages: number;
  pageLimit?: number;
}

export interface stagesType {
  title?: string | undefined;
  color?: string | undefined;
}
export interface ExistingUserTypes {
  avatar?: any | File;
  label: string;
  value: string;
}
