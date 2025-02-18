async function fetchTasks() {
    const response = await fetch("/tasks");
    const tasks = await response.json();

    document.getElementById("taskList").innerHTML = tasks.map(task => 
        `<li class="task-item ${task.completed ? 'completed' : ''}">
            <div class="task-title">${task.title}</div>
            <div class="task-description">${task.description}</div>
            <div class="task-controls">
                <button class="toggle-btn" onclick="toggleTask('${task._id}')">
                    ${task.completed ? "Mark as Pending" : "Mark as Done"}
                </button>
                <button class="delete-btn" onclick="deleteTask('${task._id}')">Delete</button>
            </div>
        </li>`
    ).join("");
}

async function toggleTask(id) {
    await fetch(`/tasks/toggle/${id}`, { method: "PATCH" });
    fetchTasks();
}

async function deleteTask(id) {
    await fetch(`/tasks/delete/${id}`, { method: "DELETE" });
    fetchTasks();
}

document.getElementById("taskForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    await fetch("/tasks/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description })
    });

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    fetchTasks();
});

fetchTasks();
