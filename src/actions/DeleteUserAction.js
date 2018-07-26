

export function deleteUser(usersList) {
    return (dispatch) => {
        dispatch({type: 'DELETE_USER', usersList});
        

    }
}