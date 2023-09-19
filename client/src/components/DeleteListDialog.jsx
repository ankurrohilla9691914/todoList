import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteList } from "../service/api";
import { Typography } from "@mui/material";

const DeleteListDialog = ({
  toDeleteList,
  openDeleteDialog,
  setOpenDeleteDialog,
  handleData,
}) => {
  const handleClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirm = async () => {
    await deleteList(toDeleteList);
    await handleData();
    setOpenDeleteDialog(false);
  };

  return (
    <div>
      <Dialog open={true} onClose={() => {}}>
        <DialogTitle>{toDeleteList.title}</DialogTitle>
        <DialogContent>
          <Typography>Are you sure to delete this card</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Delete </Button>
        </DialogActions>
      </Dialog>
      ;
    </div>
  );
};

export default DeleteListDialog;
