const express = require('express')
const morgan = require('morgan')
const mysql = require('mysql')
const cors = require('cors')
var bodyParser = require('body-parser');

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// app.use(morgan('short'))

var pool  = mysql.createPool({
    connectionLimit : 20,
    host            : 'localhost',
    user            : 'root',
    password        : 'rocksarehard',
    database        : 'testDB'
  });

app.get('/teamRetrieve/:uid', (req, res)=>
{
    const uid = req.params.uid
    const q = "SELECT * from TEAMS WHERE UID = " + uid + ";"
    pool.getConnection(function(err, connection)
    {
        if (err) 
        {
            console.log("could not connect" + err)
            res.end()
        }
        connection.query(q, (err, result) =>
        {
            connection.release()
            if (err)
            {
                console.log("could not search " + err)
                res.sendStatus(500)
                res.end()
                return
            }
            res.json(result)
        })
    })
} 
)


app.get('/userRetrieve/:username/:password', (req, res) =>
{
    const username = req.params.username
    const password = req.params.password
    console.log(username, password)
    const q = "SELECT id, username from user where username = '" + username + "' and password = '" + password + "';"
    pool.getConnection(function(err, connection)
    {
        if (err) 
        {
            console.log("could not connect" + err)
            res.end()
        }
        connection.query(q, (err, result) =>
        {
            connection.release()
            //console.log(result)
            if (err)
            {
                res.sendStatus(500)
                res.end()
                return
            }
            res.json(result)
        })
    })
})

app.post('/userPost', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const q = "INSERT INTO USER (username, password) VALUES (?,?)"
    pool.getConnection(function(err, connection)
    {
        if (err) 
        {
            console.log("could not connect" + err)
            res.end()
        }
        connection.query(q, [username, password], (err, results, field) =>
        {
            connection.release()
            if (err)
            {
                console.log("could not search " + err)
                res.sendStatus(500)
                return
            }
            res.send({id: results.insertId})       
        })
    })
})

app.post('/addNewTeam', (req, res) => {
    const uid = req.body.user
    const team = req.body.team
    const p1 = req.body.p1
    const p2 = req.body.p2
    const p3 = req.body.p3
    const p1Image = req.body.p1Image
    const p2Image = req.body.p2Image
    const p3Image = req.body.p3Image
    const normal = req.body.normal 
    const fighting = req.body.fighting
    const flying = req.body.flying
    const poison = req.body.poison
    const ground = req.body.ground
    const rock = req.body.rock
    const bug = req.body.bug
    const ghost = req.body.ghost
    const steel = req.body.steel
    const fire = req.body.fire
    const water = req.body.water
    const grass = req.body.grass
    const electric = req.body.electric
    const psychic = req.body.psychic
    const ice = req.body.ice
    const dragon = req.body.dragon
    const dark = req.body.dark
    const fairy = req.body.fairy
    const date = req.body.date
    const q = "INSERT INTO TEAMS(p1, p2, p3, p1Image, p2Image, p3Image," +
    "normal, fighting, poison, ground, rock, bug, ghost, steel, fire, water, grass, electric," +
    "psychic, ice, dragon, dark, fairy, date, uid, team, flying)" +
    "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
    pool.getConnection(function(err, connection)
    {
        if (err) 
        {
            console.log("could not connect" + err)
            res.end()
        }
        connection.query(q, [p1, p2, p3, p1Image, p2Image, p3Image,
        normal, fighting, poison, ground, rock, bug, ghost, steel, fire, water, grass, electric,
        psychic, ice, dragon, dark, fairy, date, uid, team, flying], (err, results, field) =>
        {
            connection.release()
            if (err)
            {
                console.log("could not post " + err)
                res.sendStatus(500)
                return
            }
            res.send({id: results.insertId})       
        })
    })
})

app.listen(8000, () =>
{
    console.log("server up and listening on localhost:8000")
})