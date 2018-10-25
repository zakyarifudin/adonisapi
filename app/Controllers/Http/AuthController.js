'use strict'

class AuthController {
    // Menggunakan JWT

    async login({ request, auth }) {
        const email     = await request.body.email
        const password  = await request.body.password

        
        return await auth
            .withRefreshToken()
            .attempt(email, password)
    }

    async profile({ response, auth }) {
        return response.send(auth.user)
    }

    async refreshToken({ request, auth }) {
        const refreshToken = request.input('refresh_token')
        return await auth
            .newRefreshToken()
            .generateForRefreshToken(refreshToken)
    }

    async logout({ auth, response }) {
        const apiToken = auth.getAuthHeader()
        await auth
            .revokeTokens([apiToken])
        return response.json({
            status : 'success', 
            message: 'Logout successfully!'
        })
    }

}

module.exports = AuthController
