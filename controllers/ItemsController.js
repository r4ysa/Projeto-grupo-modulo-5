const session = require('express-session')
const Tabelaitem = require('../models/Tabelaitem ')
const Usuario = require('../models/Usuario')
const { Op } = require('sequelize')

module.exports = class ItemsController {

    static async exibirHomeDashboard(req, res) {

        let search = ''

        if (req.query.search) {
            search = req.query.search
        }

        let order = 'DESC'

        if (req.query.order === 'old') {
            order = 'ASC'
        } else {
            order = 'DESC'
        }

        const tabelaitemsData = await Tabelaitem.findAll({
            include: Usuario,
            where: {
                item: { [Op.like]: `%${search}%` },
            },
            order: [['createdAt', order]]
        })

        const tabelaitems = tabelaitemsData.map((result) => result.get({ plain: true }))

        let tabelaitemsQty = tabelaitems.length

        if (tabelaitemsQty === 0) {
            tabelaitemsQty = false
        }

        res.render('items/home', { tabelaitems, search, tabelaitemsQty })
    }

    static async crudItems(req, res) {
        const usuarioId = req.session.usuarioid; 

        const usuario = await Usuario.findOne({ //MINUSCULO E MAIUSCULO
            where: {
                id: usuarioId,
            },
            include: Tabelaitem,
            plain: true,
        })

        // check if user exists
        if (!usuario) {
            res.redirect('/login')
        }

        const tabelaitems = usuario.Tabelaitems.map((result) => result.dataValues)

        let emptyTabelaitems = false

        if (tabelaitems.length === 0) {
            emptyTabelaitems = true
        }

        res.render('items/crud', { tabelaitems, emptyTabelaitems })
    }

    static criarItem(req, res) {
        res.render('items/create')//NOME DA PASTA
    }

    static async postarItem(req, res) {
        const tabelaitem = {
            item: req.body.item,
            preco: req.body.preco,
            UsuarioId: req.session.usuarioid
        }

        try {
            await Tabelaitem.create(tabelaitem)

            req.flash('message', 'Item criado com sucesso!')

            req.session.save(() => {
                res.redirect('/items/crud')//NOME DA PASTA
            })
        } catch (error) {
            console.log(error)
        }
    }

    static async editarItems(req, res) {
        const id = req.params.id
        const tabelaitem = await Tabelaitem.findOne({ where: { id: id }, raw: true })

        res.render('items/edit', {tabelaitem})
    }

    static async postarEditarItems(req, res) {
        const id = req.body.id

        const tabelaitem = {
            item: req.body.item,
            preco: req.body.preco
        }

       
        try {
            await Tabelaitem.update(tabelaitem, { where: { id: id } })

            req.flash('message', 'Item atualizado com sucesso')

            req.session.save(() => {
                res.redirect('/items/crud')//NOME DA PASTA
            })

        } catch (error) {
            console.log(error)
        }
    }

    static async removerItems(req, res) {
        const id = req.body.id;
        const UsuarioId = req.session.usuarioid;

        try {
            await Tabelaitem.destroy({ where: { id: id, UsuarioId: UsuarioId } })

            req.flash('message', 'Item removido com sucesso!')

            req.session.save(() => {
                res.redirect('/items/crud')//nome da pasta
            })
        } catch (error) {
            console.log(error)
        }
    }
}