const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {type:String, required: [true, 'firstname field is required']},
    lastname: {type:String, required: [true, 'lastname field is required']},
    email: {type:String, unique:true, required: [true, 'email field is required']},
    tel: {type:Number, unique:true, required: [true, 'telephone field is required']},
    hash: String,
    salt: String,
    
});

userSchema.methods.setPassword

mongoose.model('User', 'userSchema');

const healthSchema = new mongoose.Schema({
    id: Number,
    name: String,
    sex: String,
    dob: Date,
    email: String,
    tel: Number,
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

mongoose.model('alchemist', healthSchema);

