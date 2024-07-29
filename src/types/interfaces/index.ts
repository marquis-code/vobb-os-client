export interface optionType {
  label: string;
  value: string;
  isDisabled?: boolean
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

export interface PaginationProps {
  page?: number;
  limit?: number;
}
