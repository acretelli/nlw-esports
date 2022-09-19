"use strict";
// 1100 -> 18:20
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertMinutesToHourString = void 0;
function convertMinutesToHourString(minutesAmount) {
    const hours = Math.floor(minutesAmount / 60);
    const minutes = minutesAmount % 60;
    return `${hours}:${minutes}`;
}
exports.convertMinutesToHourString = convertMinutesToHourString;
