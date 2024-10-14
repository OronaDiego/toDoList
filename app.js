const tasks = []
const form = document.querySelector('#task-form')
const container = document.getElementById('task-list')
const inputTitle = document.querySelector('#title')
const inputDesc = document.querySelector('#description')

// Genero un codigo que no se repite para usarlo como ID
const getRandomID = () => {
    return Math.floor(Math.random() * Date.now()).toString(16)
}

// Utilizo factories => funcion para crear objetos
const createTask = (taskId, taskTitle, taskDescripcion) => {
    return {
        id: taskId,
        title: taskTitle,
        description: taskDescripcion
    }
}

// Renderizo una tarea individual
const renderTask = (task) => {
    const div = document.createElement('div')
    div.classList.add('card', 'text-center', 'mb-4')  // Añadir clases al div
    div.innerHTML = `
        <div class="card-body">
            <strong>Título</strong>: ${task.title} -
            <strong>Descripción</strong>: ${task.description}
            <button class="btn btn-danger" id="${task.id}" name="delete">Delete</button>
        </div>`

    container.appendChild(div)
}

// Elimino el objeto con el ID correspondiente del array tasks
const deleteTask = (taskID) => {
    const index = tasks.findIndex(task => task.id === taskID)
    if (index !== -1) {
        tasks.splice(index, 1)
    }
    updateTasks(tasks)
    saveTasksStorage(tasks)
}

// Actualizo las tareas en el DOM
const updateTasks = (tasks) => {
    container.innerHTML = ''  // Limpiar el contenedor antes de renderizar de nuevo
    tasks.forEach((task) => {
        renderTask(task)
    })
}

// Escucho el evento de eliminar en el contenedor
container.addEventListener('click', (e) => {
    if (e.target.name === 'delete') {
        const id = e.target.id
        deleteTask(id)
    }
})

// Guardo las tareas en localStorage
const saveTasksStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Cargar tareas del localStorage al iniciar la página
const loadTasksFromStorage = () => {
    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) {
        tasks.push(...JSON.parse(savedTasks))
        updateTasks(tasks)
    }
}

// Escucho el evento de submit
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const id = getRandomID()
    const titulo = inputTitle.value
    const description = inputDesc.value

    if (titulo.trim() !== '' && description.trim() !== '') {
        const task = createTask(id, titulo, description)
        tasks.push(task)
        saveTasksStorage(tasks)
        renderTask(task)

        // Limpiar los campos del formulario después de agregar la tarea
        inputTitle.value = ''
        inputDesc.value = ''
    } else {
        alert('Por favor completa los campos.')
    }
})

// Cargar las tareas cuando se carga la página
loadTasksFromStorage()
