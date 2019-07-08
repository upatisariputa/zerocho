//로또추첨기 제로초, JS -> CSS, map

// 후보군에 45 숫자 넣기
var candiNum = Array(45)
    .fill()
    .map(function(ele, idx){
        return idx + 1;
    });

console.log(candiNum);

//숫자 섞기

var shuffleNum = [];

//for => 반복 횟수를 정확히 알때, while => 반복횟수가 애매한 경우, 기준값이 변경되는 경우

while (candiNum.length > 0){
    var moveValue = candiNum.splice(Math.floor(Math.random() * candiNum.length), 1)[0];
    shuffleNum.push(moveValue);
}


console.log(shuffleNum);

var bonusNum = shuffleNum[shuffleNum.length - 1];

// sort 내림차순 정렬 array.sort(function (p, c) {return p - c;})

var winNum = shuffleNum
    .slice(0, 6)
    .sort(function (p, c) { 
        return p - c; }
        );


console.log(winNum, bonusNum)


//화면 표시
var resultWin = document.querySelector('#resultWin'); // getElementById => querySelector 로 대신 사용가능

//클로저 문제로 반복문 사용 불가, 함수 생성

function sytleBall(num, resultWin) {
    //6숫자 화면 표시
    var ball = document.createElement('div');
    ball.textContent = num;
    ball.style.display = 'inline-block';
    ball.style.border = '1px solid black';
    ball.style.borderRadius = '10px'; // css에서는 border-radius, JS에서는 borderRadius (-를 빼기로 인식)
    ball.style.width = '20px';
    ball.style.height = '20px';
    ball.style.textAlign = 'center';
    ball.style.marginRight = '10px';

    var ballBgColor; //배경색
    if(num <= 10){
        ballBgColor = 'red'
    }else if(num <= 20){
        ballBgColor = 'orange'
    }else if(num <= 30){
        ballBgColor = 'yellow'
    }else if(num <= 40){
        ballBgColor = 'blue'
    }else{
        ballBgColor = 'green'
    }
    ball.style.background = ballBgColor;
    resultWin.appendChild(ball);
}
/*
//시간에 하나씩 표현하기, closure 문제 비해결
setTimeout(function asyCallBackFn(){
    sytleBall(winNum[0], resultWin);
}, 1000); //밀리초
setTimeout(function asyCallBackFn(){
    sytleBall(winNum[1], resultWin);
}, 2000); 
setTimeout(function asyCallBackFn(){
    sytleBall(winNum[2], resultWin);
}, 3000); 
setTimeout(function asyCallBackFn(){
    sytleBall(winNum[3], resultWin);
}, 4000); 
setTimeout(function asyCallBackFn(){
    sytleBall(winNum[4], resultWin);
}, 5000); 
setTimeout(function asyCallBackFn(){
    sytleBall(winNum[5], resultWin);
}, 6000); 
*/

// 시간에 하나씩 표현하기, closure로 해결 
//closure는 함수를 다시 클로저 함수로 감싸서 클로저 함수의 매개변수로 안의 함수의 변수를 실행하도록, 반복문 i에서 클로저 매개변수로 클로저 매개변수에서 내부에있는 변수로 실행 
for(var i = 0; i < winNum.length; i++){
    (function closure(j){
        setTimeout(function(){
            sytleBall(winNum[j], resultWin);
        }, (j + 1) * 1000);
    })(i); //즉시실행 함수로 만들어줌, 스코프 체인 거슬러 올라가기, 비동기 함수에서는 실행하는 순간 변수가 무엇인지 클로저 특성 
}; 




//보너스 숫자
setTimeout(function asyCallBackFn(){
    var bonusWin = document.querySelector('.bonusWin'); // getElementsByClass => querySelector 로 대신 사용가능
    sytleBall(bonusNum, bonusWin)
}, 7000);