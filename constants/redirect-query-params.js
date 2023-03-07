// Only for middleware redirections & nexAuth error
const REDIRECT_QUERY_PARAMS = {
    KEY_AUTH: 'mustBeAuth',
    VALUE_CREATE_SPOT: 'create-spot',
    VALUE_ACCESS_PROFILE: 'access-your-profile',

    KEY_RETURN_TO: 'returnTo',

    VALUE_ALREADY_LOGGED_IN: 'false',

    KEY_AUTH_ERROR: 'error',
    VALUE_AUTH_ERROR: 'OAuthAccountNotLinked',
}

export default REDIRECT_QUERY_PARAMS
