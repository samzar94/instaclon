const mongoose=require("mongoose");
const { schema } = require("./user");
const Schema=mongoose.Schema;

const followSchema= Schema({
    idUser: {
        type:Schema.Types.ObjectId,
        require:true,
        ref:"User"
    },
    follow:{
        type: Schema.Types.ObjectId,
        require: true,
        ref: "User",
    },
    createAt:{
        type:Date,
        default:Date.now(),
    }

});

module.exports= mongoose.model("folow",followSchema);