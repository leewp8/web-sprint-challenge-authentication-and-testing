const db = require('../../data/dbConfig');

function find() {
    return db('users')
}

function findById(id) {
    return db('users')
    .where('id', id).first()
}

function findBy(filter) {
    return db('users')
    .where(filter)
}

async function add({ username, password }) { 
    let created_user_id
    await db.transaction(async trx => {
      const [id] = await trx('users').insert({ username, password })
      created_user_id = id
    })
    return findById(created_user_id)
  }

module.exports = {
    find,
    findById,
    add,
    findBy
}
