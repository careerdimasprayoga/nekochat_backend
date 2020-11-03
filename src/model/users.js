const connection = require("../config/mysql");

module.exports = {

  get_user_search: (key) => {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM users WHERE email = "${key}"`, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      });
    })
  },
  get_user_Id: (id) => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM users WHERE id = ?", id, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  get_request_friend: (id_user_login) => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM friends_request WHERE id_user_receive = ? AND status_confirm = 0", id_user_login, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  postNewFriend: (data) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO chat_message SET ?", data, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  postFriendList: (data) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO friends_list SET ?", data, (error, result) => {
        !error ? resolve(result) : reject(new Error(error))
      })
    })
  },
  post_add_friend: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO friends_request SET ?", setData, (error, result) => {
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
  },
  patch_confirm_request: (id_friend_request, setData) => {
    return new Promise((resolve, reject) => {
      connection.query("UPDATE friends_request SET ? WHERE id = ?", [setData, id_friend_request], (error, result) => {
        if (!error) {
          resolve(setData)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  post_friendlist: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO friends_list SET ?", setData, (error, result) => {
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
  },
  m_patch_profile: (setData, id_profile) => {
    return new Promise((resolve, reject) => {
      connection.query("UPDATE users SET ? WHERE id = ?", [setData, id_profile], (error, result) => {
        if (!error) {
          resolve(setData)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  deleteCategory: (id) => {
    return new Promise((resolve, reject) => {
      connection.query("DELETE FROM categorys WHERE id = ?", id, (error, result) => {
        if (!error) {
          const newResult = {
            id: id
          }
          resolve(newResult)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  patchLatLng: (id_user, setData) => {
    return new Promise((resolve, reject) => {
      connection.query("UPDATE users SET ? WHERE id = ?", [setData, id_user], (error, result) => {
        if (!error) {
          resolve(setData)
        } else {
          reject(new Error(error))
        }
      })
    })
  },
  getLatLng: (id_user) => {
    return new Promise((resolve, reject) => {
      connection.query("SELECT id, name, lat, lng FROM users WHERE id = ?", id_user, (error, result) => {
        if (!error) {
          resolve(setData)
        } else {
          reject(new Error(error))
        }
      })
    })
  }

}
