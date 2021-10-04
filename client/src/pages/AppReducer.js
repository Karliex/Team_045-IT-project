export default (state, action) => {
    switch (action.type) {
        // if the action is delete user
        case 'REMOVE_USER':
            return {
                ...state,
                users: state.users.filter(user => {
                  return user.id !== action.payload;
                })
            }
        // if the action is add user
        case 'ADD_USER':
            return {
                ...state,
                users: [action.payload, ...state.users]
            }
        // if the action is edit user
        case 'EDIT_USER':
          const updateUser = action.payload;
    
          const updateUsers = state.users.map(user => {
              if (user.id === updateUser.id) {
                  return updateUser;
              }
              return user;
          })
          return {
              ...state,
              users: updateUsers
          }
  
    default:
        return state;
    }
}
  