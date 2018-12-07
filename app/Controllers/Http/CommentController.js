'use strict'

const Env       = use('Env');
const Mail      = use('Mail');
const Database  = use('Database');
const User      = use('App/Models/User');
const Post      = use('App/Models/Post');
const Comment   = use('App/Models/Comment');
const { validate, validateAll } = use('Validator');

class CommentController {

    async byPost ({response, auth, params:{post_id}}) {
        const comments = await Comment.query()
                         .where('post_id', post_id)
                         .with('post')
                         .fetch();
        return response.json({
            status  : 'success',
            result  : comments
        })
    }

    async byUser ({response, auth, params:{user_id}}) {
        const comments = await Comment.query()
                         .with('post')
                         .where('user_id', user_id)
                         .fetch();
        return response.json({
            status  : 'success',
            result  : comments
        })
    }

    async store({ request, response, auth , params:{post_id}}) {
        const rules = {
            comment     : 'required'
        }

        const messages = {
            'comment.required' : 'Komentar harus diisi'
        }

        const validation = await validateAll(request.all(), rules, messages)

        if(validation.fails()){
            return validation.messages()
        }

        const user = await User.find(auth.user.id);

        const post = await Post.find(post_id);

        if(!post){
            return response.json({
                status  : 'fail',
                message : 'Post is not available',
            })
        }

        const comment = await user.comments()
                    .create({
                        post_id     : post_id,
                        comment     : request.body.comment
                    });

        const post_user = await post.user().fetch();
        const data = {
            username    : post_user.username,
            url         : Env.get('VIEW_URL') + '/question/' + post.id
        };

        const send = await Mail.send('email.notification', data, (message) => {
          message
            // .to('muh.afan.azmi@gmail.com', 'Afan')
            .to(post_user.email, post_user.username)
            .from('notification@chatify.com', 'Chatify')
            .subject('Check Your Post')
        });

        return response.json({
            status  : 'success',
            message : 'Comment successfully created',
            result  : send
        })
    }

    async update({ request, response, params:{id}, auth }) {

        const comment = await Comment.query()
                    .where('user_id', auth.user.id)
                    .where('id',id)
                    .first();

        if(comment == null){
            return response.json({
                status : 'fail',
                message: 'Failed to Update Comment not Found',
            })
        }

        comment.comment = request.body.comment;
        await comment.save();

        return response.json({
            status  : 'success',
            message : 'Comment successfully updated',
            result  : comment

        })


    }

    async destroy({ response, params: {id}, auth }) {
        const comment = await Comment.query()
                    .where('user_id', auth.user.id)
                    .where('id',id)
                    .first();

        if(comment == null){
            return response.json({
                status  : 'fail',
                message : 'Failed to Delete Comment not Found',
            })
        }

        await comment.delete();

        return response.json({
            status    : 'success',
            message   : 'Comment successfully deleted',
            result    : id
        })
    }
}

module.exports = CommentController
