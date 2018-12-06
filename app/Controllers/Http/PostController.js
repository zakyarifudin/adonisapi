'use strict'

const Database = use('Database');
const User = use('App/Models/User');
const Post = use('App/Models/Post');
const { validate, validateAll } = use('Validator');

class PostController {

    async index ({response, auth}) {
        const posts = await Post.query()
                            .with('user')
                            .with('comments.user')
                            .fetch()

        return response.json({
            status  : 'success',
            result  : posts
        })
    }

    async own ({response, auth}) {
        const posts = await  Database.from('posts').where('user_id', auth.user.id);

        return response.json({
            status  : 'success',
            result  : posts
        })
    }

    async store({ request, response, auth }) {
        const rules = {
            title           : 'required',
            description     : 'required'
        }

        const messages = {
            'title.required'       : 'Judul harus diisi',
            'description.required' : 'Deskripsi harus diisi'
        }

        const validation = await validateAll(request.all(), rules, messages)

        if(validation.fails()){
            return validation.messages()
        }

        const user = await User.find(auth.user.id);

        const post = await user.posts()
                    .create({
                        title       : request.body.title,
                        description : request.body.description
                    });

        return response.json({
            status  : 'success',
            message : 'Post successfully created',
            result  : post
        })
    }

    async show ({ response, params: {id} }) {
        const post = await Post.query()
                    .with('comments.user')
                    .where('id',id)
                    .first();

        return response.json({
            status  : 'success',
            result  : post
        })
    }

    async update({ request, response, params:{id}, auth }) {

        const post = await Post.query()
                    .where('user_id', auth.user.id)
                    .where('id',id)
                    .first();

        if(post == null){
            return response.json({
                status : 'fail',
                message: 'Failed to update post not found'
            })
        }

        post.description = request.body.description;
        await post.save();

        return response.json({
            status  : 'success',
            message : 'Post successfully updated',
            result  : post

        })


    }

    async destroy({ response, params: {id}, auth }) {
        const post = await Post.query()
                    .where('user_id', auth.user.id)
                    .where('id',id)
                    .first();

        if(post == null){
            return response.json({
                status : 'fail',
                message: 'Failed to delete post not found',
            })
        }

        await post.delete();

        return response.json({
            status  : 'success',
            message : 'Post successfully deleted',
            result  : id
        })
    }


}

module.exports = PostController
