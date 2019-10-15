const express= require("express")
const router= express.Router()

router.get('/', function(req,res){
 res.render("admin/index")
});

router.get('/posts', function(req,res){
    res.send("Página de posts")

});

router.get("/categorias", function(req,res){
    res.render("admin/categorias")
});

router.get("/categorias/add", function(req,res){
    res.render("admin/addcategorias")
});

module.exports= router