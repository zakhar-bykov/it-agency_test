import fs from 'fs'
import { Request as Req, Response as Res } from 'express'

export const lib = (req: Req, res: Res): any => {
    const host: string = req.get('host') ?? 'host'
    const referer: string = req.get('referer') ?? 'referer'

    if (!(referer).includes(host))
        return res.sendStatus(403)

    const fileName = req.params.file_name

    let filePath: string = process.env.PWD + '/views/lib/' + fileName.split('.').pop() + '/' + fileName
    fs.existsSync(filePath) ? res.sendFile(filePath) : res.sendStatus(404)
}

export const src = (req: Req, res: Res): any => {
    const fileName = req.params.file_name

    let filePath: string = process.env.PWD + '/views/src/' + fileName.split('.').pop() + '/' + fileName
    fs.existsSync(filePath) ? res.sendFile(filePath) : res.sendStatus(404)
}