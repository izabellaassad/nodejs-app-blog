// Carregando módulos

// O express é responsável por roterizar a API.
const express= require('express')

const handlebars= require("express-handlebars")
const bodyParser= require('body-parser')
const mongoose= require('mongoose')
const path= require("path")
const session= require("express-session")
const flash= require("connect-flash")

// Instâncio aqui o express
const app = express()

//Buscar rotas em outra pasta
const admin= require ("./routes/admin")


// Sessão
// criação e criação de MIDDLEWARES
app.use(session({
    secret: "cursodenode", // chave
    resave: true,
    saveUninitialized: true
}))

// Flash
app.use(flash())

//Middleware
app.use(function(req,res,next){
    //Criação de variaveis globais (acessa em qualquer parte)
    res.locals.success_msg= req.flash("success_msg")
    res.locals.error_msg= req.flash("error_msg")
    next()
})
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

app.use(function(req,res, next){
    console.log("Oie!!")
    next()
})
//Rotas
app.use('/admin', admin)

//Outros
const PORT= 8081
app.listen(PORT, function(){
    console.log("Servidor Rodando!");
});