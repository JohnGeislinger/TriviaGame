$(document).ready(function () { 
    
    // Questions array
    let options = [
        {
            question: 'What year was Phillip Fry originally from?',
            choice: ['1989', '1999', '2001', '3000'],
            answer: 1,
            photo: 'assets/images/1999.jpeg'
        },
        {
            question: 'What was the name of Fry\'s dog?',
            choice: ['Buster', 'I.C. Wiener', 'Robo-Dog', 'Seymour Asses'],
            answer: 3,
            photo: 'assets/images/seymour.jpeg'
        },
        {
            question: 'What is the name of Planet Express\'s janitor?',
            choice: ['Scruffy', 'Juan', 'Michelle', 'Brannigan'],
            answer: 0,
            photo: 'assets/images/scruffy.jpeg'
        },
        {
            question: 'Who is Professor Hubert Farnsworth\'s arch enemy?',
            choice: ['Zapp Brannigan', 'Mom', 'Ogden Wernstrom', 'Albert Einstein'],
            answer: 2,
            photo: 'assets/images/wernstrom.jpeg'
        },
        {
            question: 'Who is Amy\'s husband?',
            choice: ['Phillip J. Fry', 'Zapp Brannigan', 'Dan Punchey', 'Kiff Kroker'],
            answer: 3,
            photo: 'assets/images/kiff.jpeg'
        },
        {
            question: 'What species is Leela?',
            choice: ['Cyclops', 'Animal', 'Mutant Human', 'Mindless Drone'],
            answer: 2,
            photo: 'assets/images/leela.jpeg'
        },
    ];

    // Global variables
    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;
    let timer = 15;
    let intervalId;
    let userGuess = '';
    let running = false;
    let qCount = options.length;
    let pick;
    let index;
    let newArray = [];
    let holder = [];

  
    // Start with the reset button hidden
    $('#reset').hide();
    // Start Game with click function of start button
    $('#start').on('click', function() {
        $('#start').hide();
        runTimer();
        displayQuestion();
        for (let i = 0; i < options.length; i++) {
            holder.push(options[i]);
        };
    });

    // Start the timer
    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        };
    };

    // Timer countdown
    function decrement() {
        $('#timeleft').html('<h3>Time Remaining: ' + timer + ' Seconds</h3>');
        timer--;
    // Stop time when it reaches 0
        if (timer === 0) {
            stopTimer();
            unansweredCount++;
            $('#answerblock').html('<h3>Out of Time!</h3>');
            $('#answerblock').append('<p>The Correct Answer was: ' + pick.choice[pick.answer] + '</p>');
            hidePicture();
        }
    };

    // Timer stop function
    function stopTimer() {
        running = false;
        clearInterval(intervalId);
    };

    // Randomly choose a question from options array
    function displayQuestion() {
        index = Math.floor(Math.random() * options.length);
        pick = options[index];
    // Write the selected question to the HTML to display
        $('#questionblock').html('<h3>' + pick.question + '</h3>');
        for (let i = 0; i < pick.choice.length; i++) {
            let userChoice = $('<div>');
            userChoice.addClass('answerchoice');
            userChoice.html(pick.choice[i]);
            userChoice.attr('data-guessvalue', i);
            $('#answerblock').append(userChoice);
        };
    // Records the user's guess with a click event then uses logic to see if it is correct
        $('.answerchoice').on('click', function () {
            userGuess = parseInt($(this).attr('data-guessvalue'));
    
            if (userGuess === pick.answer) {
                stopTimer();
                correctCount++;
                userGuess = '';
                $('#answerblock').html('<h3>Correct!</h3>');
                $('#answerblock').append('<p>The Correct Answer was: ' + pick.choice[pick.answer] + '</p>');
                hidePicture();
            }
            else {
                stopTimer();
                wrongCount++;
                userGuess = '';
                $('#answerblock').html('<h3>Nope!</h3>');
                $('#answerblock').append('<p>The Correct Answer was: ' + pick.choice[pick.answer] + '</p>');
                hidePicture();
            }
        });
    };
    // Add the photo in the selected object
    function hidePicture() {
        $('#answerblock').append('<img src=' + pick.photo + '>');
        newArray.push(pick);
        options.splice(index, 1);
    // Continuation or game ending condition
        setTimeout(function () {
            $('#answerblock').empty();
            timer = 15;
            if ((wrongCount + correctCount + unansweredCount) === qCount) {
                $('#questionblock').empty();
                $('#questionblock').html('<h3>Well done, Cadet. Here\'s how you did!</h3>');
                $('#answerblock').append('<h4>Correct: ' + correctCount + '</h4>');
                $('#answerblock').append('<h4>Incorrect: ' + wrongCount + '</h4>');
                $('#answerblock').append('<h4>Unanswered: ' + unansweredCount + '</h4>');
                $('#answerblock').append('<img src="assets/images/zapp.jpeg">');
                $('#reset').show();
                correctCount = 0;
                wrongCount = 0;
                unansweredCount = 0;
            }
            else {
                runTimer();
                displayQuestion();
            }
        }, 3000);
    };
    // Reset game on a click event
    $('#reset').on('click', function() {
        $('#reset').hide();
        $('#questionblock').empty();
        $('#answerblock').empty();
        for (let i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        };
        runTimer();
        displayQuestion();
    });

})