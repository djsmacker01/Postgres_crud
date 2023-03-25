const express = require('express');
const cors = require('cors');
const postgres = require('postgres')
require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());


const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`

const sql = postgres(URL,{ssl: 'require'})

app.get('./', (req, res)=>{
    let data = {
        'name': 'smith',
        age: 23
    }
    res.json(data);
    console.log(data);

})

app.get('/test', async (req, res) => {
    const result = await sql`select version()`
    console.log(result);
    let data = { 'result': result }
    res.json(data)
})

// app.get('/version', async(req, res) => {
//     const result = await sql`select version()`
//     console.log(result);
//     let data = { 'result': result }
//     res.json(data)
// })

// Create a jobrecord

app.post('/jobs', async (req, res) => {
    const result = await sql`
      insert
      into jobs
      (jobtitle,company,region,jobcategory)
      values(
        ${req.body.jobtitle},
        ${req.body.company},
        ${req.body.region},
        ${req.body.jobcategory} )`;
    console.log(result)
    let data = { 'results': result };
    res.json(data);
})



//Create a new job
app.post('/jobs', async (req, res) => {
    const result = await sql`
      insert into jobs(jobtitle, company, region,jobcategory)
      value(
        ${req.body.jobtitle},
        ${req.body.company},
        ${req.body.region},
        ${req.body.jobcategory}
      )
    `
    console.log(result)
    let data = { 'result': result }
    res.json(data)
})

app.get("/jobs/", async (req, res) => {
    const result = await sql`select * from jobs`;
    console.log(result);
    let data = {"result": result};
    res.json(data);      
});

// update a specific record
app.put("/jobs/:id", async (req,res) => {
	//console.log(req.body);
	const result = await sql`
		update jobs 
		  set jobtitle    = ${req.body.jobTitle},
		      company     = ${req.body.company},
			  region      = ${req.body.region},
			  jobcategory = ${req.body.jobCategory}
		  where id=${req.params.id}`;
    console.log(result);
    let data = {"result": result};
    res.json(data);      
});


// delete a specific record
app.delete("/jobs/:id", async (req,res) => {
	const result = await sql`delete from jobs where id=${req.params.id}`;
    console.log(result);
    let data = {"result": result};
    res.json(data);      
});

app.listen(PORT, () => {
    console.log(`Server is running and listening on ${PORT}`);
});