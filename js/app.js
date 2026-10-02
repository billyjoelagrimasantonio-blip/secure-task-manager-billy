const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const loadSamplesBtn = document.getElementById("loadSamplesBtn");
const taskList = document.getElementById("taskList");
const taskMessage = document.getElementById("taskMessage");
const totalCount = document.getElementById("totalCount");
const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

let taskCounter = 0;

function createTaskElement(taskText, taskId) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");
    taskItem.dataset.taskId = taskId;
    taskItem.dataset.state = "pending";

    const textSpan = document.createElement("span");
    textSpan.classList.add("task-text");
    textSpan.textContent = taskText;

    const completeButton = document.createElement("button");
    completeButton.type = "button";
    completeButton.classList.add("complete-btn");
    completeButton.textContent = "Complete";

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.classList.add("edit-btn");
    editButton.textContent = "Edit";

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.classList.add("remove-btn");
    removeButton.textContent = "Remove";

    taskItem.appendChild(textSpan);
    taskItem.appendChild(completeButton);
    taskItem.appendChild(editButton);
    taskItem.appendChild(removeButton);

    return taskItem;
}

function addTask(taskText) {
    const text = taskText.trim();

    if (!text) {
        taskMessage.textContent = "Task cannot be empty";
        return;
    }

    taskCounter += 1;

    const taskId = `task-${taskCounter}`;
    const taskItem = createTaskElement(text, taskId);

    taskList.appendChild(taskItem);

    taskInput.value = "";
    taskMessage.textContent = "";

    updateTaskCounts();
}

function toggleTaskComplete(taskItem) {
    taskItem.classList.toggle("completed");

    const isCompleted = taskItem.classList.contains("completed");

    taskItem.dataset.state = isCompleted ? "completed" : "pending";

    updateTaskCounts();
}

function beginTaskEdit(taskItem) {
    const textSpan = taskItem.querySelector(".task-text");
    const editButton = taskItem.querySelector(".edit-btn");

    if (!textSpan || !editButton) {
        return;
    }

    const editInput = document.createElement("input");

    editInput.type = "text";
    editInput.classList.add("edit-input");
    editInput.value = textSpan.textContent;

    taskItem.replaceChild(editInput, textSpan);

    editButton.textContent = "Save";

    editInput.focus();
}

function saveTaskEdit(taskItem) {
    const editInput = taskItem.querySelector(".edit-input");
    const editButton = taskItem.querySelector(".edit-btn");

    if (!editInput || !editButton) {
        return;
    }

    const editedText = editInput.value.trim();

    if (!editedText) {
        taskMessage.textContent = "Task cannot be empty";
        editInput.focus();
        return;
    }

    const textSpan = document.createElement("span");

    textSpan.classList.add("task-text");
    textSpan.textContent = editedText;

    taskItem.replaceChild(textSpan, editInput);

    editButton.textContent = "Edit";
    taskMessage.textContent = "";
}

function removeTask(taskItem) {
    taskItem.remove();
    updateTaskCounts();
}

function updateTaskCounts() {
    const tasks = taskList.querySelectorAll(".task-item");

    let pending = 0;
    let completed = 0;

    tasks.forEach((task) => {
        if (task.dataset.state === "completed") {
            completed += 1;
        } else {
            pending += 1;
        }
    });

    totalCount.textContent = tasks.length;
    pendingCount.textContent = pending;
    completedCount.textContent = completed;
}

function handleTaskListClick(event) {
    const actionButton = event.target;

    if (
        !actionButton.matches(".complete-btn") &&
        !actionButton.matches(".edit-btn") &&
        !actionButton.matches(".remove-btn")
    ) {
        return;
    }

    const taskItem = actionButton.closest(".task-item");

    if (!taskItem) {
        return;
    }

    if (actionButton.matches(".complete-btn")) {
        toggleTaskComplete(taskItem);
        return;
    }

    if (actionButton.matches(".edit-btn")) {
        if (actionButton.textContent === "Edit") {
            beginTaskEdit(taskItem);
        } else {
            saveTaskEdit(taskItem);
        }
        return;
    }

    if (actionButton.matches(".remove-btn")) {
        removeTask(taskItem);
    }
}

function loadSampleTasks() {
    const sampleTasks = [
        "Review DOM selectors",
        "Practice createElement",
        "Study event delegation"
    ];

    const fragment = document.createDocumentFragment();

    sampleTasks.forEach((taskText) => {
        taskCounter += 1;

        const taskId = `task-${taskCounter}`;
        const taskItem = createTaskElement(taskText, taskId);

        fragment.appendChild(taskItem);
    });

    taskList.appendChild(fragment);

    taskMessage.textContent = "";

    updateTaskCounts();
}

addTaskBtn.addEventListener("click", () => {
    addTask(taskInput.value);
});

taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask(taskInput.value);
    }
});

loadSamplesBtn.addEventListener("click", loadSampleTasks);

taskList.addEventListener("click", handleTaskListClick);

updateTaskCounts();