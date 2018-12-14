const updateRegistrations = (registrations) => {
  return {
    type: 'UPDATE_REGISTRATIONS',
    payload: registrations
  }
}

export default {
  updateRegistrations
}