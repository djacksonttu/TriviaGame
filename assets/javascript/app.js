
    
$(document).ready(function(){
  
    
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {
 
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
 
    questions: {
      q1: 'What year was the Dallas Cowboys founded?',
      q2: 'What Dallas Cowboys legend had the nickname "Moose"?',
      q3: 'What Dallas Cowboys QB holds the NFL record for highest rookie passer rating',
      q4: 'How many SuperBowl Wins do the Dallas Cowboys have?',
      q5: "How did Jerry Jones make his money before buying the Dallas Cowboys?",
      q6: 'Who were the Cowboys playing when Emmitt Smith broke the NFL all time rushing record?',
      q7: "Who is the Dallas Cowboys official mascot?"
    },
    options: {
      q1: ['1960', '1983', '1974', '1964'],
      q2: ['Troy Aikman','Tony Romo', 'Daryll Johnston', 'Ed Jones'],
      q3: ['Dak Prescott', 'Tony Romo', 'Roger Staubach', 'Danny White'],
      q4: ['3', '8', '5', '6'],
      q5: ['Real Estate','Grocery Stores','Oil','Crab Fishing'],
      q6: ['Seattle Seahawks','NY Giants','Arizona Cardinals','Oakland Raiders'],
      q7: ['Yoesemite Sam', 'Rowdy', 'Pistol Pete','Guy Fieri']
    },
    answers: {
      q1: '1960',
      q2: 'Daryll Johnston',
      q3: 'Dak Prescott',
      q4: '5',
      q5: 'Oil',
      q6: 'Seattle Seahawks',
      q7: 'Rowdy'
    },
   
    startGame: function(){
    
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      

      $('#game').show();
      
  
      $('#results').html('');
      
    
      $('#timer').text(trivia.timer);
      
    
      $('#start').hide();
  
      $('#remaining-time').show();
      
    
      trivia.nextQuestion();
      
    },
 
    nextQuestion : function(){
      
      
      trivia.timer = 10;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      
      
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerStart, 1000);
      }
      
      
      var questionTrivia = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionTrivia);
      
      
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
    
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
   

    timerStart : function(){
    

      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
      
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
   
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
       
        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Play again!</p>');
        
        
        $('#game').hide();
        
     
        $('#start').show();
      }
      
    },


    guessChecker : function() {
      
      
      var resultId;
      
    
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      
    
      if($(this).text() === currentAnswer){
      

        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>YUP!</h3>');
      }
     

      else{
        
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Nope! '+ currentAnswer +'</h3>');
      }
      
    },
    
    guessResult : function(){
      
      
      trivia.currentSet++;
      
    
      $('.option').remove();
      $('#results h3').remove();
      
    
      trivia.nextQuestion();
       
    }
  
  }