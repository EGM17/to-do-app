
// Initialize tasks array
let tasks = [];

// Get DOM elements
const taskForm = document.querySelector('form');
const taskList = document.getElementById('taskList');
const printTasksButton = document.getElementById('printTasks');
const sendTasksByEmailButton = document.getElementById('sendTasksByEmail');

// Render tasks on page load
renderTasks();

// Add event listener to form submit button
taskForm.addEventListener('submit', addTask);

// Add event listener to print tasks button
printTasksButton.addEventListener('click', printTasks);

// Add event listener to send tasks by email button
sendTasksByEmailButton.addEventListener('click', sendTasksByEmail);

// Function to add a task to the list
function addTask(event) {
  event.preventDefault();

  // Get form input values
  const taskInput = document.getElementById('task');
  const clientInput = document.getElementById('client');
  const dateInput = document.getElementById('date');
  const timeInput = document.getElementById('time');

  // Create task object
  const task = {
    id: Date.now(),
    description: taskInput.value,
    client: clientInput.value,
    date: dateInput.value,
    time: timeInput.value
  };

  // Add task to tasks array
  tasks.push(task);

  // Clear form input fields
  taskInput.value = '';
  clientInput.value = '';
  dateInput.value = '';
  timeInput.value = '';

  // Render tasks on page
  renderTasks();

  // Save tasks to local storage
  saveTasks();
}

// Function to render tasks on page
function renderTasks() {
  // Clear task list
  taskList.innerHTML = '';

  // Render each task in tasks array
  tasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task');

    const taskInfo = document.createElement('div');
    taskInfo.classList.add('task-info');

    const taskDescription = document.createElement('span');
    taskDescription.textContent = task.description;
    taskInfo.appendChild(taskDescription);

    const taskClient = document.createElement('span');
    taskClient.textContent = task.client;
    taskInfo.appendChild(taskClient);

    const taskDate = document.createElement('span');
    taskDate.textContent = task.date;
    taskInfo.appendChild(taskDate);

    const taskTime = document.createElement('span');
    taskTime.textContent = task.time;
    taskInfo.appendChild(taskTime);

    taskItem.appendChild(taskInfo);

    const taskButton = document.createElement('button');
    taskButton.textContent = 'Borrar';
    taskButton.addEventListener('click', () => {
      deleteTask(task.id);
    });

    taskItem.appendChild(taskButton);

    taskList.appendChild(taskItem);
  });
}

// Function to delete a task from the list
function deleteTask(id) {
  // Find task with matching id
  const index = tasks.findIndex(task => task.id === id);

  // Remove task from tasks array
  tasks.splice(index, 1);

  // Render tasks on page
  renderTasks();

  // Save tasks to local storage
  saveTasks();
}

// Function to save tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
  const tasksJSON = localStorage.getItem('tasks');

  if (tasksJSON !== null) {
    tasks = JSON.parse(tasksJSON);
  }
}

// Function to print tasks
function printTasks() {
  window.print();
}

// Function to send tasks by email
function sendTasksByEmail() {
  const emailBody = tasks.map(task => {
    return `${task.description} for ${task.client} on ${task.date} at ${task.time}`;
  }).join('%0D%0A');

  const emailSubject = encodeURIComponent('My Task List');
  const emailBodyEncoded = encodeURIComponent(emailBody);

  window.open(`mailto:?subject=${emailSubject}&body=${emailBodyEncoded}`);
}

// Load tasks from local storage
loadTasks();
// Render tasks on page
renderTasks();