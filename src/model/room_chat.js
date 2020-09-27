const connection = require("../config/mysql");

module.exports = {

  m_get_roomchat: (id_user_login) => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM friends_list WHERE id_user_login = ?", id_user_login, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  m_post_chat: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO chat_message SET ?", setData, (error, result) => {
        if (!error) {
          const newResult = {
            ...setData
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  }

}
