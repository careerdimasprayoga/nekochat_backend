const { m_get_roomchat, getInRoomChat, m_post_chat } = require("../../model/room_chat")
const helper = require("../../helper/index")

module.exports = {

  get_roomchat: async (request, response) => {
    try {
      const { id } = request.params
      const result = await m_get_roomchat(id)
      if (result.length > 0) {
        return helper.response(response, 200, "Get Roomchat success", result);
      } else {
        return helper.response(response, 404, "Please start a message");
      }
    } catch (error) {
      return helper.response(response, 400, "Bad request", error);
    }
  },
  getInChat: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getInRoomChat(id)
      return helper.response(response, 200, "Get in roomchat success", result);
    } catch (error) {
      return helper.response(response, 400, "Get in roomchat error", error);
    }
  },
  post_chat: async (request, response) => {
    try {
      const { roomchat_id, id_login, id_receive, message } = request.body
      const setData = {
        roomchat_id: roomchat_id,
        id_sender: id_login,
        id_receive: id_receive,
        message: message,
        created: new Date()
      }
      const result = await m_post_chat(setData)
      return helper.response(response, 200, "Create roomchat success", result);
    } catch (error) {
      return helper.response(response, 400, "Bad request", error);
    }
  }

}
