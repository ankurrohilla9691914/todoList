import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import AddListDialog from "./components/AddListDialog";
import Body from "./components/Body";
import { fetchAllLists } from "./service/api";
import { useState, useEffect, useCallback, useMemo } from "react";
import { fetchAllTasksOfAList } from "./service/api";
import LoginDataContextProvider from "./context/loginContext";

function App() {
    const [listCards, setListCards] = useState([]);

    const handleData = useCallback(async() => {
        const savedToDoList = await fetchAllLists();
        setListCards(savedToDoList.data);
    }, [listCards]);

    const allTasks = useCallback(async() => {
        let tasks = [];

        for (let i = 0; i < listCards.length; i++) {
            const currentTask = await fetchAllTasksOfAList(listCards[i]._id);

            tasks = [...tasks, ...currentTask.data];
        }
        setTaskData(tasks);
    }, [listCards]);
    const [taskData, setTaskData] = useState([]);
    useEffect(() => {
        handleData();
    }, []);

    useEffect(() => {
        allTasks();
    }, [listCards]);

    return ( <
        LoginDataContextProvider > { " " } <
        Header handleData = { handleData }
        />{" "} <
        Body listCards = { listCards }
        handleData = { handleData }
        taskData = { taskData }
        handleTaskData = { allTasks }
        />{" "} < /
        LoginDataContextProvider >
    );
}

export default App;