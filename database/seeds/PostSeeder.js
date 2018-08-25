'use strict'

/*
|--------------------------------------------------------------------------
| PostSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Post = use('App/Models/Post')

class PostSeeder {
  async run () {
    
    Post.create({
      user_id     : 1,
      description : 'Post Zaky 1'
    });

    Post.create({
      user_id     : 2,
      description : 'Post Arif 1'
    });

    Post.create({
      user_id     : 1,
      description : 'Post Zaky 2'
    });

    Post.create({
      user_id     : 2,
      description : 'Post Arif 2'
    });

    Post.create({
      user_id     : 1,
      description : 'Post Zaky 3'
    });
    
    Post.create({
      user_id     : 2,
      description : 'Post Arif 3'
    });

  }
}

module.exports = PostSeeder
