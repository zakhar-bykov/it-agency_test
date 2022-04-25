type Event = 'info' | 'warning' | 'error'
type Emitter = 'app' | 'server' | 'database'

type PartType = 'string' | 'number' | 'path' | 'date' | 'httpm'

const BC = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",

    FgBlack: "\x1b[30m",
    FgRed: "\x1b[31m",
    FgGreen: "\x1b[32m",
    FgYellow: "\x1b[33m",
    FgBlue: "\x1b[34m",
    FgMagenta: "\x1b[35m",
    FgCyan: "\x1b[36m",
    FgWhite: "\x1b[37m",

    BgBlack: "\x1b[40m",
    BgRed: "\x1b[41m",
    BgGreen: "\x1b[42m",
    BgYellow: "\x1b[43m",
    BgBlue: "\x1b[44m",
    BgMagenta: "\x1b[45m",
    BgCyan: "\x1b[46m",
    BgWhite: "\x1b[47m"
}

const C = {
    info: BC.BgCyan,
    warning: BC.BgYellow + BC.FgBlack,
    error: BC.BgRed,
    app: '',
    server: '',
    database: '',
    string: BC.FgWhite,
    number: BC.FgYellow,
    path: BC.FgGreen,
    date: BC.FgCyan,
    httpm: BC.FgMagenta,
}

interface MessagePart {
    text: string | number,
    type: PartType,
}

function az(n: number): string {
    return (n < 10 ? '0' + n : n.toString())
}

function azz(n: number): string {
    let zn: string = n.toString()

    if (n < 100) zn = '0' + n
    if (n < 10) zn = '0' + n

    return zn
}

const log = (event: Event, emitter: Emitter, message: string): void => {
    const dn: Date = new Date()
    const date: string = dn.getFullYear() + '/' + az(dn.getMonth()) + '/' + az(dn.getDate()) + '-' + az(dn.getHours()) + ':' + az(dn.getMinutes()) + ':' + az(dn.getSeconds()) + ':' + azz(dn.getMilliseconds())

    let log: string = ''
    log += BC.BgBlack + C.date + date + BC.Reset + ' '
    log += C[event] + event.slice(0, 4).toUpperCase() + BC.Reset + ' ' + C[emitter] + emitter.toUpperCase() + ':' + BC.Reset + ' '


    const regexHTTPMethod = /(POST|GET|PUT|DELETE|UPDATE|HEAD|CONNECT|OPTIONS|TRACE|PATCH)/
    const regexURL = /((http|https)(:\/\/))?([\w\d\-\.]+(\:\d+)?)?([\/]+[\w\d]*)+/
    const regexDigits = /\d/
    const regexWords = /(([a-zA-Z]+)([\ |\,|\.|\:]*))/

    message.split(' ').forEach(part => {
        if (regexHTTPMethod.test(part))
            log += C.path
        else if (regexHTTPMethod.test(part))
            log += C.httpm
        else if (regexDigits.test(part))
            log += C.number
        else
            log += C.string

        log += part + ' ' + BC.Reset
    })

    console.log(log)
}

export default log