'use strict'

const Route = use('Route')

Route.get('/', ({ request }) => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(() => {
  Route.get('' , 'UserController.index');
  Route.post('', 'UserController.store');
  Route.get('/:id', 'UserController.show');
  Route.put('/:id', 'UserController.update');
  Route.delete('/:id', 'UserController.destroy');
})
.prefix('api/user');