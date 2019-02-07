const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL; // sótt úr env gegnum dotenv pakka

async function insert(nafn, netfang, simi, texti, starf, unnin){

  const client = new Client({
    connectionString,
  });
  client.connect();

  try{
    const query = 'INSERT INTO students (nafn, netfang, simi, texti, starf) VALUES ($1, $2, $3, $4, $5)';
    const res = await client.query(query, [nafn, netfang, simi, texti, starf]);
    console.log(res.rows);
  }catch(err){
    console.log(err);
  //  throw(err);
  }
  await client.end();
}


module.exports = {
  insert,
};
