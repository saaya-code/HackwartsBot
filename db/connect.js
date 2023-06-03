const mongoose = require('mongoose');

module.exports = function(mongoURI){
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error(error);
    });
}