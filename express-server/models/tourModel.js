const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'A tour must have a name'],
        unique:true
    },
    rating:{
        type:Number,
        default:3.0,
    },
    price:{
        type:Number,
        required:[true, 'A tour must have a price'],
    },
});
const Tour  = mongoose.model('Tour',tourSchema);
module.exports = Tour;