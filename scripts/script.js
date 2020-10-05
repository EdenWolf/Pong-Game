$(function() {
    var $board = $('#board');
    var $p1 = ($board).find('#player1');
    var $p2 = ($board).find('#player2');
    var $ball = ($board).find('#ball');
    var intervalTime = 5;
    var computerTime = 6;
    var up = -1;
    var side = 1;
    var computerS = 0;
    var playerS = 0;

    // start the game
    function startGame() {
        $(document).off("keydown",startGame);

        setInterval(function() {
            // get the position of the ball
            var top = parseInt($($ball).css('top'));
            var bottom = parseInt($($ball).css('bottom'));
            var right = parseInt($($ball).css('right'));
            var left = parseInt($($ball).css('left'));

            // ball change dirraction
            if (top < 0 || bottom < 0) {
                up *= -1;
            }

            if (right < 0 || left < 0 || 
                (right == 90 && parseInt(($p2).css('top')) < top + 25 && parseInt(($p2).css('bottom')) < bottom + 25) ||
                (left == 90 && parseInt(($p1).css('top')) < top + 25 && parseInt(($p1).css('bottom')) < bottom + 25) ) {
                side *= (-1);
            }

            // if one side wins
            if (right <= 0 || left <= 0) {
                if (right <= 0){
                    $('#computer-score').text(++computerS);
                }
                else {
                    $('#player-score').text(++playerS);
                }
                top = 230;
                bottom = 230;
                left = 380;
                right = 380;
            }

            // update the position of the ball
            ($ball).css({'top' : top + up +'px',
            'bottom' : bottom - up +'px',
            'left' : left + side +'px',
            'right' : right - side +'px'});

        }, intervalTime);  
    }
    
    // move the computer player
    setInterval(function() {
        if (parseInt($($ball).css('top')) < parseInt($($p1).css('top'))) {
            $($p1).css({'top' : parseInt(($p1).css('top')) - 1 +'px',
            'bottom' : parseInt(($p1).css('bottom')) + 1 +'px'});
        }
        else if (parseInt($($ball).css('bottom')) < parseInt($($p1).css('bottom'))) {
            $($p1).css({'top' : parseInt(($p1).css('top')) + 1 +'px',
            'bottom' : parseInt(($p1).css('bottom')) - 1 +'px'});
        }
    }, computerTime);

    // when a key is pressed
    $(document).keydown(function(e){
        console.log(e.keyCode);
        if ((e.keyCode == 38 || e.keyCode == 87) && parseInt(($p2).css('top')) > 0) {// up
            $($p2).css({'top' : parseInt(($p2).css('top')) - 10 +'px',
            'bottom' : parseInt(($p2).css('bottom')) + 10 +'px'});
        }
        else if ((e.keyCode == 40 || e.keyCode == 83) && parseInt(($p2).css('bottom')) > 0) { // down
            $($p2).css({'top' : parseInt(($p2).css('top')) + 10 +'px',
            'bottom' : parseInt(($p2).css('bottom')) - 10 +'px'});
        }
    });
    
    // start the game whan a key is pressed
    $(document).keydown(startGame);

});