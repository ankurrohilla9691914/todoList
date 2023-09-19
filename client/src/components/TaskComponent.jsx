import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import { updatetask, deletetask } from "../service/api";

const TaskComponent = ({
  tasks,
  handleTaskData,
  setOpenUpdateTaskDialog,
  setToUpdateTask,
}) => {
  const [toDeleteTask, setToDeleteTask] = useState(null);
  const handleCLickCheckbox = async (currentTask) => {
    console.log("handleUpdateTask ->", currentTask);
    await updatetask({ ...currentTask, completed: !currentTask.completed });
    handleTaskData();
  };

  const handleDeleteTask = async (currentTask) => {
    console.log("handleDeleteTask ->", currentTask);
    setToDeleteTask(currentTask);
    await deletetask(currentTask);
    handleTaskData();
  };

  const handleUpdateTask = async (currentTask) => {
    console.log("handleUpdateTask ->", currentTask);
    setToUpdateTask(currentTask);
    setOpenUpdateTaskDialog(true);
  };
  return (
    <Box>
      {tasks.map((currentTask) => {
        return (
          <Box
            style={{
              padding: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            key={currentTask._id}
          >
            <Checkbox
              defaultChecked={currentTask.completed === true}
              onClick={() => handleCLickCheckbox(currentTask)}
            />
            <div
              style={
                currentTask.completed === true
                  ? { textDecoration: "Line-Through" }
                  : {}
              }
            >
              {currentTask.title}
            </div>
            <IconButton onClick={() => handleDeleteTask(currentTask)}>
              <DeleteIcon />
            </IconButton>

            <IconButton onClick={() => handleUpdateTask(currentTask)}>
              <ModeEditIcon />
            </IconButton>
          </Box>
        );
      })}
    </Box>
  );
};
export default TaskComponent;
