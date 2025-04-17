"use client";

import { TaskItem, type TaskItemProps } from "./task-item";
import { useInfiniteScroll } from "hooks";
import type { TaskColumnConfig } from "./tasks-container";

export interface TaskListProps {
  tasks?: {
    data: TaskItemProps[];
    metaData: any;
  };
  loadingTasks?: boolean;
  taskActions?: {
    handleChangeStatus: (id: string, status: string) => void;
    loadingChangeStatus: boolean;
    handleDeleteTask: (id: string) => void;
    loadingDeleteTask: boolean;
  };
  handleOpenEditTask?: (id: string) => void;
  handleParams?: (param: string, value: Date | string | number) => void;
  status?: string;
  columns?: TaskColumnConfig[];
}

export function TaskList({
  tasks = { data: [], metaData: {} },
  loadingTasks = false,
  taskActions = {
    handleChangeStatus: () => {},
    loadingChangeStatus: false,
    handleDeleteTask: () => {},
    loadingDeleteTask: false
  },
  handleOpenEditTask = () => {},
  handleParams = () => {},
  status = "incomplete",
  columns = []
}: TaskListProps) {
  const { data: taskItems = [], metaData = {} } = tasks;
  const { handleChangeStatus, loadingChangeStatus, handleDeleteTask, loadingDeleteTask } =
    taskActions;
  const loading = loadingTasks || loadingChangeStatus || loadingDeleteTask;

  const { loadMoreRef } = useInfiniteScroll(metaData, handleParams);

  return (
    <div className="max-h-[220px] overflow-scroll" data-testid={`${status}-task-component`}>
      {taskItems?.map((task) => (
        <TaskItem
          key={task.id}
          {...task}
          status={status}
          onChangeStatus={handleChangeStatus}
          onDeleteTask={handleDeleteTask}
          onOpenEditTask={handleOpenEditTask}
          columns={columns}
        />
      ))}
      <div ref={loadMoreRef} className="h-4"></div>
      {loading && (
        <div>
          {Array(2)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="border-b px-4 py-2 grid grid-cols-[1fr,1.5fr] items-center"
                data-testid="skeleton-task">
                <div className="flex items-center gap-2">
                  <span className="border rounded-full cursor-pointer w-4 h-4"></span>
                  <div className="w-60 h-2 rounded-full  bg-vobb-neutral-30"></div>
                </div>
                <div
                  className="grid"
                  style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}>
                  {columns.map((_, i) => (
                    <div key={i} className="w-20 h-2 rounded-full  bg-vobb-neutral-30"></div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
