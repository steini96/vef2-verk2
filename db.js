const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL; // sótt úr env gegnum dotenv pakka

async function insert(nafn, netfang, simi, texti, starf, unnin){

  const client = new Client({
    connectionString,
  });
  client.connect();
  try{
    const query = 'INSERT INTO applications (nafn, netfang, simi, texti, starf) VALUES ($1, $2, $3, $4, $5)';
    const res = await client.query(query, [nafn, netfang, simi, texti, starf]);
    console.log(res.rows);
  }catch(err){
    console.log(err);
  }
  await client.end();
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
    insert,
    runQuery
};

module.exports = {
  insert,
};
