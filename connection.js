const mongoose = require('mongoose');

const connectToDB = async () => 
mongoose.connect('mongodb+srv://Saqlain:<password>@cluster0.jrwgn.mongodb.net/bootcampDB?retryWrites=true&w=majority',
    {auth:{user: "Saqlain",password: "Asphalt8%"},
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

module.exports = connectToDB;