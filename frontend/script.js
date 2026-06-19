const API_URL = 'http://localhost:5000/tasks';

// Load tasks
async function loadTasks() {

    const response = await fetch(API_URL);
    const tasks = await response.json();

    let rows = '';

    tasks.forEach(task => {

        rows += `
        <tr>
            <td>${task.id}</td>
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td>${task.status}</td>
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

loadTasks();