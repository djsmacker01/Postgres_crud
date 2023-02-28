const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('./', (req, res)=>{
    let data = {
        'name': 'smith',
        age: 23
    }
    res.json(data);
    console.log(data);

})

app.listen(PORT, () => {
    console.log(`Server is running and listening on ${PORT}`);
});