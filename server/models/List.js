import mongoose from "mongoose";
const ListSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
    },
    tasks: {
        type: Object,
        _taskId: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
    },
});

export default mongoose.model("List", ListSchema);