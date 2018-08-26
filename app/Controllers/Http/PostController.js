'use strict'

const Database = use('Database');
const User = use('App/Models/User');
const Post = use('App/Models/Post');
const { validate, validateAll } = use('Validator');

class PostController {
    
    async index ({response, auth}) {
        const posts = await  Database.from('posts').where('user_id', auth.user.id);
        return posts;
    }

    async store({ request, response, auth }) {
        const rules = {
            description     : 'required'
        }

        const messages = {
            'description.required' : 'Deskripsi harus diisi' 
        }
        
        const validation = await validateAll(request.all(), rules, messages)

        if(validation.fails()){
            return validation.messages()
        }
        
        const user = await User.find(auth.user.id);

        const post = await user.posts()
                    .create({
                        description : request.body.description
                    });
        
        return response.json({
            message : 'Post successfully created',
            post : post
        })
    }

    async show ({ response, params: {id} }) {
        const post = Post.find(id)
        return post;
    }

    async update({ request, response, params:{id}, auth }) {

        const post = await Post.query()
                    .where('user_id', auth.user.id)
                    .where('id',id)
                    .first();

        if(post == null){
            return response.json({
                message: 'Failed to update post',
            })
        }

        post.description = request.body.description;
        await post.save();
        
        return response.json({
            message : 'Post successfully updated',
            post    : post
            
        })

        
    }

    async destroy({ response, params: {id}, auth }) {
        const post = await Post.query()
                    .where('user_id', auth.user.id)
                    .where('id',id)
                    .first();

        if(post == null){
            return response.json({
                message: 'Failed to delete post',
            })
        }

        await post.delete();
        
        return response.json({
            message : 'Post successfully deleted',
            post    : id       
        })
    }


}

module.exports = PostController
