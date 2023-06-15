// import { add } from "./function.js"
// console.log(add(2,3));

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js"

const appSettings = {
    databaseURL : "https://simple-javascript-app-e8722-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

//connect to Firebase database and select shoppingList object
const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");


const inputFieldEl = document.getElementById("input-field");
const addBtnEl = document.getElementById("add-btn");
const shoppingListEl = document.getElementById("shopping-list");

onValue(shoppingListInDB, function(object){
    let shoppingListArray = Object.values(object.val());
    // console.log(shoppingListArray);

    clearShoppingListEl();
    
    shoppingListArray.forEach((item, i) => {
        appendItemToShoppingListEl(item);
    })
})

addBtnEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value;
    push(shoppingListInDB, inputValue);

    alert(`${inputValue} added to firebase`);
    clearInputField();
    // appendItemToShoppingListEl(inputValue);
})

function clearShoppingListEl(){
    shoppingListEl.innerHTML = "";
}

function clearInputField(){
    inputFieldEl.value = "";
}

function appendItemToShoppingListEl(itemValue){
    shoppingListEl.innerHTML += `<li>${itemValue}</li>`;
}