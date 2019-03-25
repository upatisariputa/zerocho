//숫자야구 javascript (제로초 버전)

var bod = document.body;

var numCandidate;
var numArr;


// numArr에 1~9까지 랜덤 숫자 넣기
function numSelect(){
    numCandidate = [1,2,3,4,5,6,7,8,9];
    numArr = [];
    
    for(var i = 0; i < 4; i += 1){
        var numSelected = numCandidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        numArr.push(numSelected);
    }
}

numSelect();
console.log(numArr)


// HTML 태그 만들기
var ans = document.createElement('h1');
ans.textContent = '숫자 야구 게임'
bod.append(ans);
var form = document.createElement('form');
bod.append(form);
var inputWin = document.createElement('input');
form.append(inputWin);
inputWin.type = 'text';
inputWin.maxLength = 4;
var creButton = document.createElement('button');
creButton.textContent = 'Submit';
form.append(creButton);

// 이벤트 리스너
var falseCount = 0;
form.addEventListener('submit', function callbackFn(evnet){
    event.preventDefault();
    var answ = inputWin.value;
    if(answ === numArr.join('')){ //홈런 답이 맞을때
        ans.textContent = 'HomeRun';
        inputWin.value = '';
        inputWin.focus();
        numSelect();
        falseCount = 0;
    }else { 
        var ansArr = answ.split('');
        var strike = 0;
        var ball = 0;
        falseCount += 1;
        if(falseCount > 10){ // 10회 이상 틀렸을 경우
            ans.textContent = '10회 경과로 실패! 답 = ' + numArr.join(',');
            inputWin.value = '';
            inputWin.focus();
            numSelect();
            falseCount = 0;
        } else { // 스트라이크, 볼 판정
            for(var i = 0; i < 3; i += 1){
                if(Number(ansArr[i] === numArr[i])){
                    strike += 1;
                }else if (numArr.indexOf(Number(ansArr[i])) > -1){
                    ball += 1;
                }
            }
            // 결과창 출력
            ans.textContent = ' 입력한 숫자는 ' + answ + ' , ' + strike + '스트라이크 ' + ball + ' 볼' + '  , ' + (10-falseCount) + ' 회 남음';
            inputWin.value = '';
            inputWin.focus = '';
        }
    }
});