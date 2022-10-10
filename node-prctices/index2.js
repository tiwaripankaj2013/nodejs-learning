const express = require('express')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200)
    .json({ message: "Welcome" });
})

app.get('/users', (req, res) => {
    res.json({ message: "users" })
})

app.post('/users/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    res.json({ body, id })
})

app.listen(5000, ()=> console.log('app runing on port 5000'))