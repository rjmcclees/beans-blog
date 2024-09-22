import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.json());

let blogPosts = [];
let blogPostId = 0;
const monthArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {

    res.render("index.ejs",{
      postQuantity: blogPosts.length,
      postContent: blogPosts,
    });
  });

app.get("/new", (req, res) => {
    res.render("new-post.ejs");
  });

app.get("/about", (req, res) => {
    res.render("about.ejs");
  });

app.get("/faqs", (req, res) => {
    res.render("faqs.ejs");
  });

app.post("/submit", (req, res) => {
    let d = new Date();
    const month = monthArray[d.getMonth()];
    const day = d.getDate();
    const year = d.getFullYear();
    const { name } = req.body;
    const { title } = req.body;
    const { blogpost } = req.body;
    blogPostId++;

    const newPost = {
      id: blogPostId,
      name,
      title,
      blogpost,
      month,
      day,
      year
    };

    blogPosts.push(newPost);
    res.render("success.ejs");
  });


app.post("/edit", (req, res) => {
    const { id } = req.body;
    let postId = id;
    let index = -1;
    index = blogPosts.findIndex(obj => obj.id == postId);


    const name = blogPosts[index].name;
    const title = blogPosts[index].title;
    const blogpost = blogPosts[index].blogpost;
    const month = blogPosts[index].month;
    const day = blogPosts[index].day;
    const year = blogPosts[index].year;

    res.render("edit-post.ejs",{
      id: postId,
      name,
      title,
      blogpost,
      month,
      day,
      year,
    });
  });

app.post("/delete", (req, res) => {
    const { id } = req.body;
    let postId = id;
    let index = -1;
    index = blogPosts.findIndex(obj => obj.id == postId);

    const name = blogPosts[index].name;
    const title = blogPosts[index].title;
    const blogpost = blogPosts[index].blogpost;
    const month = blogPosts[index].month;
    const day = blogPosts[index].day;
    const year = blogPosts[index].year;

    res.render("delete-post.ejs",{
      id: postId,
      name,
      title,
      blogpost,
      month,
      day,
      year,
    });
  });

app.post("/save", (req, res) => {
    const { id } = req.body;
    let postId = id;
    let index = -1;
    index = blogPosts.findIndex(obj => obj.id == postId);

    const { name } = req.body;
    const { title } = req.body;
    const { blogpost } = req.body;
    const { month } = req.body;
    const { day } = req.body;
    const { year } = req.body;

    const updatedPost = {
      id: postId,
      name,
      title,
      blogpost,
      month,
      day,
      year
    };

    blogPosts[index] = updatedPost;

    res.redirect('/');
})

app.post("/confirm-delete", (req, res) => {
  const { id } = req.body;
  let postId = id;
  let index = -1;
  index = blogPosts.findIndex(obj => obj.id == postId);

  blogPosts.splice(index,1);

  res.redirect('/');
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });