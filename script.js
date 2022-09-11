'use strict';

window.onload = function () {
    const current = new Date();
    const year = current.getFullYear();
    const month = current.getMonth() + 1;

    // カレンダーの表示
    const wrapper = document.getElementById('calendar');
    addCalendar(wrapper, year, month);
    // console.log(getMonthCalendar(2022, 9));
}

function addCalendar(wrapper, year, month) {
    // 現在カレンダーが追加されている場合は一旦削除する
    wrapper.textContent = null;

    // カレンダーに表示する内容を取得
    const headData = generateCalendarHeader(year, month);
    const bodyData = generateMonthCalendar(wrapper, year, month);

    // カレンダーの要素を追加
    wrapper.appendChild(headData);
    wrapper.appendChild(bodyData);
}

function generateCalendarHeader(year, month) { //カレンダーのヘッダーを作成、月の移動の機能
    //　ヘッダー要素
    const cHeadar = document.createElement('div');
    cHeadar.className = 'calendar-header';

    // 見出しの追加
    const cTitle = document.createElement('div');
    cTitle.className = 'calendar-header_title';
    const cTitleText = document.createTextNode(year + '年' + month + '月');
    cTitle.appendChild(cTitleText);
    cHeadar.appendChild(cTitle);

    // 横線の追加
    const horizontal_line = document.createElement('hr');
    cHeadar.insertAdjacentElement("beforeend", horizontal_line);

    return cHeadar;
}

function generateMonthCalendar(wrapper, year, month) { // 指定した月のカレンダーの形を生成
    const weekdayData = ['日', '月', '火', '水', '木', '金', '土'];
    //カレンダーの情報を取得
    const calendarData = getMonthCalendar(year, month);
    const cMain = document.createElement('div');
    cMain.id = 'cMain';

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
    cMain.insertAdjacentElement('beforeend', cTable)
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
    for (let i = 0; i < calendarData.length; i++) {
        if (calendarData[i].weekday <= 0) {
            insertData += '<tr>';
        }
        insertData += '<td>';
        insertData += calendarData[i]['day'];
        insertData += '</td>';
        if (calendarData[i]['weekday'] >= 6) {
            insertData += '</tr>';
        }
    }
    insertData += '</tbody>';

    cTable.innerHTML += insertData;

    //　前月と翌月を取得
    const nextMonth = new Date(year, (month - 1)); //与えられた月（month）は1~12月まであるが、コンピュータが処理できる月は0~11の範囲である。よって-1している。
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const prevMonth = new Date(year, (month - 1));
    prevMonth.setMonth(prevMonth.getMonth() - 1);

    // 前月ボタンの追加
    let cPrev = document.createElement('button');
    cPrev.className = 'calendar-header_prev'
    const page_move_prev = document.createElement('img');
    page_move_prev.id = 'move_prev';
    page_move_prev.src = "image/page_move.png";
    cPrev.appendChild(page_move_prev);
    // 前月ボタンをクリックした時のイベント設定
    cPrev.addEventListener('click', function () {
        addCalendar(wrapper, prevMonth.getFullYear(), (prevMonth.getMonth() + 1));
    }, false);
    cMain.appendChild(cPrev);

    // 翌月ボタンの追加
    const cNext = document.createElement('button');
    cNext.className = 'calendar-header_next';
    const page_move_next = document.createElement('img');
    page_move_next.id = 'move_next';
    page_move_next.src = "image/page_move.png";
    cNext.insertAdjacentElement('beforeend', page_move_next);
    // const cNextText = document.createTextNode('next');
    // cNext.appendChild(cNextText); 

    // 翌月ボタンをクリックした時のイベント設定
    cNext.addEventListener('click', function () {
        addCalendar(wrapper, nextMonth.getFullYear(), (nextMonth.getMonth() + 1));
    }, false);
    cMain.insertAdjacentElement("beforeend", cNext);

    return cMain;
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

