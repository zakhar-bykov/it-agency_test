class AlbumService {
    _id: string
    id: number
    title: string
    url: string
    thumbnailUrl: string


    constructor() {
        this._id = ''
        this.id = 0
        this.title = ''
        this.url = ''
        this.thumbnailUrl = ''
    }
}

const albumService: AlbumService = new AlbumService()

export default albumService