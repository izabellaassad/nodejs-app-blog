// Carregando módulos

// O express é responsável por roterizar a API.
const express= require('express')

const handlebars= require("express-handlebars")
const bodyParser= require('body-parser')
const mongoose= require('mongoose')
const path= require("path")

// Instâncio aqui o express
const app = express()

//Buscar rotas em outra pasta
const admin= require ("./routes/admin")


//Configurações

//Body Parser
// O body-parser é responsável por gerenciar o app no modelo **REST**.
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//Handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Mongoose
mongoose.Promise= global.Promise;
mongoose.connect("mongodb://localhost:27017/blogapp",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(function(){
console.log ("Mongo conectado");
}).catch(function(erro){
    console.log("Houve um erro ao conectar"+erro)
}); 

//Public
app.use(express.static(path.join(__dirname,"public"))) // caminho completo da pasta public utiliza o __diarme (está aguardando todo os arquivos estáticos)
//Rotas
app.use('/admin', admin)

//Outros
const PORT= 8081
app.listen(PORT, function(){
    console.log("Servidor Rodando!");
});