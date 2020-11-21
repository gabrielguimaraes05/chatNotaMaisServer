const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const url = 'mongodb+srv://gabrielguimaraes:DEMDGG05051998g@puc6semestre.rewqr.mongodb.net/puc6semestre?retryWrites=true&w=majority';
const connect = mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = connect;