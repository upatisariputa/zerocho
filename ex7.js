// 첫번째 클릭은 무조건 X가 아니게 만들어 보기
var tbody = document.querySelector('#table tbody');
var dataset = [];
var stopFlag = false;
var openRoom = 0;
var codeTable = {
    openRoom: -1,
    questionMark: -2,
    flag: -3,
    flagMine: -4,
    queMine: -5,
    mineWin: 1,
    normalRoom: 0,
}
document.querySelector('#exec').addEventListener('click', function(){
    tbody.innerHTML = ''; // 누를때 마다 tbody 내부 초기화
    document.querySelector('#result').textContent = ''; // 지뢰 눌렀을 경우 초기화
    dataset = []; // 데이터 초기화
    openRoom = 0;
    stopFlag = false;

    //가로 세로 입력값 받아오기
    var hor = parseInt(document.querySelector('#hor').value);
    var ver = parseInt(document.querySelector('#ver').value);
    var mine = parseInt(document.querySelector('#mine').value);


    //랜덤 숫자 만들기(지뢰위치)
    var num = Array(hor * ver)
    .fill() // undefined hor * ver 로  채우기
    .map(function(ele, idx){
        return idx;
    });

    // 숫자 섞기
    var shuffleNum = [];
    while(num.length > hor * ver - mine){
        var moveValue = num.splice(Math.floor(Math.random() * num.length), 1)[0]; // [0]은 같은 배열에 넣기
        shuffleNum.push(moveValue);
    }

    //지뢰 테이블 만들기
    for(var i = 0; i<ver; i++){
        var arr = [];
        var tr = document.createElement('tr');
        dataset.push(arr);
        for(var j = 0; j<hor; j++){
            arr.push(codeTable.normalRoom);
            var td = document.createElement('td');
            // contextmenu 는 오른쪽 클릭시 발생 이벤트
            td.addEventListener('contextmenu', function(e){
                e.preventDefault();
                if(stopFlag){ 
                    return;
                }
                // 커런트 타겟 : 이벤트리스너가 생성된 곳
                // 타겟: 실제로 누른 타켓
                var parentTr = e.currentTarget.parentNode;
                var parentTbody = e.currentTarget.parentNode.parentNode;
                var rows = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
                var lines = Array.prototype.indexOf.call(parentTbody.children, parentTr);
                // 화면은 ?!'' 변경되나 데이터는 X나 ''로 고정
                if(e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X'){
                    e.currentTarget.textContent = '!';
                    e.currentTarget.classList.add('flag');
                    if(dataset[lines][rows] === codeTable.mineWin){
                        dataset[lines][rows] = codeTable.flagMine;
                    }else{
                        dataset[lines][rows] = codeTable.flag;
                    }
                }else if(e.currentTarget.textContent === '!'){
                    e.currentTarget.textContent = '?';
                    e.currentTarget.classList.remove('flag');
                    e.currentTarget.classList.add('question');
                    if(dataset[lines][rows] === codeTable.flagMine){
                        dataset[lines][rows] = codeTable.queMine;
                    }else{
                        dataset[lines][rows] = codeTable.questionMark;
                    }
                }else if(e.currentTarget.textContent === '?'){
                    e.currentTarget.classList.remove('question');
                    if(dataset[lines][rows] === codeTable.queMine){ // ?에서 우클릭시 데이터셋이 기본칸이면 빈칸, X 면 X로
                        e.currentTarget.textContent = 'X';  
                        dataset[lines][rows] = codeTable.mineWin;                      
                    }else {
                        e.currentTarget.textContent = '';  
                        dataset[lines][rows] = codeTable.normalRoom; 
                    }
                }
            });
            td.addEventListener('click', function (e){
                if(stopFlag){
                    return;
                }
                // 클릭했을때 주변 지뢰 개수
                var parentTr = e.currentTarget.parentNode;
                var parentTbody = e.currentTarget.parentNode.parentNode;
                var rows = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
                var lines = Array.prototype.indexOf.call(parentTbody.children, parentTr);
                if([codeTable.openRoom, codeTable.flag, codeTable.flagMine, codeTable.queMine, codeTable.questionMark].includes(dataset[lines][rows])){
                    return;
                }
                e.currentTarget.classList.add('opened');
                openRoom += 1;
                if(dataset[lines][rows] === codeTable.mineWin){
                    e.currentTarget.textContent = 'Fail'
                    document.querySelector('#result').textContent = 'FAIL!!';
                    stopFlag = true;
                }else{
                    // 주변 지뢰 개수 세기 해서 빈칸에 숫자
                    var aroundMines = [
                        dataset[lines][rows-1], dataset[lines][rows+1]
                    ];
                    if(dataset[lines-1]){
                        aroundMines = aroundMines.concat(dataset[lines-1][rows-1], dataset[lines-1][rows], dataset[lines-1][rows+1]);
                    }
                    if(dataset[lines+1]){
                        aroundMines = aroundMines.concat(dataset[lines+1][rows-1], dataset[lines+1][rows], dataset[lines+1][rows+1]);
                    }
                    var aroundMinesNum = aroundMines.filter(function(v){
                        return [codeTable.mineWin, codeTable.flagMine, codeTable.queMine].includes(v);
                    }).length;
                    //거짓인 값: false, '', 0, null, NaN, undefined
                    e.currentTarget.textContent = aroundMinesNum || '';
                    dataset[lines][rows] = codeTable.openRoom;
                    if(aroundMinesNum === 0){
                        //주변칸 동시 open (재귀함수: 반복문을 함수로 표현)
                        var aroundroom = [];
                        if(tbody.children[lines-1]){
                            aroundroom = aroundroom.concat([
                                tbody.children[lines - 1].children[rows - 1],
                                tbody.children[lines - 1].children[rows],
                                tbody.children[lines - 1].children[rows +1],
                            ])
                        }
                        aroundroom = aroundroom.concat([
                            tbody.children[lines].children[rows - 1],
                            tbody.children[lines].children[rows + 1],
                        ]);
                        if(tbody.children[lines + 1]){
                            aroundroom = aroundroom.concat([
                                tbody.children[lines + 1].children[rows - 1],
                                tbody.children[lines + 1].children[rows],
                                tbody.children[lines + 1].children[rows +1],
                            ]);
                        }
                        aroundroom.filter((v) => !!v).forEach(function(sideRoom){
                            var parentTr = sideRoom.parentNode;
                            var parentTbody = sideRoom.parentNode.parentNode;
                            var sideRows = Array.prototype.indexOf.call(parentTr.children, sideRoom);
                            var sideLines = Array.prototype.indexOf.call(parentTbody.children, parentTr);
                            if(dataset[sideLines][sideRows] !== codeTable.openRoom){
                                sideRoom.click(); // 함수안에서 클릭을 실행했을때 또 클릭
                            }
                        }); //undefined, null 등 제거 filter
                    }
                }
                if(openRoom === hor * ver - mine){
                    stopFlag = true;
                    document.querySelector('#result').textContent = 'Win';
                }
            });
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    // 지뢰 심기;
    for(var k = 0; k < shuffleNum.length; k++){
        var vertical = Math.floor(shuffleNum[k] / ver); // 줄
        var horizontal = shuffleNum[k] % ver; // 칸
        tbody.children[vertical].children[horizontal].textContent = 'X';
        dataset[vertical][horizontal] = codeTable.mineWin;
    }
});
