import { View } from '../types/view'

import views from '../express.views.tree'

class ViewService {
    constructor() {
    }

    public getView(path: string): View {
        return new View(views[path])
    }

    public isView(path: string): boolean {
        return Object.keys(views).includes(path)
    }
}

const viewService: ViewService = new ViewService()

export default viewService