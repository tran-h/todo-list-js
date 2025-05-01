import "./styles.css";
import { format, add } from "date-fns";

class Task {
    constructor(title, desc, dueDate, prio) {
        this.title = title;
        this.desc = desc;
        this.dueDate = format(add(dueDate, { days: 1 }), 'E MMM dd, yyyy'); //add a day because date-fns returns previous day
        this.prio = prio;
    }
}

class Project {
    constructor(title, tasks) {
        this.title = title;
        this.tasks = tasks;
    }
}

const defaultProject = new Project("Default", [
    new Task("Task 1", "This is an example task", format(new Date(), 'E MMM dd, yyyy'), 1),
    new Task("Task 2", "This is an example task", format(new Date(), 'E MMM dd, yyyy'), 2),
    new Task("Task 3", "This is an example task", format(new Date(), 'E MMM dd, yyyy'), 3)
]);

const projects = [defaultProject];
let currentProject = defaultProject;

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

    for (let i in project.tasks) {
        const div = document.createElement("div");
        div.classList.add("task");
        const taskTitle = document.createElement("p");
        const taskDesc = document.createElement("p");
        const taskDueDate = document.createElement("p");
        const taskPrioColourIndicator = document.createElement("div");
        taskTitle.textContent = project.tasks[i].title;
        taskDesc.textContent = project.tasks[i].desc;
        taskDueDate.textContent = `Due Date: ${project.tasks[i].dueDate}`;
        taskPrioColourIndicator.style.width = "0.5rem"

        switch (project.tasks[i].prio) {
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

        div.onclick = function () {
            div.contains(taskDesc) ? taskDesc.remove() : div.append(taskDesc);
        };

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = function () {
            //TODO: reuse task modal to edit fields
            console.log("task edit btn clicked");
        }

        div.append(taskPrioColourIndicator);
        div.append(taskTitle);
        div.append(taskDueDate);
        div.append(editBtn);
        tasksList.append(div);
    }
}

function displayProjects() {
    projectsDiv.innerHTML = "";
    for (let p in projects) {
        const newProj = document.createElement("button");
        newProj.id = projects[p].title;
        newProj.textContent = projects[p].title;
        newProj.classList.add("project");
        newProj.addEventListener("click", function () {
            displayMainContent(projects[p]);
            currentProject = projects[p];
        });
        projectsDiv.append(newProj);
    }
}

displayProjects();
displayMainContent(defaultProject);