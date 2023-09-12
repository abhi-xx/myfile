var mongos=require("./db/config")
var mongos= require("mongoose");


const Schema1= new mongos.Schema({
    fname:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    // posty:{type:String, required:true},
    contact:{type:String, required:true},
    active:Boolean,
    date:{type:Date, default:Date.now}
})

//collection creation
// it is impt to declare vari

// const Playlist =  new mongo.model("Playlist",listSchema);
// playlist is a name of collection name

// create document or insert
// const createDocument=async()=>{
//     try {

//         const productlist2= new Playlist({
//             name:"seeta",
//             email:"seeta@gmail.com"
//         })
//         // method to save one data
//         // productlist2.save()
//      const productlist3= new Playlist({
//             name:"geeta",
//             email:"geeta@gmail.com"
//         })
//          const productlist4= new Playlist({
//             name:"meeta",
//             email:"meeta@gmail.com"
//         })
//      const result=await Playlist.insertMany([productlist2,productlist3,productlist4]);
//      console.log(result);
//     }

// catch(err){console.log(err)}
// }


const singup_copy= new mongos.model('SignUp',Schema1);
module.exports=singup_copy;


