const initialState = {
  registrations: []
}

const participantsPageReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'UPDATE_REGISTRATIONS':
    return {
      ...state,
      registrations: action.payload
    }
  default:
  }
  return state
}

export default participantsPageReducer