const mongoose = require('mongoose')

const CarSchema = new mongoose.Schema({
    plat: {
        type: String,
        required: [true, 'Please add a Plat'],
        unique: true,
        trim: true,
        maxlength: [40, 'Plat cannot be more than 40 characters']
    },
    brand: {
        type: String,
        required: true,
        maxlength: [100, "brand cannot be more than 100 characters"]
    }
})


module.exports = mongoose.models.Car || mongoose.model('Car' , CarSchema);