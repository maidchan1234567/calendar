window.onload = function(){
    console.log(getMonthCalendar(2022, 9));
}

function getMonthCalendar(year, month){
    const firstDate = new Date(year, (month-1), 1); //指定した月の初日の情報
    const lastDay = new Date(year, (firstDate.getMonth()+1), 0).getDate(); //指定した月の最終日の情報
    const weekday = firstDate.getDay(); //初日の曜日を取得

    const calendarDate = []; //カレンダーの情報を格納
    let weekdayCount = weekday; //曜日の格納
    for(let i = 0; i < lastDay; i++){
        calendarDate[i] = {
            day:i+1,
            weekday: weekdayCount
        }
        if(weekdayCount >= 6){
            weekdayCount = 0
        }else{
            weekdayCount++;
        }
    }
    return calendarDate;
}