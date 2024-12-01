const changeThemeBtn = document.querySelector("#change-theme");
const inputText = document.getElementById("AddTask");
const listContainer = document.querySelector(".list-container");
const itemsLength = document.querySelector(".length-items");
const deleteItems = document.querySelector(".delete-items");
const filterButtons = document.querySelectorAll(".filter-btn");

changeThemeBtn.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});

let tasks = getTasksFromStorage();

inputText.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (inputText.value === "") {
      alert("You must write something");
    } else {
      const taskText = inputText.value.trim();
      if (taskText) {
        tasks.push({ text: taskText, completed: false });
        inputText.value = "";

        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
      }
    }
  }
});

function getTasksFromStorage() {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
}

const renderTasks = (filter = "all") => {
  listContainer.innerHTML = "";

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "not-completed") return !task.completed;
    return true; // 'all'
  });

  filteredTasks.forEach((task, index) => {
    const taskItem = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "inputCheck";
    checkbox.checked = task.completed;

    const taskTextEl = document.createElement("span");
    taskTextEl.textContent = task.text;
    if (task.completed) taskTextEl.classList.add("completed");

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X";
    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Evita que o clique remova a tarefa ao clicar na div
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks(filter);
    });

    // Clicar na div alterna o estado do checkbox
    taskItem.addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      renderTasks(filter);
    });

    itemsLength.innerText = `${tasks.length} items left`;
    //   console.log((tasks.length) == (filter === "not-completed"));
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskTextEl);
    taskItem.appendChild(removeBtn);

    listContainer.appendChild(taskItem);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
};

// Remover todas as tarefas completadas
deleteItems.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.completed); // Filtra apenas as tarefas não completadas
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks(document.querySelector(".filter-btn.active").dataset.filter); // Atualiza a lista com base no filtro ativo
});

// Filtro para tarefas
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    button.classList.add("active");
    renderTasks(button.dataset.filter);
  });
});

// Renderizar inicialmente com todas as tarefas
document.addEventListener(
  "DOMContentLoaded",
  renderTasks(document.querySelector(".filter-btn.active").dataset.filter)
);
