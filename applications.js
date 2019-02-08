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

/*
async function processFunction(req, res) {
    const idd = req.params.id;
    await runQuery(UPDATE students SET unnin = true, data = current_timestamp WHERE id = ${idd});
    return res.redirect('/applications');
}

async function deleteFunction(req, res) {
    const idd = req.params.id;
    await runQuery(DELETE FROM applications WHERE id = ${idd});
    return res.redirect('/applications');
}

router.post('/applications/process/:id', catchErrors(processFunction));
router.post('/applications/delete/:id', catchErrors(deleteFunction));
*/

module.exports = router;
