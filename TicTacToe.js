//틱택토 javascript, 2차원 배열, 이중 반복문, forEach

//tttTable 가져오기
var tttTable = document.getElementById('tttTable');
var rowsArrWin = [];
var cellsArrWin = [];
var writeTurn = 'X';
var result = document.getElementById('resultWin');

//check 함수(가로줄 세로줄 txtcontent)

function rowCellCheck (row, cell){
    cellsArrWin[row][cell].textContent === writeTurn;
}


//이벤트 발생 함수 
function tictactoe(event) {
    // 이벤트 타겟(어디에 클릭했는지)
    var rowHow = rowsArrWin.indexOf(event.target.parentNode);
    var cellHow = cellsArrWin[rowHow].indexOf(event.target);
    console.log(rowHow);
    console.log(cellHow);


// 클릭시 X 생성
    if(cellsArrWin[rowHow][cellHow].textContent !== ''){
        console.log('노빈칸')
    }else{
        console.log('빈칸')
        cellsArrWin[rowHow][cellHow].textContent = writeTurn;

        // 라인 완료 확인
        var fullCheck = false;
        
        // 가로 검사
        if(
            cellsArrWin[rowHow][0].textContent === writeTurn && 
            cellsArrWin[rowHow][1].textContent === writeTurn &&
            cellsArrWin[rowHow][2].textContent === writeTurn
            ){
            fullCheck = true;
        }
        // 세로 검사
        if(
            cellsArrWin[0][cellHow].textContent === writeTurn &&
            cellsArrWin[1][cellHow].textContent === writeTurn &&
            cellsArrWin[2][cellHow].textContent === writeTurn
            ){
            fullCheck = true;
            }
        // 대각선 검사
        if(rowHow - cellHow === 0){ //대각선 검사 필요한 경우
            if(
                cellsArrWin[0][0].textContent === writeTurn &&
                cellsArrWin[1][1].textContent === writeTurn &&
                cellsArrWin[2][2].textContent === writeTurn 
                ){
                    fullCheck = true;
                }
        }
        if(Math.abs(rowHow - cellHow) === 2){ //대각선 검사 필요한 경우
            if(
                cellsArrWin[0][2].textContent === writeTurn &&
                cellsArrWin[1][1].textContent === writeTurn &&
                cellsArrWin[2][0].textContent === writeTurn 
                ){
                    fullCheck = true;
                }
        }
    //검사    
        if(fullCheck){  // 완료시
            result.textContent = writeTurn + '승리';
            //초기화
            writeTurn = 'X';
            cellsArrWin.forEach(function(rows){
                rows.forEach(function(cells){
                    cells.textContent = '';
                });
            });
        }else{ // 미완결시
            if(writeTurn === 'X'){
                writeTurn = 'O'
            }else{
                writeTurn = 'X'
            }
        }
    }
};


//클릭시 이벤트 리스너
for(var i = 0; i < 3; i++){
    rowsArrWin.push(tttTable.rows[i]);
    cellsArrWin.push([]);
    for(var j = 0; j < 3; j++){
        tttTable.rows[i].cells[j].addEventListener('click', tictactoe);
        cellsArrWin[i].push(tttTable.rows[i].cells[j]);
    }
}

console.log(cellsArrWin)