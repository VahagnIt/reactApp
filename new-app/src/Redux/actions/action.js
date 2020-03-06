import {CURRENT_PROJECT,GET_DATA,ADD_PROJECT, EDIT_PROJECT, DELETE_PROJECT, SAVE_PROJECT, CHANGE_VALUE, FORM_SHOW} from './actionType';

export function getData(data) {
    return{
        type: GET_DATA,
        value: data
    }
}

export function addProject(projects) {
    return{
        type: ADD_PROJECT,
        value:projects
    }
}

export function currentProject(projects) {
    return{
        type: CURRENT_PROJECT,
        value:projects
    }
}

export function editProject(projectId) {
    return{
        type: EDIT_PROJECT,
        value: projectId
    }
}

export function deleteProject(projects) {
    return{
        type: DELETE_PROJECT,
        value: projects,

    }
}

export function changeValue(input,type) {
    return{
        type: CHANGE_VALUE,
        value: input,
        index: type
    }
}

export function saveProject(projects) {

    return{
        type: SAVE_PROJECT,
        value: projects,
    }
}

export function formShow() {
    return{
        type: FORM_SHOW,
    }
}