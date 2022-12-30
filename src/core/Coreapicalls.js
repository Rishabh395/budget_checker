import { API } from "../backend";
import Axios from "axios";


const getToken = () => {
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
    //TODO: compare JWT with database json token
  }
};

export const getData = async () => {
  var { token } = getToken();
  try {
    const response = await Axios({
      method: "GET",
      url: `${API}user/companies/id/employees`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
 
};

export const deleteItem = async (id) => {
  var { token } = getToken();

  try {
    const response = await Axios({
      method: "DELETE",
      url: `${API}user/employees`,
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
 
  } catch (e) {
    console.log(e);
  }

};

export const addItem = async (data) => {
  var { token } = getToken();

  try {
    const response = await Axios({
      method: "POST",
      url: `${API}user/employees/`,
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }

};

export const editItem = (id, data) => {
  var { token } = getToken();

  return Axios({
    method: "PUT",
    url: `${API}user/employees/id`,
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((e) => {
      console.log(e);
    });
};
