const writeLog = require('../../util/writeLog')
const formidable = require('formidable')
const { dirname } = require('path');
const appDir = dirname(require.main.filename)

const Post = require('../models/user/post.model')
const postView = require('../views/post.view')

class PostController {
    //[GET] /post
    index(req, res) {
        Post.find({})
            .populate('userId', 'username')
            .then(posts => postView.index(res, posts))
            .catch((err) => {
                writeLog(err.message, 'Post')
                postView.error(res ,1)
            })
    }

    //[GET] /post/:id
    detail(req, res) {
        let _id = req.params.id
        if (_id) {
            Post.findOne({_id})
                .populate('userId', 'username')
                .then(post => postView.detail(res, post))
                .catch((err) => {
                    writeLog(err.message, 'Post')
                    postView.error(res, 2)
                })
        }
    }

    //[POST] /post/create
    create(req, res) {
        let thumnail = null
        let title = null
        req.body?.blocks?.forEach(block => {
            if (block.type === 'image' && !thumnail)
                thumnail = block?.data?.file?.url
            else if (block.type === 'header' && !title)
                title = block?.data?.text
        })

        let formPost = {
            userId: req.body.userId ? req.body.userId : null,
            time: Date.now(),
            version: req.body.version ? req.body.version : null,
            blocks: req.body.blocks ? req.body.blocks : null,
            thumnail,
            title
        }

        const post = new Post(formPost)
        post.save()
            .then(() => postView.create(res))
            .catch((err) => {
                writeLog(err.message, 'Post')
                postView.error(res, 1)
            })
    }

    //[POST] /post/upload
    upload(req, res) {
        const form = formidable({
            multiples: true,
            uploadDir: appDir + '/public/imgs/post',
            keepExtensions: true
        })
    
        form.parse(req, (err, fields, files) => {
            if (err) {
                writeLog(err.message, 'Post')
                postView.error(res, 7)
            }
            else
                postView.upload(res, files)
        })
    }

    //[PUT] /post/edit
    edit(req, res) {
        const _id = req.body.id

        if (_id) {
            let thumnail = null
            let title = null
            req.body?.blocks?.forEach(block => {
                if (block.type === 'image' && !thumnail)
                    thumnail = block?.data?.file?.url
                else if (block.type === 'header' && !title)
                    title = block?.data?.text
            })

            let formPost = {
                userId: req.body.userId ? req.body.userId : null,
                time: Date.now(),
                version: req.body.version ? req.body.version : null,
                blocks: req.body.blocks ? req.body.blocks : null,
                thumnail,
                title
            }
    
            Post.findOneAndReplace({_id}, formPost)
                .then(() => postView.edit(res))
                .catch((err) => {
                    writeLog(err.message, 'Post')
                    postView.error(res, 4)
                })
        }
    }

    //[DELETE] /post/delete/:id
    destroy(req, res) {
        const _id = req.params.id
        if (_id) {
            Post.deleteOne({_id})
                .then(() => postView.destroy(res))
                .catch((err) => {
                    writeLog(err.message, 'Post')
                    postView.error(res, 5)
                })
        }
    }
}

module.exports = new PostController