const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helper = require('../../helper/index')
const { m_post_register, m_check_email, m_check_phone } = require('../../model/auth/auth')

module.exports = {

  register: async (request, response) => {

    const { name, email, phone, password } = request.body
    const salt = bcrypt.genSaltSync(10)
    const encrypt_password = bcrypt.hashSync(password, salt)
    const setData = {
      name: name,
      email: email,
      phone: phone,
      password: encrypt_password,
      status: 0,
      created: new Date()
    }
    try {
      const check_email = await m_check_email(setData.email)
      const check_phone = await m_check_phone(setData.phone)
      if (setData.name === '') {
        return helper.response(response, 400, 'Name cannot be empty')
      } else if (setData.email === '' || setData.email.search('@') < 0) {
        return helper.response(response, 400, 'Email cannot be empty and must valid email')
      } else if (check_email.length > 0) {
        return helper.response(response, 400, 'Email already registered')
      } else if (setData.phone === '') {
        return helper.response(response, 400, 'Phone number cannot be empty')
      } else if (check_phone.length > 0) {
        return helper.response(response, 400, 'Phone number already registered')
      } else if (password.length < 8) {
        return helper.response(response, 400, 'Password must be up to 8 characters')
      } else {
        const result = await m_post_register(setData)
        return helper.response(response, 200, "Register success", result)
      }
    } catch (error) {
      return helper.response(response, 400, "Bad Request")
    }
  },

  login: async (request, response) => {

    const { email, password } = request.body
    const check_email = await m_check_email(email)

    if (check_email.length >= 1) {
      const check_password = bcrypt.compareSync(password, check_email[0].password)
      if (check_password) {
        const { id, name, email, phone, password } = check_email[0]
        let payload = {
          id,
          name,
          email,
          phone,
          password
        }
        const token = jwt.sign(payload, "RAHASIA", { expiresIn: "300h" })
        payload = { ...payload, token }
        return helper.response(response, 200, "Login Success", payload)
      } else {
        return helper.response(response, 400, "Wrong Password !")
      }
    } else {
      return helper.response(response, 400, "Email has not registred !")
    }

  }
}
