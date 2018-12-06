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
  Route.post('/find-or-create', 'UserController.findOrCreate');
  Route.get('/:id', 'UserController.show');
  Route.put('/:id', 'UserController.update');
  Route.delete('/:id', 'UserController.destroy');
})
.prefix('api/user');

Route.group(() => {
  //post
  Route.get('' , 'PostController.index').middleware(['auth']);
  Route.get('/own' , 'PostController.own').middleware(['auth']);
  Route.post('', 'PostController.store').middleware(['auth']);
  Route.get('/:id', 'PostController.show').middleware(['auth']);
  Route.put('/:id', 'PostController.update').middleware(['auth']);
  Route.delete('/:id', 'PostController.destroy').middleware(['auth']);

  //comment
  Route.post('/:post_id/comment', 'CommentController.store').middleware(['auth']);
  Route.put('/comment/:id', 'CommentController.update').middleware(['auth']);
  Route.delete('/comment/:id', 'CommentController.destroy').middleware(['auth']);
})
.prefix('api/post');

Route.group(() => {
  Route.get('/by-post/:post_id' , 'CommentController.byPost').middleware(['auth']);
  Route.get('/by-user/:user_id' , 'CommentController.byUser').middleware(['auth']);
})
.prefix('api/comment');
