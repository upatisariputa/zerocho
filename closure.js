// 클로져
    // 클로저는 함수와 함수가 선언된 어휘적 환경의 조합이다.

var name = 'sitaruta'
function log(){
    console.log(name);
}

function wrapper(){
    var name = 'sariputa';
    log();
}

wrapper();


// 클로져 문제

for(var i = 0; i < 10; i++){
    function re (){ //함수기준으로 스코프가 정해짐
        console.log(i) // 함수 안에서 i 를 찾음 -> i는 코드를 작성하는 순간 반복문의 i가 됨 
                        // 함수 안의 변수는 실행 될때 값이 결정
    }
}

// 클로져 해결

for(var j = 0; j < 10; j++){
    function closure (j){
        function (j){
            console.log(j)
        }
    }
    closure(j)
}