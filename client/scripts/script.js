//Listen For Form Submission
const form = document.getElementById('form');
const loadingElement = document.querySelector('.loading');
const tweetContainer = document.querySelector('.tweets');
const API_URL = 'http://127.0.0.1:8000/tweet'

form.style.display = 'none';
loadingElement.style.display = '';

//Load All Tweets
function listTweets(){
    tweetContainer.innerHTML = '';
    fetch(API_URL)
    .then(res => res.json())
    .then(tweets => {
        tweets.reverse();
        tweets.forEach(tweet => {
            const div = document.createElement('div');
            const header = document.createElement('h2');
            //XSS Security
            header.textContent = tweet.username; //NOT INNERHTML since innerHTML is Rendered on the Page and it is not treated like Text
            const content = document.createElement('p');
            //XSS Security
            content.textContent = tweet.content; //NOT INNERHTML since innerHTML is Rendered on the Page and it is not treated like Text
            const date = document.createElement('small');
            //XSS Security
            date.textContent = new Date(tweet.date); //NOT INNERHTML since innerHTML is Rendered on the Page and it is not treated like Text

            div.appendChild(header);
            div.appendChild(content);
            div.appendChild(date);
            
            tweetContainer.appendChild(div);
        });



        loadingElement.style.display = 'none';
        form.style.display = '';
    });
}

listTweets();



form.addEventListener('submit', (event) => {
    //Tell Browser to Halt, I will Handle the Request with JS
    event.preventDefault();
    
    //Get Data From Form
    const formData = new FormData(form);
    const username = formData.get('username');
    const content = formData.get('content');

    //Display Loading Screen and Hide Form 
    form.style.display = 'none';
    loadingElement.style.display = '';

    //POST Data on Server
    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({username, content}),
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => res.json()).then((createdTweet) => {
        form.reset();
        loadingElement.style.display = 'none';
        form.style.display = '';
        listTweets();
    });  
});

