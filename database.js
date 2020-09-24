const mongoose = require('mongoose');

const URI = 'mongodb+srv://pinkeuberry:12345@cluster0.54b2e.gcp.mongodb.net/mern-tasks?retryWrites=true&w=majority';
mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;