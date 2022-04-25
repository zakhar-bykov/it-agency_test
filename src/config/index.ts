import 'dotenv/config'

export const config = {
    app: {
        env: process.env.NODE_ENV || 'development',
    },
    server: {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || '3000'
    },
    mongo: {
        url: process.env.MONGO_URI || 'mongodb://localhost:27017/it-agency_test'
    },
    keys: {
        jwt_public: process.env.JWT_PUBLIC_KEY || 'g[K&C%q8D9{P<xVc',
        jwt_expire_time: process.env.JWT_EXPIRE_TIME || '604800',
        session: process.env.SESSION_KEY || 'C$E)Cj#UCR=t>F4X',
    },
    views: {
        ifUserNotAuthed: {
            action: 'redirect',
            url: '/login'
        },
        ifUserAuthed: {
            action: 'redirect',
            url: '/'
        },
        onCake: {
            action: 'redirect',
            url: '/login'
        }
    }
}

export default config