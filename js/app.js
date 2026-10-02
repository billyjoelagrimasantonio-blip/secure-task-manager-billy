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

    const taskTextSpan = document.createElement("span");
    taskTextSpan.classList.add("task-text");
    taskTextSpan.textContent = taskText;

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

    taskItem.appendChild(taskTextSpan);
    taskItem.appendChild(completeButton);
    taskItem.appendChild(editButton);
    taskItem.appendChild(removeButton);

    return taskItem;
}

function addTask(taskText) {
    const cleanText = taskText.trim();

    if (cleanText === "") {
        taskMessage.textContent = "Task cannot be empty";
        return;
    }

    taskCounter += 1;

    const taskId = `task-${taskCounter}`;
    const taskItem = createTaskElement(cleanText, taskId);

    taskList.appendChild(taskItem);

    taskInput.value = "";
    taskMessage.textContent = "";

    updateTaskCounts();
}

function toggleTaskComplete(taskItem) {
    taskItem.classList.toggle("completed");

    if (taskItem.classList.contains("completed")) {
        taskItem.dataset.state = "completed";
    } else {
        taskItem.dataset.state = "pending";
    }

    updateTaskCounts();
}

function beginTaskEdit(taskItem) {
    const taskTextSpan = taskItem.querySelector(".task-text");
    const editButton = taskItem.querySelector(".edit-btn");

    if (!taskTextSpan || !editButton) {
        return;
    }

    const editInput = document.createElement("input");

    editInput.type = "text";
    editInput.classList.add("edit-input");
    editInput.value = taskTextSpan.textContent;

    taskItem.replaceChild(editInput, taskTextSpan);

    editButton.textContent = "Save";

    taskMessage.textContent = "";

    editInput.focus();
}

function saveTaskEdit(taskItem) {
    const editInput = taskItem.querySelector(".edit-input");
    const editButton = taskItem.querySelector(".edit-btn");

    if (!editInput || !editButton) {
        return;
    }

    const cleanText = editInput.value.trim();

    if (cleanText === "") {
        taskMessage.textContent = "Task cannot be empty";
        return;
    }

    const taskTextSpan = document.createElement("span");

    taskTextSpan.classList.add("task-text");
    taskTextSpan.textContent = cleanText;

    taskItem.replaceChild(taskTextSpan, editInput);

    editButton.textContent = "Edit";
    taskMessage.textContent = "";
}

function removeTask(taskItem) {
    taskItem.remove();
    updateTaskCounts();
}

function updateTaskCounts() {
    const taskItems = taskList.querySelectorAll(".task-item");

    let pending = 0;
    let completed = 0;

    taskItems.forEach(function (taskItem) {
        if (taskItem.dataset.state === "completed") {
            completed += 1;
        }

        if (taskItem.dataset.state === "pending") {
            pending += 1;
        }
    });

    totalCount.textContent = taskItems.length;
    pendingCount.textContent = pending;
    completedCount.textContent = completed;
}

function handleTaskListClick(event) {
    const clickedElement = event.target;

    if (
        !clickedElement.matches(".complete-btn") &&
        !clickedElement.matches(".edit-btn") &&
        !clickedElement.matches(".remove-btn")
    ) {
        return;
    }

    const taskItem = clickedElement.closest(".task-item");

    if (!taskItem) {
        return;
    }

    if (clickedElement.matches(".complete-btn")) {
        toggleTaskComplete(taskItem);
    }

    if (clickedElement.matches(".edit-btn")) {
        if (clickedElement.textContent === "Edit") {
            beginTaskEdit(taskItem);
        } else if (clickedElement.textContent === "Save") {
            saveTaskEdit(taskItem);
        }
    }

    if (clickedElement.matches(".remove-btn")) {
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

    sampleTasks.forEach(function (taskText) {
        taskCounter += 1;

        const taskId = `task-${taskCounter}`;
        const taskItem = createTaskElement(taskText, taskId);

        fragment.appendChild(taskItem);
    });

    taskList.appendChild(fragment);

    taskMessage.textContent = "";

    updateTaskCounts();
}

addTaskBtn.addEventListener("click", function () {
    addTask(taskInput.value);
});

loadSamplesBtn.addEventListener("click", loadSampleTasks);

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask(taskInput.value);
    }
});

taskList.addEventListener("click", handleTaskListClick);

updateTaskCounts();

window.createTaskElement = createTaskElement;
window.addTask = addTask;
window.toggleTaskComplete = toggleTaskComplete;
window.beginTaskEdit = beginTaskEdit;
window.saveTaskEdit = saveTaskEdit;
window.removeTask = removeTask;
window.updateTaskCounts = updateTaskCounts;
window.handleTaskListClick = handleTaskListClick;
window.loadSampleTasks = loadSampleTasks;