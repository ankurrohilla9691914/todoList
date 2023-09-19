import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { addList } from "../service/api";

const AddListDialog = ({ openListDialog, setOpenListDialog, handleData }) => {
  const [title, setTitle] = useState("");

  const handleClose = () => {
    setOpenListDialog(false);
    setTitle("");
  };

  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCancel = () => {
    setOpenListDialog(false);
    setTitle("");
  };

  const handleConfirm = async () => {
    if (title.length) {
      setOpenListDialog(false);
      await addList(title);
      await handleData();
      setTitle("");
    } else {
      window.alert("please add title");
    }
  };

  return (
    <div>
      <Dialog open={openListDialog} onClose={handleClose}>
        <DialogTitle>Add To Do List</DialogTitle>
        <DialogContent>
          <DialogContentText>Add title to your to do list</DialogContentText>
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

export default AddListDialog;
