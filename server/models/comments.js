const moongose= require("mongoose");
const Schema= moongose.Schema;

const CommentSchema= Schema({
    idPublication:{
        type: moongose.Schema.Types.ObjectId,
        require:true,
        ref:"Publication",
    },
    idUser:{
        type:moongose.Schema.Types.ObjectId,
        require:true,
        ref:"User"
    },
    comment:{
        type:String,
        trim:true,
        require: true,
    },
    createAt:{
        type:Date,
        default: Date.now(),
    }
})

module.exports= moongose.model("Comment",CommentSchema);