const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


main().catch(err => console.log(err));
async function main() {
 // await mongoose.connect('mongodb://localhost:27017/wikiDB');  
  await mongoose.connect('mongodb+srv://crystal_clear:An754d57ee6gyPDg@cluster0.qzdyhxz.mongodb.net/blogDB?retryWrites=true&w=majority')
  }

  const articleSchema = {
    title: String,
    content: String
  }
const Article = mongoose.model("articles",articleSchema);


//////////////////////////Requestes Targetting All Articles///////////////////////////////////


//app.route('/articles').get().post().delete()//schema for routing used in this module chained routing
app.route('/articles')

.get(function(req,res){
  Article.find(function(err,foundArticles){
    if(!err){
 res.send(foundArticles);
    }
  else {
    res.send(err);
  }
   
  })

})

.post(function(req,res){
  console.log(); 
  console.log(); 

  const newArticle = new Article({
    title:req.body.title,
    content:req.body.content
  });
  newArticle.save(function(err){
    if(!err){
      res.send("added new article");
    }else{
      res.send(err);
    }
  });
})

.delete(function(req,res){
  Article.deleteMany(function(err){
    if(!err){
    res.send("deleted all articles");
  }else{
    res.send(err);
  }} )
});


//////////////////////////////Requests targetting A Specific Article////////////////////////////////

app.route("/articles/:articleTitle")

// req.params.articleTitle = ""
.get(function(req,res){
  
      Article.findOne({title:req.params.articleTitle},function(err, foundArticle){
          if(foundArticle){
            res.send(foundArticle);
          }
          else{
            res.send("No Article MAtching that title was found")
          }
      });
})
.put(function(req,res){ //update
  Article.replaceOne(
    {title:req.params.articleTitle},//condition
    {title:req.body.title,content:req.body.content},//updates,
    {overwrite:true},
    function(err){
      if(!err){
        res.send("sucessfully updated article")
      }else{
        console.log(err);
        res.send(err)
      }
    }
  );
})
.patch(function(req,res){
    Article.updateOne(
      {title:req.params.articleTitle},
      {$set:req.body},
      function(err){
      if(!err){
        res.send("sucessfully updated article z")
      }else{
        console.log(err);
        res.send(err)
      }
    }
    )
})
.delete(function(req,res){
  Article.deleteOne(
    {title:req.params.articleTitle},
    function(err){
      if(!err){
        res.send("sucessfully deleted article z")
      }else{
        console.log(err);
        res.send(err)
      }
    }

  )
})




app.listen(8000, function() {
  console.log("Server started on port 8000");
});  