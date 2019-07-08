var imageCoordinate = 0;
var rockPaperScissors = { //딕셔너리 자료구조
    rock: '0px',
    scissors: '-142px',
    paper: '-284px',
};

function computerSelect(imageCoordinate) {
    return Object.entries(rockPaperScissors).find(function(v){ 
        // entries :객체를 배열로 변경, find:함수를 만족하는 첫번째 요소 값 반환
        return v[1] === imageCoordinate;
    }) [0]; 
}

var interval;
function intervalMaker(){
    interval = setInterval( function () { // 0.1초마다 실행, 비동기
        if( imageCoordinate === rockPaperScissors.rock){
            imageCoordinate = rockPaperScissors.scissors
        }else if(imageCoordinate === rockPaperScissors.scissors){
            imageCoordinate = rockPaperScissors.paper
        }else{
            imageCoordinate = rockPaperScissors.rock;
        }
        document.querySelector('#computer').style.background = 
            'url(https://en.pimg.jp/023/182/267/1/23182267.jpg)' + imageCoordinate + ' 0';
    }, 100);
}

intervalMaker();

var scoreBoard = {
    scissors: 1,
    rock: 0,
    paper: -1,
    가위: 1,
    바위: 0,
    보: -1,
}

document.querySelectorAll('.btn').forEach(function(btn){
    btn.addEventListener('click', function(){
        clearInterval(interval); // clearInterval 하면 setInterval이 멈춤;
        setTimeout(function(){
            intervalMaker();
        }, 1000);
        var userChoice = this.textContent
        console.log(userChoice, computerSelect(imageCoordinate));
        var userScore = scoreBoard[userChoice];
        var computerScore = scoreBoard[computerSelect(imageCoordinate)];
        var scoreDifference = userScore - computerScore;
        if(scoreDifference === 0){
            console.log('비겼습니다.')
        }else if([-1, 2].includes(scoreDifference)){
            console.log('이겼습니다.')
        }else{
            console.log('졌습니다.')
        }
    });
});


/*
가위:1, 바위:0, 보:-1

나/컴퓨터     가위           바위       보
가위        1  1 0 비김    1 0 1 짐   1  -1 2 이김
바위        0  1 -1 이김   0 0 0 비김  0  -1 1 짐
보         -1  1 -2  짐 -1 0 -1 이김 -1  -1 0 비김

같은 경우 비김
2, -2 는 이김
0 인경우 짐

*/