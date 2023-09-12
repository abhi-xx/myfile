const express=require('express');
var connect=require("./db/config")
const singup_copy=("./singup_copy")
var mult=require('multer')
 var singu=require("./singup_copy");
const bodyparser=require("body-parser");
var pro=require('./product');
const app=express();
var router=express.Router();
app.set('view engine','ejs');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
// use for file uploading
const storage= mult.diskStorage({
    destination:function(_req,_file,cb){
        cb(null,'./upload');
    },

filename: function(req,file,cb){
    cb(null,file.originalname);
}
});
const fileFilter=(req,file,cb)=>{
    const allowedFileTypes=['image/jpeg','image/png','image/webp'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null,true);
        
    } else {
        cb(null,false);
        
    }
}
app.get("/",function(req,res)
{
res.render('index')
})
app.get("/services",function(req,res)
{
res.render('services')
}
)
app.get("/cargallery",function(req,res)
{
res.render('cargallery')
})
app.get("/stock",function(req,res)
{
res.render('stock')
})
app.get("/dashboard/index",function(req,res)
{
res.render('dashboard/index')
})
app.get("/dashboard/addproduct",function(req,res)
{
res.render('dashboard/addproduct')
})
let upload= mult({ storage,fileFilter});
app.post('/addproduct',upload.single('productname'),(req,res)=>{
    var product1={
        ProductName:req.body.ProductName,
        ProductPrice:req.body.ProductName,
        ProductImage:req.body.ProductImage,
    }
    var regpost=new pro(product1);
    regpost.save()
    .then(()=>
    //res.redirect("/login")
    res.json('register successfully'))
    .catch(err => res.status(404).json('error:'+err));
    
})
app.get("/signup",function(req,res)
{
res.render('singup')
})
app.post('/signup',(req,res) => {
    var singu1={
        fname:req.body.fname,

        email:req.body.email,
        // posty:req.body.posty,

        contact:req.body.contact,
        password:req.body.password


    };
    var regpost=new singu(singu1);
    regpost.save()
    .then(()=>
    //res.redirect("/login")
    res.json('register successfully'))
    .catch(err => res.status(404).json('error:'+err));
        
    })


app.get("/viewsingup",async (req,res)=>{
try{
const usedata=await singup_cop.find({});
res.render('dashboard/viewsingup',{singup_cop:singup_cop});
console.log(singup_cop)
}catch(err){
    console.log(err)
}
});

//delete
app.get('/delete/:id', async (req,res)=>{
    try{
        const singup_copy =await singup_copy.findByIdAndRemove(req.params.id);
        res.redirect('dashboard/viewsingup')
    }catch(err){
        console.log(err);
    }

});
//edit get 
router.get('/edit/:id',async (req,res)=>{
try {
    const singup_copy= await singup_copy.findById(req.params.id);
    //console.log(usedata)
    res.render('dashboard/viewsignup')

}catch(err){
    console.log(err)
}

});

router.post("/edit/:id", async (req, res) => {
    const itemId = req.params.id;
    const updatedData = {
        fname:req.body.fname,

        email:req.body.email,
        // posty:req.body.posty,

        contact:req.body.contact,
        password:req.body.password
    };
      try {
      const updatedItem = await register.findByIdAndUpdate(itemId, updatedData, { new: true });
  
      if (!updatedItem) {
        return res.status(404).json({ message: 'Item not found' });
      }
  
      // res.json(updatedItem);
      res.redirect('/edit/'+itemId)
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  })
app.use("/",router);
app.use(express.static("upload"));
app.listen(5000);