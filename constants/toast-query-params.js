// Only for toast after an action completion (new login, logout...)

export const TOAST_PARAMS = {
    KEY: 'action',
    VALUE_LOGIN: 'loggedIn',
    VALUE_LOGOUT: 'loggedOut',

    VALUE_CREATED_SPOT_SUCCESS: 'createdSpotSuccess',
    VALUE_CREATED_SPOT_FAILURE: 'createdSpotFailure',

    VALUE_ADD_SPOT_AS_VISITED_SUCCESS: 'markedSpotAsVisitedSuccess',
    VALUE_REMOVE_SPOT_AS_VISITED_SUCCESS: 'removedSpotAsVisitedSuccess',

    VALUE_EDITED_SPOT_SUCCESS: 'editedSpotSuccess',

    VALUE_REVIEWED_SPOT_SUCCESS: 'reviewedSpotSuccess',

    VALUE_DELETED_SPOT_SUCCESS: 'deletedSpotSuccess',

    VALUE_REVIEWED_SPOT_FAILURE: 'mustBeAuthSpotReview',

    VALUE_DELETED_USER_SUCCESS: 'deletedUserSuccess',

    VALUE_ADDED_PIC_SUCCESS: 'addedImgSuccess',
    VALUE_FEATURE_NOT_YET_AVAILABLE: 'featureNotYetAvailable',

    KEY_REQUIRE: 'require',
    VALUE_MUST_LOGIN_TO_REVIEW: 'authToReview',
    VALUE_MUST_LOGIN: 'auth', // when try to mark as visited but not logged in
    VALUE_MUST_NOT_BE_OWNER_ADD_VISIT: 'isOwnerAddVisit', // when try remove from visited but is owner
    VALUE_MUST_NOT_BE_OWNER_ADD_REVIEW: 'isOwnerAddReview', // when try review spot user owns
    VALUE_MUST_NOT_HAVE_ALREADY_REVIEWED: 'haveReviewedAddReview', // when try review a spot user already reviewed

    VALUE_RESET_PWD_EMAIL_SENT_SUCCESS: 'resetPwdEmailSentSuccess',
    VALUE_RESET_PWD_EMAIL_SENT_FAILURE: 'resetPwdEmailSentFailure',

    VALUE_EDIT_DESC_SUCCESS: 'editDescriptionSuccess',
    VALUE_EDIT_DESC_FAILURE: 'editDescriptionFailure',
}
