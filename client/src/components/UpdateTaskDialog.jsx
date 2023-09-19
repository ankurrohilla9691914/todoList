import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { updateList, updatetask } from "../service/api";

const UpdateTaskDialog = ({
  toUpdateTask,
  openUpdateTaskDailog,
  setOpenUpdateTaskDialog,
  handleTaskData,
}) => {
  const [updatedTitle, setUpdatedTitle] = useState("");
  const handleOnChange = (e) => {
    setUpdatedTitle(e.target.value);
  };
  const handleClose = () => {
    setOpenUpdateTaskDialog(false);
  };

  const handleConfirm = async () => {
    await updatetask({ ...toUpdateTask, title: updatedTitle });
    console.log('updatedList ->',toUpdateTask);
    await handleTaskData();
    setOpenUpdateTaskDialog(false);
  };

  return (
    <div>
      <Dialog open={true} onClose={() => {}}>
        <DialogTitle>{toUpdateTask.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>update title to your to do list</DialogContentText>
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
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Update </Button>
        </DialogActions>
      </Dialog>
      ;
    </div>
  );
};

export default UpdateTaskDialog;
