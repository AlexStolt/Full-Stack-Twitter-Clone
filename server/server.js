const express = require('express'); 
const cors = require('cors');
const monk = require('monk');


//Create an App and Listen on A Port
const port = 8000;
const app = express();
app.listen(port, (err) => {
    if(!err)
        console.log(`Listening on Port ${port}`);
});

//Connect To Database
const db = monk('localhost/twitter'); //Connect to a DB on my PC called twitter
const tweets = db.get('tweets'); //Create Or Add on Existing Collection

//Middleware Layers
//Solving No 'Access-Control-Allow-Origin' Header with "Fetch" on Front-End
app.use(cors());
//Parse JSON File
app.use(express.json());


app.get('/', (req, res) => {

});


function validTweet(tweet){
    return (tweet.username && tweet.username.toString().trim() !== '' && tweet.content && tweet.content.toString().trim());
}


app.post('/tweet', (req, res) => {
    if(validTweet(req.body)){   //IMPORTANT SECURITY STEP, ALWAYS CHECK USER REQUEST BEFORE ENTERING ON DATABASE
        //Insert On DB
        const tweet = {
            username: req.body.username.toString(), //toString in order to Protect Server and DB Against Injections
            content: req.body.content.toString(),    //toString in order to Protect Server and DB Against Injections
            date: new Date()
        };

        //Add Tweet on DB
        tweets.insert(tweet).then((createdTweet) => {
            
            res.json(createdTweet);
        });

    } else {
        res.status(422);
        res.json({
            message: 'Error Parsing Request'
        });
    }
});