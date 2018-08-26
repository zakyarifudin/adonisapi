'use strict'

const Route = use('Route')

Route.get('/', ({ request }) => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(() => {
  Route.post('/login', 'AuthController.login')
  Route.post('/refresh', 'AuthController.refreshToken').middleware(['auth'])
  Route.post('/logout', 'AuthController.logout').middleware(['auth'])
  Route.get('/profile', 'AuthController.profile').middleware(['auth'])

})
.prefix('api/jwt');

Route.group(() => {
  Route.get('' , 'UserController.index');
  Route.post('', 'UserController.store');
  Route.get('/:id', 'UserController.show');
  Route.put('/:id', 'UserController.update');
  Route.delete('/:id', 'UserController.destroy');
})
.prefix('api/user');

Route.group(() => {
  Route.get('' , 'PostController.index').middleware(['auth']);
  Route.post('', 'PostController.store').middleware(['auth']);
  Route.get('/:id', 'PostController.show').middleware(['auth']);
  Route.put('/:id', 'PostController.update').middleware(['auth']);
  Route.delete('/:id', 'PostController.destroy').middleware(['auth']);
})
.prefix('api/post');