const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`

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