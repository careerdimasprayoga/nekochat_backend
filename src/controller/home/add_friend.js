const { get_user_search, get_user_Id, post_add_friend, patch_confirm_request, post_friendlist, get_request_friend } = require("../../model/users")
const helper = require("../../helper/index")

module.exports = {

  search_users: async (request, response) => {
    try {
      let { key } = request.body
      const result = await get_user_search(key);
      return helper.response(response, 200, "Search friend success", result);
    } catch (error) {
      return helper.response(response, 400, "Bad request", error);
    }
  },
  get_userId: async (request, response) => {
    try {
      const { id } = request.body
      const result = await get_user_Id(id)
      if (result.length > 0) {
        return helper.response(response, 200, "Get User by ID Success", result);
      } else {
        return helper.response(response, 404, "ID not found");
      }
    } catch (error) {
      return helper.response(response, 400, "Bad request", error);
    }
  },
  get_request_friend: async (request, response) => {
    try {
      const { id_user_receive } = request.body
      const result = await get_request_friend(id_user_receive)
      if (result.length > 0) {
        return helper.response(response, 200, "Get User request Success", result);
      } else {
        return helper.response(response, 404, "No request friend");
      }
    } catch (error) {
      return helper.response(response, 400, "Bad request", error);
    }
  },
  add_friend_request: async (request, response) => { // # Request teman
    try {
      const { id_user_request, id_user_receive } = request.body
      const setData = {
        id_user_request: id_user_request,
        id_user_receive: id_user_receive,
        status_confirm: 0
      }
      const result = await post_add_friend(setData)
      return helper.response(response, 201, "Request friend Success", result);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  confirm_friend_request_1: async (request, response) => { // # Patch
    try {
      let { id_friend_request, status_confirm } = request.body
      const setData = {
        status_confirm: status_confirm
      }
      const confirmation = await patch_confirm_request(id_friend_request, setData)
      return helper.response(response, 200, "Confirm friend success", confirmation);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  confirm_friend_request_2: async (request, response) => { // # Patch
    try {
      let { id_user_login, id_user_contact } = request.body
      const roomchat_id = Math.floor(Math.random() * 10000000)
      const setData1 = {
        id_user_login: id_user_login,
        id_user_contact: id_user_contact,
        id_roomchat: roomchat_id
      }
      const add_friend_list1 = await post_friendlist(setData1)

      const setData2 = {
        id_user_login: id_user_contact,
        id_user_contact: id_user_login,
        id_roomchat: roomchat_id
      }
      const add_friend_list2 = await post_friendlist(setData2)
      return helper.response(response, 200, "Confirm friend success", add_friend_list1);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  }
  // , deleteCategory: async (request, response) => {
  //   try {
  //     const { id } = request.params
  //     const result = await deleteCategory(id)
  //     response.send("Delete Category Success")
  //   } catch (error) {
  //     return helper.response(response, 400, "Bad Request", error);
  //   }
  // }

}
