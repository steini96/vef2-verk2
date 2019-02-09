const express = require('express');

const router = express.Router();

const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL;

router.get('/applications', async (req,res)=>{
  const client = new Client({
    connectionString,
  });
  client.connect();

  try{
    const appl = await client.query('select * from applications');
    res.render('applications',{appl:appl.rows})
  }catch(e){
    throw(e);
  }
  await client.end();
});

function form(req, res){
  res.render('applications', {id:''});
}


async function processFunction(req, res) {
    const idd = req.params.id;
    await runQuery("UPDATE applications SET unnin = true, data = current_timestamp WHERE id = ${idd}");
    return res.redirect('/applications');
}

async function deleteFunction(req, res) {
    const id = req.params.id;
    await runQuery('DELETE FROM applications WHERE id = ${id}');
    return res.redirect('/applications');
}

async function runQuery(query) {
    const client = new Client({ connectionString });

    await client.connect();

    try {
      await client.query(query);
    } catch (err) {
      console.error('Error running query');
      throw err;
    } finally {
      await client.end();
    }
  }

module.exports = {
    //insert,
    runQuery
};

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}
//router.post('/register', validation, sanitazion,  (register));
//router.post('/applications/process/:id', catchErrors(processFunction));
router.get('/', (form));
router.post('/applications/delete/:id', catchErrors(deleteFunction));

module.exports = router;
