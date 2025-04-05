document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const addBtn = document.getElementById('add');
    const deleteBtn = document.getElementById('delete');
    const darkBtn = document.getElementById('dark');
    const todoContainer = document.getElementById('div1');
    const totalTasksSpan = document.getElementById('total-tasks');
    const completedTasksSpan = document.getElementById('completed-tasks');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let isDarkMode = localStorage.getItem('darkMode') === 'true';

    // Initialize dark mode
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkBtn.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    }

    // Update stats
    function updateStats() {
        totalTasksSpan.textContent = todos.length;
        completedTasksSpan.textContent = todos.filter(todo => todo.completed).length;
    }

    // Save todos to localStorage
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
        updateStats();
    }

    // Create todo element
    function createTodoElement(todo) {
        const todoItem = document.createElement('div');
        todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        todoItem.innerHTML = `
            <span>${todo.text}</span>
            <div class="todo-actions">
                <button class="complete-btn" onclick="toggleComplete(${todo.id})">
                    <i class="fas ${todo.completed ? 'fa-check-circle' : 'fa-circle'}"></i>
                </button>
                <button class="delete-btn" onclick="deleteTodo(${todo.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        return todoItem;
    }

    // Render todos
    function renderTodos() {
        todoContainer.innerHTML = '';
        todos.forEach(todo => {
            todoContainer.appendChild(createTodoElement(todo));
        });
        updateStats();
    }

    // Add todo
    function addTodo(text) {
        if (text.trim() === '') return;
        
        const todo = {
            id: Date.now(),
            text: text,
            completed: false
        };
        
        todos.push(todo);
        saveTodos();
        renderTodos();
    }

    // Toggle todo completion
    window.toggleComplete = (id) => {
        todos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        saveTodos();
        renderTodos();
    };

    // Delete todo
    window.deleteTodo = (id) => {
        todos = todos.filter(todo => todo.id !== id);
        saveTodos();
        renderTodos();
    };

    // Event Listeners
    addBtn.addEventListener('click', () => {
        addTodo(input.value);
        input.value = '';
    });

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo(input.value);
            input.value = '';
        }
    });

    deleteBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all tasks?')) {
            todos = [];
            saveTodos();
            renderTodos();
        }
    });

    darkBtn.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        darkBtn.innerHTML = isDarkMode ? 
            '<i class="fas fa-sun"></i> Light Mode' : 
            '<i class="fas fa-moon"></i> Dark Mode';
    });

    // Initial render
    renderTodos();
});
