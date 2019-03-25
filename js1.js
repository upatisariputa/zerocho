var bod = document.body;

var tex = document.createElement('div');
tex.textContent = '단어'
document.body.append(tex);

var form = document.createElement('form');
document.body.append(form);

var inputWin = document.createElement('input');
form.append(inputWin);

var creButton = document.createElement('button');
creButton.textContent = '입력'
form.append(creButton);

var resultWin = document.createElement('div');
document.body.append(resultWin);

form.addEventListener('submit', function callBackFn(event){
    event.preventDefault();
    if(tex.textContent[tex.textContent.length -1] === inputWin.value[0]){
        resultWin.textContent = '참';
        tex.textContent = inputWin.value;
        inputWin.value = '';
    }else{
        resultWin.textContent = '거짓';
        inputWin.value='';
    }
});