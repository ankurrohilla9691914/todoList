import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { updateList } from "../service/api";

const UpdateListDialog = ({
  toUpdateList,
  openUpdateDailog,
  setOpenUpdateDialog,
  handleData,
}) => {
  const [updatedTitle, setUpdatedTitle] = useState("");
  const handleOnChange = (e) => {
    setUpdatedTitle(e.target.value);
  };
  const handleClose = () => {
    setOpenUpdateDialog(false);
  };

  const handleConfirm = async () => {
    if (updatedTitle.length > 0) {
      await updateList({ ...toUpdateList, title: updatedTitle });
      await handleData();
      setOpenUpdateDialog(false);
    } else {
      window.alert("please add title");
    }
  };

  return (
    <div>
      <Dialog open={openUpdateDailog} onClose={() => {}}>
        <DialogTitle>{toUpdateList.title}</DialogTitle>
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
          <Button onClick={handleConfirm}>Add </Button>
        </DialogActions>
      </Dialog>
      ;
    </div>
  );
};

export default UpdateListDialog;
