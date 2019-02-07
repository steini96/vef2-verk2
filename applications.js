const express = require('express');

const router = express.Router();

/* todo útfæra */
const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL;

router.get('/applications', async (req,res)=>{
  const client = new Client({
    connectionString,
  });
  client.connect();

  try{
    const appl = await client.query('select * from students');
    res.render('applications',{appl:appl.rows})
  }catch(e){
    throw(e);
  }
  await client.end();
});// hér næ ég í úr gagnagrunni



module.exports = router;
