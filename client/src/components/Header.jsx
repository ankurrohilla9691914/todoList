import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddListDialog from "./AddListDialog";
import LoginDialog from "./Login/LoginDialog";
import { LoginDataContext } from "../context/loginContext";

export default function Header({ handleData }) {
  const [openListDialog, setOpenListDialog] = useState(false);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const { userData, setUserData } = useContext(LoginDataContext);
  // const userData = localStorage.getItem("userData");
  const handleLoginDialog = () => {
    setOpenLoginDialog((prev) => !prev);
  };
  const handleListDialog = () => {
    setOpenListDialog((prev) => !prev);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              To-Do List
            </Typography>
            {userData ? (
              <div style={{ padding: 10 }}> {userData} </div>
            ) : (
              <Button color="inherit" onClick={handleLoginDialog}>
                Login
              </Button>
            )}
            {userData && (
              <Button
                color="inherit"
                variant="outlined"
                onClick={handleListDialog}
              >
                Add to do list
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      {openListDialog && (
        <AddListDialog
          openListDialog={openListDialog}
          setOpenListDialog={setOpenListDialog}
          handleData={handleData}
        />
      )}
      {openLoginDialog && (
        <LoginDialog
          open={openLoginDialog}
          setOpen={setOpenLoginDialog}
          handleData={handleData}
        />
      )}
    </>
  );
}
