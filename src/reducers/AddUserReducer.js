import {Alert} from 'react-native';
const initialState={users: []};
export default AddUserReducer = (state=initialState,action) => {
    switch(action.type) {
        case 'ADD_USER':
            
            let newUsers = state.users.concat(action.user);
            Alert.alert("User added");            
            return {
                ...state,
                users : newUsers
            }
        case 'DELETE_USER':
            //Alert.alert("User Deleted");
            return {
                ...state,
                users: action.usersList
            }
        case 'EDIT_USER':
            return {
                ...state,
                users: action.usersList
            }
            
        default:
        return state;
    }
}