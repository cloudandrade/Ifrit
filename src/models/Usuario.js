const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Usuario = new Schema({
    GM: {
        type: Boolean,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    idade: {
        type: Number,
        required: true
    },

});
mongoose.model('usuarios', Usuario);