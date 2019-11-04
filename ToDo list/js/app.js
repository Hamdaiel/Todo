'use strict';


const todoForm = document.querySelector('.todoForm'),
    todoInput = document.querySelector('.todoField'),
    todosList = document.querySelector('.todosList'),
    submitBtn = document.querySelector('.add-btn');

// run todo
function runTodo(e) {
    // check input empty or not
    if (todoInput.value === '') {
        alert('Add todo');
        return;
    }

    let li = document.createElement('li');
    li.className = 'todosList__item';
    li.appendChild(document.createTextNode(todoInput.value));
    let span = document.createElement('span');
    span.className = 'close-btn';
    li.appendChild(span);
    todosList.appendChild(li);
    storelocalStorage(todoInput.value);
    todoInput.value = '';
    todoInput.focus();

    e.preventDefault();
}

// store local storage
function storelocalStorage(val) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(val);

    localStorage.setItem('todos', JSON.stringify(todos));
}

// get todos from local storage
document.addEventListener('DOMContentLoaded', function() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(todo => {
        let li = document.createElement('li');
        li.className = 'todosList__item';
        li.appendChild(document.createTextNode(todo));
        let span = document.createElement('span');
        span.className = 'close-btn';
        li.appendChild(span);
        todosList.appendChild(li);
    });
});

// delete todo
function deleteTodoItem(e) {
    if (e.target.classList.contains('close-btn')) {
        if (confirm("Would you like to delete?")) {
            e.target.parentElement.remove();
            deleteTodoFromLocalStorage(e.target.parentElement);
        }
    }
}

// delete todo from local storage
function deleteTodoFromLocalStorage(val) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach((todo, index) => {
        console.log(todo);
        console.log(val.textContent);
        if (val.textContent === todo) {
            todos.splice(index, 1);
        }
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}



todoForm.addEventListener("submit", runTodo);
todosList.addEventListener('click', deleteTodoItem);
