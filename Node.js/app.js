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
  user: 'postgresArnaud',
  host: '82.165.248.136',
  database: 'projetIntegration',
  password: 'zGwgD4he37QvL7YY',
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
*************************************************/	//TEST OK

app.post('/newhistory', async (req, res) => {
  const query = "INSERT INTO history (door, users, date, action) VALUES ($1,$2,$3,$4)";
  let valeur = [req.query.door, req.query.users, req.query.date, req.query.action];		
  await pool.query(query, valeur, (err) => {
	if (err) return res.send(false);
	return res.send(true);
	});
   const query2 = "UPDATE door set status = !status where id=door VALUES ($1)"
   let valeur2 = [req.query.door];
   await pool.query(query2, valeur2, (err) => {
	if (err) return res.send(false);
	return res.send(true);
	});
});

/*-----------------STATIC------------------*/

// LISTE DES USERS

app.get('/listUsers', function (req, res) {
    fs.readFile( __dirname + "/static/" + "users.json", 'utf8', function (err, data) {
        console.log( data );
        res.end( data );
    })
});

//USER TRIER PAR ID

app.get('/listUsers/:id', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/static/" + "users.json", 'utf8', function (err, data) {
        var user = JSON.parse(data);
        var users ;
        for (i=0; i<user.length; i++){
            if (user[i].id == [req.params.id]){
                users = user[i];
            }
        }
        console.log( users);
        res.end( JSON.stringify(users));
    })
});

//LISTE DE TAG TRIER PAR USER

app.get('/listTagByUser/:id', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/static/" + "access.json", 'utf8', function (err, data) {
        var user = JSON.parse(data);
        var users =[];
        for (i=0; i<user.length; i++){
            if (user[i].users == [req.params.id]){
                users += " - " +  user[i].tag + "\n";
            }
        }
        console.log( users);
        res.end("liste des tags pour l'utilisateur ayant l'id " + [req.params.id] + " : \n" + users);
    })
});

//RAJOUT D UN USER

app.post('/addUser/:id/:firstname/:lastname/:sexe/:mail/:password', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/static/" + "users.json", 'utf8', function (err, data) {
        let newUser = {
            "id":parseInt([req.params.id]),
            "firstname":[req.params.firstname],
            "lastname":[req.params.lastname],
            "sexe":[req.params.sexe],
            "mail":[req.params.mail],
            "password":[req.params.password]
        };
        data = JSON.parse( data );
        data += newUser;
        console.log( data );
        res.end( JSON.stringify(data));
    })
});

// LISTE DES ACCESS PAR DOOR

app.get('/listAccessByDoor/:DoorId', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/static/" + "access.json", 'utf8', function (err, data) {
        var user = JSON.parse(data);
        var users = [];
        for (i=0; i<user.length; i++){
            if (user[i].door == [req.params.DoorId]){
                users[i] =  user[i];
            }
        }
        console.log(users);
        res.end(JSON.stringify(users));
    })
});

//DOOR TRIER PAR ID

app.get('/listDoors/:id', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/static/" + "doors.json", 'utf8', function (err, data) {
        var door = JSON.parse(data);
        var doors ;
        for (i=0; i<door.length; i++){
            if (door[i].id == [req.params.id]){
                doors = door[i];
            }
        }
        console.log( doors);
        res.end( JSON.stringify(doors));
    })
});

//DOORS TRIER PAR TAG

app.get('/listDoorsByTag/:tag', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/static/" + "access.json", 'utf8', function (err, data) {
        var access = JSON.parse(data);
        var doors ;
        for (i=0; i<access.length; i++){
            if (access[i].tag == [req.params.tag]){
                doors = access[i];
            }
        }
        console.log( doors);
        res.end( JSON.stringify(doors));
    })
});

//DOOR BY TAG AND USER

app.get('/listDoorsByTagAndUser/:tag/:user', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/static/" + "access.json", 'utf8', function (err, data) {
        var access = JSON.parse(data);
        var doors ;
        for (i=0; i<access.length; i++){
            if (access[i].tag == [req.params.tag] && access[i].users == [req.params.user]){
                doors = access[i];
            }
        }
        console.log(doors);
        res.end( JSON.stringify(doors));
    })
});

//LISTE HISTORY PAR DOOR

app.get('/listHistoryByDoor/:door', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/static/" + "history.json", 'utf8', function (err, data) {
        var history = JSON.parse(data);
        var doors ;
        for (i=0; i<history.length; i++){
            if (history[i].door == [req.params.door]){
                doors = history[i];
            }
        }
        console.log(doors);
        res.end( JSON.stringify(doors));
    })
});

//RAJOUT D'UNE DOOR

app.post('/addDoor/:id/:password/:statut', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/static/" + "doors.json", 'utf8', function (err, data) {
        let newDoor = {
            "id":parseInt([req.params.id]),
            "password":[req.params.password],
            "statut":parseInt([req.params.statut])
        };
        data = JSON.parse( data );
        data += newDoor;
        console.log( data );
        res.end( JSON.stringify(data));
    })
});

//RAJOUT D'UN ACCESS

app.post('/addAccess/:id/:user/:tag/:nickname', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/static/" + "access.json", 'utf8', function (err, data) {
        let newAccess = {
            "id":parseInt([req.params.id]),
            "user":parseInt([req.params.user]),
            "tag":[req.params.tag],
            "nickname":[req.params.nickname]
        };
        data = JSON.parse( data );
        data += newAccess;
        console.log( data );
        res.end( JSON.stringify(data));
    })
});

//RAJOUT D'UN HISTORY

app.post('/addHistory/:id/:door/:users/:moment/:action', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/static/" + "history.json", 'utf8', function (err, data) {
        let newHistory = {
            "id":parseInt([req.params.id]),
            "door":parseInt([req.params.door]),
            "users":parseInt([req.params.users]),
            "moment":[req.params.moment],
            "action":[req.params.action]
        };
        data = JSON.parse( data );
        data += newHistory;
        console.log( data );
        res.end( JSON.stringify(data));
    })
});








app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

//ecoute sur le port 8888
app.listen(8081);