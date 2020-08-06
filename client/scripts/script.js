//Listen For Form Submission
const form = document.getElementById('form');
const loadingElement = document.querySelector('.loading');
const API_URL = 'http://127.0.0.1:8000/tweet'


loadingElement.style.display = 'none';
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
        console.log(createdTweet);
    });
});

