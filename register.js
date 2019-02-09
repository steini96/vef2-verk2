const express = require('express');
const { check, validationResult } = require('express-validator/check');

const {insert} = require('./db');

const router = express.Router();

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

const validation = [
  check('nafn').isLength({ min: 1 }).withMessage('Nafn má ekki vera tómt'),
  check('netfang').isLength({ min: 1 }).withMessage('Netfang má ekki vera tómt'),
  check('netfang').isEmail().withMessage('Netfang verður að vera netfang'),
  check('simi').matches(/^[0-9]{3}(-| )?[0-9]{4}$/).withMessage('Símanúmer verður að vera sjö tölustafir'),
  check('texti').isLength({ min: 6 }).withMessage('Kynning verður að vera að minnsta kosti 100 stafir'), // Muna eftir að breyta min í 100
  check('starf').isLength({ min: 1 }).withMessage('Velja verður starf'),
];

const sanitazion = [
  /*sanitize('nafn')
    .trim()
    .escape(),
  sanitize('netfang')
    .normalizeEmail(),
  sanitize('ssn')
    .blacklist('-')
    .toInt(),
  sanitize('simi'),
  sanitize('texti'),
  sanitize('starf')*/
];

function form(req, res){
  res.render('index', {nafn: '', netfang:'', simi:'', texti:'', starf:'', errors: []});
}

async function register(req, res){
  const {body: {nafn, netfang, simi, texti, starf} = {} } = req;
  const errors = validationResult(req);

  console.log(errors);
  if(!errors.isEmpty()){
    const errorMessages = errors.array();
    res.render('index', {nafn,netfang,simi,texti,starf, errors: errorMessages});
  }else{
    try{
      await insert(nafn, netfang, simi, texti, starf);
    }catch(e){
      console.log('gat ekki búið til nemenda',nafn,netfang,simi,texti,starf,e);
      throw(e);
    }
    res.render('thanks');
  }
}

router.get('/', (form));
router.post('/register', validation, sanitazion,  (register));

module.exports = router;
