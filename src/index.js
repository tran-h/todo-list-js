import "./styles.css";
import { format, add } from "date-fns";

class Task {
    constructor(title, desc, dueDate, prio) {
        this.title = title;
        this.desc = desc;
        this.dueDate = format(add(dueDate, {days: 1}), 'E MMM dd, yyyy'); //add a day because date-fns returns previous day
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
    new Task("Task 1", "This is an exmaple task", format(new Date(), 'E MMM dd, yyyy'), 1),
    new Task("Task 2", "This is an exmaple task", format(new Date(), 'E MMM dd, yyyy'), 2),
    new Task("Task 3", "This is an exmaple task", format(new Date(), 'E MMM dd, yyyy'), 3)
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