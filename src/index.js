import "./styles.css";
import * as ProjectModule from "./project.js";
import * as TaskModule from "./task.js";

let currentProject = ProjectModule.projects[0];

//main content
const projectsDiv = document.querySelector(".projects");
const addTaskBtn = document.querySelector("#addTaskBtn");
const deleteProjBtn = document.querySelector("#deleteProjBtn");
const addProjectBtn = document.querySelector("#addProjectBtn");
const mainDivTitle = document.querySelector("#main-projectName");
const tasksList = document.querySelector(".tasksList");

//project modal
const addProjModal = document.querySelector("#addProjModal");
const closeProjModalSpan = document.querySelector(".closeProjModal");
const cancelProjBtn = document.querySelector("#cancelProj");
const submitProjBtn = document.querySelector("#submitProj");

//project modal field
const projTitle = document.querySelector("#projTitle");

//task modal
const addTaskModal = document.querySelector("#addTaskModal");
const closeTaskModalSpan = document.querySelector(".closeTaskModal");
const cancelTaskBtn = document.querySelector("#cancelTask");
const submitTaskBtn = document.querySelector("#submitTask");

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

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = function () {
            //TODO: reuse task modal to edit fields
            console.log("task edit btn clicked");
        }

        //TODO: add functionality to delete task
        //TODO: add functionality to check off task

        div.append(taskPrioColourIndicator);
        div.append(taskTitle);
        div.append(taskDueDate);
        div.append(editBtn);
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
            ProjectModule.editProject(projs[p].id, "temp title");//TODO: display modal to edit title here
            displayProjects();
            displayMainContent(currentProject);
        }
        newProjDiv.append(newProjBtn);
        if (projs[p].id != "project0") newProjDiv.append(editProjBtn);
        projectsDiv.append(newProjDiv);
    }
}

//TODO: fix modal styling
//project related functions
function clearProjectModalFields() {
    projTitle.value = "";
}

addProjectBtn.onclick = function () {
    addProjModal.style.display = "block";
}

closeProjModalSpan.onclick = function () {
    clearProjectModalFields();
    addProjModal.style.display = "none";
}

cancelProjBtn.onclick = function () {
    clearProjectModalFields();
    addProjModal.style.display = "none";
}

submitProjBtn.onclick = function () {
    currentProject = ProjectModule.addProject(projTitle.value);
    clearProjectModalFields();
    addProjModal.style.display = "none";
    displayProjects();
    displayMainContent(currentProject);
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

submitTaskBtn.onclick = function () {
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