import "./styles.css";
import * as ProjectModule from "./project.js";
import * as TaskModule from "./task.js";

let currentProject = ProjectModule.projects[0];
let currentProjEditId, currentTaskId;

//main content
const projectsDiv = document.querySelector(".projects");
const addTaskBtn = document.querySelector("#addTaskBtn");
const deleteProjBtn = document.querySelector("#deleteProjBtn");
const addProjectBtn = document.querySelector("#addProjectBtn");
const mainDivTitle = document.querySelector("#main-projectName");
const tasksList = document.querySelector(".tasksList");

//add project modal
const addProjModal = document.querySelector("#addProjModal");
const closeAddProjModalSpan = document.querySelector("#closeAddProjModal");
const cancelAddProjModalBtn = document.querySelector("#cancelAddProjModalBtn");
const submitAddProjModalBtn = document.querySelector("#submitAddProjModalBtn");

//edit project modal
const editProjModal = document.querySelector("#editProjModal");
const closeEditProjModalSpan = document.querySelector("#closeEditProjModal");
const cancelEditProjModalBtn = document.querySelector("#cancelEditProjModalBtn");
const submitEditProjModalBtn = document.querySelector("#submitEditProjModalBtn");

//project modal fields
const projTitleToAdd = document.querySelector("#projTitleToAdd");
const projTitleToEdit = document.querySelector("#projTitleToEdit");

//add task modal
const addTaskModal = document.querySelector("#addTaskModal");
const closeAddTaskModalSpan = document.querySelector("#closeAddTaskModalSpan");
const cancelAddTaskModalBtn = document.querySelector("#cancelAddTaskModalBtn");
const submitAddTaskModalBtn = document.querySelector("#submitAddTaskModalBtn");

//edit task modal
const editTaskModal = document.querySelector("#editTaskModal");
const closeEditTaskModalSpan = document.querySelector("#closeEditTaskModalSpan");
const cancelEditTaskModalBtn = document.querySelector("#cancelEditTaskModalBtn");
const submitEditTaskModalBtn = document.querySelector("#submitEditTaskModalBtn");

//task modal fields
const taskTitleToAdd = document.querySelector("#taskTitleToAdd");
const taskDescToAdd = document.querySelector("#taskDescToAdd");
const taskDueDateToAdd = document.querySelector("#taskDueDateToAdd");
const taskPrioToAdd = document.querySelector("#taskPrioToAdd");
const taskTitleToEdit = document.querySelector("#taskTitleToEdit");
const taskDescToEdit = document.querySelector("#taskDescToEdit");
const taskDueDateToEdit = document.querySelector("#taskDueDateToEdit");
const taskPrioToEdit = document.querySelector("#taskPrioToEdit");

function displayMainContent(project) {
    mainDivTitle.textContent = project.title;
    tasksList.textContent = "";

    for (let taskIndex in project.tasks) {
        const taskContainer = document.createElement("div");
        taskContainer.classList.add("taskContainer");
        const taskBtnContainer = document.createElement("div");
        taskBtnContainer.classList.add("taskBtnContainer");
        const taskInfoContainer = document.createElement("div");
        taskInfoContainer.classList.add("taskInfoContainer");
        const div = document.createElement("div");
        div.classList.add("task");
        const taskTitle = document.createElement("p");
        const taskDesc = document.createElement("p");
        const taskDueDate = document.createElement("p");
        const taskPrioColourIndicator = document.createElement("div");
        taskPrioColourIndicator.style.width = "0.5rem";
        taskTitle.textContent = project.tasks[taskIndex].title;
        taskDesc.textContent = project.tasks[taskIndex].desc;
        taskDueDate.textContent = `Due Date: ${project.tasks[taskIndex].dueDate}`;

        switch (project.tasks[taskIndex].prio) {
            case 1:
                taskPrioColourIndicator.style.backgroundColor = "green";
                break;
            case 2:
                taskPrioColourIndicator.style.backgroundColor = "yellow";
                break;
            case 3:
                taskPrioColourIndicator.style.backgroundColor = "red";
                break;
            default:
                break;
        }

        //TODO: add btn to see task desc
        // taskContainer.contains(taskDesc) ? taskDesc.remove() : taskContainer.append(taskDesc);

        const editTaskBtn = document.createElement("button");
        editTaskBtn.textContent = "Edit";
        editTaskBtn.onclick = function () {
            currentTaskId = project.tasks[taskIndex].id;
            taskTitleToEdit.value = project.tasks[taskIndex].title;
            taskDescToEdit.value = project.tasks[taskIndex].desc;
            editTaskModal.style.display = "block";
        }

        const deleteTaskBtn = document.createElement("button");
        deleteTaskBtn.textContent = "Delete";
        deleteTaskBtn.onclick = function () {
            currentTaskId = project.tasks[taskIndex].id;
            TaskModule.removeTask(project.tasks[taskIndex].projId, currentTaskId);
            displayMainContent(project);
        }

        taskInfoContainer.onclick = function () {
            currentTaskId = project.tasks[taskIndex].id;
            TaskModule.toggleTaskCompletion(project.tasks[taskIndex].projId, currentTaskId);
            if (TaskModule.getTaskStatus(project.tasks[taskIndex].projId, currentTaskId)) {
                taskInfoContainer.style.textDecoration = "line-through";
                taskInfoContainer.style.opacity = 0.6;
            }
            else {
                taskInfoContainer.style.textDecoration = "none";
                taskInfoContainer.style.opacity = 1;
            }
        };

        taskContainer.append(taskPrioColourIndicator);
        taskInfoContainer.append(taskTitle);
        taskInfoContainer.append(taskDueDate);
        taskBtnContainer.append(editTaskBtn);
        taskBtnContainer.append(deleteTaskBtn);
        taskContainer.append(taskInfoContainer);
        taskContainer.append(taskBtnContainer);
        tasksList.append(taskContainer);
    }
}

