import { comments } from "./comments.js";

//Задание 2

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const filtered = numbers.filter(num => num >= 5);

console.log(filtered);

//Задание 3

const movies = ["Интерстеллар", "Начало", "Побег из Шоушенка", "Зеленая миля", "Титаник"];

console.log(movies.includes("Начало"));

//Задание 4

function reverseArray(arr) {
  return arr.reverse();
}

reverseArray(numbers);

reverseArray(movies);

console.log(movies); 
console.log(numbers); 

//Задание 6

console.log('Количество комментариев:', comments.length);
console.log('Первый комментарий:', comments[0]);

//Задание 7

const result = comments.filter(comment => comment.email.includes('.com'));
console.log(result);

//Задание 8

const users = comments.map(comment => ({
  ...comment,
  postId: comment.id <= 5 ? 2 : 1
}));
console.log(users);
//Задание 9

const userNames = comments.map(comment => ({
  id: comment.id,
  name: comment.name
}));
console.log(userNames);

//Задание 10

const commentsWithInvalid = comments.map(comment => ({
  ...comment,
  isInvalid: comment.body.length > 180 
}));
console.log(commentsWithInvalid); 

//Задание 11

// Через reduce
const emails1 = comments.reduce((email, comment) => {
  email.push(comment.email);
  return email;
}, []);
console.log(emails1);

// Через map (стрелочная функция)
const emails2 = comments.map(comment => comment.email);
console.log(emails2);

//Задание 12

const emails = comments.map(comment => comment.email);

// Через join

const emailsString1 = emails.join(', ');
console.log(emailsString1);

// Через toString
const emailsString2 = emails.toString();
console.log(emailsString2);