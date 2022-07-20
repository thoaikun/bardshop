const Product = require('../models/product/ProductModel')
const Type = require('../models/product/TypeModel')
const Brand = require('../models/product/BrandModel')
const MoblieTech = require('../models/product/MoblieTechModel')
const LaptopTech = require('../models/product/LaptopTechModel')
const productView = require('../views/ProductView')

class ProductController {
    //[GET] /product
    index(req, res) {
        Product .find()
                .populate('type brand tech')
            .then(products => productView.index(res, products))
            .catch((err) => console.log(err))
    }

    //[GET] /product/:id
    detail(req, res) {
        let _id = req.params.id
        Product.find({_id}).populate('type brand tech')
            .then(product => productView.detail(res, product))
            .catch(() => productView.error(res, 2))
    }

    //[POST] /product/create
    create(req, res) {
        if (req.product && req.tech && req.type && req.brand) {
            Brand.findOne({name: req.brand})
                .then(brand => {    
                    if (!brand) {
                        let newBrand = new Brand({name: req.brand})
                        newBrand.save()
                            .then(item => req.product.brand = item._id)
                            .catch(() => productView.error(res, 3))
                    }
                    else 
                        req.product.brand = brand._id
                    return Type.findOne({name: req.type})
                })
                .then(type => {
                    req.product.type = type._id
                    if (req.type === 'smartphone' || req.type === 'tablet')
                        return new MoblieTech(req.tech).save()
                    else if (req.type === 'laptop')
                        return new LaptopTech(req.tech).save()
                })
                .then(tech => {
                    if (req.type === 'smartphone' || req.type === 'tablet') {
                        req.product.tech = tech._id
                        req.product.techModel = 'MoblieTech'
                    }
                    else if (req.type === 'laptop') {
                        req.product.tech = tech._id
                        req.product.techModel = 'LaptopTech'
                    }
                    return new Product(req.product).save()
                })
                .then(() => {
                    productView.create(res)
                })
                .catch(err => {
                    if (req.type === 'smartphone' || req.type === 'tablet')
                        MoblieTech.deleteOne({_id: req.product.tech})
                            .then(() => productView.error(res, 3))
                            .catch(() => {})
                    else if (req.type === 'laptop')
                        LaptopTech.deleteOne({_id: req.product.tech})
                            .then(() => productView.error(res, 3))
                            .catch(() => {})
                })
        }
    }

    //[PUT] /product/edit
    edit(req, res) {
        if (req.product && req.tech && req.type && req.brand) {
            let _id = req.body.id
            Brand.findOne({name: req.brand})
                .then(brand => {
                    if (!brand) {
                        let newBrand = new Brand({name: req.brand})
                        newBrand.save()
                            .then(item => req.product.brand = item._id)
                            .catch(() => productView.error(res, 3))
                    }
                    else 
                        req.product.brand = brand._id
                    return Type.findOne({name: req.type})
                })
                .then(type => {
                    if (req.type === 'smartphone' || req.type === 'tablet') {
                        req.product.tech = tech._id
                        req.product.techModel = 'MoblieTech'
                    }
                    else if (req.type === 'laptop') {
                        req.product.tech = tech._id
                        req.product.techModel = 'LaptopTech'
                    }
                    return Product.findOne({_id})
                })
                .then(oldProduct => {
                    if (req.type === 'smartphone' || req.type === 'tablet')
                        return MoblieTech.findOneAndUpdate({_id: oldProduct.tech}, req.tech)
                    else if (req.type === 'laptop')
                        return LaptopTech.findOneAndUpdate({_id: oldProduct.tech}, req.tech)
                })
                .then(() => Product.updateOne({_id}, req.product))
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
        Product.findOne({_id}).populate('type')
            .then(product => {
                if (product.type.name === 'smartphone' || product.type.name === 'tablet')
                    MoblieTech.deleteOne({_id: product.tech})
                else if (product.type.name === 'laptop')
                    LaptopTech.deleteOne({_id: product.tech})
            })
            .then(() => Product.deleteOne({_id}))
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