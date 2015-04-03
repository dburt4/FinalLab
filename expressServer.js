/*
                                                                  
                                                                  
  .--.--.       ,---,.,-.----.                  ,---,.,-.----.    
 /  /    '.   ,'  .' |\    /  \        ,---.  ,'  .' |\    /  \   
|  :  /`. / ,---.'   |;   :    \      /__./|,---.'   |;   :    \  
;  |  |--`  |   |   .'|   | .\ : ,---.;  ; ||   |   .'|   | .\ :  
|  :  ;_    :   :  |-,.   : |: |/___/ \  | |:   :  |-,.   : |: |  
 \  \    `. :   |  ;/||   |  \ :\   ;  \ ' |:   |  ;/||   |  \ :  
  `----.   \|   :   .'|   : .  / \   \  \: ||   :   .'|   : .  /  
  __ \  \  ||   |  |-,;   | |  \  ;   \  ' .|   |  |-,;   | |  \  
 /  /`--'  /'   :  ;/||   | ;\  \  \   \   ''   :  ;/||   | ;\  \ 
'--'.     / |   |    \:   ' | \.'   \   `  ;|   |    \:   ' | \.' 
  `--'---'  |   :   .':   : :-'      :   \ ||   :   .':   : :-'   
            |   | ,'  |   |.'         '---" |   | ,'  |   |.'     
            `----'    `---'                 `----'    `---'       
                                                                  

var express = require('express');
var http = require('http');
var fs = require('fs');
var url = require('url');
var app = express();

http.createServer(app).listen(80);

app.get('/', express.static('/views/home.html'));



*/

app.post('/chat', function(req, res){
	console.log("In POST chat route");
	var MongoClient = require('mongodb').MongoClient;
	MongoClient.connect("mongodb:localhost:/awesomeDB", function(err, db){
		if(err) throw err;
		db.collection('chat').insert(req.body, function(err, records){
			console.log("record inserted as " + records[0]._id);
		});
	});
	res.status(200);
	res.end();
});

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')({session: expressSession});
var mongoose = require('mongoose');
require('./models/users_model.js');
var conn = mongoose.connect('mongodb://localhost/myapp');
var app = express();
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(bodyParser());
app.use(cookieParser());
app.use(expressSession({
  secret: 'SECRET',
  cookie: {maxAge: 60*60*1000},
  store: new mongoStore({
      mongooseConnection: mongoose.connection,
      collection: 'sessions'
    })
  }));
require('./routes')(app);
app.listen(80);                   


//Returns an array with 4 hard coded users for tesing purposes:
app.get('/hardcodedusers', function(req, res){
	userArr = ["Daniel", "Landen", "Matt", "Devin"];
	res.json(userArr);
	res.end();
});

