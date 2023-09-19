import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import UpdateListDialog from "./UpdateListDialog";
import DeleteListDialog from "./DeleteListDialog";

import UpdateTaskDialog from "./UpdateTaskDialog";
import AddTaskDialog from "./AddTaskDialog";
import TaskComponent from "./TaskComponent";
import { LoginDataContext } from "../context/loginContext";

const Body = ({ listCards, handleData, taskData, handleTaskData }) => {
  const [toUpdateList, setToUpdateList] = useState(null);
  const [toDeleteList, setToDeleteList] = useState(null);
  const [toUpdateTask, setToUpdateTask] = useState(null);
  const [toCreateTaskList, setToCreateTaskList] = useState(null);

  const [openUpdateDailog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDailog, setOpenDeleteDialog] = useState(false);
  const [openUpdateTaskDailog, setOpenUpdateTaskDialog] = useState(false);
  const [openCreateTaskDailog, setOpenCreateTaskDialog] = useState(false);

  // State to track the userData from localStorage
  const { userData } = useContext(LoginDataContext);

  const handleUpdateList = (currentCard) => {
    setOpenUpdateDialog(true);
    setToUpdateList(currentCard);
  };

  const handleCreateTask = (currentCard) => {
    setToCreateTaskList(currentCard);
    setOpenCreateTaskDialog(true);
  };

  const handleDeleteList = (currentCard) => {
    setOpenDeleteDialog(true);
    setToDeleteList(currentCard);
  };

  if (!userData) {
    return (
      <div>
        <Card>
          <CardContent
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            please login to access lists
          </CardContent>
        </Card>
      </div>
    );
  }

  return !listCards.length ? (
    <div>
      <Card>
        <CardContent
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          please add some task
        </CardContent>
      </Card>
    </div>
  ) : (
    <>
      <Box style={{ display: "flex", flexWrap: "wrap" }}>
        {listCards.map((currentToDoList) => {
          const currentToDoListTasks = taskData.filter(
            (currentTask) => currentTask._listId === currentToDoList._id
          );
          return (
            <Card
              style={{ margin: 25, width: "25%" }}
              variant="outlined"
              key={currentToDoList._id}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 25 }}
                  color="text.secondary"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  {currentToDoList.title}
                </Typography>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    flexWrap: "wrap",
                  }}
                >
                  <Button
                    size="small"
                    onClick={() => handleUpdateList(currentToDoList)}
                    variant={"contained"}
                    style={{ margin: 10 }}
                  >
                    update list
                  </Button>
                  <Button
                    size="small"
                    onClick={() => handleDeleteList(currentToDoList)}
                    variant={"contained"}
                    style={{ margin: 10 }}
                  >
                    Delete list
                  </Button>
                </Box>
                {currentToDoListTasks.length ? (
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: 25,
                    }}
                  >
                    <TaskComponent
                      tasks={currentToDoListTasks}
                      handleTaskData={handleTaskData}
                      setOpenUpdateTaskDialog={setOpenUpdateTaskDialog}
                      setToUpdateTask={setToUpdateTask}
                    />
                  </Box>
                ) : (
                  <Box
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: 25,
                    }}
                  >
                    <Typography>You Don't have any pending task </Typography>
                  </Box>
                )}
              </CardContent>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: 10,
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => handleCreateTask(currentToDoList)}
                >
                  Create Task
                </Button>
              </Box>
            </Card>
          );
        })}
      </Box>
      {openUpdateDailog && (
        <UpdateListDialog
          toUpdateList={toUpdateList}
          openUpdateDailog={openUpdateDailog}
          setOpenUpdateDialog={setOpenUpdateDialog}
          handleData={handleData}
        />
      )}
      {openDeleteDailog && (
        <DeleteListDialog
          toDeleteList={toDeleteList}
          openDeleteDailog={openDeleteDailog}
          setOpenDeleteDialog={setOpenDeleteDialog}
          handleData={handleData}
        />
      )}
      {openUpdateTaskDailog && (
        <UpdateTaskDialog
          toUpdateTask={toUpdateTask}
          openUpdateTaskDailog={openUpdateTaskDailog}
          setOpenUpdateTaskDialog={setOpenUpdateTaskDialog}
          handleTaskData={handleTaskData}
        />
      )}
      {openCreateTaskDailog && (
        <AddTaskDialog
          toCreateTaskList={toCreateTaskList}
          openTaskDailog={openCreateTaskDailog}
          setOpenTaskDialog={setOpenCreateTaskDialog}
          handleTaskData={handleTaskData}
        />
      )}
    </>
  );
};

export default Body;
