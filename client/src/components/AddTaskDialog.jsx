import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {  addTask } from "../service/api";

const AddTaskDialog = ({
  toCreateTaskList,
  openTaskDialog,
  setOpenTaskDialog,
  handleTaskData,
}) => {
  const [title, setTitle] = useState("");
  const handleClickOpen = () => {
    setOpenTaskDialog(true);
    setTitle("");
  };

  const handleClose = () => {
    setOpenTaskDialog(false);
    setTitle("");
  };

  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCancel = () => {
    setOpenTaskDialog(false);
    setTitle("");
  };

  const handleConfirm = async () => {
    if (title.length) {
      console.log(toCreateTaskList);
      const newData = {
        _listId: toCreateTaskList._id,
        title,
      };
      setOpenTaskDialog(false);
      await addTask(newData);
      await handleTaskData();
    } else {
      window.alert("please add title");
    }
  };

  return (
    <div>
      <Dialog open={true} onClose={handleClose}>
        <DialogTitle>Add title</DialogTitle>
        <DialogContent>
          <DialogContentText>Add title to your to task</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleOnChange}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleConfirm}>Add </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddTaskDialog;
