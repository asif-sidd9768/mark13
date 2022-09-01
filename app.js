const dateInput = document.querySelector("#dateInput");
const checkButton = document.querySelector("#checkButton");

const answer = document.querySelector("#answer");

const reverseStr = (str) => {
  return str.split("").reverse().join("");
};

const isPalindrome = (str) => {
  return str === reverseStr(str);
};

const dateToString = (date) => {
  const dateStr = { day: "", month: "", year: "" };
  dateStr.day = date.day.toString();
  dateStr.month = date.month.toString();
  dateStr.year = date.year.toString();

  if (date.day < 10) dateStr.day = "0" + date.day.toString();
  if (date.month < 10) dateStr.month = "0" + date.month.toString();
  return dateStr;
};

const getAllDates = (date) => {
  const dateStr = dateToString(date);
  let { day, month, year } = dateStr;
  let ddmmyyyy = day + month + year;
  let mmddyyyy = month + day + year;
  let yyyymmdd = year + month + day;

  let ddmmyy = day + month + year.slice(-2);
  let mmddyy = month + day + year.slice(-2);
  let yymmdd = year.slice(-2) + month + day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
};

const checkPalindromeAll = (date) => {
  let listOfPalindrome = getAllDates(date);
  let output = false;
  for (let item of listOfPalindrome) {
    if (isPalindrome(item)) {
      output = true;
      break;
    }
  }
  return output;
};

const isLeapYear = (year) => {
  if (year % 400 === 0) return true;
  if (year % 100 === 0) return false;
  if (year % 4 === 0) return true;
  return false;
};

const getNextDate = (date) => {
  let { day, month, year } = date;
  day = day + 1;

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return { day, month, year };
};

const getNextPalindrome = (date) => {
  let dayCount = 0;
  let nextDate = getNextDate(date);

  while (true) {
    dayCount++;
    if (checkPalindromeAll(nextDate)) break;
    nextDate = getNextDate(nextDate);
  }
  return { dayCount, nextDate };
};

const dt = {
  day: "31",
  month: "12",
  year: "2021",
};

const checkButtonHandler = (e) => {
  const bdValue = dateInput.value.split("-");
  const date = {
    day: Number(bdValue[2]),
    month: Number(bdValue[1]),
    year: Number(bdValue[0]),
  };
  if (dateInput.value) {
    if (checkPalindromeAll(date)) {
      answer.innerText = `Your Birthday is Palindrome`;
    } else {
      const { dayCount, nextDate } = getNextPalindrome(date);
      answer.innerText = `You missed Palindrome by ${dayCount} days and date is ${nextDate.day}-${nextDate.month}-${nextDate.year}`;
    }
  } else {
    answer.innerHTML = "Select a date";
  }
  // console.log(getNextPalindrome(dt));
};

checkButton.addEventListener("click", checkButtonHandler);
