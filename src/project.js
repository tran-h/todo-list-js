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

let projects = JSON.parse(localStorage.getItem("projectsKey")) || [defaultProject];

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
    localStorage.setItem("projectsKey", JSON.stringify(projects));
    return project;
}

function removeProject(projId) {
    if (projId != "project0") {
        const projectIndex = getProjectIndex(projId);
        projects.splice(projectIndex, 1);
    }
    else alert("Default project cannot be deleted!");
    localStorage.setItem("projectsKey", JSON.stringify(projects));
}

function editProject(projId, title) {
    if (title == "") {
        alert("Please enter a project name");
        return false;
    }
    else {
        const project = getProject(projId);
        project.title = title;
        localStorage.setItem("projectsKey", JSON.stringify(projects));
        return true;
    }
}

function getProjectIndex(projId) {
    return projects.findIndex(function (project) {
        return project.id === projId;
    });
}

export { format, add, defaultProject, projects, getProject, addProject, removeProject, editProject, getProjectIndex }