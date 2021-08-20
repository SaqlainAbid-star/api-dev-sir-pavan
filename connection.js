const mongoose = require('mongoose');

const connectToDB = async () => 
mongoose.connect('url',
    {auth:{user: "Saqlain",password: "123456"},
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

module.exports = connectToDB;
