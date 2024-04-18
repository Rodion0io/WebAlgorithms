document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('stars').addEventListener('click', function(){
        document.querySelector('list').classList.toggle('star');
    })
})