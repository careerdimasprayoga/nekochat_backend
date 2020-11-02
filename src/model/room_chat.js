const connection = require("../config/mysql");

module.exports = {

  m_get_roomchat: (id_user_login) => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT friends_list.id, friends_list.id_user_login, friends_list.id_user_contact, friends_list.id_roomchat, users.name, (CASE WHEN users.image = '' THEN 'Default.png' ELSE users.image END) AS image FROM friends_list INNER JOIN users ON friends_list.id_user_contact = users.id WHERE id_user_login = ?", id_user_login, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  getInRoomChat: (roomId) => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT chat_message.id AS id, chat_message.roomchat_id AS roomchat_id, chat_message.id_sender AS id_sender, chat_message.id_receive AS id_receive, chat_message.message AS message, chat_message.created AS created, users.id AS user_id, users.name AS user_name, users.email AS user_email, users.phone AS user_phone, users.image AS user_image, users.lat AS user_lat, users.lng AS user_lng FROM chat_message LEFT JOIN users ON users.id = chat_message.id_sender WHERE roomchat_id = ? ORDER BY created", roomId, (error, result) => {
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
