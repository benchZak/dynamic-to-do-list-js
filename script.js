// Wait for the DOM to fully load before running any script
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Define the function to add a task
    function addTask() {
        const taskText = taskInput.value.trim(); // Remove leading/trailing whitespace

        // Check if the input is empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new <li> element
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        // Create a "Remove" button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn'; // Use className instead of classList.add

        // Add event to remove the task on button click
        removeButton.onclick = function () {
            taskList.removeChild(taskItem);
        };

        // Append the remove button to the task item
        taskItem.appendChild(removeButton);

        // Append the task item to the task list
        taskList.appendChild(taskItem);

        // Clear the input field
        taskInput.value = "";
    }

    // Add click event to "Add Task" button
    addButton.addEventListener('click', addTask);

    // Add keypress event to input field to allow pressing "Enter"
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

