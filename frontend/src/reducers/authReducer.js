const initialAuthState = {
    phone: '',  // This will store the user's phone number
  };
  
  const authReducer = (state = initialAuthState, action) => {
    switch (action.type) {
      case 'SET_PHONE':
        return {
          ...state,
          phone: action.payload,  // Update phone number in the state
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  