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
  UsersDropdown,
  LoadingSpinner
} from "components";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { ExistingUserTypes, MemberTasksData, ModalProps, optionType } from "types";
import { ObjectOptionProps, objectOptions, priorityOptions, statusOptions } from "lib";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { IconCalendarDue, IconPointFilled } from "@tabler/icons-react";
import { useEffect } from "react";

export interface EditTaskData {
  id: string;
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

interface EditMemberTaskModalProps extends ModalProps {
  submit: (data: EditTaskData) => void;
  loadingTask: boolean;
  loadingEdit: boolean;
  initData: MemberTasksData;
  allUsers: {
    usersearchQuery: string;
    users: ExistingUserTypes[];
    loadingUsers: boolean;
    handleSearch: (filter: string, value: string | number) => void;
  };
}

const schema = yup.object().shape({
  id: yup.string().required("Required"),
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

const EditMemberTaskModal: React.FC<EditMemberTaskModalProps> = ({
  show,
  close,
  submit,
  loadingTask,
  loadingEdit,
  allUsers,
  initData: fetchedData
}) => {
  const { users, loadingUsers, usersearchQuery, handleSearch } = allUsers;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    getValues
  } = useForm<EditTaskData>({
    resolver: yupResolver(schema)
  });
  const onSubmit: SubmitHandler<EditTaskData> = (data) => {
    submit(data);
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
    if (fetchedData) {
      setValue("id", fetchedData.id);
      setValue("title", fetchedData.title);
      setValue("description", fetchedData.description);
      setValue(
        "assignedTo",
        fetchedData.assignedTo.map(({ name, _id }) => ({
          label: name,
          value: _id
        }))
      );
      if (fetchedData.priority) {
        setValue(
          "priority",
          priorityOptions.find(
            (priority) => priority.title.toLowerCase() === fetchedData.priority.toLowerCase()
          ) ?? priorityOptions[0]
        );
      }
      setValue(
        "status",
        statusOptions.find(
          (status) => status.title.toLowerCase() === fetchedData.status.toLowerCase()
        ) ?? statusOptions[0]
      );

      setValue(
        "object",
        objectOptions.find(
          (object) => object.title.toLowerCase() === fetchedData.object?.toLowerCase()
        ) ?? objectOptions[0]
      );
    }
  }, [fetchedData]);
  return (
    <Modal contentClassName="max-w-[944px] p-0" show={show} close={close} testId="editTask-modal">
      <div className="flex items-center justify-between px-4 py-2 border-b border-vobb-neutral-20">
        <h2 className="text-lg font-medium text-vobb-neutral-95">Edit task</h2>
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
      {loadingTask ? (
        <LoadingSpinner />
      ) : (
        <>
          <form className="mx-4 border-b border-vobb-neutral-20 divide-y-[1px]">
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
          <div className="flex items-center mx-4 my-2 gap-2">
            <Button variant={"outline"} className="gap-2 py-2 px-2 justify-start font-normal">
              {" "}
              <Avatar className="w-6 h-6">
                <AvatarImage
                  src={
                    fetchedData?.creator?.avatar instanceof File
                      ? URL.createObjectURL(fetchedData?.creator?.avatar)
                      : fetchedData?.creator?.avatar
                  }
                  alt="profile picture"
                />

                <AvatarFallback className="text-[10px]">
                  {fetchedData?.creator?.name.charAt(0)}
                  {fetchedData?.creator?.name.charAt(1)}
                </AvatarFallback>
              </Avatar>
              <p>Created by {fetchedData?.creator?.name}</p>
            </Button>

            <Button
              variant={"outline"}
              className="gap-2 py-2 px-2 flex font-normal items-center justify-start">
              <span>
                <IconCalendarDue className="text-vobb-neutral-60 h-4 w-4" />
              </span>
              <p>Created on {fetchedData?.date}</p>
            </Button>
            <Button
              variant={"outline"}
              className="gap-2 py-2 px-2 flex font-normal items-center justify-start">
              <IconPointFilled color={object?.color} size={14} /> {object?.title}
            </Button>
          </div>
        </>
      )}
      <div className="flex justify-between items-center px-4 py-2 bg-vobb-neutral-10">
        <Button onClick={() => close()} size={"default"} variant={"outline"} disabled={loadingEdit}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          size={"default"}
          variant={"fill"}
          loading={loadingEdit}
          data-testid="submit-btn">
          Save Changes
        </Button>
      </div>
    </Modal>
  );
};

export { EditMemberTaskModal };
