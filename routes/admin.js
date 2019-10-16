const express= require("express")
const router= express.Router()
const mongoose=require("mongoose")
const Categoria  = require("../models/Categoria")

router.get('/', function(req,res){
 res.render("admin/index")
});

router.get('/posts', function(req,res){
    res.send("Página de posts")

});

router.get("/categorias", function(req,res){
    Categoria.find().then(function(categorias){
    res.render("admin/categorias",  {categorias: categorias})
    }).catch(function(err){
        req.flash("error_msg", "Houve um erro ao listar as categorias")
        res.redirect("/admin")
    })
});

router.get("/categorias/add", function(req,res){
    res.render("admin/addcategorias")
});

 router.post("/categorias/nova",function (req,res){

    var erros= []

    console.log(req.body)

    if(!req.body.nome){
        erros.push({text:"Nome inválido"})
    }

    if (!req.body.slug){
        erros.push({text:"Slug inválido"})
    }

    if(req.body.nome.length<2) {
        erros.push({texto:"Nome  da categoria muito pequeno"})
    }

    if(erros.length){
        res.render("admin/addcategorias", {erros: erros})
    }else{ 
        const novaCategoria={
            nome: req.body.nome,
            slug: req.body.slug
        }
        console.log("faz")
        
        new Categoria(novaCategoria)
            .save()
            .then(function(){
                req.flash("success_msg", "Categoria criada com Sucesso")
                res.redirect("/admin/categorias")
                
            })
            .catch(function(err){
                req.flash("error_msg", "Houve um erro ao salvar a categoria, tente novamente")
                res.redirect("/admin")

            })
    

    }

})

module.exports= router