import {
  optionType,
  formFieldData,
  BranchMemberTableData,
  BranchTeamTableData,
  MemberTableData,
  TeamTableData,
  OrganisationAttributesData,
  ExistingUserTypes,
  MemberTasksData,
  MemberNotesData
} from "types";
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

export const AttributesTableMock: OrganisationAttributesData[] = [
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
    name: "Garnacho Derulo",
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

export const MemberTableMock: MemberTableData[] = [
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

export const existingUsers: ExistingUserTypes[] = [
  {
    avatar: null,
    label: "First",
    value: "1234"
  },
  {
    avatar: null,
    label: "Last",
    value: "1235"
  },
  {
    avatar: null,
    label: "Third",
    value: "1238"
  },
  {
    avatar: null,
    label: "Sixth",
    value: "1246"
  },
  {
    avatar: null,
    label: "Seventh",
    value: "1241"
  }
];

export const MockedCompletedTasks: MemberTasksData[] = [
  {
    id: "1",
    title: "Complete the project proposal",
    description: "Draft and finalize the project proposal for the upcoming quarter.",
    object: "General",
    creator: {
      id: "101",
      avatar: "https://example.com/avatar_creator1.jpg",
      name: "Olivia Parker"
    },
    status: "complete",
    priority: "high",
    assignedTo: [
      { _id: "201", avatar: "https://example.com/avatar1.jpg", name: "Alice Johnson" },
      { _id: "202", avatar: "https://example.com/avatar2.jpg", name: "Bob Smith" }
    ],
    dueDate: "2024-11-01",
    date: "2024-10-01"
  },
  {
    id: "2",
    title: "Update team on the Q4 targets",
    description: "Discuss the targets and objectives with the team for Q4.",
    object: "General",
    creator: {
      id: "102",
      avatar: "https://example.com/avatar_creator2.jpg",
      name: "Liam Walker"
    },
    status: "complete",
    priority: "medium",
    assignedTo: [{ _id: "203", avatar: "https://example.com/avatar3.jpg", name: "Charlie Brown" }],
    dueDate: "2024-10-15",
    date: "2024-09-25"
  },
  {
    id: "3",
    title: "Finalize new hiring process",
    description: "Complete the documentation for the revised hiring process.",
    object: "Task",
    creator: {
      id: "103",
      avatar: "https://example.com/avatar_creator3.jpg",
      name: "Emma Davis"
    },
    status: "complete",
    priority: "high",
    assignedTo: [
      { _id: "204", avatar: "https://example.com/avatar4.jpg", name: "Dana Lee" },
      { _id: "205", avatar: "https://example.com/avatar5.jpg", name: "Eli Green" }
    ],
    dueDate: "2024-11-10",
    date: "2024-10-05"
  },
  {
    id: "4",
    title: "Create project roadmap",
    description: "Outline and set milestones for the project roadmap.",
    object: "General",
    creator: {
      id: "104",
      avatar: "https://example.com/avatar_creator4.jpg",
      name: "Ava Thompson"
    },
    status: "complete",
    priority: "low",
    assignedTo: [{ _id: "206", avatar: "https://example.com/avatar6.jpg", name: "Frank White" }],
    dueDate: "2024-11-20",
    date: "2024-10-08"
  }
];

export const MockedIncompletedTasks: MemberTasksData[] = [
  {
    id: "78",
    title: "Prepare presentation for stakeholders",
    description: "Develop a comprehensive presentation for the stakeholders meeting.",
    object: "General",
    creator: {
      id: "105",
      avatar: "https://example.com/avatar_creator5.jpg",
      name: "James Anderson"
    },
    status: "incomplete",
    priority: "high",
    assignedTo: [{ _id: "207", avatar: "https://example.com/avatar7.jpg", name: "Grace Black" }],
    dueDate: "2024-12-01",
    date: "2024-10-10"
  },
  {
    id: "6",
    title: "Set up training for new hires",
    description: "Organize a training session covering company policies and processes.",
    object: "General",
    creator: {
      id: "106",
      avatar: "https://example.com/avatar_creator6.jpg",
      name: "Sophia Martinez"
    },
    status: "incomplete",
    priority: "medium",
    assignedTo: [
      { _id: "208", avatar: "https://example.com/avatar8.jpg", name: "Hank Doe" },
      { _id: "209", avatar: "https://example.com/avatar9.jpg", name: "Ivy Green" }
    ],
    dueDate: "2024-11-05",
    date: "2024-10-12"
  },
  {
    id: "7",
    title: "Update compliance documents",
    description: "Ensure all compliance documents are up-to-date and approved.",
    object: "General",
    creator: {
      id: "107",
      avatar: "https://example.com/avatar_creator7.jpg",
      name: "Benjamin Miller"
    },
    status: "incomplete",
    priority: "low",
    assignedTo: [{ _id: "210", avatar: "https://example.com/avatar10.jpg", name: "Jack King" }],
    dueDate: "2024-10-31",
    date: "2024-10-01"
  }
];

export const MockedArchivedTasks: MemberTasksData[] = [
  {
    id: "5",
    title: "Take a sprint",
    description: "Develop a comprehensive presentation for the stakeholders meeting.",
    object: "General",
    creator: {
      id: "105",
      avatar: "https://example.com/avatar_creator5.jpg",
      name: "James Anderson"
    },
    status: "archived",
    priority: "high",
    assignedTo: [{ _id: "207", avatar: "https://example.com/avatar7.jpg", name: "Grace Black" }],
    dueDate: "2024-12-01",
    date: "2024-10-10"
  },
  {
    id: "6",
    title: "STart a marathon",
    description: "Organize a training session covering company policies and processes.",
    object: "General",
    creator: {
      id: "106",
      avatar: "https://example.com/avatar_creator6.jpg",
      name: "Sophia Martinez"
    },
    status: "archived",
    priority: "medium",
    assignedTo: [
      { _id: "208", avatar: "https://example.com/avatar8.jpg", name: "Hank Doe" },
      { _id: "209", avatar: "https://example.com/avatar9.jpg", name: "Ivy Green" }
    ],
    dueDate: "2024-11-05",
    date: "2024-10-12"
  },
  {
    id: "7",
    title: "Deliver an address",
    description: "Ensure all compliance documents are up-to-date and approved.",
    object: "General",
    creator: {
      id: "107",
      avatar: "https://example.com/avatar_creator7.jpg",
      name: "Benjamin Miller"
    },
    status: "archived",
    priority: "low",
    assignedTo: [{ _id: "210", avatar: "https://example.com/avatar10.jpg", name: "Jack King" }],
    dueDate: "2024-10-31",
    date: "2024-10-01"
  }
];

export const MockedMemberNotesData: MemberNotesData[] = [
  {
    id: "1",
    title: "Meeting Notes",
    body: "Discussed project milestones and assigned tasks.",
    creator: {
      id: "u1",
      avatar: null,
      name: "Alice Johnson"
    },
    isPublic: true,
    createdAt: "2024-11-18T10:30:00Z"
  },
  {
    id: "2",
    title: "Sprint Retrospective",
    body: "Reviewed the past sprint and noted areas for improvement.",
    creator: {
      id: "u2",
      avatar: "https://example.com/avatars/u2.png",
      name: "Bob Smith"
    },
    isPublic: false,
    createdAt: "2024-11-17T15:45:00Z"
  },
  {
    id: "3",
    title: "Client Feedback",
    body: "Captured feedback from the client on the latest release.",
    creator: {
      id: "u3",
      avatar: null,
      name: "Charlie Davis"
    },
    isPublic: true,
    createdAt: "2024-11-16T08:20:00Z"
  },
  {
    id: "4",
    title: "Bug Report",
    body: "Logged critical bugs discovered during testing.",
    creator: {
      id: "u4",
      avatar: "https://example.com/avatars/u4.png",
      name: "Diana Ross"
    },
    isPublic: false,
    createdAt: "2024-11-15T13:00:00Z"
  },
  {
    id: "5",
    title: "Team Update",
    body: "Provided an update on team progress and upcoming tasks.",
    creator: {
      id: "u5",
      avatar: null,
      name: "Ethan Hunt"
    },
    isPublic: true,
    createdAt: "2024-11-14T09:15:00Z"
  }
];
