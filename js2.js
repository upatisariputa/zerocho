var num1 = Math.ceil(Math.random() * 9);
var num2 = Math.ceil(Math.random() * 9);
var result = num1 * num2;

var bod = document.body;

var que = document.createElement('div');
que.textContent = String(num1) + '곱하기' + String(num2);
document.body.append(que);

var formMul = document.createElement('form');
document.body.append(formMul);

var inputWin = document.createElement('input');
formMul.append(inputWin);

var creButton = document.createElement('button');
creButton.textContent = 'Submit';
formMul.append(creButton);

var resultWin = document.createElement('div');
document.body.append(resultWin);

formMul.addEventListener('submit', function callbackFn(event){
    event.preventDefault();
    if(result === Number(inputWin.value)){
        resultWin.textContent = 'True';
        num1 = Math.ceil(Math.random() * 9);
        num2 = Math.ceil(Math.random() * 9);
        result = num1 * num2;
        que.textContent = String(num1) + '곱하기' + String(num2);
    }else{
        resultWin.textContent = 'False';
        inputWin.value = '';
    }
});


//var condition = true;
//while(condition){
//  var ans = Number(inputWin.value);
//    if(result === ans){
//        resultWin.textContent = 'True';
//        condition = false;
//    }else{
//        resultWin.textContent = 'False';
//        inputWin.value = '';
//    }
//}