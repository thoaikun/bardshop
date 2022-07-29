const writeLog = require('../../util/writeLog')
const formidable = require('formidable')
const { dirname } = require('path');
const appDir = dirname(require.main.filename);

const Advertise = require('../models/advertise.model')
const advertiseView = require('../views/advertise.view')

class AdvertiseController {
    //[GET] /advertise
    index(req, res) {
        Advertise.find({})
            .then(ads => advertiseView.index(res, ads))
            .catch(err => {
                writeLog(err.message, 'Advertise')
                advertiseView.error(res, 1)
            })
    }

    //[GET] /advertise/:type
    getByType(req, res) {
        let type = req.params.type
        if (type) {
            Advertise.find({type})
                .then(ads => advertiseView.getByType(res, ads))
                .catch(err => {
                    writeLog(err.message, 'Advertise')
                    advertiseView.error(res, 2)
                })
        }
    }

    //[POST] /advertise/upload
    upload(req, res) {
        const form = formidable({
            multiples: true,
            uploadDir: appDir + '/public/imgs/banner',
            keepExtensions: true
        })

        form.parse(req, (err, fields, files) => {
            if (err) {
                writeLog(err.message, 'Advertise')
                advertiseView.error(res, 3)
            }
            else {
                let imgName = ''
                if (files?.imgs?.newFilename) {
                    imgName = files.imgs.newFilename
                }

                const formAd = new Advertise({
                    name: imgName,
                    type: fields.type
                })
                formAd.save()
                    .then(() => advertiseView.upload(res))
                    .catch(err => {
                        writeLog(err.message, 'Advertise')
                        advertiseView.error(res, 3)
                    })
            }
        })
    }

    //[DELETE] /advertise/delete/:id
    delete(req, res) {
        let _id = req.params.id
        Advertise.deleteOne({_id})
            .then(() => advertiseView.delete(res))
            .catch((err) => {
                writeLog(err.message, 'Advertise')
                advertiseView.error(res, 4)
            })
    }
}

module.exports = new AdvertiseController