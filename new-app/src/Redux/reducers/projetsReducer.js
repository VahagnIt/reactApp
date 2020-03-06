const startingState = {
    count: 0,
    projects: [],
    icon: '',
    title: '',
    info: '',
    isShow: 0,
    currentProject: [],
    isFormShow: false
};

export default function rootReducers(state = startingState, action){
    switch (action.type) {
        case "GET_DATA":
            return{
                ...state,
                projects: action.value
            };

        case "CURRENT_PROJECT":
            return{
                ...state,
                currentProject: action.value
            };

        case "ADD_PROJECT":
            return{
                ...state,
                isFormShow: !state.isFormShow,
                isShow: 0,
                icon:'',
                title:'',
                info:'',
                projects: action.value
            };

        case "EDIT_PROJECT":
            return{
                ...state,
                isShow: action.value
            };

        case "DELETE_PROJECT":
            return{
                projects: action.value
            };

        case "SAVE_PROJECT":

            return{
                ...state,
                isShow: 0,
                icon:'',
                title:'',
                info:'',
                projects:action.value,
            };

        case "CHANGE_VALUE":
            let input = action.value;

            if(action.index == 'icon'){
                return{
                    ...state,
                    icon: input
                };
            }
            else if(action.index == 'title'){
                return{
                    ...state,
                    title: input
                };
            }
            else if(action.index == 'info'){
                return{
                    ...state,
                    info: input
                }
            };

        case "FORM_SHOW":
            return{
                ...state,
                isFormShow: !state.isFormShow
            };

        default:
            return state;
    }
}