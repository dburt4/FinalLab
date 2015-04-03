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
                                                                  

*/
var express = require('express');
var http = require('http');
var fs = require('fs');
var url = require('url');
var app = express();

http.createServer(app).listen(80);

app.get('/', express.static('home.html');

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


