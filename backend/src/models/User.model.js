import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required:true,
            unique: true,
        },
        name:{
            type: String,
            reuqired:true,
        },
        password: {
            type:String,
            required: true,
            minlength:6,
        }
    },
    {timestamps:true}
);

export default mongoose.model("User", userSchema);