const mongoose=require("mongoose")
const connect = () => {
    return mongoose.connect('mongodb://localhost:27017/Library', { useNewUrlParser: true, useUnifiedTopology: true });

};

const author=new mongoose.Schema({
    author:String,
    books:String,
    genre:String,
    description:String,
    img:String
})
const Author=mongoose.model('author',author);
const book=new mongoose.Schema({
    title:String,
    author:String,
    genre:String,
    description:String,
    img:String
})
const Book=mongoose.model('book',book);
const user=new mongoose.Schema({
    name:String, 
    email:String, 
    password:String, 
    dob:String,
    country:String,
    gender:String
})
const User=mongoose.model('user',user);

connect().then(
 console.log("db connected")
).catch(e=>console.log(e));

module.exports={authordb:Author,bookdb:Book,userdb:User};
