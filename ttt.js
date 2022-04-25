const arr1 = [
    "사용일자",
    "노선번호",
    "노선명",
    "버스정류장ARS번호",
    "역명",
    "승차총승객수",
    "하차총승객수",
    "등록일자",
];
const arr2 = ["사용일자", "노선명", "역명", "승차총승객수", "하차총승객수", "등록일자", "Unnamed: 6"];

const inter = arr1.filter((f) => arr2.includes(f));
console.log(inter);
