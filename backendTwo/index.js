const express = require('express')
const morgan = require('morgan')
const mysql = require('mysql')

const app = express()

// app.use(morgan('short'))

var pool  = mysql.createPool({
    connectionLimit : 20,
    host            : 'localhost',
    user            : 'root',
    password        : 'rocksarehard',
    database        : 'testDB'
  });

app.get('/testRetrive', (req, res) =>
{
    const q = "SELECT * from user"
    pool.getConnection(function(err, connection)
    {
        if (err) 
        {
            console.log("could not connect" + err)
        }
        connection.query(q, (err, result) =>
        {
            connection.release()
            //console.log(result)
            if (err)
            {
                console.log("could not search " + err)
                return
            }
            res.json(result)
        })
    })
})

app.listen(8000, () =>
{
    console.log("server up and listening on localhost:8000")
})