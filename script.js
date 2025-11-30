// ===== VARIABLES GLOBALES =====
let tasks = [];
let taskIdCounter = 1;
// ===== SISTEMA DE LOGIN =====
let currentUser = null;

// ===== ELEMENTOS DEL DOM =====
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const totalTasksEl = document.getElementById('totalTasks');
const pendingTasksEl = document.getElementById('pendingTasks');
const completedTasksEl = document.getElementById('completedTasks');

// Elementos del login
const loginModal = document.getElementById('loginModal');
const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const loginBtn = document.getElementById('loginBtn');
const appContainer = document.getElementById('appContainer');
const userNameEl = document.getElementById('userName');
const logoutBtn = document.getElementById('logoutBtn');

// Usuarios de demostración
const users = {
    'demo': '1234',
    'admin': 'admin',
    'user': 'pass'
};


// Evento de login
loginBtn.addEventListener('click', handleLogin);
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleLogin();
});

// Evento de logout
logoutBtn.addEventListener('click', handleLogout);

// Función de login
function handleLogin() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    
    if (username === '' || password === '') {
        alert('Por favor completa todos los campos');
        return;
    }
    
    if (users[username] && users[username] === password) {
        currentUser = username;
        localStorage.setItem('currentUser', username);
        showApp();
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}

// Función de logout
function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    hideApp();
}

// Mostrar aplicación
function showApp() {
    loginModal.style.display = 'none';
    appContainer.style.display = 'block';
    userNameEl.textContent = `👤 ${currentUser}`;
    loadFromLocalStorage();
}

// Ocultar aplicación
function hideApp() {
    loginModal.style.display = 'flex';
    appContainer.style.display = 'none';
    usernameInput.value = '';
    passwordInput.value = '';
}

// Verificar sesión al cargar
document.addEventListener('DOMContentLoaded', () => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = savedUser;
        showApp();
    } else {
        hideApp();
    }
});

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

// ===== PERSISTENCIA CON LOCALSTORAGE =====

// Guardar tareas en localStorage
function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('taskIdCounter', taskIdCounter.toString());
}

// Cargar tareas desde localStorage
function loadFromLocalStorage() {
    const savedTasks = localStorage.getItem('tasks');
    const savedCounter = localStorage.getItem('taskIdCounter');

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }

    if (savedCounter) {
        taskIdCounter = parseInt(savedCounter);
    }

    renderTasks();
    updateStats();
}

// Modificar función addTask para guardar
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
    saveToLocalStorage(); // ← AGREGAR ESTA LÍNEA
    renderTasks();
    updateStats();
}

// Modificar toggleTask para guardar
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveToLocalStorage(); // ← AGREGAR ESTA LÍNEA
        renderTasks();
        updateStats();
    }
}

// Modificar deleteTask para guardar
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveToLocalStorage(); // ← AGREGAR ESTA LÍNEA
    renderTasks();
    updateStats();
}

// Modificar inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage(); // ← AGREGAR ESTA LÍNEA
    updateStats();
});