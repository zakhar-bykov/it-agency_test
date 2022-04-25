import { AllowedUserAuthTypes } from './user'

export interface Views {
    [key: string]: ViewInterface
}

export enum ViewType {
    unic = 'unic',
    template = 'template'
}

export enum ViewActionType {
    redirect = 'redirect',
    render = 'render'
}

export type ViewActionRedirect = {
    action: ViewActionType.redirect
    url: string
}

export type ViewActionRender = {
    action: ViewActionType.render
    template: string
}

export type ViewAction = ViewActionRedirect | ViewActionRender

export interface ViewInterface {
    name: string
    path: string
    templateName: string
    type: ViewType
    allowedAuthTypes: AllowedUserAuthTypes
    ifAuthTypeNotIncludes: ViewAction
}

export class View {
    private data: ViewInterface

    constructor(view: ViewInterface) {
        this.data = view
    }

    public getAllowedAuthTypes(): AllowedUserAuthTypes {
        return this.data.allowedAuthTypes
    }

    public getAuthTypeNotIncludesAction(): ViewAction {
        return this.data.ifAuthTypeNotIncludes
    }
}