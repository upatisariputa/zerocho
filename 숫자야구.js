//숫자야구

// 숫자 4개 생성
var numCandidate;
var numArr;

function numSelect (){
    numCandidate = [1,2,3,4,5,6,7,8,9];
    numArr = [];
    
    for(i = 0; i < 4; i++){
        var numSelected = numCandidate.splice(Math.floor(Math.random() * numCandidate.length), 1)[0];
        numArr.push(numSelected);
    }
}

numSelect();
console.log(numArr);


// HTML 태그 생성

var bodyWin = document.body;

var titleWin = document.createElement('h1')
titleWin.textContent = '숫자 야구';
bodyWin.append(titleWin);

var resultWin = document.createElement('h3');
resultWin.textContent = '10회 도전 가능';
bodyWin.append(resultWin);

var formWin = document.createElement('form');
bodyWin.append(formWin);

var inputWin = document.createElement('input');
inputWin.type = 'text';
inputWin.maxLength = 4;
formWin.append(inputWin);

var creButton = document.createElement('button');
creButton.textContent = 'Submit';
formWin.append(creButton);

//이벤트 리스너

var falseCount = 0;
formWin.addEventListener('submit', function callbackFn(event){
    event.preventDefault();
    // 홈런 조건
    if(inputWin.value === numArr.join('')){
        resultWin.textContent = 'HomeRun  ' + '다음 문제'
        inputWin.value = '';
        inputWin.focus();
        numSelect();
        falseCount = 0;
    }else{ // 스트라이크 볼 판정
        var strike = 0;
        var ball = 0;
        var inputWinArr = inputWin.value.split('');
        falseCount += 1;
        if(falseCount > 11){
            resultWin.textContent = '10회 도전 실패! 답은 ' + numArr.join('');
            inputWin.value = '';
            inputWin.focus();
            numSelect();
            falseCount = 0;
        }else {
            for(i = 0; i < 3; i++){
                if(inputWin.value[i] === String(numArr[i])){
                    strike += 1;
                } else if (numArr.indexOf(Number(inputWinArr[i])) > -1){
                    ball += 1;
                }
            }
            // 결과창 출력
            resultWin.textContent = strike + '스트라이크 ' + ball + '볼 ' + '입력하신 숫자는 ' + inputWin.value + ' ' + (10-falseCount) + '회 도전';
            inputWin.value = '';
            inputWin.focus();
        }    
    }

});