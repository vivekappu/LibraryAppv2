const { urlencoded } = require("express")

const mongoose=require("mongoose")
const connect=()=>{
    return mongoose.connect('mongodb://localhost:27017/books')
    
}
const book=new mongoose.Schema({
    name:String,
    author:String,
    genre:String,
    img:String,
    description:String
})
const Book=mongoose.model('book',book);
connect()
.then(async connection=>{
    const student1= await Book.create({name:"harry potter",author:"J K Rowling",
genre:"fantasy",img:"",description:"nice book"})
const student2= await Book.create({name:"sherlock",author:"author conan doyle",
genre:"detective",img:"",description:"nice book"})
book.find("author:conan doyle")
console.log(student);
})
.catch(
    (e)=>console.error(e)
)