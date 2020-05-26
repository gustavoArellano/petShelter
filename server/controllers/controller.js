var mongoose = require('mongoose');
var Pet = mongoose.model('Pet');

module.exports = {

    create: function(req, res) {
        var pet = new Pet({
            name: req.body.name, 
            type: req.body.type, 
            description: req.body.description, 
            skill1: req.body.skill1,
            skill2: req.body.skill2,
            skill3: req.body.skill3
        });

        pet.save(function(err, data) {
        if (err) {
            console.log('error in controller create')
            res.json({ message: false, inputError: err });
        } else {
            res.json({ message: true, data });
            }
        })
    },

    getAll: function(req, res) {
        Pet.find({}, function(err, data) {
            if (err) {
                res.json({ message: false, inputError: err });
            } else {
                res.json({ message: true, data });
            }
        })
    },

    getOne: function(req, res) {
        Pet.findOne({_id: req.params.id}, function(err, data) {
            if (err) {
                res.json({ message: false, inputError: err });
            } else {
                res.json({ message: true, data });
            }
        })
    },

    delete: function(req, res) {
        Pet.remove({_id: req.params.id}, function(err, data) {
            if(err) {
                console.log("This is an error in delete Controller", err);
                res.json({message: false, inputError: err});
            } else {
                console.log("You've successfully removed the pet");
                res.json({message: true, data})
            }
        })
    },

    update: function(req, res) {
        Pet.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {runValidators: true, context: 'query'}, function(err, data) {
            if(err) {
                console.log("This is an error in update Controller", err);
                res.json({message: false, data, inputError: err});
            } else {
                console.log("You've successfully updated the pet");
                res.json({message: true, data})
            }
        })
    },

    updateLike: function(req, res) {
        // var like = +1
        var pet = Pet.findbyId({_id: req.params.id})
        var add = pet.likes++
        Pet.findOneAndUpdate({_id: req.params.id}, {$set: {likes: add}}, {runValidators: true, context: 'query'}, function(err, data) {
            if(err) {
                console.log("This is an error in update Controller", err);
                res.json({message: false, data, inputError: err});
            } else {
                console.log("You've successfully updated the pet");
                res.json({message: true, data})
            }
        })
    }
   
}