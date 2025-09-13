let addToDoButton = document.getElementById('addToDo');
let toDoContainer = document.getElementById('toDoContainer');
let inputField = document.getElementById('inputField');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    toDoContainer.innerHTML = '';
    todos.forEach((todo, index) => {
        let paragraph = document.createElement('p');
        paragraph.classList.add('paragraph-styling');
        paragraph.innerText = todo.text;
        paragraph.dataset.index = index;
        if (todo.completed) {
            paragraph.style.textDecoration = "line-through";
        }
        toDoContainer.appendChild(paragraph);
        paragraph.addEventListener('click', function(){
            let idx = parseInt(paragraph.dataset.index);
            todos[idx].completed = !todos[idx].completed;
            paragraph.style.textDecoration = todos[idx].completed ? "line-through" : "none";
            saveTodos();
        });
        paragraph.addEventListener('dblclick', function(){
            let idx = parseInt(paragraph.dataset.index);
            todos.splice(idx, 1);
            toDoContainer.removeChild(paragraph);
            // Re-index the remaining paragraphs
            document.querySelectorAll('.paragraph-styling').forEach((p, i) => {
                p.dataset.index = i;
            });
            saveTodos();
        });
    });
}

function addTodo() {
    if (inputField.value.trim() === '') return;
    let newTodo = { text: inputField.value, completed: false };
    todos.push(newTodo);
    saveTodos();
    inputField.value = "";
    // Add to display
    let paragraph = document.createElement('p');
    paragraph.classList.add('paragraph-styling');
    paragraph.innerText = newTodo.text;
    paragraph.dataset.index = todos.length - 1;
    toDoContainer.appendChild(paragraph);
    paragraph.addEventListener('click', function(){
        let idx = parseInt(paragraph.dataset.index);
        todos[idx].completed = !todos[idx].completed;
        paragraph.style.textDecoration = todos[idx].completed ? "line-through" : "none";
        saveTodos();
    });
    paragraph.addEventListener('dblclick', function(){
        let idx = parseInt(paragraph.dataset.index);
        todos.splice(idx, 1);
        toDoContainer.removeChild(paragraph);
        // Re-index
        document.querySelectorAll('.paragraph-styling').forEach((p, i) => {
            p.dataset.index = i;
        });
        saveTodos();
    });
}

addToDoButton.removeEventListener('click', function(){});

addToDoButton.addEventListener('click', addTodo);

inputField.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addTodo();
    }
});

// Load on page load
loadTodos();
