const mongoose = require('mongoose')
const Pusher = require("pusher");
const pusher = new Pusher({
    appId: process.env.appId,
    key: process.env.key,
    secret: process.env.secret,
    cluster: process.env.cluster,
    useTLS: process.env.useTLS
});

mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("db connect")
}).catch((err) => {
    console.log(err)
})
const db = mongoose.connection
db.once('open', () => {
    console.log('db coonected again')

    const msgCollection = db.collection('postdatas');
    const changeStream = msgCollection.watch()
    changeStream.on('change', (change) => {
        // console.log(change)
        if (change.operationType === 'update') {
            const msgdetail = change.updateDescription;
            pusher.trigger('messages', 'updated', {
                msg: msgdetail.updatedFields
            })

        } if (change.operationType === 'insert') {
            const msgdetail = change.fullDocument;
            pusher.trigger('username', 'posted', {
                user: msgdetail.name
            })
        }
        else {
            console.log('error trigger')
        }
    })

    const userCollection = db.collection('users');
    const changeuserStream = userCollection.watch()
    changeuserStream.on('change', (change) => {
        console.log(change.operationType)
        if (change.operationType === 'update') {
            const msgdetail = change.updateDescription;
            pusher.trigger('usermessages', 'userupdated', {
                msg: msgdetail.updatedFields
            })

        } if (change.operationType === 'insert') {
            const msgdetail = change.fullDocument;
            pusher.trigger('usernames', 'userposted', {
                user: msgdetail.name
            })
        }
        else {
            console.log('error trigger')
        }
    })

})