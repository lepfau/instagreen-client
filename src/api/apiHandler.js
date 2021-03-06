import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
  if (error.response.data) {
    console.log(error.response && error.response.data);
    throw error;
  }
  throw error;
}

export default {
  service,

  signup(userInfo) {
    return service
      .post("/api/auth/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post("/api/auth/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/api/auth/isLoggedIn")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get("/api/auth/logout")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getUsers() {
    return service
      .get("/api/user")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  searchUsers(str) {
    return this.service.get("/api/user/search/api", {
      params: {
        search: str,
      },
    });
  },

  getPlants() {
    return service
      .get("/api/plants")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getUserPlants() {
    return service
      .get("/api/plants/userPlants")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  createPlant(plantInfo) {
    return service
      .post("/api/plants", plantInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  createDbPlant(plantInfo) {
    return service
      .post("/api/dbplants", plantInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  deleteItem(itemId) {
    return service
      .delete("/api/plants/" + itemId)
      .then(() => {
        console.log("successfully deleted");
      })
      .catch(errorHandler);
  },

  editItem(itemId, itemInfo) {
    return service
      .patch("/api/plants/" + itemId, itemInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getWall() {
    return service
      .get("/api/wall")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getUserWall() {
    return service
      .get("/api/wall/userposts")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  createWall(wallInfo) {
    return service
      .post("/api/wall", wallInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  editWall(itemId, itemInfo) {
    return service
      .patch("/api/wall/" + itemId, itemInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  editUser(userId, userInfo) {
    return service
      .patch("/api/user/" + userId, userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  deleteWall(itemId) {
    return service
      .delete("/api/wall/" + itemId)
      .then(() => {
        console.log("successfully deleted");
      })
      .catch(errorHandler);
  },

  getComment() {
    return service
      .get("/api/comment")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  addComment(postId, comment) {
    return service
      .post(`/api/wall/${postId}/comments`, comment)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  addLike(postId) {
    return service
      .post(`/api/wall/${postId}/likes`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  removeLike(postId) {
    return service
      .delete(`/api/wall/${postId}/likes`)
      .then(() => {
        "like removed";
      })
      .catch(errorHandler);
  },

  deleteComment(itemId) {
    return service
      .delete("/api/comment/" + itemId)
      .then(() => {
        console.log("successfully deleted");
      })
      .catch(errorHandler);
  },

  getUser(userId) {
    return service
      .get(`/api/user/${userId}`)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getProfile() {
    return service
      .get("/api/user/myprofile")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getProfileWall() {
    return service
      .get("/api/wall/profileposts")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getProfileId(userId) {
    return service
      .get(`/api/wall/` + userId)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getItems() {
    return service
      .get("/api/item")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  addItem(data) {
    return service
      .post("/api/item", data)
      .then((res) => res.data)
      .catch(errorHandler);
  },
};
