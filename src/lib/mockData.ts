import { BranchTableData } from "components";
import { AccountActivityData } from "modules";
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