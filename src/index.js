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