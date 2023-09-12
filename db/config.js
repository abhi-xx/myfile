var mongo=require('mongoose');
 var conn= mongo.connect("mongodb+srv://ranaabhinav808:admin123@cluster0.mi6uh0p.mongodb.net/demo?retryWrites=true&w=majority",

{ 

    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log("connection successful.."))
.catch((err)=>console.log(err));
module.exports=conn;