function displayProjects() {
    projectsDiv.innerHTML = "";
    const projs = ProjectModule.projects;
    for (let p in projs) {
        const newProjDiv = document.createElement("div");
        newProjDiv.classList.add("projectGrid");
        const newProjBtn = document.createElement("button");
        newProjBtn.textContent = projs[p].title;
        newProjBtn.classList.add("project");
        newProjBtn.onclick = function () {
            currentProject = projs[p];
            displayMainContent(currentProject);
            displayProjects();
        }
        const editProjBtn = document.createElement("button");
        editProjBtn.classList.add("editProjBtn");
        editProjBtn.textContent = "Edit";
        editProjBtn.onclick = function () {
            currentProjEditId = projs[p].id;
            editProjModal.style.display = "block";
        }
        newProjDiv.append(newProjBtn);
        if (projs[p].id != "project0") newProjDiv.append(editProjBtn);
        projectsDiv.append(newProjDiv);
    }
}

//TODO: fix modal styling
//project related functions
function clearProjectModalFields() {
    projTitleToAdd.value = "";
    projTitleToEdit.value = "";
}

addProjectBtn.onclick = function () { addProjModal.style.display = "block"; }

closeAddProjModalSpan.onclick = function () {
    clearProjectModalFields();
    addProjModal.style.display = "none";
}

closeEditProjModalSpan.onclick = function () {
    clearProjectModalFields();
    editProjModal.style.display = "none";
}

cancelAddProjModalBtn.onclick = function () {
    clearProjectModalFields();
    addProjModal.style.display = "none";
}

cancelEditProjModalBtn.onclick = function () {
    clearProjectModalFields();
    editProjModal.style.display = "none";
}

submitAddProjModalBtn.onclick = function () {
    currentProject = ProjectModule.addProject(projTitleToAdd.value);
    clearProjectModalFields();
    addProjModal.style.display = "none";
    displayProjects();
    displayMainContent(currentProject);
}

submitEditProjModalBtn.onclick = function () {
    if (ProjectModule.editProject(currentProjEditId, projTitleToEdit.value)) {
        clearProjectModalFields();
        editProjModal.style.display = "none";
        displayProjects();
        displayMainContent(currentProject);
    }
}

deleteProjBtn.onclick = function () {
    ProjectModule.removeProject(currentProject.id);
    currentProject = ProjectModule.projects[0];
    displayProjects();
    displayMainContent(currentProject);
}

//task related functions
function clearTaskModalFields() {
    taskTitleToAdd.value = "";
    taskDescToAdd.value = "";
    taskDueDateToAdd.value = "";
    taskPrioToAdd.selectedIndex = 0;
    taskTitleToEdit.value = "";
    taskDescToEdit.value = "";
    taskDueDateToEdit.value = "";
    taskPrioToEdit.selectedIndex = 0;
}

addTaskBtn.onclick = function () { addTaskModal.style.display = "block"; }

closeAddTaskModalSpan.onclick = function () {
    clearTaskModalFields();
    addTaskModal.style.display = "none";
}

closeEditTaskModalSpan.onclick = function () {
    clearTaskModalFields();
    editTaskModal.style.display = "none";
}

cancelAddTaskModalBtn.onclick = function () {
    clearTaskModalFields();
    addTaskModal.style.display = "none";
}

cancelEditTaskModalBtn.onclick = function () {
    clearTaskModalFields();
    editTaskModal.style.display = "none";
}

submitAddTaskModalBtn.onclick = function () {
    if (taskTitleToAdd.value == ""
        || taskDescToAdd.value == ""
        || taskDueDateToAdd.value == ""
        || taskPrioToAdd.selectedIndex == 0) {
        alert("Please fill in all the fields");
        return;
    }
    TaskModule.addTask(
        currentProject.id,
        taskTitleToAdd.value,
        taskDescToAdd.value,
        taskDueDateToAdd.value,
        taskPrioToAdd.selectedIndex
    );
    clearTaskModalFields();
    addTaskModal.style.display = "none";
    displayMainContent(currentProject);
}

submitEditTaskModalBtn.onclick = function () {
    if (taskTitleToEdit.value == ""
        || taskDescToEdit.value == ""
        || taskDueDateToEdit.value == ""
        || taskPrioToEdit.selectedIndex == 0) {
        alert("Please fill in all the fields");
        return;
    }
    TaskModule.editTask(
        currentProject.id,
        currentTaskId,
        taskTitleToEdit.value,
        taskDescToEdit.value,
        taskDueDateToEdit.value,
        taskPrioToEdit.selectedIndex
    );
    clearTaskModalFields();
    editTaskModal.style.display = "none";
    displayMainContent(currentProject);
}

displayProjects();
displayMainContent(currentProject);