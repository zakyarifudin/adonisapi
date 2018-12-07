'use strict'

const { validate, validateAll } = use('Validator')
const Database = use('Database')
const User = use('App/Models/User')
const Hash = use('Hash')


class UserController {

    async index({response}) {
        const users = await User.query()
                        .with('posts')
                        .fetch();

        return response.json({
            status : 'success',
            result : users
        });
    }

    async store({request, response}) {
        const rules = {
            username    : 'required|unique:users',
            email       : 'required|unique:users|email',
            password    : 'required'
        }

        const messages = {
            'username.required' : 'Username harus diisi',
            'username.unique'   : 'Username sudah dipakai, coba username lain',
            'email.required'    : 'Email harus diisi',
            'email.unique'      : 'Email sudah dipakai, coba email lain',
            'email.email'       : 'Email harus benar',
            'password.required' : 'Password harus diisi'
        }

        const validation = await validateAll(request.all(), rules, messages)

        if(validation.fails()){
            return validation.messages()
        }

        const user = await User.create({
            username    : request.body.username,
            email       : request.body.email,
            password    : request.body.password
        })

        if(!user){
            return response.json({
                status  : 'fail',
                message : 'Something Wrong'
            });
        }

        return response.json({
            status  : 'success',
            message : 'Successfully registered',
            result  : user
        });


    }

    async show ({ response, params: {id} }) {
        const user = await User.find(id)

        return response.json({
            status  : 'success',
            result  : user
        });

    }

    async update ({ request, response , params: {id} }) {
        const user = await User.find(id)
        user.username = request.body.username;
        user.email    = request.body.email;

        await user.save();

        return response.json({
            status  : 'success',
            message : 'Successfully updated',
            data    : user
        });

    }

    async destroy ({ response, params: {id} }) {
        const user = await User.find(id)

        if(user==null){
            return response.json({
                status  : 'fail',
                message : 'User Not Found'
            });
        }

        await user.delete();

        return response.json({
            status  : 'success',
            message : 'Data Successfully deleted',
            result  : id
        });
    }

    async findOrCreate({ request, response }) {
        const user = await User.query()
                    .where('provider_id',request.body.provider_id)
                    .first();
                    
        if (user == null) {
            const user = await User.create({
                username    : request.body.name,
                email       : request.body.email,
                password    : request.body.provider_id,
                provider    : request.body.provider,
                provider_id : request.body.provider_id
            });

            if(!user){
                return response.json({
                    status  : 'fail',
                    message : 'Something Wrong'
                });
            }

            return response.json({
                status  : 'success',
                message : 'registered',
                result  : user
            });

        } else {
            return response.json({
                status     : 'success',
                message    : 'found',
                result     : user
            });
        }
    }
}

module.exports = UserController
