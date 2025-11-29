// ===== VARIABLES GLOBALES =====
let tasks = [];
let taskIdCounter = 1;

// ===== ELEMENTOS DEL DOM =====
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const totalTasksEl = document.getElementById('totalTasks');
const pendingTasksEl = document.getElementById('pendingTasks');
const completedTasksEl = document.getElementById('completedTasks');

// ===== EVENTOS =====
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// ===== FUNCIÓN: AGREGAR TAREA =====
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Por favor, escribe una tarea');
        return;
    }

    const newTask = {
        id: taskIdCounter++,
        text: taskText,
        completed: false,
        createdAt: new Date().toLocaleString()
    };

    tasks.push(newTask);
    taskInput.value = '';
    renderTasks();
    updateStats();
}

// ===== FUNCIÓN: RENDERIZAR TAREAS =====
function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = createTaskElement(task);
        taskList.appendChild(taskElement);
    });
}

// ===== FUNCIÓN: CREAR ELEMENTO DE TAREA =====
function createTaskElement(task) {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task-item';
    taskDiv.innerHTML = `
        <div class="task-content">
            <input type="checkbox" ${task.completed ? 'checked' : ''} 
                   onchange="toggleTask(${task.id})">
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
        </div>
        <button onclick="deleteTask(${task.id})" class="btn-delete">
            🗑️
        </button>
    `;

    return taskDiv;
}

// ===== FUNCIÓN: MARCAR TAREA COMO COMPLETADA =====
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
        updateStats();
    }
}

// ===== FUNCIÓN: ELIMINAR TAREA =====
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
    updateStats();
}

// ===== FUNCIÓN: ACTUALIZAR ESTADÍSTICAS =====
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    totalTasksEl.textContent = total;
    completedTasksEl.textContent = completed;
    pendingTasksEl.textContent = pending;
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    updateStats();
});