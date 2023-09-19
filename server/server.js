import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import List from "./models/List.js";
import Task from "./models/Task.js";
import User from "./models/Users.js";

import bodyParser from "body-parser";
const app = express();
app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
dotenv.config();

app.get("/", (req, res) => {
    res.send("hello world");
});

/* HELPER METHODS */
let deleteTasksFromList = (_listId) => {
    Task.deleteMany({
        _listId,
    }).then(() => {
        console.log("Tasks from " + _listId + " were deleted!");
    });
};

/**Routes */

/**User Routes */
/**UserRoute */
app.post("/login", async(request, response) => {
    try {
        /**is userName already exist */
        const user = await User.findOne({ userName: request.body.userName });
        if (user) {
            const userName = request.body.userName;
            const password = request.body.password;
            if (userName === user.userName && password === user.password) {
                return response.status(200).json({ data: user });
            }
        }
        response.status(401).json({ message: "invalid userName or password" });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

app.post("/signup", async(request, response) => {
    try {
        /**is userName already exist */

        const isUserExist = await User.findOne({ userName: request.body.userName });
        if (isUserExist) {
            return response.status(401).json({ message: "userName already Exist" });
        }
        const user = request.body;
        const newUser = new User(user);
        await newUser.save();

        response.status(200).json({ message: user });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

/**ListRoutes */

/**GET all lists */
app.get("/lists", (req, res) => {
    List.find({})
        .then((lists) => {
            res.send(lists);
        })
        .catch((e) => {
            res.send(e);
        });
});

/**POST a list */
app.post("/lists", (req, res) => {
    let title = req.body.title;
    let newList = new List({
        title,
    });
    newList.save().then((listDoc) => {
        res.send(listDoc);
    });
});

/**
                         Update a specified list
                         */
app.patch("/lists/:id", (req, res) => {
    List.findOneAndUpdate({
        _id: req.params.id,
    }, {
        $set: req.body,
    }).then(() => {
        res.send({ message: "updated successfully" });
    });
});

/**
                         Delete a list
                         */
app.delete("/lists/:id", (req, res) => {
    List.findOneAndRemove({
        _id: req.params.id,
    }).then((removedListDoc) => {
        res.send(removedListDoc);
        deleteTasksFromList(removedListDoc._id);
    });
});

/** GET tasks associted with list */
app.get("/lists/:listId/tasks", (req, res) => {
    Task.find({ _listId: req.params.listId })
        .then((tasks) => {
            res.send(tasks);
        })
        .catch((err) => {
            res.err("error in fetching task");
        });
});

/**
                         Create a new task in a specific list
                         */
app.post("/lists/:listId/tasks", (req, res) => {
    List.findOne({
            _id: req.params.listId,
        })
        .then((list) => {
            if (list) {
                return true;
            }

            // else - the list object is undefined
            return false;
        })
        .then((canCreateTask) => {
            if (canCreateTask) {
                let newTask = new Task({
                    title: req.body.title,
                    _listId: req.params.listId,
                });
                newTask.save().then((newTaskDoc) => {
                    res.send(newTaskDoc);
                });
            } else {
                res.sendStatus(404);
            }
        });
});

/**
                         Update an existing task
                         */
app.patch("/lists/:listId/tasks/:taskId", (req, res) => {
    // We want to update an existing task (specified by taskId)

    List.findOne({
            _id: req.params.listId,
        })
        .then((list) => {
            if (list) {
                return true;
            }

            return false;
        })
        .then((canUpdateTasks) => {
            if (canUpdateTasks) {
                Task.findOneAndUpdate({
                    _id: req.params.taskId,
                    _listId: req.params.listId,
                }, {
                    $set: req.body,
                }).then(() => {
                    res.send({ message: "Updated successfully." });
                });
            } else {
                res.sendStatus(404);
            }
        });
});

/**
                         Delete a task
                         */
app.delete("/lists/:listId/tasks/:taskId", (req, res) => {
    List.findOne({
            _id: req.params.listId,
        })
        .then((list) => {
            if (list) {
                return true;
            }

            return false;
        })
        .then((canDeleteTasks) => {
            if (canDeleteTasks) {
                Task.findOneAndRemove({
                    _id: req.params.taskId,
                    _listId: req.params.listId,
                }).then((removedTaskDoc) => {
                    res.send(removedTaskDoc);
                });
            } else {
                res.sendStatus(404);
            }
        });
});

const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGO_DB, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log("DB connected");
        });
    })
    .catch((err) => {
        console.log(err);
    });