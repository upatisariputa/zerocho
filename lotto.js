// 45개 숫자 배열 생성

var num45 = Array(45)
    .fill()
    .map(function(ele, idx){
        return idx + 1
    });

console.log(num45)

// 숫자 섞기

var shuffleNum = [];

while(num45.length > 0){
    var moveValue = num45.splice(Math.floor(Math.random() * num45.length), 1)[0]; // [0]은 같은 배열에 넣기
    shuffleNum.push(moveValue);
}

console.log(shuffleNum)

// 숫자 6개 빼기

var winNum = shuffleNum
    .slice(0, 6)
    .sort(function (a, b){
        return a - b;
    });

console.log(winNum);

// 보너스 숫자는 마지막 숫자로

var bonusNum = shuffleNum[shuffleNum.length-1];
console.log(bonusNum);

//화면 표시
var resultWin = document.querySelector('#resultWin');

for(var i = 0; i < 6; i++){
    var ball = document.createElement('div');
    ball.textContent = winNum[i];
    resultWin.appendChild(ball);
}


//보너스 화면 표시
var bonusWin = document.querySelector('#bonusWin');
var bonusBall = document.createElement('div');
bonusBall.textContent = bonusNum;
bonusWin.appendChild(bonusBall);
