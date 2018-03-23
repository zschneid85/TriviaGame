$(document).ready(function() {
    $("#introSection").hide();
    $("#messageSection").hide();
    $('#instructionModal').modal();
    $('.parallax').parallax(); // function for MaterializeCSS parallax componenet
    $('.tooltipped').tooltip({ // delay function for button tool tips
        delay: 50
    });


    $("#introSection").fadeIn(1000 * 5, function() { // fade in page elements
        // fadeIn function
    });

    $("#questionSpace").hide()
    var correctCounter = 0,
        incorrectCounter = 0,
        unansweredCounter = 0,
        currentQuestionIndex = 0;


    var congratsMessages = ['Great going soldier', 'On the money', "Into History!"];

    function randomNum(x) {
        var roll = Math.floor(Math.random() * x);
        return roll;
    }

    function randomCongrats() {
        var messageRoll = randomNum(congratsMessages.length);
    }

    function countDown() {
        $('.pickAnswer').click(function() {
            $(this).data('clicked', true);
        });
        var i = 30;
        var myInterval = setInterval(function() {

            if (i < 10) {
                $('#timerSeconds').html("0" + i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            } else {
                $('#timerSeconds').html(i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            }

            if (i === 0) {
                unansweredCounter++;
                clearInterval(myInterval);
                currentQuestionIndex++;
                $('#timer').effect("pulsate", {
                    times: 25
                }, 1000 * 5);
                i = 30;
                postQuestion(currentQuestionIndex);
            } else {
                i--;
            }
        }, 1000);
    }

    var questions = [
        // question 1
        {
            "q": "What country had the most causalities?",
            "c": ["Russia", "Great Britian", "United States"],
            "answer": 0
        },
        // question 2
        {
            "q": "Where did most German soliders die?",
            "c": ["The Eastern Front", "In airplanes", "On U-boats"],
            "answer": 0
        },
        // question 3
        {
            "q": "What allied plane dropped the most bombs during the War?",
            "c": ["B-17 Flying Fortress", "The Lancaster", "B-24"],
            "answer": 2
        },
        // question 4
        {
            "q": "Who designed the famous German Tiger tank?",
            "c": ["Sherman", "BMW", "Porsche"],
            "answer": 2
        },
        // question 5
        {
            "q": "What famous chef worked for what we call today the CIA?",
            "c": ["Julia Childs", "Martha Stewart", "Emeril Lagasse"],
            "answer": 0
        },
        // question 6
        {
            "q": "Who was Hilter's Lady friend?",
            "c": ["Marilyn Monroe", "Eva Braun", "Elizabeth Taylor"],
            "answer": 1
        },
        // question 7
        {
            "q": "Who invented the Famous M1A1 Carbine battle rifles?",
            "c": ["A Farmer", "A Prisoner", "A Housewife"],
            "answer": 1
        },
        // question 8
        {
            "q": "What country during the War made the first fighter jet?",
            "c": ["United States", "Great Britian", "Germany"],
            "answer": 2
        },
        // question 9
        {
            "q": "What World War II leader had a  Champagne dedt of $175,000 pounds?",
            "c": [" Winston Churchill", " Stalin", " Adolf Hitler"],
            "answer": 0
        },
        // question 10
        {
            "q": "What Allied vehicle only had 60 horsepower ____________",
            "c": ["The Sherman Tank", "The Jeep", "Half ton truck"],
            "answer": 1
        }
    ];


    function postQuestion(n) {

        if (currentQuestionIndex < questions.length) {
            $('#question').remove();
            $('.pickAnswer').remove();
            countDown();
            $('#questionContainer').append("<div id='question'>" + questions[n].q + "</div>");
            for (var i = 0; i < questions[n].c.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("pickAnswer").attr("indexnum", i).text(questions[n].c[i]);
                $('#choices').append(newDiv);
            }


        } else {
            resetGame(); // the conditional successfully loops the game
        }

        $(".pickAnswer").on("click", function() {
            var userChoice = $(this).attr('indexnum'); // stored as a string not a number
            userChoice = parseInt(userChoice);

            // checks if user is correct and will tally accordingly
            if (userChoice === questions[currentQuestionIndex].answer) {
                correctCounter++;
                currentQuestionIndex++
                randomCongrats();

            } else {
                incorrectCounter++;
                currentQuestionIndex++;

            }
            postQuestion(currentQuestionIndex);
        })
    }

    function startTrivia() {
        $('#messageSection').hide();
        $('#gameMessage').empty()
        $('#questionContainer').show();
        $('#choices').show();
        $("#timer").show();
        correctCounter = 0;
        incorrectCounter = 0;
        unansweredCounter = 0;
        currentQuestionIndex = 0;

        postQuestion(currentQuestionIndex);

    }

    function resetGame() {
        $('#messageSection').show();
        $('#questionContainer').hide();
        $('#choices').hide();
        $('#timer').hide()

        $('#gameMessage').append("<h2>You have completed the game!</h2>");
        $('#gameMessage').append("<h4>Total Correct: " + correctCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Incorrect: " + incorrectCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Unanswered: " + unansweredCounter + "</h4>");

        setTimeout(startTrivia, 1000 * 10);

    }



    $("#startButton").on("click", function() {
        $("#buttonRow").hide();
        $("#introCard").remove();
        $("#timer").append("<span id='timerMinutes'>00</span>:<span id='timerSeconds'>00</span>");
        $("#questionSpace").show();

        startTrivia();


    })


});