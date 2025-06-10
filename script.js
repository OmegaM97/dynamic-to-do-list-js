// Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function() {

    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load Tasks from Local Storage and Display them
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false: don't save again to Local Storage
    }

    // Function to Save Tasks Array to Local Storage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add Task Function: Adds Task to DOM and (optionally) Local Storage
    function addTask(taskText, save = true) {
        // If called from button click or 'Enter', get value from input
        if (!taskText) {
            taskText = taskInput.value.trim();
            if (taskText === '') {
                alert('Please enter a task.');
                return;
            }
        }

        // Create list item
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create Remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Remove Task Logic
        removeButton.onclick = function() {
            taskList.removeChild(listItem);

            // Remove task from Local Storage
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const updatedTasks = storedTasks.filter(task => task !== taskText);
            saveTasks(updatedTasks);
        };

        // Append button to list item
        listItem.appendChild(removeButton);

        // Append list item to task list
        taskList.appendChild(listItem);

        // Save to Local Storage if needed
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            saveTasks(storedTasks);
        }

        // Clear input field
        taskInput.value = '';
    }

    // Event Listener for 'Add Task' button
    addButton.addEventListener('click', function() {
        addTask();
    });

    // Event Listener for 'Enter' key press in input field
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load Tasks from Local Storage on page load
    loadTasks();
});
