import axios from "./axios.customize";

export const createUserApi = (fullName, email, password, phone) => {
  const URL_BACKEND = "api/v1/user";
  const data = {
    email: email,
    password: password,
    phone: phone,
  };

  return axios.post(URL_BACKEND, data);
};

export const fetchAllUserApi = (current, pageSize) => {
  const URL_BACKEND = `api/v1/user?current=${current}&pageSize=${pageSize}`;

  return axios.get(URL_BACKEND);
};

export const updateUserAPI = (_id, fullName, phone) => {
  const URL_BACKEND = "api/v1/user";
  const data = {
    _id: _id,
    fullName: fullName,
    phone: phone,
  };

  return axios.put(URL_BACKEND, data);
};

export const deleteUserAPI = (_id) => {
  const URL_BACKEND = "api/v1/user/" + _id;
  return axios.delete(URL_BACKEND);
};

export const handleUploadFile = (file, folder) => {
  const URL_BACKEND = "api/v1/file/upload";

  const config = {
    headers: {
      "Upload-type": folder,
      "Content-Type": "multipart/form-data",
    },
  };

  const bodyFormData = new FormData();
  bodyFormData.append("fileImg", file);

  return axios.post(URL_BACKEND, bodyFormData, config);
};

export const updateUserAvatarAPI = (avatar, _id, fullName, phone) => {
  const URL_BACKEND = "api/v1/user";
  const data = {
    avatar: avatar,
    _id: _id,
    fullName: fullName,
    phone: phone,
  };

  return axios.put(URL_BACKEND, data);
};

export const registerUserAPI = (fullName, email, password, phone) => {
  const URL_BACKEND = "api/v1/user";
  const data = {
    fullName: fullName,
    email: email,
    password: password,
    phone: phone,
  };

  return axios.post(URL_BACKEND, data);
};

export const loginUserAPI = (email, password) => {
  const URL_BACKEND = "api/v1/auth/login";
  const data = {
    username: email,
    password: password,
    delay: 3000,
  };

  return axios.post(URL_BACKEND, data);
};

export const getAccountAPI = () => {
  const URL_BACKEND = "api/v1/auth/account";
  return axios.get(URL_BACKEND);
};

export const logoutAPI = () => {
  const URL_BACKEND = "api/v1/auth/logout";
  return axios.post(URL_BACKEND);
};

export const fetchAllProductApi = (current, pageSize) => {
  const URL_BACKEND = `api/v1/book?current=${current}&pageSize=${pageSize}`;

  return axios.get(URL_BACKEND);
};

export const createProductApi = (
  thumbnail,
  mainText,
  author,
  price,
  quantity,
  category
) => {
  const URL_BACKEND = "api/v1/book";
  const data = {
    thumbnail: thumbnail,
    mainText: mainText,
    author: author,
    price: price,
    quantity: quantity,
    category: category,
  };
  return axios.post(URL_BACKEND, data);
};

export const updateProductAPI = (
  _id,
  thumbnail,
  mainText,
  author,
  price,
  quantity,
  category
) => {
  const URL_BACKEND = "api/v1/book";
  const data = {
    _id: _id,
    thumbnail: thumbnail,
    mainText: mainText,
    author: author,
    price: price,
    quantity: quantity,
    category: category,
  };

  return axios.put(URL_BACKEND, data);
};

export const deleteProductAPI = (_id) => {
  const URL_BACKEND = "api/v1/book/" + _id;
  return axios.delete(URL_BACKEND);
};
