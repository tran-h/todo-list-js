import { format, add } from "date-fns";

function Project(title) {
    const id = Date.now().toString();
    let tasks = [];
    return { id, title, tasks };
}

const defaultProject = {
    id: "project0",
    title: "Default",
    tasks: [
        {
            id: "defaultTask1",
            projId: "project0",
            title: "Low Priority Task",
            desc: "This is an example of a low priority task",
            dueDate: format(new Date(), 'E MMM dd, yyyy'),
            prio: 1,
            completed: false
        },
        {
            id: "defaultTask2",
            projId: "project0",
            title: "Medium Priority Task",
            desc: "This is an example of a medium priority task",
            dueDate: format(new Date(), 'E MMM dd, yyyy'),
            prio: 2,
            completed: false
        },
        {
            id: "defaultTask3",
            projId: "project0",
            title: "High Priority Task",
            desc: "This is an example of a high priority task",
            dueDate: format(new Date(), 'E MMM dd, yyyy'),
            prio: 3,
            completed: false
        },
    ]
};

let projects = [defaultProject];

function getProject(projId) {
    return projects.find(function (project) {
        return project.id === projId;
    });
}

function addProject(title) {
    let project = defaultProject;
    if (title == "") {
        alert("Please enter a project name");
    }
    else {
        project = Project(title);
        projects.push(project);
    }
    return project;
}

function removeProject(projId) {
    if (projId != "project0") {
        const projectIndex = getProjectIndex(projId);
        projects.splice(projectIndex, 1);
    }
    else alert("Default project cannot be deleted!");
}

function editProject(projId, title) {
    const project = getProject(projId);
    project.title = title;
}

function getProjectIndex(projId) {
    return projects.findIndex(function (project) {
        return project.id === projId;
    });
}

export { format, add, defaultProject, projects, getProject, addProject, removeProject, editProject, getProjectIndex }