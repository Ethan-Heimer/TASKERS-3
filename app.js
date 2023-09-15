const express = require("express");
const app = express();

const bodyParser = require('body-parser');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', "ejs");
app.set('views', "./views")

let tasks = []; 

app.get("/", (req, res) => {
    res.render("index", {tasks});
})

app.post("/addTask", (req, res) => {
    const newTask = req.body.task;
    console.log(newTask);

    tasks.push({id: Date.now(), text: newTask});
   
    res.redirect("/");
})

app.get('/edit/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id === taskId);
    res.render('edit', {task});
});

app.post('/edit/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const updatedText = req.body.task;
    const task = task.find(task => task.id === taskId);
    if (task)
        task.text = updatedText;
        res.redirect('/');  
})



app.listen(process.env.PORT || 3000, () => {});
