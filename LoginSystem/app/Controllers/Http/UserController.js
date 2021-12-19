"use strict"

const User = use("App/Models/User")

class UserController {
  async create ({ request }) {
    const data = request.only(["name", "cpf", "email", "password"])
    data = {...data, level: '1'}

    const user = await User.create(data)

    return user
  }

  async index ({ auth, response }) {
    if (auth.user.level !== 999) {
      return response.status(401).send({ error: 'Not authorized' })
    }
    
    const users = User.all()

    return users
  }

  async show ({params, response, auth}) {
    if (auth.user.level === 999 || params.id == auth.user.id) {
      let user =  User.findOrFail(params.id)
      return user
    }
    else {
      return response.status(401).send({ error: 'Not authorized'})
    }
  }

  async update ({params, response, auth, request}) {
    if (auth.user.level === 999 || params.id == auth.user.id) {
      let user = await User.findOrFail(params.id)
      let data = request.only(["name", "cpf", "email", "password", "level"])
      data = {...data}
      user.merge(data)
      await user.save()
      return user
    }
    else {
      return response.status(401).send({ error: 'Not authorized'})
    }
  }
}

module.exports = UserController 
