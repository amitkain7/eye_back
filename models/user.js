const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true , 'please provide username'],
        minlength : 3,
        maxlength : 20

    },
    email : {
        type : String,
        required : [true , 'please provide email'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'please provide valid email'],
        unique: true

    },
    password : {
        type : String,
        required : [true , 'please provide password'],
        minlength : 6
    },
    role : {
        type : String,
        enum : ['user' , 'admin'],
        default : 'user'
    }
},
{timestamps : true}
)

module.exports = mongoose.model('user' , userSchema)