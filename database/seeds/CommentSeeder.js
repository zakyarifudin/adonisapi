'use strict'

/*
|--------------------------------------------------------------------------
| CommentSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Comment = use('App/Models/Comment')

class CommentSeeder {
  async run () {
    await Comment.create({
      post_id: 1,
      user_id: 2,
      comment: "Comment Post 1 Yeah"
    });

    await Comment.create({
      post_id: 1,
      user_id: 3,
      comment: "Comment Post 1 Yeahaaaa"
    });

    await Comment.create({
      post_id: 2,
      user_id: 3,
      comment: "Comment Post 2 Yeah"
    });

    await Comment.create({
      post_id: 2,
      user_id: 4,
      comment: "Comment Post 2 Yeahaaaa"
    });

    await Comment.create({
      post_id: 2,
      user_id: 4,
      comment: "Comment Post 2 Yeahaaaa"
    });

    await Comment.create({
      post_id: 3,
      user_id: 1,
      comment: "Comment Post 3 Yeahaaaa Sendiri"
    });

    await Comment.create({
      post_id: 3,
      user_id: 4,
      comment: "Comment Post 3 Uhuyy"
    });
  }
}

module.exports = CommentSeeder
