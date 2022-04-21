// ACTIONS -

export const LoginStart = (userCredentials) => ({
  // type & payload
  type: "LOGIN_START",
});

//  After starting we're not gonna return anything,
//   we're gonna just wait for successful or failure process

export const LoginSuccess = (user = {
  type: "LOGIN_SUCCESS",
  payload: user, // to update our user
});

export const LoginFailure = () => ({
  type: "LOGIN_FAILURE",
  // we're gonna take user bec this is just an error
});

// We have ACTIONS here, but how will we dispatch them & update our state?
// to do that we're gonna use Reducer

export const Logout = () => ({
  type: "LOGOUT",
});

// updating the store

export const UpdateStart = (userCredentials) => ({
  // type & payload
  type: "UPDATE_START",
});

//  After starting we're not gonna return anything,
//   we're gonna just wait for successful or failure process

export const UpdateSuccess = (user = {
  type: "UPDATE_SUCCESS",
  payload: user, // when its successful we're gonna pass this user as payload to update our user
});

export const UpdateFailure = () => ({
  type: "UPDATE_FAILURE",
  // we're gonna take user bec this is just an error
});
