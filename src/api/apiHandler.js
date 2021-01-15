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

  getPlants() {
    return service
      .get("/api/plants")
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

  }

};
