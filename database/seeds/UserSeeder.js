'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const User = use('App/Models/User')
const Hash = use('Hash')

class UserSeeder {
  async run () {
    //Gawe Seeder
    await User.create({
      username  : 'zaky',
      email     : 'zaky@mail.com',
      password  : 'zaky'
    });

    await User.create({
      username  : 'arif',
      email     : 'arif@mail.com',
      password  : 'arif'
    });

    await User.create({
      username  : 'luthfi',
      email     : 'luthfi@mail.com',
      password  : 'luthfi'
    });

    await User.create({
      username  : 'afan',
      email     : 'afan@mail.com',
      password  : 'afan'
    });
  }
}

module.exports = UserSeeder
