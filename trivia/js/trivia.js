var URL = "https://fathomless-spire-32996.herokuapp.com/trivia/";
// var URL = "http://localhost:3000/trivia/";
var method = "GET";
var async = true;
var request = new XMLHttpRequest();

$(document).ready(function() {

    var rnd = randomIntFromInterval(1, 800);

    request.onload = function () {

        if (request.status === 200) {
            var results = JSON.parse(request.responseText);
            if (results) {
                console.log('Question found: ', results );

                $('#questionnumber').text('Q #' + results.id);

                var category = results.category.length > 0 ? results.category : '-';
                $('#category').text(category);
                $('#category').addClass(category);
                
                $('#question').text(results.question);
                $('#answer').text(results.answer);
                
            // not found
            } else {

                console.log('Question NOT found')
                $('#question').text(rnd + ' Not Found');
                
            }

        } else {

            console.log('Question NOT found')
            $('#question').text(rnd + ' Not Found');
        }

    }

    console.log('requesting: ', URL + rnd);

    request.open(method, URL + rnd, async);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send('');
    
    function randomIntFromInterval(min,max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    }
});

function submit() {

    var postURL = URL;
    
    var id = $('#questionnumber').text();
    var method = 'PUT';

    if (id === '') {
        method = 'POST';
    } else {
        postURL = postURL + id;
    }
    
    var payload = {
        category: $('#category').text(),
        question: $('#question').text(),
        answer: $('#answer').text()
    };

    var request = new XMLHttpRequest();
    request.open(method, URL);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify(payload));            
}
    