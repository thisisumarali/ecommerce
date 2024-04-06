import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_REST_API_KEY;
const apiUrl = "http://localhost:1337/api";

const axiosClient = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});

const getLatestProducts = () => axiosClient.get("/products?populate=*");
const getProductById = (id) => axiosClient.get(`/products/${id}?populate=*`);
// Get Product List By Category
const getProductByCategory = (category) => {
  if (category) {
    return axiosClient.get(
      `/products?filters[category][$eq]=${category}&populate=*`
    );
  } else {
    // Handle the case where category is undefined
    console.error("Category is undefined");
    return Promise.reject("Category is undefined");
  }
};
// api cart
const addToCart = (data) => axiosClient.post("/carts", data);

const getUserCartItem = (email) =>
  axiosClient.get(
    `/carts?populate[products][populate][0]=banner&filters[email][$eq]=${email}`
  );

const deleteCartItems = (id) => axiosClient.delete(`/carts/${id}`);
// create order
const createOrder=(data)=>axiosClient.post("/orders",data)
export default {
  getLatestProducts,
  getProductById,
  getProductByCategory,
  addToCart,
  getUserCartItem,
  deleteCartItems,
  createOrder
};
