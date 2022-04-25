import { UserAuthType } from './types/user'
import { Views, ViewType, ViewActionType } from './types/view'

const views: Views = {
    '/': {
        name: 'index',
        path: '/',
        templateName: 'index',
        type: ViewType.unic,
        allowedAuthTypes: [ UserAuthType.authed ],
        ifAuthTypeNotIncludes: {
            action: ViewActionType.redirect,
            url: '/login'
        }
    },
    '/login': {
        name: 'login',
        path: '/',
        templateName: 'login',
        type: ViewType.unic,
        allowedAuthTypes: [ UserAuthType.guest ],
        ifAuthTypeNotIncludes: {
            action: ViewActionType.redirect,
            url: '/'
        }
    },
    '/register': {
        name: 'register',
        path: '/',
        templateName: 'register',
        type: ViewType.unic,
        allowedAuthTypes: [ UserAuthType.guest ],
        ifAuthTypeNotIncludes: {
            action: ViewActionType.redirect,
            url: '/'
        }
    },
}

export default views