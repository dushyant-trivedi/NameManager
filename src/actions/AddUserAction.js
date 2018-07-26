

export function addUser(user) {
    
    return (dispatch) => {
        dispatch({type: 'ADD_USER', user});
        

    }
}

export function editUser(usersList) {
    return (dispatch) => {
        dispatch({type: 'EDIT_USER', usersList});
    }
}

export function deleteUser(usersList) {
    return (dispatch) => {
        dispatch({type: 'DELETE_USER', usersList});
        

    }
}