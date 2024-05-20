import { BranchTableData } from "components";
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
