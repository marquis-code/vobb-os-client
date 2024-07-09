import { createContext, useState, useContext, ReactNode } from "react";
import {
  AttributesDataProps,
  BranchesDataProps,
  BranchMembersProps,
  BranchTeamsProps,
  OrganisationProfileProps,
  UserProfileProps
} from "types";

interface UserContextProps {
  userDetails: UserProfileProps | null;
  orgDetails: OrganisationProfileProps | null;
  orgBranches: BranchesDataProps | null;
  orgAttributes: AttributesDataProps | null;
  branchMembers: BranchMembersProps | null;
  branchTeams: BranchTeamsProps | null;
  handleUpdateUser: (userDetails: UserProfileProps | null) => void;
  handleUpdateOrg: (orgDetails: OrganisationProfileProps | null) => void;
  handleUpdateBranches: (orgBranches: BranchesDataProps | null) => void;
  handleUpdateAttributes: (orgAttributes: AttributesDataProps | null) => void;
  handleUpdateBranchMembers: (branchMembers: BranchMembersProps | null) => void;
  handleUpdateBranchTeams: (branchTeams: BranchTeamsProps | null) => void;
}

const UserDetailsContext = createContext<UserContextProps | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserDetailsContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserDetailsProvider");
  }
  return context;
};

export const UserDetailsProvider = ({ children }: { children: ReactNode }) => {
  const [userDetails, setUserDetails] = useState<UserProfileProps | null>(null);
  const [orgDetails, setOrgDetails] = useState<OrganisationProfileProps | null>(null);
  const [orgBranches, setOrgBranches] = useState<BranchesDataProps | null>(null);
  const [orgAttributes, setOrgAttributes] = useState<AttributesDataProps | null>(null);
  const [branchMembers, setBranchMembers] = useState<BranchMembersProps | null>(null);
  const [branchTeams, setBranchTeams] = useState<BranchTeamsProps | null>(null);

  const handleUpdateUser = (userDetails: UserProfileProps | null) => {
    setUserDetails(userDetails);
  };

  const handleUpdateOrg = (orgDetails: OrganisationProfileProps | null) => {
    setOrgDetails(orgDetails);
  };

  const handleUpdateBranches = (orgBranches: BranchesDataProps | null) => {
    setOrgBranches(orgBranches);
  };

  const handleUpdateAttributes = (orgAttributes: AttributesDataProps | null) => {
    setOrgAttributes(orgAttributes);
  };

  const handleUpdateBranchMembers = (branchMembers: BranchMembersProps | null) => {
    setBranchMembers(branchMembers);
  };
  const handleUpdateBranchTeams = (branchTeams: BranchTeamsProps | null) => {
    setBranchTeams(branchTeams);
  };
  return (
    <UserDetailsContext.Provider
      value={{
        userDetails,
        orgDetails,
        orgBranches,
        orgAttributes,
        branchMembers,
        branchTeams,
        handleUpdateUser,
        handleUpdateOrg,
        handleUpdateBranches,
        handleUpdateAttributes,
        handleUpdateBranchMembers,
        handleUpdateBranchTeams
      }}>
      {children}
    </UserDetailsContext.Provider>
  );
};
