var mongoose = require('mongoose');
// const { required } = require('nodemon/lib/config');
var Schema = mongoose.Schema;

var studentSchema = new Schema({

    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    num: {
        type: Number,
        required: true
    },
    dpt:{
        type :String,
        required:true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    intm: {
        type: String
    },
    outtm: {
        type: String
    },
    Logoutdate: {
        type: String
    },
    checkintm: {
        type: String
    },
    checkindate:{
        type: Date  //日期类型  
    },
    checkout:{
        type: String  //日期类型  
    }
});

module.exports = mongoose.model('student', studentSchema);