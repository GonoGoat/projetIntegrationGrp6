const express = require('express');
const pg = require('pg');
const session = require('express-session');
const bodyParser = require('body-parser');
const pgSession = require('connect-pg-simple')(session);
const cors = require('cors');
var http = require('http');
var https = require('https');
var fs = require('fs');
const { check, validationResult} = require('express-validator');

const bcrypt = require('bcrypt');
const saltRounds = 5;

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
  let userId = req.url.split('/user/').pop();
  let sql;
  if (userId === "*") {
    sql = 'select * from users'
  }
  else {
    sql = 'select * from users where id = ' + parseInt(userId);
  }
  pool.query(sql, (err, rows) => {
    if (err) throw err;
    return res.send(rows.rows);
  })
});

/*************************************************
		GET USER FULL NAME BY ID
*************************************************/

app.get('/user/fullname/:id', async (req, res) => {
  let userId = req.url.split('/user/fullname/').pop();
  let sql;
  if (userId === "*") {
    sql = 'select id, firstname, lastname from users'
  }
  else {
    sql = 'select id, firstname, lastname from users where id = ' + parseInt(userId);
  }
  pool.query(sql, (err, rows) => {
    if (err) throw err;
    return res.send(rows.rows);
  })
});

/*************************************************
		POST USER
*************************************************/	// TEST OK

app.post('/newUsers', (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.send(errors);
    } else {
        const query = "INSERT INTO users (firstname, lastname, phone, sexe, mail, password) VALUES ($1,$2,$3,$4,$5,$6)";
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(req.body.user.password, salt, async (err, hash) => {
                let valeur = [  req.body.user.firstname, req.body.user.name, req.body.user.phone, req.body.user.gender,req.body.user.mail, hash, ];
                console.log(valeur);
                await pool.query(query, valeur, (err) => {
                    if (err) {
                        console.log(err);
                        return res.send(false);
                    }
                    else {
                        return res.send(true);
                    }
                });
            });
        })
    }
});

/*************************************************
 GET USER BY MAIL
 *************************************************/	// TEST OK

 app.get('/userMail/:mail', async (req, res) => {
    let mail = req.url.split('/userMail/').pop();
    let sql = 'select mail from users where mail =  \'' + mail + '\'' ;
    pool.query(sql, (err, rows) => {
        if (err) throw err;
        if (res.send(rows.rows).length == 0) {
            return true;
        }
        return false;
    })
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
 GET ALL TAG
 *************************************************/	// TEST OK

 app.get('/listTag', async (req, res) => {
  let sql = 'select DISTINCT tag from access';
  pool.query(sql, (err, rows) => {
      if (err) throw err;
      return res.send(rows.rows);
  })
});

/*************************************************
		GET ALL DOORS
*************************************************/	// TEST OK

app.get('/doors', async (req, res) => {
    let sql = 'select * from door ';
    pool.query(sql, (err, rows) => {
      if (err) throw err;
      return res.send(rows.rows);
    })
});


/*************************************************
		GET DOOR by ID
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
		POST DOOR - Check si mot de passe OK pour cette porte
*************************************************/

app.post('/door/check', async (req, res) => {
    let id = parseInt(req.body.id);
    let user = parseInt(req.body.user)
    let isExisting = false;
    let sql = `select * from access where door = ${id} and users = ${user}`
    pool.query(sql, (err,rows) => {
        if (err) throw err;
        if (rows.rows.length > 0) {
            isExisting = true;
        }
        let sql2 = 'select (id,password) from door where id = ' + id;
        pool.query(sql2, (err, rows) => {
            if (err) throw err;
            if (rows.rows.length > 0) {
                let response = rows.rows[0].row
                let index = []
                for (let i = 0;i<response.length;i++) {
                    if (response[i] === ',') {
                        index.push(i);
                    }
                    if (response[i] === ')') {
                        index.push(i)
                        break;
                    }
                }
                let pswd = response.substring(index[0]+1,index[1]);
                if (pswd === req.body.password) {
                    return res.send(isExisting);
                }
                else {
                    return res.status(403).send("Bad password !")
                }
            }
            return res.status(404).send("Invalid id");
        })
    })
  });

/*************************************************
		UPDATE DOOR STATUS
*************************************************/

app.put('/doorStatus', (req, res) => {
    console.log(req);
    const query = "UPDATE door SET status = " + req.body.door.status + " WHERE id = " + req.body.door.id; 
    pool.query(query, (err) => {
        if (err) return res.send(false);
        return res.send(true);
    });
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
    let sql = 'select * from history where door = ' + doorId + ' order by date desc' ;
    pool.query(sql, (err, rows) => {
        if (err) throw err;
        return res.send(rows.rows);
    })
});

/*************************************************
		POST ACCESS
*************************************************/	//TEST OK

app.post('/newaccess', async (req, res) => {
    const query = 'INSERT INTO access (door, users, tag, nickname) VALUES ($1,$2,$3,$4)';
    let values = [parseInt(req.body.door),parseInt(req.body.user),req.body.tag, req.body.nickname];
    await pool.query(query, values, (err) => {
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

app.post('/newhistory', (req, res) => {
  const query = "INSERT INTO history (door, users, date, action) VALUES (" + req.body.history.door + "," + req.body.history.users + ",'" +  req.body.history.date + "'," +  req.body.history.action + ")";
  pool.query(query, (err) => {
	if (err) return res.send(false);
    return res.send(true);
  })
});


app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});


var httpsOptions = {
    key: fs.readFileSync('./conf/key.pem'),
    cert: fs.readFileSync('./conf/cert.pem')
};


var httpServer = http.createServer(app);
var httpsServer = https.createServer(httpsOptions, app);

httpServer.listen(8081);
httpsServer.listen(4433);


//app.listen(8081);
