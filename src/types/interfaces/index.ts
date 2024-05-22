export interface optionType {
  label: string;
  value: string;
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

export interface UserProfileProps {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar: string;
  phoneNumber: string;
  dateFormat: string;
  language: string;
  twoFaStatus: boolean;
  googleStatus: boolean;
  timezone: string;
  pendingEmail: string | null;
  fluentLanguages: string[];
}

export interface BlacklistProps {
  ipAddress: string;
  status: boolean;
}

export interface OrganisationProfileProps {
  organisation: string;
  logo: string;
  sector: string[];
  website: string;
  primaryEmail: string;
  secondaryEmail: string;
  pendingPrimaryEmail: string;
  pendingSecondaryEmail: string;
}
