const express = require('express');
const { check, validationResult } = require('express-validator/check');

//const{Client} = require('pg');

//const connectionString = process.env.DATABASE_URL;

const {insert} = require('./db');

/*const client = new Client({
  connectionString,
});*/

const router = express.Router();

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

const validation = [
  check('name').isLength({ min: 1 }).withMessage('Nafn má ekki vera tómt'),
  //check('name').isEmail().withMessage('Netfang verður að vera netfang'),
];

const sanitazion = [

];

/*router.get('/',(req, res) => {
  res.render('index', {name: 'óli'});
});*/

function form(req, res){
  //const {body: {name} = {} } = req;

  res.render('index', {name: '', errors: []});
}

async function register(req, res){
  const {body: {name} = {} } = req;
  const errors = validationResult(req);

  console.log(errors);
  if(!errors.isEmpty()){
    const errorMessages = errors.array();
    res.render('index', {name, errors: errorMessages});
  }else{
    try{
      await insert(name);
    }catch(e){
      console.log('gat ekki búið til nemenda',name,e);
      throw(e);
    }
    res.render('thanks');
  }
}

router.get('/', catchErrors(form));
router.post('/register', validation, sanitazion,  catchErrors(register));

module.exports = router;
