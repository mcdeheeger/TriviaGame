$(document).ready(function() { 
    
  // On start click, the queryURL will be constructed using user inputs
  $("#start").on("click", function(event) {
    
    event.preventDefault();

    var category = $("#category").val();
    var difficulty = $("#difficulty").val();
    var type = $("#type").val();

    var queryURL = "https://opentdb.com/api.php?amount=10&category=" + category + "&difficulty=" + difficulty + "&type=" + type;

    // Debugging
    console.log(category) 
    console.log(queryURL)

    var questionNumber;

    // Run generated quer  y through AJAX call
    runQuery(queryURL);
  });  

  // User generated queryURL run through html generator
  function runQuery(queryURL) {
        $.ajax({
          url: queryURL, 
          method: "GET"
        }).done(function(response) {

          // Debugging
          console.log(response)

          var results = response.results

          for (var i = 0; i < results.length; i++) {

            // Generate question
            var question = response.results[i].question;
            var triviaQuestions = $("<div class='question'>");
            var p = $("<p>")
            p.text(question);
            triviaQuestions.append(p)
            $("#questionList").append(triviaQuestions);

              // for (var i = 0; i < results[i].incorrect_answers.length; i++)  {

              //   var checkboxes = $("<input>")
              //   checkboxes.attr("type", "radio")
              //   checkboxes.text(response.results[i].incorrect_answers[i])
              //   $("#questionList").append(checkboxes)
            for (var j = 0; j < results[i].incorrect_answers.length; j++) {
              var wrongAnswers = results[i].incorrect_answers[j]              
              var wrongChoicesDiv = $("<div class='radio-inline wrongAnswer answer'>")
              var wrongChoicesLabel = $("<label>")
              var wrongChoicesInput = $("<input class='input' type='radio' name='optradio' value='incorrect'>")

              wrongChoicesLabel.append(wrongChoicesInput)
              wrongChoicesLabel.append(wrongAnswers);
              wrongChoicesDiv.append(wrongChoicesLabel) 
                        
              $("#questionList").append(wrongChoicesDiv)
              
              // Debugging
              // console.log(wrongAnswers, [j]) 
              };

              var rightAnswer = results[i].correct_answer

              var rightChoiceDiv = $("<div class='radio-inline correctAnswer answer'>")
              var rightChoiceLabel = $("<label>")
              var rightChoiceInput = $("<input class='input' type='radio' name='optradio' value='correct'>")

              rightChoiceLabel.append(rightChoiceInput)
              rightChoiceLabel.append(rightAnswer);
              rightChoiceDiv.append(rightChoiceLabel) 

              $("#questionList").append(rightChoiceDiv) 

              // Debugging
              //   console.log(question)
            };      
        });
  };

  // Timer functionality
  window.onload = function() {
    $("#start").on("click", stopwatch.start);
  };
    
    var intervalId;

    // Our stopwatch object
    var stopwatch = {

      time: 120,
      
      start: function() {

        intervalId = setInterval(stopwatch.count, 1000);
      },
      
      stop: function() {

        clearInterval(intervalId);
        console.log("im here")
      },

      count: function() {

        stopwatch.time--;

        var converted = stopwatch.timeConverter(stopwatch.time);
        console.log(converted);

        $("#timeRemaining").html(converted);

        if (stopwatch.time == 0) {
          stopwatch.stop()
          console.log("gameStats")
        }
      },

      timeConverter: function(t) {

        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);

        if (seconds < 10) {
          seconds = "0" + seconds;
        }

        if (minutes === 0) {
          minutes = "00";
        }
        else if (minutes < 10) {
          minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
      }
    };
});