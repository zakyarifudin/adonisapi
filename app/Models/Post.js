'use strict'

const Model = use('Model')

class Post extends Model {

    comments () {
        return this.hasMany('App/Models/Comment')
    }

    user () {
        return this.belongsTo('App/Models/User')
    }

}

module.exports = Post
