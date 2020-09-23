const connection = require('../../config/mysql')

module.exports = {
  m_post_register: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO users SET ?", setData, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...setData
          }
          delete newResult.password
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  }, m_check_email: (email) => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM users WHERE email = ?", email, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  }, m_check_phone: (phone) => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT phone FROM users WHERE phone = ?", phone, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  }
}