const tireData = {
    red:   { name: "紅胎", base: 110, degrade: 0.8 },   // 1:50 = 110秒
    yellow:{ name: "黃胎", base: 113, degrade: 0.4 },   // 1:53 = 113秒
    white: { name: "白胎", base: 116, degrade: 0.2 }    // 1:56 = 116秒
};
const totalLaps = 60;

function lapTimeSum(base, degrade, laps) {
    // 等差級數求和公式
    return laps * base + degrade * (laps * (laps - 1) / 2);
}

function secToTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.round(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}

function calculate() {
    const tire1 = document.getElementById('tire1').value;
    const tire2 = document.getElementById('tire2').value;
    let lap1 = parseInt(document.getElementById('lap1').value, 10);
    let lap2 = parseInt(document.getElementById('lap2').value, 10);

    if (lap1 < 1 || lap2 < 1 || lap1 + lap2 !== totalLaps) {
        document.getElementById('result').innerHTML = "圈數總和必須為60，且每套輪胎至少1圈。";
        return;
    }

    const t1 = tireData[tire1];
    const t2 = tireData[tire2];

    const time1 = lapTimeSum(t1.base, t1.degrade, lap1);
    const time2 = lapTimeSum(t2.base, t2.degrade, lap2);

    const totalTime = time1 + time2;
    document.getElementById('result').innerHTML = `
        <b>第一套${t1.name} (${lap1}圈)：</b> ${secToTime(time1)}<br>
        <b>第二套${t2.name} (${lap2}圈)：</b> ${secToTime(time2)}<br>
        <hr>
        <b>總時間：</b> ${secToTime(totalTime)}
    `;
}