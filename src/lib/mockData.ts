import { optionType, formFieldData, BranchMemberTableData, BranchTeamTableData } from "types";
import { TeamActivityData } from "modules";

export const loginHistoryMock = [
  {
    location: "Lagos, Nigeria",
    date: "05/05/2024",
    time: "5:15pm",
    ipAddress: "192.168.0.180",
    isBlacklisted: true
  },
  {
    location: "Oyo, Nigeria",
    date: "05/05/2024",
    time: "5:15pm",
    ipAddress: "192.168.134.180",
    isBlacklisted: false
  },
  {
    location: "Lagos, Nigeria",
    date: "05/05/2024",
    time: "5:25pm",
    ipAddress: "192.168.012.180",
    isBlacklisted: true
  }
];

export const BranchTableMock = [
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
const mockOptions: optionType[] = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" }
];

export const MockDynamicData: formFieldData[] = [
  {
    shortText: {
      value: "John Doe",
      type: "short_text"
    }
  },
  {
    longText: {
      value: "This is a long text field example.",
      word_limit: 100,
      type: "long_text"
    }
  },
  {
    number: {
      value: 30,
      type: "number"
    }
  },
  {
    email: {
      value: "johndoe@example.com",
      type: "email"
    }
  },
  {
    phoneNumber: {
      value: "+2347045678906",
      type: "phone_number"
    }
  },
  {
    country: {
      value: mockOptions[0],
      options: mockOptions,
      type: "country"
    }
  },
  {
    multipleChoice: {
      value: [mockOptions[0]],
      options: mockOptions,
      type: "multiple_choice"
    }
  },
  {
    checkbox: {
      value: [mockOptions[0]],
      options: mockOptions,
      type: "checkbox"
    }
  },
  {
    dropdown: {
      value: mockOptions[0],
      options: mockOptions,
      type: "dropdown"
    }
  },
  {
    file: {
      value: new File([""], "example.png"),
      fileType: ["image", "pdf"],
      maxSize: 5 * 1024 * 1024,
      type: "file"
    }
  },
  {
    date: {
      value: new Date(),
      dateFormat: "DD/MM/YYYY",
      type: "date"
    }
  }
];

