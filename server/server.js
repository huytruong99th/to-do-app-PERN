const express = require('express');
const app = express();
const pool = require('./db');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid')

const PORT = process.env.PORT || 8000;

app.use(cors())
app.use(express.json())

app.get('/todos/:userEmail', async (req, res) => {
    const { userEmail } = req.params

    try {
        const todos = await pool.query('SELECT * FROM todos WHERE user_Email = $1', [userEmail])
        res.json(todos.rows)
    } catch(err) {
        console.error(err)
    }
})

app.post('/todos', async (req, res) => {
    const { user_email, title, progress, date } = req.body;
    const id = uuidv4()

    try {
        const newToDo = await pool.query(`INSERT INTO todos(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5)`, [id, user_email, title, progress, date])
        res.json(newToDo)
    } catch(err) {
        console.error(err)
    }
})


app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))