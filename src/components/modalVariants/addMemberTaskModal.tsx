import { yupResolver } from "@hookform/resolvers/yup";
import { Cross1Icon } from "@radix-ui/react-icons";
import {
  Modal,
  CustomInput,
  Button,
  SingleDatePicker,
  PriorityDropdown,
  ObjectDropdown,
  StatusDropdown,
  UsersDropdown
} from "components";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { ExistingUserTypes, ModalProps, optionType } from "types";

import { ObjectOptionProps } from "lib";
import { useEffect } from "react";

import { useParams } from "react-router-dom";

export interface AddTaskData {
  title: string;
  description: string;
  assignedTo: optionType[];
  priority?:
    | {
        title?: string;
        color?: string;
        id?: string;
      }
    | undefined;
  dueDate?: Date;
  status: ObjectOptionProps;
  object: ObjectOptionProps;
}

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

export const schema = yup.object().shape({
  title: yup.string().required("Required"),
  description: yup.string().required("Required"),
  assignedTo: yup
    .array()
    .of(
      yup.object({
        label: yup.string().required("Required"),
        value: yup.string().required("Required")
      })
    )
    .required("Assigned To is required"),
  priority: yup
    .object()
    .shape({
      title: yup.string().optional(),
      color: yup.string().optional(),
      id: yup.string().optional()
    })
    .optional(),
  dueDate: yup.date().transform((curr, orig) => (orig === "" ? undefined : curr)),
  status: yup
    .object()
    .shape({
      title: yup.string().required("Required"),
      color: yup.string().required("Required"),
      id: yup.string().optional()
    })
    .nullable()
    .required("Status is required"),
  object: yup
    .object()
    .shape({
      title: yup.string().required("Required"),
      color: yup.string().required("Required"),
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
    title: "",
    description: "",
    assignedTo: assignedUser ? [assignedUser] : [],
    priority: undefined,
    status: { title: "Incomplete", color: "#EDA12F" },
    object: { title: "General", color: "#EDA12F" }
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    getValues,
    reset
  } = useForm<AddTaskData>({
    resolver: yupResolver(schema),
    defaultValues: initData
  });
  const onSubmit: SubmitHandler<AddTaskData> = (data) => {
    submit(data);
    reset();
  };

  const object = watch("object");
  const status = watch("status");
  const priority = watch("priority");
  const dueDate = watch("dueDate");
  const assignedTo = watch("assignedTo");

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
    <Modal contentClassName="max-w-[944px] p-0" show={show} close={close} testId="addTask-modal">
      <div className="flex items-center justify-between px-4 py-2 border-b border-vobb-neutral-20">
        <h2 className="text-lg font-medium text-vobb-neutral-95">Create Task</h2>
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

          <ObjectDropdown
            selectedObject={object}
            handleSetObject={handleSetObject}
            isMemberTask={true}
          />

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
          placeholder="[Title containing the first part of the comment or key action point.]"
          className="border-none shadow-none focus-visible:ring-transparent h-11 font-medium"
          parentClassName="mb-0"
          register={register}
          validatorMessage={errors.title?.message}
        />

        <CustomInput
          label=""
          type="text"
          name="description"
          placeholder="e.g. 'We need to schedule a meeting with the client to finalize the travel itinerary.'"
          className="border-none shadow-none focus-visible:ring-transparent h-11"
          parentClassName="mb-0"
          register={register}
          validatorMessage={errors.description?.message}
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
          loading={loading}
          data-testid="submit-btn">
          Convert to Task
        </Button>
      </div>
    </Modal>
  );
};

export { AddMemberTaskModal };
