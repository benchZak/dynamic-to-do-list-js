document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage on page load
    loadTasks();

    // Function to load tasks and populate DOM
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false: don't re-save to storage
    }

    // Function to save tasks array to Local Storage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add a task to DOM and optionally Local Storage
    function addTask(taskText, save = true) {
        if (!taskText || taskText.trim() === "") {
            alert("Please enter a task.");
            return;
        }

        // Create list item
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Add click event to remove task
        removeButton.onclick = function () {
            taskList.removeChild(taskItem);
            removeTaskFromStorage(taskText);
        };

        // Append remove button and task to list
        taskItem.appendChild(removeButton);
        taskList.appendChild(taskItem);

        // Save to localStorage
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            saveTasks(storedTasks);
        }

        // Clear input
        taskInput.value = "";
    }

    // Function to remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        saveTasks(storedTasks);
    }

    // Add Task on Button Click
    addButton.addEventListener('click', () => {
        addTask(taskInput.value);
    });

    // Add Task on Enter Key Press
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });
});

