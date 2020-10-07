const express = require('express');
const pg = require('pg');
const session = require('express-session');
const bodyParser = require('body-parser');
const pgSession = require('connect-pg-simple')(session);
const cors = require('cors');
var http = require('http');


const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//connection avec la db
let pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dbIntegration',
  password: 'dbpassword$$$',
  port: '5432'
});
pool.connect(function (err) {
  if (err) throw err;
  else {
    console.log('Connection with database done.');
  }
});

/*************************************************
		GET USER
*************************************************/	// TEST OK

app.get('/user/:id', async (req, res) => {
  let userId = parseInt(req.url.split('/user/').pop());
  let sql = 'select * from users where id = ' + userId;					
  pool.query(sql, (err, rows) => {
    if (err) throw err;
    return res.send(rows.rows);
  })
});

/*************************************************
		POST USER
*************************************************/	// TEST OK

app.post('/newuser', async (req, res) => {
  const query = "INSERT INTO users (firstname, lastname, sexe, mail, password) VALUES ($1,$2,$3,$4,$5)";
  let valeur = [req.query.firstname, req.query.lastname, req.query.sexe, req.query.mail, req.query.password];		
  await pool.query(query, valeur, (err) => {
	if (err) return res.send(false);
	return res.send(true);
});
});

/*************************************************
		GET ACCESS
*************************************************/	// TEST OK

app.get('/access/:door', async (req, res) => {
  let doorId = parseInt(req.url.split('/access/').pop());
  let sql = 'select * from access where door = ' + doorId;					
  pool.query(sql, (err, rows) => {
    if (err) throw err;
    return res.send(rows.rows);
  })
});

/*************************************************
		GET DOOR
*************************************************/	// TEST OK

app.get('/door/:id', async (req, res) => {
  let doorId = parseInt(req.url.split('/door/').pop());
  let sql = 'select * from door where id = ' + doorId;
  pool.query(sql, (err, rows) => {
    if (err) throw err;
    return res.send(rows.rows);
  })
});

/*************************************************
		GET DOOR BY TAG
*************************************************/	//TEST OK

app.get('/doorTag/:tag', async (req, res) => {
  let doorTag = req.url.split('/doorTag/').pop();
  let sql = 'select * from access where tag = \'' + doorTag + '\'';
  pool.query(sql, (err, rows) => {
    if (err) throw err;
    return res.send(rows.rows);
  })
});

/*************************************************
		GET DOORS BY SPECIFIC TAG & USER
*************************************************/	//TEST OK

app.get('/doorTagUser/:tag/:users', async (req, res) => {
  let tag=req.params.tag;
  let users=req.params.users;
  let sql = 'select * from access where tag = \'' + tag + '\' AND users = \'' + users + '\'';
  pool.query(sql, (err, rows) => {
    if (err) throw err;
    return res.send(rows.rows);
  })
});

/*************************************************
		GET TAGS BY USER
*************************************************/	//TEST OK

app.get('/userTag/:userId', async (req, res) => {
    let userId = parseInt(req.url.split('/userTag/').pop());
    let sql = 'select tag from access where users = ' + userId ;
    pool.query(sql, (err, rows) => {
        if (err) throw err;
        return res.send(rows.rows);
    })
});

/*************************************************
		GET DOOR HISTORY BY DOOR ID
*************************************************/	//TEST OK

app.get('/doorHistory/:doorId', async (req, res) => {
    let doorId = parseInt(req.url.split('/doorHistory/').pop());
    let sql = 'select * from history where door = ' + doorId ;
    pool.query(sql, (err, rows) => {
        if (err) throw err;
        return res.send(rows.rows);
    })
});

/*************************************************
		POST ACCESS
*************************************************/	//TEST OK

app.post('/newaccess', async (req, res) => {
  const query = "INSERT INTO access (door, users, tag, name) VALUES ($1,$2,$3,$4)";
  let valeur = [req.query.door, req.query.users, req.query.tag, req.query.name];		
  await pool.query(query, valeur, (err) => {
	if (err) return res.send(false);
	return res.send(true);
});
});

/*************************************************
		POST DOOR
*************************************************/	//TEST OK

app.post('/newdoor', async (req, res) => {
  const query = "INSERT INTO door (password, status) VALUES ($1,$2)";
  let valeur = [req.query.password, req.query.status];		
  await pool.query(query, valeur, (err) => {
	if (err) return res.send(false);
	return res.send(true);
});
});


/*************************************************
		POST HISTORY
*************************************************/

app.post('/newhistory', async (req, res) => {
  const query = "INSERT INTO history (door, users, date, action) VALUES ($1,$2,$3,$4)";
  let valeur = [req.query.door, req.query.users, req.query.date, req.query.action];		
  await pool.query(query, valeur, (err) => {
	if (err) return res.send(false);
	return res.send(true);
});
});

app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

//ecoute sur le port 8888
app.listen(8888);