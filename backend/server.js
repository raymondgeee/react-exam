const fs = require('fs');
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))

app.post('/save', function(req, res) {
    const data = req.body;
    return res.status(200);
    // fs.writeFile('../src/json/record.json', JSON.stringify(data, null, 4), (err) => {
    //     if (err) {
    //         return res.status(500)
    //     }

    //     return res.status(200);
    // });
});

app.get('/delete', function(req, res) {
    const data = req.params;
    console.log(data)
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});