// Retrieve tasks from local storage on page load
document.addEventListener('DOMContentLoaded', function () {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function (task) {
        addTaskToList(task);
    });
});

function addTask() {
    var inputField = document.getElementById('taskInput');
    var taskText = inputField.value.trim();
    if (taskText !== '') {
        var task = { text: taskText, completed: false };
        addTaskToList(task);
        saveTasksToLocalStorage();
        inputField.value = '';
    }
}

function addTaskToList(task) {
    var taskList = document.getElementById('taskList');
    var taskItem = document.createElement('li');
    taskItem.textContent = task.text;
    taskItem.addEventListener('click', function () {
        toggleTaskCompletion(taskItem, task);
    });
    taskList.appendChild(taskItem);
    if (task.completed) {
        taskItem.classList.add('completed');
    }
}

function toggleTaskCompletion(taskItem, task) {
    task.completed = !task.completed;
    taskItem.classList.toggle('completed');
    saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
    var tasks = [];
    var taskItems = document.querySelectorAll('#taskList li');
    taskItems.forEach(function (taskItem) {
        tasks.push({ text: taskItem.textContent, completed: taskItem.classList.contains('completed') });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}