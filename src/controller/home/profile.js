const { get_user_Id, m_patch_profile } = require("../../model/users")
const helper = require("../../helper/index")

module.exports = {

  get_profile: async (request, response) => {
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
  patch_profile: async (request, response) => { // # Patch
    try {
      let { id, name, email, phone, image } = request.body
      const id_user = await get_user_Id(id)
      let images = ''
      if (!request.file) {
        images = id_user[0].image
      } else if (id_user[0].image) {
        images = request.file.filename
      } else if (request.file) {
        images = request.file.filename
      }
      const setData = {
        id: id,
        name: name,
        email: email,
        phone: phone,
        image: images
      }
      console.log(setData)
      const edit_profile = await m_patch_profile(setData, id)
      return helper.response(response, 200, "Update profile success", edit_profile);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  }
  // patch_password

}