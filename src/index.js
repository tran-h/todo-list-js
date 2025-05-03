import "./styles.css";
import * as ProjectModule from "./project.js";
import * as TaskModule from "./task.js";

let currentProject = ProjectModule.projects[0];
let currentEditId;

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

//task modal
const addTaskModal = document.querySelector("#addTaskModal");
const closeTaskModalSpan = document.querySelector(".closeTaskModal");
const cancelTaskBtn = document.querySelector("#cancelTask");
const addTaskModalBtn = document.querySelector("#addTaskModalBtn");

//task modal fields
const taskTitle = document.querySelector("#taskTitle");
const taskDesc = document.querySelector("#taskDesc");
const taskDueDate = document.querySelector("#taskDueDate");
const taskPrio = document.querySelector("#taskPrio");

function displayMainContent(project) {
    mainDivTitle.textContent = project.title;
    tasksList.textContent = "";

    for (let taskIndex in project.tasks) {
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

        //TODO: fix overlapping edit button and position of task description
        div.onclick = function () {
            div.contains(taskDesc) ? taskDesc.remove() : div.append(taskDesc);
        };

        const editTaskBtn = document.createElement("button");
        editTaskBtn.textContent = "Edit";
        editTaskBtn.onclick = function () {
            //TODO: add modal to edit task fields
            console.log("task edit btn clicked");
        }

        //TODO: add functionality to delete task
        //TODO: add functionality to check off task

        div.append(taskPrioColourIndicator);
        div.append(taskTitle);
        div.append(taskDueDate);
        div.append(editTaskBtn);
        tasksList.append(div);
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
            currentEditId = projs[p].id;
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
    if (ProjectModule.editProject(currentEditId, projTitleToEdit.value)) {
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
    taskTitle.value = "";
    taskDesc.value = "";
    taskDueDate.value = "";
    taskPrio.selectedIndex = 0;
}

addTaskBtn.onclick = function () {
    addTaskModal.style.display = "block";
}

closeTaskModalSpan.onclick = function () {
    clearTaskModalFields();
    addTaskModal.style.display = "none";
}

cancelTaskBtn.onclick = function () {
    clearTaskModalFields();
    addTaskModal.style.display = "none";
}

addTaskModalBtn.onclick = function () {
    if (taskTitle.value == "" || taskDueDate.value == "" || taskPrio.selectedIndex == 0) {
        alert("Please fill in all the fields");
        return;
    }
    TaskModule.addTask(currentProject.id, taskTitle.value, taskDesc.value, taskDueDate.value, taskPrio.selectedIndex);
    displayMainContent(currentProject);
    clearTaskModalFields();
    addTaskModal.style.display = "none";
}

displayProjects();
displayMainContent(currentProject);