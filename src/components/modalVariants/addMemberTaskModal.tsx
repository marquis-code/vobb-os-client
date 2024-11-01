import { yupResolver } from "@hookform/resolvers/yup";
import { Cross1Icon } from "@radix-ui/react-icons";
import {
  Modal,
  CustomInput,
  Button,
  SingleDatePicker,
  StatusDropdown,
  PriorityDropdown,
  ObjectDropdown,
  UsersDropdown
} from "components";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { ExistingUserTypes, ModalProps, optionType } from "types";

import { ObjectOptionProps } from "lib";
import { useEffect } from "react";

import { useParams } from "react-router-dom";

interface AddMemberTaskModalProps extends ModalProps {
  submit: (data: AddTaskData) => void;
  loading: boolean;
  allUsers: {
    usersearchQuery: string;
    users: ExistingUserTypes[];
    loadingUsers: boolean;
    handleSearch: (filter: string, value: string | number) => void;
  };
}

export interface AddTaskData {
  message: string;
  assignedTo: optionType[];
  priority: ObjectOptionProps;
  dueDate?: Date;
  status: ObjectOptionProps;
  object: ObjectOptionProps;
}

const schema = yup.object().shape({
  message: yup.string().required("Message is required"),
  assignedTo: yup
    .array()
    .of(
      yup.object({
        label: yup.string().required("Label is required"),
        value: yup.string().required("Value is required")
      })
    )
    .required("Assigned To is required"),
  priority: yup
    .object()
    .shape({
      title: yup.string().required("Title is required"),
      color: yup.string().required("Color is required"),
      id: yup.string().optional()
    })
    .nullable()
    .required("Priority is required"),
  dueDate: yup.date().transform((curr, orig) => (orig === "" ? undefined : curr)),
  status: yup
    .object()
    .shape({
      title: yup.string().required("Title is required"),
      color: yup.string().required("Color is required"),
      id: yup.string().optional()
    })
    .nullable()
    .required("Status is required"),
  object: yup
    .object()
    .shape({
      title: yup.string().required("Title is required"),
      color: yup.string().required("Color is required"),
      id: yup.string().optional()
    })
    .nullable()
    .required("Object is required")
});

const AddMemberTaskModal: React.FC<AddMemberTaskModalProps> = ({
  show,
  close,
  submit,
  loading,
  allUsers
}) => {
  const { id } = useParams();
  const { users, loadingUsers, usersearchQuery, handleSearch } = allUsers;
  const assignedUser = users.find((user) => user.value === id);

  const initData = {
    message: "",
    assignedTo: assignedUser ? [assignedUser] : [],
    priority: { title: "Low", color: "#069952" },
    status: { title: "Incomplete", color: "#EDA12F" },
    object: { title: "General", color: "#EDA12F" }
  };

  const { register, handleSubmit, watch, setValue, getValues } = useForm<AddTaskData>({
    resolver: yupResolver(schema),
    defaultValues: initData
  });
  const onSubmit: SubmitHandler<AddTaskData> = (data) => {
    submit(data);
  };

  const message = watch("message");
  const object = watch("object");
  const status = watch("status");
  const priority = watch("priority");
  const dueDate = watch("dueDate");
  const assignedTo = watch("assignedTo");

  const getFirstSevenWords = (text) => {
    if (!text) return "";
    const words = text.trim().split(/\s+/);
    return words.slice(0, 7).join(" ");
  };

  const autoFilledTitle = getFirstSevenWords(message);

  const onDateChange = (date: Date | undefined) => {
    setValue("dueDate", date || undefined);
  };

  const handleSetPriority = (obj: ObjectOptionProps) => {
    setValue("priority", obj);
  };
  const handleSetObject = (obj: ObjectOptionProps) => {
    setValue("object", obj);
  };

  const handleSetStatus = (obj: ObjectOptionProps) => {
    setValue("status", obj);
  };

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

  useEffect(() => {
    if (assignedUser) {
      setValue("assignedTo", [assignedUser]);
    }
    setValue("status", initData.status);
  }, [assignedUser]);

  return (
    <Modal contentClassName="max-w-[944px] p-0" show={show} close={close} testId="addAttr-modal">
      <div className="flex items-center justify-between px-4 py-2 border-b border-vobb-neutral-20">
        <h2 className="text-lg font-medium text-vobb-neutral-95">Create Attribute</h2>
        <div className="flex items-center gap-2">
          <UsersDropdown
            selectedUsers={assignedTo}
            handleSetUsers={handleSetUsers}
            users={users}
            loadingUsers={loadingUsers}
            userSearchQuery={usersearchQuery}
            handleSearch={handleSearch}
          />

          <SingleDatePicker
            value={dueDate}
            handleChange={onDateChange}
            testId="future-date-picker"
          />
          <PriorityDropdown selectedPriority={priority} handleSetPriority={handleSetPriority} />

          <ObjectDropdown selectedObject={object} handleSetObject={handleSetObject} />

          <StatusDropdown selectedStatus={status} handleSetStatus={handleSetStatus} />

          <Button
            onClick={close}
            variant={"ghost"}
            size={"icon"}
            data-testid="close-btn"
            className="border p-2 shadow-sm">
            <Cross1Icon stroke="currentColor" strokeWidth={1} className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <form className="px-4 border-b border-vobb-neutral-20 divide-y-[1px]">
        <CustomInput
          label=""
          type="text"
          name="title"
          placeholder="[Auto-filled with the first part of the comment or key action point.]"
          className="border-none shadow-none focus-visible:ring-transparent h-11"
          parentClassName="mb-0"
          value={autoFilledTitle}
          readOnly
        />

        <CustomInput
          label=""
          type="text"
          name="message"
          placeholder="e.g. 'We need to schedule a meeting with the client to finalize the travel itinerary.'"
          className="border-none shadow-none focus-visible:ring-transparent h-11"
          parentClassName="mb-0"
          register={register}
          validatorMessage={""}
        />
      </form>
      <div className="flex justify-between items-center px-4 py-2 bg-vobb-neutral-10">
        <Button onClick={() => close()} size={"default"} variant={"outline"} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          size={"default"}
          variant={"fill"}
          loading={loading}>
          Convert to Task
        </Button>
      </div>
    </Modal>
  );
};

export { AddMemberTaskModal };
