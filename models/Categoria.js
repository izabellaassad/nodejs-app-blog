const mongoose=require("mongoose")
const Schema= mongoose.Schema

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


module.exports= mongoose.model("Categorias", Categoria)