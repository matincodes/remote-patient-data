const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    tel: {
        type: Number,
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
    Date: {
        type: Date,
        default: Date.now()
    },
    health: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Health"
        }
    ]
});

//health Schema
const healthSchema = new mongoose.Schema({
    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    sex: String,
    dob: Date,
    bloodGroup: String,
    genotype: String,
    image: Buffer,
    record: {
        allergies: [String],
        disabilities: [String],
        others: [String],
        medications: [String],
        surgeries: {
            date: [{type:Date, required:true}],
            surgname: [{type:String, required:true}],
            hospital: [{type:String, required:true}],
            specialist: [{type:String, required:true}],
            details: [{type:String,required:true}]
        },
    }
});

const User = mongoose.model('User', UserSchema);
const Health = mongoose.model('Health', healthSchema);
module.exports = User;