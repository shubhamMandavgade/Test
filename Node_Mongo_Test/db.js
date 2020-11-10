const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/CrudDB',{ useUnifiedTopology: true,useNewUrlParser: true},(err) => {
    if (!err)
        console.log('MongoDB connection succeeded.');
    else
        console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


module.exports = mongoose;