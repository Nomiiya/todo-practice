const toDoList = [];
const completedList = [];

//add a object to the array
function addToDo(text){
    const todoItem = {
        id: Date.now(),
        text: text,
        checked: false
    }

    toDoList.push(todoItem);
    renderToDo(todoItem);
    //console.log(toDoList);
}

//Form on submit listener
const submitNewtoDo = document.querySelector('.todo-input');
submitNewtoDo.addEventListener('submit', e => {
    e.preventDefault();
    const input = document.querySelector('.toDoText');
    //console.log(input.value);
    addToDo(input.value);
})


// Append new nodes to the UL
function renderToDo(toDoItem){
    const list = document.querySelector(".todo-list");
    const name = toDoItem.text;
    const node = document.createElement("li");
    //console.log(toDoItem)
    node.id = toDoItem.id;
    node.innerHTML=
        `
        <input type="checkbox" id="${toDoItem.id}" name="${toDoItem.id}" onclick='completeItem({toDoItem: ${JSON.stringify(toDoItem)},index:${toDoList.length-1}})'></input>
        <label>${toDoItem.text}</label>
        <button id="button" class="delete-todo" onclick="spliceTodoItem({id: ${toDoItem.id}, index:${toDoList.length-1}})"><i class="fa fa-trash"></i></button>
        `;
    list.append(node);
}

function spliceTodoItem({id, index}){
    toDoList.splice(index, 1);

    const liItem = document.getElementById(id);
    liItem.remove();
}

function spliceCompletedItem({id, index}){
    completedList.splice(index, 1);

    const liItem = document.getElementById(id);
    liItem.remove();
}

// add to completed
function completedAdd(text){
    const completed = {
        id: Date.now(),
        text: text
    }

    completedList.push(completed);
}

function completeItem({toDoItem,index}){
    completedAdd(toDoItem.text);

    const completedNode = document.querySelector(".completed-list");

    const node = document.createElement("li");
    node.id = completedList[completedList.length-1].id;
    node.innerHTML=
        `
        <label>${toDoItem.text}</label>
        <button id="button" class="delete-todo" onclick="spliceCompletedItem({id: ${node.id}, index:${completedList.length -1}})"><i class="fa fa-trash"></i></button>
        `;
    completedNode.append(node);

    spliceCompletedItem({id:toDoItem.id, index:index});
}