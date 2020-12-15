const express = require('express');
const pg = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');
var http = require('http');
var https = require('https');
var fs = require('fs');
const nodemailer = require("nodemailer");
const { validationResult} = require('express-validator');
var Chance = require('chance')
var chance = new Chance();
var Analytics = require('analytics-node');
var analytics = new Analytics('bxdqVC7sHvozNzEePEduAcDECyFj4nuC');

const argon2 = require("argon2");

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


/* CONNEXION BASE DE DONNÉES */
let pool = new pg.Pool({
  user: 'postgresArnaud',
  host: '172.18.0.2',
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


/* ENVOI DES MAILS DE CHANGEMENT DE MOT DE PASSE */
var transporter = nodemailer.createTransport({              //Compte gmail envoyant les mails
    host: 'smtp.gmail.com',
    auth: {
        user: 'doorzapp@gmail.com',
        pass: 'Passw0rd!123'
    },
});

var mailOptions = {                         //Création du mail
    from: 'doorzapp@gmail.com',
    to: "",
    subject: 'DoorzApp : Réinitialisation de mot de passe',
    text: 'That was easy!'
};

function CreateMail(mail, password) {
    mailOptions.to = mail;
    mailOptions.text = "Votre mot de passe temporaire est : \"" + password + "\". Veuillez le changer le plus rapidement possible dans l'onglet prévu à cet effet de la section 'profil'";

    transporter.sendMail(mailOptions, function(error, info){  // Envoie le mail
        if (error) {
            throw error;
        }
    });
}

/*                         ROUTES BACKEND                          */

// INSCRIPTION

/*************************************************
*		Inscription : POST - create new USER
*************************************************/
app.post('/newUsers', async (req, res) => {
    let hash;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send(errors);
    } else {
        const query = "INSERT INTO users (firstname, lastname, phone, sexe, mail, password, isadmin) VALUES ($1,$2,$3,$4,$5,$6,$7)";
        hash = await argon2.hash(req.body.user.password, {type: argon2.argon2id});
        let valeur = [req.body.user.firstname, req.body.user.name, req.body.user.phone, req.body.user.gender, req.body.user.mail, hash, false];
        pool.query(query, valeur, (err) => {
            if (err) {
                return res.send(false);
            } else {
                analytics.track({
                    userId: 1,
                    event: 'New User'
                });
                return res.send(true);
            }
        });
    }
    ;
});

/*************************************************
*       Inscription, MotDePasseOublie, Mon Compte : GET - USER with mail
 *************************************************/
 app.post('/userMail', async (req, res) => {
    let mail = [req.body.user.mail];
    let sql = 'select mail from users where mail = $1' ;
    pool.query(sql, mail,(err, rows) => {
        if (err) throw err;
        if (rows.rows.length === 0 ){
            res.send(true)
        }else {
            res.send(false)
        }
    })
});



// CONNECTION

/*************************************************
		Connection : POST - USER find with mail and password
*************************************************/
app.post('/userConnection/', async (req, res) => {
    let sql = "select id, password, isadmin FROM users WHERE mail = $1";
    let values = [req.body.user.mail];
    let id = false;
    pool.query(sql, values, async (error, rows) => {
        if (error) res.send({status : false, msg : error});
        if (rows.rowCount < 1) {
            return res.send({status : false, msg : "Cette adresse mail n'existe pas encore. Veuillez vous inscrire."});
        } else {
        if (await argon2.verify(rows.rows[0].password, req.body.user.password)) {
            id = rows.rows[0].id;
            analytics.track({
                userId: 1,
                event: 'New Connection'
            });
            return res.send({status : true, msg : {id: id, admin: rows.rows[0].isadmin ? true : false }});
        } else {
            return res.send({status : false, msg :"Mot de passe incorrect. Veuillez réessayer."});
        }
    }})
});

/*************************************************
		Connection : GET - HISTORY most used doors by user id
*************************************************/
app.get('/doorHistory/user/:userId', async (req, res) => {
    let userId = parseInt(req.url.split('/doorHistory/user/').pop());
    let values = [userId];
    let sql = 'SELECT history.door FROM history WHERE history.users = $1 GROUP BY history.door ORDER BY count(history.door) DESC LIMIT 3';
    pool.query(sql, values, (err, rows) => {
        if (err) return res.send(err);
        return res.send(rows.rows);
    })
});



// MOT DE PASSE OUBLIE

/*************************************************
 *     MotDePasseOublie : PUT - USER reset password
 *************************************************/
app.put('/resetPassword/', async (req, res) => {
    let hash;
    let mail = req.body.user.mail;
    let newPass = "";
    let random = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","#","?","!","@","$","%","^","&","*","-"]
    for (let i =0; i <4; i++){
        newPass += random[Math.round(Math.random()*10)];
        newPass += random[(Math.round(Math.random()*26) + 10)];
        newPass += random[(Math.round(Math.random()*26) + 36)];
        newPass += random[(Math.round(Math.random()*10) + 62)];
    }
    hash = await argon2.hash(newPass, {type: argon2.argon2id});
    let sql = 'update users set password = $1 where mail = $2';
    let values = [hash, mail];
    analytics.track({
        userId: 1,
        event: 'Password Reset'
    });
    pool.query(sql, values, (err) => {
        if (err) throw err;
        CreateMail(mail, newPass);
        return res.send(true);
    })
});


// PORTE DETAIL

/*************************************************
*       Porte Detail : POST - HISTORY add new history
*************************************************/
app.post('/newhistory', (req, res) => {
    let values = [req.body.history.door, req.body.history.users, req.body.history.date, req.body.history.action]
    const query = "INSERT INTO history (door, users, date, action) VALUES ($1, $2, $3,$4)";
    pool.query(query, values, (err) => {
        if (err) return res.send(false);
        return res.send(true);
    })
});

/*************************************************
 *      Porte Detail : POST - ACCESS remove
 *************************************************/
 app.post('/access/delete', async (req, res) => {
    let values = [req.body.params.door, req.body.params.users]
    let query = 'DELETE FROM access where door= $1 AND users=$2';
    await pool.query(query,values, (err) => {
        if (err) return res.send(false);
        return res.send(true);
    });
});

/*************************************************
*       Porte Detail : GET - DOOR all doors
*************************************************/
app.get('/doors', async (req, res) => {
    let sql = 'select * from door ';
    pool.query(sql, (err, rows) => {
      if (err) throw err;
      return res.send(rows.rows);
    })
});

/*************************************************
*       Porte Detail : PUT - DOOR change status
*************************************************/
app.put('/doorStatus', (req, res) => {
    const query = "UPDATE door SET status = " + req.body.door.status + " WHERE id = " + req.body.door.id;
    if(req.body.door.status == 0) {
        analytics.track({
            userId: 1,
            event: 'Door closed',
            properties: {
              doorId: req.body.door.id
            }
        });
    }
    else if(req.body.door.status == 1) {
        analytics.track({
            userId: 1,
            event: 'Door opened',
            properties: {
                doorId: req.body.door.id
            }
        });
    }
    pool.query(query, (err) => {
        if (err) return res.send(false);
        return res.send(true);
    });
});


// AJOUT PORTE

/*************************************************
*       Ajout Porte : POST - DOOR verify door password
*************************************************/
app.post('/door/check', async (req, res) => {
    let id = parseInt(req.body.id);
    let user = parseInt(req.body.user);
    let isExisting = false;
    let sql = `select * from access where door = ${id} AND users = ${user}`
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
                    return res.send(!isExisting);
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
*       Ajout Porte : POST - ACCESS add new access
*************************************************/
app.post('/newaccess', async (req, res) => {
    let sql = 'SELECT * FROM access WHERE '
    const query = 'INSERT INTO access (door, users, tag, nickname) VALUES ($1,$2,$3,$4)';
    let values = [parseInt(req.body.door),parseInt(req.body.user),req.body.tag, req.body.nickname];
    pool.query(query, values, (err) => {
        if (err) {
            if (err.code === "23505") {
                return res.status(403).send(false)
            }
            return res.send(false);
        }
	    return res.send(true);
    });
});



// HISTORIQUE

/*************************************************
		GET DOOR BY SPECIFIC DOOR ID & USER
*************************************************/	//TEST OK

app.get('/doorIdUser/:door/:users', async (req, res) => {
    let door=req.params.door;
    let users=req.params.users;
    let sql = 'select door.id,access.nickname,access.tag,door.status,door.adresseip from access inner join door on access.door =  door.id where door.id = ' +  door + 'and access.users =  \'' + users + '\'';
    pool.query(sql, (err, rows) => {
      if (err) throw err;
      return res.send(rows.rows);
    })
  });

/*************************************************
		Historique : GET - HISTORY by door id
*************************************************/

app.get('/doorHistory/door/:doorId', async (req, res) => {
    let doorId = parseInt(req.url.split('/doorHistory/door/').pop());
    let values = [doorId]
    let sql = 'select * from history where door = $1 order by date desc';
    pool.query(sql, values, (err, rows) => {
        if (err) throw err;
        return res.send(rows.rows);
    })
});

/*************************************************
		Historique : GET - USER all names
*************************************************/
app.get('/users/name', async (req, res) => {
    let sql = 'select id, firstname, lastname from users';
    pool.query(sql, (err, rows) => {
      if (err) throw err;
      return res.send(rows.rows);
    })
});



// LISTE PORTES

/*************************************************
*       Liste Portes : GET - ACCESS door with tag and user
*************************************************/
app.get('/doorTagUser/:tag/:users', async (req, res) => {
    let values = [req.params.tag, req.params.users]
    let sql = 'select * from access where tag = $1 AND users = $2';
    pool.query(sql, values, (err, rows) => {
      if (err) throw err;
      return res.send(rows.rows);
    })
});

/*************************************************
*       Liste Portes : GET - ACCESS door tags by user
*************************************************/
app.get('/userTag/:userId', async (req, res) => {
    let values = [parseInt(req.url.split('/userTag/').pop())];
    let sql = 'select distinct tag from access where users = $1';
    pool.query(sql, values, (err, rows) => {
        if (err) throw err;
            return res.send(rows.rows);
      })
});



// MODIFICATION PORTE

/*************************************************
*      Modification Porte : PATCH - ACCESS change tag and/or name
*************************************************/
app.patch('/access/update', (req, res) => {
    let user = parseInt(req.body.users);
    let door = parseInt(req.body.door);
    let tag = req.body.tagName;
    let nickname = req.body.nickname;
    let query = `UPDATE access SET nickname = '${nickname}', tag ='${tag}' WHERE access.door = ${door} AND access.users = ${user}`;
    pool.query(query, (err) => {
        if (err) return res.send(err);
        return res.send(true);
    });
});



// MON COMPTE (+ '/userMail' in Inscription)

/*************************************************
*     Mon Compte : POST - USER check password
*************************************************/
app.post('/verifyPassword/', async (req, res) => {
    let values = [req.body.user.id];
    let sql = 'select password from users where id = ' + req.body.user.id;
    pool.query(sql,async (err, rows) => {
        if (err) throw err;
        if (await argon2.verify(rows.rows[0].password, req.body.user.old)) {
            id = rows.rows[0].id;
            res.send(true);
        }
        else {
            res.send(false)
        }
    })
});

/*************************************************
*       Mon Compte : PUT - USER update password
*************************************************/
app.put('/changePassword/', async (req, res) => {
    let hash;
    let sql = 'UPDATE users SET password = $1 where id = $2'  ;
    hash = await argon2.hash(req.body.user.new, {type: argon2.argon2id});
    let valeur = [hash, req.body.user.id];
    pool.query(sql,valeur,async (err, rows) => {
        if (err) {
            return res.send(false);
        } else {
            analytics.track({
                userId: 1,
                event: 'Password Changed'
            });
            return res.send(true);
        }
    })
});

/*************************************************
*      Mon Compte : PUT - USER change information
*************************************************/
app.put('/modifUsers', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send(errors);
    } else {
        const query = "UPDATE users SET firstname = $1 , lastname = $2 , phone = $3 , sexe = $4 , mail = $5 where id ="  + req.body.user.id;
        let valeur = [req.body.user.firstname, req.body.user.name, req.body.user.phone, req.body.user.gender, req.body.user.mail];
        pool.query(query, valeur, (err) => {
            if (err) {
                return res.send(false);
            } else {
                return res.send(true);
            }
        });
    }
    ;
});

/*************************************************
*      Mon Compte : GET - USER all information with ID
*************************************************/
app.get('/user/:id', async (req, res) => {
    let userId = req.url.split('/user/').pop();
    let values = [parseInt(userId)]
    let sql = 'select * from users where id = $1';
    pool.query(sql, values, (err, rows) => {
      if (err) throw err;
      return res.send(rows.rows);
    })
});

app.delete('/deleteUser/:id', async (req, res) => {
    let userId = req.url.split('/deleteUser/').pop();
    let values = [parseInt(userId)]
    let sql = 'DELETE from users where id = $1';
    pool.query(sql, values, (err, rows) => {
      if (err) throw err;
      analytics.track({
        userId: 1,
        event: 'Account Deleted'
      });
      return res.send(rows.rows);
    })
})


// PORTE FAVORITE

/*************************************************
*       Porte Favorite : GET - DOOR/ACCESS door information from user access by door id and user
*************************************************/
app.get('/doorIdUser/:door/:users', async (req, res) => {
    let values = [req.params.door, req.params.users];
    let sql = 'select door.id,access.nickname,access.tag,door.status,door.adresseip from access inner join door on access.door =  door.id where door.id = $1 and access.users = $2';
    pool.query(sql, values, (err, rows) => {
      if (err) throw err;
      return res.send(rows.rows);
    })
});



// ADMIN

/*************************************************
*       Admin : POST - DOOR add new door
*************************************************/
app.post('/newdoor', async (req, res) => {
    let pswd = chance.string({length : 10, alpha : true});
    const query = "insert into door (password, status, adresseip) values ($1,$2,$3) returning *";
    let valeur = [pswd, parseInt(req.body.status),req.body.ipAddress];
    pool.query(query, valeur,(err, rows) => {
          if (err) {
              return res.send(false);
          }
          analytics.track({
            userId: 1,
            event: 'New Door Installed'
          });
          return res.send(rows.rows[0]);
      });
});

app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT,POST,PATCH,DELETE,OPTIONS');
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
