// Only for toast after an action completion (new login, logout...)

export const TOAST_PARAMS = {
    KEY: 'action',

    VALUE_LOGIN: 'loggedIn',
    VALUE_LOGOUT: 'loggedOut',

    VALUE_CREATED_SPOT_SUCCESS: 'createdSpotSuccess',
    VALUE_CREATED_SPOT_FAILURE: 'createdSpotFailure',

    VALUE_ADD_SPOT_AS_VISITED_SUCCESS: 'markedSpotAsVisitedSuccess',
    VALUE_REMOVE_SPOT_AS_VISITED_SUCCESS: 'removedSpotAsVisitedSuccess',

    KEY_REQUIRE: 'require',

    VALUE_MUST_LOGIN: 'auth', // when try to mark as visited but not logged in
    VALUE_MUST_NOT_BE_OWNER: 'isOwner', // when try remove from visited but is owner
}
