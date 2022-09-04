'use strict';

const year = 2022;
const month = 9;

window.onload = function () {
    const data = generateMonthCalendar(year, month);
    document.getElementById('calendar').appendChild(data);
    // console.log(getMonthCalendar(2022, 9));
}

function generateMonthCalendar(year, month) { // 指定した月のカレンダーの形を生成
    const weekdayData = ['日', '月', '火', '水', '木', '金', '土'];
    //カレンダーの情報を取得
    const calendarData = getMonthCalendar(year, month);

    var i = calendarData[0]['weekday']; // 初日の曜日を取得
    // カレンダー上の初日より前を埋める
    while (i > 0) {
        i--;
        calendarData.unshift({
            day: '',
            weekday: i
        });
    }
    var i = calendarData[calendarData.length - 1]['weekday']; // 末日の曜日を取得
    //　カレンダー上の末日より後を埋める
    while (i < 5) {
        i++;
        calendarData.push({
            day: '',
            weekday: i
        });
    }

    //　カレンダーの要素を生成
    const cTable = document.createElement('table');
    cTable.className = 'calendar-table';

    let insertData = '';
    //　曜日部分の生成
    insertData += '<thead>';
    insertData += '<tr>';
    for (let i = 0; i < weekdayData.length; i++) {
        insertData += '<th>';
        insertData += weekdayData[i];
        insertData += '</th>';
    }
    insertData += '</tr>';
    insertData += '</thead>';

    //　日付部分の生成
    insertData += '<tbody>';
    for(let i = 0; i < calendarData.length; i++){
        if(calendarData[i]['weekday'] <= 0){
            insertData += '<tr>';
        }
        insertData += '<td>';
        insertData += calendarData[i]['day'];
        insertData += '</td>';
        if(calendarData[i]['weekday'] >= 6){
            insertData += '</tr>';
        }
    }
    insertData += '</tbody>';

    cTable.innerHTML += insertData;
    return cTable;
}

function getMonthCalendar(year, month) { //指定した月の日付と曜日を配列で返す
    const firstDate = new Date(year, (month - 1), 1); //指定した月の初日の情報
    const lastDay = new Date(year, (firstDate.getMonth() + 1), 0).getDate(); //指定した月の最終日の情報
    const weekday = firstDate.getDay(); //初日の曜日を取得

    const calendarData = []; //カレンダーの情報を格納
    let weekdayCount = weekday; //曜日の格納
    for (let i = 0; i < lastDay; i++) {
        calendarData[i] = { // 連想配列、配列の中に連想配列が含まれている
            day: i + 1,
            weekday: weekdayCount
        }
        if (weekdayCount >= 6) {
            weekdayCount = 0
        } else {
            weekdayCount++;
        }
    }
    return calendarData;
}

