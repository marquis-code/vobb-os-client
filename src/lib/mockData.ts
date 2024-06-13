import { AttributeTableData, BranchTableData } from "components";
import { AccountActivityData, OrgActivityData } from "modules";
import { DeviceData } from "modules/account/security/loginHistory";

export const loginHistoryMock: DeviceData[] = [
  {
    location: "Lagos, Nigeria",
    date: "05/05/2024",
    time: "5:15pm",
    ipAddress: "192.168.0.180",
    isActive: true
  },
  {
    location: "Oyo, Nigeria",
    date: "05/05/2024",
    time: "5:15pm",
    ipAddress: "192.168.134.180",
    isActive: false
  },
  {
    location: "Lagos, Nigeria",
    date: "05/05/2024",
    time: "5:25pm",
    ipAddress: "192.168.012.180",
    isActive: true
  }
];

export const BranchTableMock: BranchTableData[] = [
  {
    id: "728ed52f",
    name: "Headquarters",
    country: "Nigeria",
    state: "Lagos",
    city: "Ikeja",
    timeZone: "GMT +1",
    isPrimary: true
  },
  {
    id: "728ed52f",
    name: "Branch Ide",
    country: "Canada",
    state: "Ontario",
    city: "Toronto",
    timeZone: "GMT -6",
    isPrimary: false
  }
];

export const accountActivityMockData: AccountActivityData[] = [
  {
    action: "updated_role",
    date: "05/05/2024",
    time: "5:05pm",
    initiator: { name: "Dayo", id: "dayo" },
    metadata: {
      oldRole: "team member",
      newRole: "team lead"
    }
  },
  {
    action: "removed_2fa",
    date: "05/05/2024",
    time: "5:05pm",
    initiator: "self",
    metadata: undefined
  },
  {
    action: "added_2fa",
    date: "05/05/2024",
    time: "5:05pm",
    initiator: "self",
    metadata: undefined
  },
  {
    action: "removed_google_auth",
    date: "05/05/2024",
    time: "5:05pm",
    initiator: "self",
    metadata: undefined
  },
  {
    action: "added_google_auth",
    date: "05/05/2024",
    time: "5:05pm",
    initiator: "self",
    metadata: undefined
  },
  {
    action: "verified_email",
    date: "05/05/2024",
    time: "5:05pm",
    initiator: "self",
    metadata: {
      email: "testinggg@yopmail.com"
    }
  },
  {
    action: "changed_email",
    date: "05/05/2024",
    time: "5:05pm",
    initiator: "self",
    metadata: {
      oldEmail: "test@yopmail.com",
      newEmail: "testinggg@yopmail.com"
    }
  },
  {
    action: "changed_password",
    date: "05/05/2024",
    time: "5:05pm",
    initiator: "self",
    metadata: undefined
  },
  {
    action: "updated_profile",
    date: "05/05/2024",
    time: "5:05pm",
    initiator: "self",
    metadata: {
      fields: "Firstname, Lastname"
    }
  },
  {
    action: "updated_profile",
    date: "05/05/2024",
    time: "5:05pm",
    initiator: { name: "James Arukpo", id: "james" },
    metadata: {
      fields: "Firstname, Lastname"
    }
  },
  {
    action: "assigned_role",
    date: "05/05/2024",
    time: "5:05pm",
    initiator: { name: "Dayo", id: "dayo" },
    metadata: {
      role: "team lead"
    }
  },
  {
    action: "joined_team",
    date: "05/05/2024",
    time: "5:05pm",
    initiator: "self",
    metadata: {
      teamName: "Finance",
      teamId: "Finance"
    }
  },
  {
    action: "joined_branch",
    date: "05/05/2024",
    time: "5:05pm",
    initiator: "self",
    metadata: {
      branchName: "Headquarters",
      branchId: "Headquarters"
    }
  },
  {
    action: "joined_org",
    date: "05/05/2024",
    time: "5:05pm",
    initiator: "self",
    metadata: undefined
  }
];

export const orgActivityMockData: OrgActivityData[] = [
  {
    action: "updated_branding",
    date: "05/05/2024",
    time: "5:05pm",
    initiator: { name: "Dayo", id: "dayo" },
    metadata: undefined
  },
  {
    action: "new_bank_account",
    date: "05/05/2024",
    time: "5:05pm",
    initiator: { name: "Dayo", id: "dayo" },
    metadata: {
      currency: "USD"
    }
  },
  {
    action: "removed_bank_account",
    date: "05/05/2024",
    time: "5:05pm",
    initiator: { name: "Dayo", id: "dayo" },
    metadata: {
      currency: "USD"
    }
  },
  {
    action: "added_member_attribute",
    date: "05/05/2024",
    time: "5:05pm",
    initiator: { name: "Dayo", id: "dayo" },
    metadata: {
      attribute: "Date of birth"
    }
  },
  {
    action: "disabled_client_attribute",
    date: "05/05/2024",
    time: "5:05pm",
    initiator: { name: "Dayo", id: "dayo" },
    metadata: {
      attribute: "interest"
    }
  },
  {
    action: "added_client_attribute",
    date: "05/05/2024",
    time: "5:05pm",
    initiator: { name: "Dayo", id: "dayo" },
    metadata: {
      attribute: "interest"
    }
  },
  {
    action: "removed_branch",
    date: "05/05/2024",
    time: "5:05pm",
    initiator: { name: "Dayo", id: "dayo" },
    metadata: {
      branchName: "Headquarters",
      branchId: "Headquarters"
    }
  },
  {
    action: "removed_team",
    date: "05/05/2024",
    time: "5:05pm",
    initiator: { name: "Dayo", id: "dayo" },
    metadata: {
      teamName: "Finance",
      teamId: "Finance"
    }
  },
  {
    action: "updated_profile",
    date: "05/05/2024",
    time: "5:05pm",
    initiator: { name: "James Arukpo", id: "james" },
    metadata: {
      fields: "Name, Logo"
    }
  },
  {
    action: "added_team",
    date: "05/05/2024",
    time: "5:05pm",
    initiator: { name: "Dayo", id: "dayo" },
    metadata: {
      teamName: "Finance",
      teamId: "Finance"
    }
  },
  {
    action: "added_branch",
    date: "05/05/2024",
    time: "5:05pm",
    initiator: { name: "Dayo", id: "dayo" },
    metadata: {
      branchName: "Headquarters",
      branchId: "Headquarters"
    }
  },
  {
    action: "created",
    date: "05/05/2024",
    time: "5:05pm",
    initiator: { name: "Dayo", id: "dayo" },
    metadata: {
      organization: "Bloomberg"
    }
  }
];

export const AttributesTableMock: AttributeTableData[] = [
  {
    id: "1234",
    title: "First name",
    type: "text",
    icon: "people",
    required: true,
    isSystem: true,
    isActive: true
  },
  {
    id: "1234",
    title: "Last name",
    type: "text",
    icon: "people",
    required: true,
    isSystem: true,
    isActive: true
  },
  {
    id: "1234",
    title: "Email",
    type: "email",
    icon: "letter",
    required: true,
    isSystem: true,
    isActive: true
  },
  {
    id: "728ed52f",
    title: "Date of birth",
    type: "date",
    icon: "calendar",
    required: true,
    isSystem: false,
    isActive: true
  },
  {
    id: "728ed52f",
    title: "Start date",
    type: "date",
    icon: "calendar",
    required: true,
    isSystem: false,
    isActive: false
  }
];
