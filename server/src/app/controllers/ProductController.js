const Product = require('../models/ProductModel')
const productView = require('../views/ProductView')

class ProductController {
    //[GET] /product
    index(req, res) {
        Product.find({})
            .then(products => productView.index(res, products))
            .catch(() => productView.err(res, 1))
    }

    //[GET] /product/:id
    detail(req, res) {
        let _id = req.params.id
        Product.find({_id})
            .then(product => productView.detail(res, product))
            .catch(() => productView.error(res, 2))
    }

    //[POST] /product/create
    create(req, res) {
        if (req.newProduct) {
            let newProduct = new Product(req.newProduct)
            newProduct.save()
                .then(() => productView.create(res))
                .catch(err => productView.error(res, 3))
        }
    }

    //[PUT] /product/edit
    edit(req, res) {
        if (req.body.id) {
            let _id = req.body.id
            req.newProduct.modifiedAt = Date.now()
            Product.replaceOne({_id}, req.newProduct)
                .then(() => productView.edit(res))
                .catch(() => productView.error(res, 4))
        }
    }

    //[DELETE] /product/delete/:id
    delete(req, res) {
        let _id = req.params.id
        Product.delete({_id})
            .then(() => productView.delete(res))
            .catch(() => productView.error(res, 5))
    }

    //[DELETE] /product/force/:id
    destroy(req, res) {
        let _id = req.params.id
        Product.deleteOne({_id})
            .then(() => productView.destroy(res))
            .catch(() => productView.error(res, 6))
    }

    //[PATCH] /product/restore/:id
    restore(req, res) {
        let _id = req.params.id
        Product.restore({_id})
            .then(() => productView.restore(res))
            .catch(() => productView.error(res, 7))
    }

    //[GET] /product/deletedlist
    deletedList(req, res) {
        Product.findDeleted({})
            .then(products => productView.deletedList(res, products))
            .catch(() => productView.error(res, 8))
    }
}

module.exports = new ProductController