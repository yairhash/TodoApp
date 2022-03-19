const express = require("express");
const mysql = require("mysql");
const bodyparser = require("body-parser");
const cors = require('cors');
const app = express();

app.use(bodyparser.json());
app.use(cors())

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'todoapp',
    connectionLimit:10,
});

// Get all tasks from DB
app.get("/getall", (req, res) => {
    const gettask = "SELECT * FROM todoapp.tasklists ";
    db.query(gettask,(err,result)=>{
        if(err) throw err
        return res.status(200).json(result);
    });
});

// Cteate a new task in DB 
app.post("/create", (req, res) => {
    const Task = req.body.Task;
    const Date = req.body.Date;
    const Status = req.body.Status;
    var sql = "INSERT INTO `tasklists`(Task,Date,Status) VALUES ('" + Task + "', '" + Date + "', '" + Status + "')";
    db.query(sql,(err,result)=>{
        if(err) throw err
        res.status(201).json({message:"Successfully added"});
    })
});

//Delete spasific task ID
app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    var sql = "DELETE FROM  `tasklists`WHERE id = ?";
    db.query(sql, id, (err, result) => {
        if(err) throw err
        res.status(200).json({message:"Successfully deleted:" + id});
    });
});
  
//Update spasific task ID
app.put("/update/:id", (req, res,next) => {
    const id = req.params.id
    const Task =  req.body.Task
    const Date =  req.body.Date
    const Status = req.body.Status
    var sql = "UPDATE `tasklists` SET Task  = '" + Task + "', Date = '" + Date + "', Status = '" + Status + "'   WHERE id = " + id + ";"
    console.log(sql)
    db.query(sql, (err,result)=>{
        if (err) return next(err)
        res.json({message:"Successfully updated"})
    })
});

app.listen(3001, () => {
    console.log("server is running on port 3001");
});
  
