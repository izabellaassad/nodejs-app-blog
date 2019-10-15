const mongoose=require("mongoose")
const Schame= mongoose.Schema

const Categoria= new Schema({
    nome: {
        type: String,
        required:true
    },

    slug:{
        type: String,
        required: true

    },
    date: {
        type: Date,
        default: Date.now() // Na hora que usuário cadastrar a data
    }
})

mongoose.model=("categorias", Categoria)