import { optionType, formFieldData } from "types";

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
    short_text: {
      value: "John Doe",
      type: "short_text"
    }
  },
  {
    long_text: {
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
    phone_number: {
      value: "+1234567890",
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
    multiple_choice: {
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
