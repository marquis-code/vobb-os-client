import {
  IconArrowsDiagonalMinimize2,
  IconArrowsMaximize,
  IconLock,
  IconLockOpen,
  IconPlus,
  IconX
} from "@tabler/icons-react";
import {
  Button,
  CustomInput,
  CustomTextarea,
  LoadingSpinner,
  Modal,
  UsersDropdown
} from "components";
import React, { useEffect, useState } from "react";
import {
  ExistingUserTypes,
  MemberNotesData,
  MemberProfileProps,
  ModalProps,
  optionType
} from "types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { useParams } from "react-router-dom";
import { useDebounce } from "hooks";

export interface EditNoteData {
  title: string;
  body: string;
  isPublic: boolean;
  assignedTo: optionType[];
}

interface EditMemberNoteModalProps extends ModalProps {
  submit: (id: string, data: EditNoteData) => void;
  loading: boolean;
  memberProfile: MemberProfileProps;
  initData: MemberNotesData;
  allUsers: {
    usersearchQuery: string;
    users: ExistingUserTypes[];
    loadingUsers: boolean;
    handleSearch: (filter: string, value: string | number) => void;
  };
}

const schema = yup.object().shape({
  title: yup.string().required("Required"),
  body: yup.string().required("Required"),
  isPublic: yup.boolean().required(),
  assignedTo: yup
    .array()
    .of(
      yup.object({
        label: yup.string().required("Required"),
        value: yup.string().required("Required")
      })
    )
    .required("Assigned To is required")
});
const EditMemberNoteModal: React.FC<EditMemberNoteModalProps> = ({
  show,
  close,
  submit,
  memberProfile,
  allUsers,
  initData,
  loading
}) => {
  const [minimized, setMinimized] = useState(true);
  const { id } = useParams();
  const { users, loadingUsers, usersearchQuery, handleSearch } = allUsers;
  const assignedUser = users.find((user) => user.value === id);
  const {
    register,
    setValue,
    watch,
    formState: { errors, dirtyFields },
    getValues
  } = useForm<EditNoteData>({
    resolver: yupResolver(schema),
    defaultValues: initData
  });
  const assignedTo = watch("assignedTo");

  const handleSetUsers = (user: ExistingUserTypes) => {
    const currentAssignedTo = getValues("assignedTo");

    if (currentAssignedTo.some((item) => item.value === user.value)) {
      setValue(
        "assignedTo",
        currentAssignedTo.filter((item) => item.value !== user.value)
      );
    } else {
      setValue("assignedTo", [...currentAssignedTo, user]);
    }
  };

  const isPublic = watch("isPublic");
  const title = watch("title");
  const body = watch("body");

  const debouncedTitle = useDebounce(title, 1000);
  const debouncedBody = useDebounce(body, 1000);

  useEffect(() => {
    if (assignedUser) {
      setValue("assignedTo", [assignedUser]);
    }
    if (initData) {
      setValue("title", initData.title);
      setValue("body", initData.body);
      setValue("isPublic", initData.isPublic);
    }
  }, [assignedUser, initData]);

  useEffect(() => {
    const changedFields: any = {};

    if (debouncedTitle !== initData.title) {
      changedFields.title = debouncedTitle;
      changedFields.body = debouncedBody;
    }
    if (debouncedBody !== initData.body) {
      changedFields.body = debouncedBody;
    }
    if (isPublic !== initData.isPublic) {
      changedFields.isPublic = isPublic;
    }

    if (Object.keys(changedFields).length > 0) {
      submit(initData.id, changedFields);
    }
  }, [debouncedTitle, debouncedBody, dirtyFields]);

  return (
    <Modal
      contentClassName={`${minimized ? "max-w-[480px]" : "max-w-[944px] h-[396px]"}  p-0 h-fit`}
      show={show}
      close={close}
      testId="editNote-modal">
      <div className="flex items-center justify-between px-4 py-2 border-b border-vobb-neutral-20">
        <div className="flex items-center gap-3">
          <Button
            variant={"outline"}
            className={
              "w-fit justify-start text-left items-center font-normal text-xs h-9 py-1 px-3 gap-1"
            }>
            <Avatar className="w-5 h-5">
              <AvatarImage src={memberProfile.avatar} alt="profile picture" />

              <AvatarFallback className="text-[10px]">
                {memberProfile.fullName.charAt(0)}
                {memberProfile.fullName.charAt(1)}
              </AvatarFallback>
            </Avatar>
            <p>{memberProfile.fullName}</p>
          </Button>
          <UsersDropdown
            selectedUsers={assignedTo ?? []}
            handleSetUsers={handleSetUsers}
            users={users}
            loadingUsers={loadingUsers}
            userSearchQuery={usersearchQuery}
            handleSearch={handleSearch}
            trigger={
              <Button
                variant={"outline"}
                size={"icon"}
                data-testid="close-btn"
                className="shadow-sm p-0">
                <IconPlus size={18} />
              </Button>
            }
          />
        </div>

        <div className="flex items-center gap-3">
          <VisibilityDropdown setValue={setValue} isVisible={isPublic} />
          <Button variant={"outline"} size={"icon"} data-testid="close-btn" className="shadow-sm">
            {minimized ? (
              <IconArrowsMaximize size={20} onClick={() => setMinimized(false)} />
            ) : (
              <IconArrowsDiagonalMinimize2 size={20} onClick={() => setMinimized(true)} />
            )}
          </Button>
          <Button
            onClick={close}
            variant={"outline"}
            size={"icon"}
            data-testid="close-btn"
            className="shadow-sm p-0">
            <IconX size={20} />
          </Button>
        </div>
      </div>
      <form className={`${minimized ? "p-10" : "px-10 py-20"}`}>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <CustomInput
              label=""
              type="text"
              name="title"
              placeholder="[Note Title]"
              className="border-none shadow-none focus-visible:ring-transparent h-11 font-medium text-[32px] leading-[44px]"
              parentClassName="mb-0"
              register={register}
              validatorMessage={errors.title?.message}
            />
            <CustomTextarea
              name="body"
              placeholder='e.g. "We need to schedule a meeting with the client to finalize the travel itinerary."'
              className="text-xs shadow-none focus-visible:ring-transparent h-[140px] w-full border-none placeholder:text-vobb-neutral-50"
              parentClassName="mb-0"
              register={register}
              validatorMessage={errors.body?.message}
            />{" "}
          </>
        )}
      </form>
    </Modal>
  );
};

export { EditMemberNoteModal };

const VisibilityDropdown = ({ setValue, isVisible }) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={"outline"} className="text-vobb-neutral-70 capitalize ">
          {" "}
          {isVisible ? (
            <span className=" flex gap-1">
              <IconLockOpen size={16} /> Public
            </span>
          ) : (
            <span className=" flex gap-1">
              <IconLock size={16} />
              Private
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[112px] p-0" align="end" style={{ zIndex: 9999 }}>
        <div className="flex flex-col py-4 px-2 space-y-2">
          <Button
            variant={"ghost"}
            onClick={() => {
              setValue("isPublic", false);
              setOpen(false);
            }}
            className="p-0 text-xs"
            data-testid="invite-member">
            Private
          </Button>
          <Button
            variant={"ghost"}
            onClick={() => {
              setValue("isPublic", false);
              setOpen(false);
            }}
            className="p-0 text-xs"
            data-testid="invite-member">
            Public
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
