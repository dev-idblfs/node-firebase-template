const mongooose = require('mongoose');

var path = 'mongodb://127.0.0.1:27017/interview';

var options = { useNewUrlParser: true, useUnifiedTopology: true }

var Schema = mongooose.Schema;

var schema = Schema({
    name: String,
    email: String,
    pwd: String,
    loginCount: Number,
    createAt: Date,
    updatedAt: Date
}, { collection: 'userInfo' });


var UserInfo = mongooose.model('UserInfo', schema);


// fetch methiod

const fetch = (params) => {
    return new Promise(async (resolve, reject) => {
        let filter = params;

        //  we can set  midddle waRE  AND DDATA


        connectResult = await connectX(path, options)
        if (!connectResult) {
            console.log('dB ', connectResult);
            return reject({ status: 500, body: connectResult })
        }


        UserInfo.find(filter).then((result) => {
            // console.log('fetch', result);
            resolve({ status: 200, data: result })
        }).catch((err) => {
            console.log('mdoal errr', err);
            reject({ status: 500, body: err })
        })
    })

}



// inset method

const insert = (params) => {
    return new Promise(async (resolve, reject) => {

        let data = params;

        //  we can set  midddle waRE  AND DDATA


        connectResult = await connectX(path, options)
        if (!connectResult) {
            console.log('dB ', connectResult);
            return reject({ status: 500, body: connectResult })
        }


        UserInfo.insertMany(data).then((result) => {
            console.log('inserted', result);
            resolve({ status: 200, massege: result })
        }).catch((err) => {
            console.log('mdoal errr', err);
            reject({ status: 500, body: err })
        });
    })

}


// update method

const update = (where, params) => {
    return new Promise(async (resolve, reject) => {
        let data = params;

        //  we can set  midddle waRE  AND DDATA


        connectResult = await connectX(path, options)
        if (!connectResult) {
            console.log('dB ', connectResult);
            return reject({ status: 500, body: connectResult })
        }


        UserInfo.updateOne(where, data).then((result) => {
            console.log('updateed', result);
            resolve({ status: 200, massege: result })
        }).catch((err) => {
            console.log('mdoal errr', err);
            reject({ status: 500, body: err })
        });
    })

}

const connectX = (path, options) => {
    return new Promise((resolve, reject) => {
        mongooose.connect(path, options).then((result) => {
            resolve(true);
        }).catch((err) => {
            reject(false);
        });
    })
}


module.exports = {
    fetch: fetch,
    insert: insert,
    update: update,
}