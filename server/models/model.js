var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
mongoose.createConnection("mongodb://localhost/pet");
var uniqueValidator = require('mongoose-unique-validator');



var PetSchema = new mongoose.Schema({
    name: {type: String, unique: [true, "Pet name already exists"], require: [true, "Pet name is required!(backend)"], minlength: [3, "Pet name must be at least 3 characters!(backend)"]},
    type: {type: String, require: [true, "Pet type is required!(backend)"], minlength: [3, "Pet type must be at least 3 characters!(backend)"]},
    description: {type: String, require: [true, "Please enter product price!(backend)"], minlength: [3, "Pet type must be at least 3 characters!(backend)"]},
    skill1: {type: String, require: false},
    skill2: {type: String, require: false},
    skill3: {type: String, require: false},
    likes: {type: Number, default: 0}
}, {timestamps: true});
mongoose.model('Pet', PetSchema);
PetSchema.plugin(uniqueValidator);

