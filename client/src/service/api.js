import axios from "axios";

const URL = "http://localhost:5000";

export const fetchAllLists = async () => {
  try {
    return await axios.get(`${URL}/lists`);
  } catch (error) {
    console.log("errorin fetching lists", error);
  }
};

export const addList = async (data) => {
  try {
    return await axios.post(`${URL}/lists`, { title: data });
  } catch (error) {
    console.log("errorin adding lists", error);
  }
};

export const updateList = async (data) => {
  try {
    return await axios.patch(`${URL}/lists/${data._id}`, data);
  } catch (error) {
    console.log("error in updating list", error);
  }
};

export const deleteList = async (data) => {
  try {
    return await axios.delete(`${URL}/lists/${data._id}`);
  } catch (error) {
    console.log("error in deleting list", error);
  }
};

export const fetchAllTasksOfAList = async (id) => {
  try {
    return await axios.get(`${URL}/lists/${id}/tasks`);
  } catch (error) {
    console.log("errorin fetching tasks", error);
  }
};

export const addTask = async (data) => {
  try {
    return await axios.post(`${URL}/lists/${data._listId}/tasks`, {
      title: data.title,
    });
  } catch (error) {
    console.log("errorin adding lists", error);
  }
};

export const deletetask = async (data) => {
  try {
    return await axios.delete(`${URL}/lists/${data._listId}/tasks/${data._id}`);
  } catch (error) {
    console.log("error in deleting task", error);
  }
};

export const updatetask = async (data) => {
  try {
    return await axios.patch(
      `${URL}/lists/${data._listId}/tasks/${data._id}`,
      data
    );
  } catch (error) {
    console.log("error in deleting task", error);
  }
};

export const authenticateLogin = async (user) => {
  try {
    return await axios.post(`${URL}/login`, user);
  } catch (error) {
    console.log("Error while calling login API: ", error);
    return error.response;
  }
};

export const authenticateSignup = async (user) => {
  try {
    return await axios.post(`${URL}/signup`, user);
  } catch (error) {
    console.log("Error while calling Signup API: ", error);
    return error.response;
  }
};
