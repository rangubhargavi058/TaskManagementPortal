const API_URL = 'http://localhost:5000/tasks';

let allTasks = [];

// Load tasks
async function loadTasks() {

    const response = await fetch(API_URL);

    const tasks = await response.json();

    allTasks = tasks;

    displayTasks(allTasks);
}

// Display tasks
function displayTasks(tasks) {

    let rows = '';

    tasks.forEach(task => {

        rows += `
        <tr>
            <td>${task.id}</td>
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td>${task.status}</td>
            <td>${new Date(task.created_at).toLocaleDateString()}</td>
            <td>
                <button onclick="editTask(${task.id}, '${task.title}', '${task.description}', '${task.status}')">
                    Edit
                </button>

                <button onclick="deleteTask(${task.id})">
                    Delete
                </button>
            </td>
        </tr>
        `;
    });

    document.getElementById('taskTable').innerHTML = rows;
}

// Add task
async function addTask() {

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const status = document.getElementById('status').value;

    if (title.trim() === '') {

        alert('Title is required');
        return;
    }

    if (description.trim().length < 20) {

        alert('Description must be at least 20 characters');
        return;
    }

    await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            description,
            status
        })
    });

    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('status').value = '';

    loadTasks();
}

// Delete task
async function deleteTask(id) {

    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });

    loadTasks();
}

// Edit task
async function editTask(id, title, description, status) {

    const newTitle = prompt("Enter Title", title);
    const newDescription = prompt("Enter Description", description);
    const newStatus = prompt("Enter Status", status);

    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: newTitle,
            description: newDescription,
            status: newStatus
        })
    });

    loadTasks();
}

// Filter tasks
function filterTasks() {

    const selectedStatus =
        document.getElementById('statusFilter').value;

    if (selectedStatus === 'All') {

        displayTasks(allTasks);

    } else {

        const filteredTasks = allTasks.filter(
            task => task.status === selectedStatus
        );

        displayTasks(filteredTasks);
    }
}

loadTasks();