export const accountActivityMockData = [
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

export const orgActivityMockData = [
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

export const AttributesTableMock = [
  {
    id: "1234",
    title: "First name",
    type: "text",
    required: true,
    isSystem: true,
    isActive: true
  },
  {
    id: "1234",
    title: "Last name",
    type: "text",
    required: true,
    isSystem: true,
    isActive: true
  },
  {
    id: "1234",
    title: "Bio",
    type: "long-text",
    required: true,
    isSystem: true,
    isActive: true
  },
  {
    id: "1234",
    title: "SSN",
    type: "number",
    required: true,
    isSystem: true,
    isActive: true
  },
  {
    id: "1234",
    title: "Email",
    type: "email",
    required: true,
    isSystem: true,
    isActive: true
  },
  {
    id: "1234",
    title: "CV",
    type: "file",
    required: true,
    isSystem: true,
    isActive: true
  },
  {
    id: "1234",
    title: "Next of kin number",
    type: "phone-number",
    required: true,
    isSystem: true,
    isActive: true
  },
  {
    id: "1234",
    title: "Nationality",
    type: "country",
    required: true,
    isSystem: true,
    isActive: true
  }
  // {
  //   id: "728ed52f",
  //   title: "Date of birth",
  //   type: "date",
  //   required: true,
  //   isSystem: false,
  //   isActive: true
  // },
  // {
  //   id: "728ed52f",
  //   title: "City",
  //   type: "dropdown",
  //   required: true,
  //   isSystem: false,
  //   isActive: true
  // },
  // {
  //   id: "728ed52f",
  //   title: "Language",
  //   type: "multiple-choice",
  //   required: true,
  //   isSystem: false,
  //   isActive: true
  // },
  // {
  //   id: "728ed52f",
  //   title: "Remote",
  //   type: "checkbox",
  //   required: true,
  //   isSystem: false,
  //   isActive: true
  // },
  // {
  //   id: "728ed52f",
  //   title: "Start date",
  //   type: "date",
  //   required: true,
  //   isSystem: false,
  //   isActive: false
  // }
];

export const BranchMemberTableMock: BranchMemberTableData[] = [
  {
    id: "728ed52f",
    name: "Jason Derule",
    email: "jason@gmail.com",
    teams: ["Finance", "Operations"],
    role: "Member",
    date: "12/12/2023"
  },
  {
    id: "728ed52f",
    name: "Jason Derule",
    email: "jason@gmail.com",
    teams: ["Finance", "Operations"],
    role: "Team lead",
    date: "12/12/2023"
  },
  {
    id: "728ed52f",
    name: "Jason Derule",
    email: "jason@gmail.com",
    teams: ["Engineering", "Operations", "Support", "Tech"],
    role: "Branch manager",
    date: "12/12/2023"
  },
  {
    id: "728ed52f",
    name: "Jason Derulo",
    email: "jason@gmail.com",
    teams: ["Support"],
    role: "Team manager",
    date: "12/12/2023"
  }
];

export const BranchTeamTableMock: BranchTeamTableData[] = [
  {
    id: "728ed52f",
    name: "Finance",
    icon: "FaUsers",
    teamLeads: ["Busayo Cole", "Itune Ajayi"],
    teamManagers: ["Busayo Cole", "Itune Ajayi"],
    date: "12/12/2023",
    numberOfMembers: 12
  },
  {
    id: "728ed52f",
    name: "Engineering",
    icon: "BsTools",
    teamLeads: ["Busayo Cole", "Itune Ajayi"],
    teamManagers: ["Busayo Cole", "Itune Ajayi"],
    date: "12/12/2023",
    numberOfMembers: 12
  },
  {
    id: "728ed52f",
    name: "Support",
    icon: "FaUsers",
    teamLeads: ["Busayo Cole", "Itune Ajayi"],
    teamManagers: ["Busayo Cole", "Itune Ajayi"],
    date: "12/12/2023",
    numberOfMembers: 12
  },
  {
    id: "728ed52f",
    name: "Sales",
    icon: "FaUsers",
    teamLeads: ["Busayo Cole", "Itune Ajayi"],
    teamManagers: ["Busayo Cole", "Itune Ajayi"],
    date: "12/12/2023",
    numberOfMembers: 12
  }
];

export const TeamTableMock = [
  {
    id: "728ed52f",
    name: "Finance",
    icon: "FaUsers",
    teamLeads: ["Busayo Cole", "Itune Ajayi"],
    teamManagers: ["Busayo Cole", "Itune Ajayi"],
    date: "12/12/2023",
    numberOfMembers: 12,
    numberOfBranches: 45
  },
  {
    id: "728ed52f",
    name: "Engineering",
    icon: "BsTools",
    teamLeads: ["Busayo Cole", "Itune Ajayi"],
    teamManagers: ["Busayo Cole", "Itune Ajayi"],
    date: "12/12/2023",
    numberOfMembers: 12,
    numberOfBranches: 15
  },
  {
    id: "728ed52f",
    name: "Support",
    icon: "FaUsers",
    teamLeads: ["Busayo Cole", "Itune Ajayi"],
    teamManagers: ["Busayo Cole", "Itune Ajayi"],
    date: "12/12/2023",
    numberOfMembers: 12,
    numberOfBranches: 15
  },
  {
    id: "728ed52f",
    name: "Sales",
    icon: "FaUsers",
    teamLeads: ["Busayo Cole", "Itune Ajayi"],
    teamManagers: ["Busayo Cole", "Itune Ajayi"],
    date: "12/12/2023",
    numberOfMembers: 12,
    numberOfBranches: 15
  }
];

export const TeamMemberTableMock = [
  {
    id: "728ed52f",
    name: "Jason Derule",
    email: "jason@gmail.com",
    role: "Member",
    date: "12/12/2023"
  },
  {
    id: "728ed52f",
    name: "Jason Derule",
    email: "jason@gmail.com",
    role: "Team lead",
    date: "12/12/2023"
  },
  {
    id: "728ed52f",
    name: "Jason Derule",
    email: "jason@gmail.com",
    role: "Branch manager",
    date: "12/12/2023"
  },
  {
    id: "728ed52f",
    name: "Jason Derulo",
    email: "jason@gmail.com",
    role: "Team manager",
    date: "12/12/2023"
  }
];

export const MemberTableMock = [
  {
    id: "728ed52f",
    name: "Jason Derule",
    email: "jasonjasonjasonjason@gmail.com",
    teams: ["Finance", "Operations", "Finance", "Operations", "Finance", "Operations"],
    role: "Member",
    date: "---",
    lastActive: "---",
    status: "invited",
    branch: ["Headquarters"],
    avatar: "",
    initial: "JD"
  },
  {
    id: "728ed52f",
    name: "Jason Mamoa",
    email: "jason@gmail.com",
    teams: ["Finance", "Operations"],
    role: "Member",
    date: "12/12/2023",
    lastActive: "07/07/2024",
    status: "expired",
    branch: ["Headquarters"],
    avatar: "",
    initial: "JD"
  },
  {
    id: "728ed52f",
    name: "Jason Derule",
    email: "jason@gmail.com",
    teams: ["Finance", "Operations"],
    role: "Member",
    date: "12/12/2023",
    lastActive: "07/07/2024",
    status: "active",
    branch: ["Headquarters"],
    avatar: "",
    initial: "JD"
  },
  {
    id: "728ed52f",
    name: "Jason Derule",
    email: "jason@gmail.com",
    teams: ["Finance", "Operations"],
    role: "Member",
    date: "12/12/2023",
    lastActive: "07/07/2024",
    status: "suspended",
    branch: ["Headquarters"],
    avatar: "",
    initial: "JD"
  },
  {
    id: "728ed52f",
    name: "Jason Derule",
    email: "jason@gmail.com",
    teams: ["Finance", "Operations"],
    role: "Member",
    date: "---",
    lastActive: "---",
    status: "invited",
    branch: ["Headquarters"],
    avatar: "",
    initial: "JD"
  },
  {
    id: "728ed52f",
    name: "Jason Derule",
    email: "jason@gmail.com",
    teams: ["Finance", "Operations"],
    role: "Member",
    date: "---",
    lastActive: "---",
    status: "invited",
    branch: ["Headquarters"],
    avatar: "",
    initial: "JD"
  }
];

export const teamActivityMockData: TeamActivityData[] = [
  {
    action: "joined",
    date: "05/05/2024",
    time: "5:05pm",
    initiator: { name: "James Arukpo", id: "james" },
    metadata: undefined
  },
  {
    action: "edited",
    date: "05/05/2024",
    time: "5:05pm",
    initiator: { name: "Dayo", id: "dayo" },
    metadata: {
      fields: "Name, Icon, Permissions"
    }
  },
  {
    action: "new_invitation",
    date: "05/05/2024",
    time: "5:05pm",
    initiator: { name: "Dayo", id: "dayo" },
    metadata: {
      memberName: "Tolulope Adeniji"
    }
  },
  {
    action: "created",
    date: "05/05/2024",
    time: "5:05pm",
    initiator: { name: "Dayo", id: "dayo" },
    metadata: undefined
  }
];
