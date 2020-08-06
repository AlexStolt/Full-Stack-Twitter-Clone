let username = document.getElementById('username'),
    content = document.getElementById('content');

username.addEventListener('click', () => {
    username.value = "";
});

content.addEventListener('click', () => {
    content.innerHTML = "";
});

document.getElementById('form').addEventListener('reset', () => {
    content.innerHTML = "Type Content Here";
});