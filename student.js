let mongoose =require('mongoose')
let Schema =mongoose.Schema

mongoose.connect('mongodb://localhost/Student', {useNewUrlParser: true});

let commentSchema= new Schema({
    name:{
       type:String,
       require:true
    },
    gender:{
        type:Number,
        enum:[0,1],
        default:0
    },
    hobbies:{
        type:String,
    },
    fruits:{
        type:String,
    }
})



module.exports=mongoose.model('Student',commentSchema)

