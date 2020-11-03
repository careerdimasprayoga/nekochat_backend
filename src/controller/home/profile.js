const { get_user_Id, m_patch_profile, patchLatLng, getLatLng } = require("../../model/users")
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
  patch_profile: async (request, response) => {
    try {
      let { id } = request.params
      let { name, email, phone, username, bio, image } = request.body
      const id_user = await get_user_Id(id)
      if (!request.file) {
        images = id_user[0].image
      } else if (id_user[0].image) {
        images = request.file.filename
      } else if (request.file) {
        images = request.file.filename
      } else if (request.body.name === undefined || '' || null) {
        name = id_user[0].name
      } else if (request.body.email === undefined || '' || null) {
        email = id_user[0].email
      } else if (request.body.phone === undefined || '' || null) {
        phone = id_user[0].phone
      }
      const setData = {
        name: request.body.name === undefined ? id_user[0].name : name,
        email: request.body.email === undefined ? id_user[0].email : email,
        phone: request.body.phone === undefined ? id_user[0].phone : phone,
        username: request.body.username === undefined ? id_user[0].username : username,
        bio: request.body.bio === undefined ? id_user[0].bio : bio,
        image: images
      }
      console.log(setData)
      const edit_profile = await m_patch_profile(setData, id)
      return helper.response(response, 200, "Update profile success", edit_profile);
    } catch (error) {
      return helper.response(response, 400, "Bad Request", error);
    }
  },
  patchCordinates: async (request, response) => {
    try {
      const { id } = request.params
      const cordinates = request.body
      const result = await patchLatLng(id, cordinates)
      return helper.response(response, 200, "Update cordinates success", result);
    } catch (error) {
      return helper.response(response, 400, "Update cordinates error", error);
    }
  },
  getCordinates: async (request, response) => {
    try {
      const { id } = request.params
      const result = await getLatLng(id)
      return helper.response(response, 200, "Get cordinates success", result);
    } catch (error) {
      return helper.response(response, 400, "Get Cordinates Error", error);
    }
  }

}
