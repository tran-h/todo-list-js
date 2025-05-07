import { projects, getProject, format, add } from "./project.js";

function Task(projId, title, desc, dueDate, prio) {
    const id = Date.now().toString();
    let completed = false;
    return { id, projId, title, desc, dueDate, prio, completed }
}

function getTask(projId, taskId) {
    const project = getProject(projId);
    const task = project.tasks.find(function (task) {
        return task.id === taskId;
    });
    if (task) return task;
}

function addTask(projId, title, desc, date, prio) {
    const project = getProject(projId);
    const task = Task(projId, title, desc, format(add(date, { days: 1 }), 'E MMM dd, yyyy'), prio); //add a day because date-fns returns previous day
    project.tasks.push(task);
    localStorage.setItem("projectsKey", JSON.stringify(projects));
}

function removeTask(projId, taskId) {
    const project = getProject(projId);
    const taskIndex = getTaskIndex(projId, taskId);
    project.tasks.splice(taskIndex, 1);
    localStorage.setItem("projectsKey", JSON.stringify(projects));
}

function editTask(projId, taskId, title, desc, date, prio) {
    const task = getTask(projId, taskId);
    task.title = title;
    task.desc = desc;
    task.dueDate = format(add(date, { days: 1 }), 'E MMM dd, yyyy');
    task.prio = prio;
    localStorage.setItem("projectsKey", JSON.stringify(projects));
}

function getTaskIndex(projId, taskId) {
    const project = getProject(projId);
    return project.tasks.findIndex(function (task) {
        return task.id === taskId;
    });
}

function toggleTaskCompletion(projId, taskId) {
    const project = getProject(projId);
    const taskIndex = getTaskIndex(projId, taskId);
    project.tasks[taskIndex].completed = project.tasks[taskIndex].completed == true ? false : true;
    localStorage.setItem("projectsKey", JSON.stringify(projects));
}

function getTaskStatus(projId, taskId) {
    const project = getProject(projId);
    const taskIndex = getTaskIndex(projId, taskId);
    return project.tasks[taskIndex].completed;
}

export { format, getTask, addTask, removeTask, editTask, getTaskIndex, toggleTaskCompletion, getTaskStatus }