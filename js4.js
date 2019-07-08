var bodyWin = document.body;
var tableWin = document.createElement('table');
var lineArrWin = [];
var cellArrWin = [];
var turn = 'X';
var result = document.createElement('div');

var asyCallbackFn = function(event){
    var lineHow = lineArrWin.indexOf(event.target.parentNode);
    console.log(lineHow)
    var cellHow = cellArrWin[lineHow].indexOf(event.target);
    console.log(cellHow)

    if(cellArrWin[lineHow][cellHow].textContent !== ''){
        console.log('노빈칸');
    }else{
        console.log('빈칸')
        cellArrWin[lineHow][cellHow].textContent = turn;
        
        // 라인 완료 확인
        var fullCheck = false;
        
        // 가로 검사
        if(
            cellArrWin[lineHow][0].textContent === turn && 
            cellArrWin[lineHow][1].textContent === turn &&
            cellArrWin[lineHow][2].textContent === turn
            ){
            fullCheck = true;
        }
        // 세로 검사
        if(
            cellArrWin[0][cellHow].textContent === turn &&
            cellArrWin[1][cellHow].textContent === turn &&
            cellArrWin[2][cellHow].textContent === turn
            ){
            fullCheck = true;
            }
        // 대각선 검사
        if(lineHow - cellHow === 0){ //대각선 검사 필요한 경우
            if(
                cellArrWin[0][0].textContent === turn &&
                cellArrWin[1][1].textContent === turn &&
                cellArrWin[2][2].textContent === turn 
                ){
                    fullCheck = true;
                }
        }
        if(Math.abs(lineHow - cellHow) === 2){ //대각선 검사 필요한 경우
            if(
                cellArrWin[0][2].textContent === turn &&
                cellArrWin[1][1].textContent === turn &&
                cellArrWin[2][0].textContent === turn 
                ){
                    fullCheck = true;
                }
        }
        // 검사 완료    
        if (fullCheck){
            result.textContent = turn + '승리'
            // 초기화
            turn = 'X';
            cellArrWin.forEach(function(lineWin){
                lineWin.forEach(function(cellWin){
                    cellWin.textContent = '';
                });
            });
        }  else{ // 미완결 시
            if(turn === 'X'){
                turn = 'O';
            }else{
                turn = 'X';
            }
        }
    }  
};

for (var i = 1; i <= 3; i += 1){
    var lineWin = document.createElement('tr');
    lineArrWin.push(lineWin);
    cellArrWin.push([]);
    for (var j = 1; j <=3; j += 1){
        var cellWin = document.createElement('td');
        cellWin.addEventListener('click', asyCallbackFn);
        cellArrWin[i-1].push(cellWin);
        lineWin.appendChild(cellWin);
    }
    tableWin.appendChild(lineWin)
}
bodyWin.appendChild(tableWin);
bodyWin.appendChild(result);
console.log(cellArrWin);
