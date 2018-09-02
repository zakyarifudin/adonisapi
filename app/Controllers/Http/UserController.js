'use strict'

const { validate, validateAll } = use('Validator')
const User = use('App/Models/User')
const Hash = use('Hash')


class UserController {
    
    async index({response}) {
        const users = await User.query().with('posts').fetch();
        return response.json({
            message : 'success',
            data    : users
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

        return response.json({
            message : 'Successfully created',
            data    : user 
        });
        

    }

    async show ({ response, params: {id} }) {
        const user = await User.find(id)
        
        return response.json({
            message : 'success',
            data    : user
        });

    }

    async update ({ request, response , params: {id} }) {
        const user = await User.find(id)
        user.username = request.body.username;
        user.email    = request.body.email;

        await user.save();

        return response.json({
            message : 'Successfully updated',
            data    : user
        });

    }

    async destroy ({ response, params: {id} }) {
        const user = await User.find(id)

        if(user==null){
            return response.json({
                message     : 'Failed to delete',
                description : 'Data Not Found'
            });
        }
        
        await user.delete();

        return response.json({
            message : 'Data Successfully deleted',
            id      : id
        });
    }
}

module.exports = UserController
