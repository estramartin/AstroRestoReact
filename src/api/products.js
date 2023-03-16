import { BASE_API } from "../utils/constants";
const route = "api/productos";
export async function getProductsApi() {
  try {
    const url = `${BASE_API}/${route}/`;
    const params = {
      method: "GET",
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export const getProductApi = async (id) => {
  try {
    const url = `${BASE_API}/${route}/${id}/`;
    const params = {
      method: "GET",
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const addProductApi = async (product, token) => {
  try {
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("price", product.price);
    formData.append("image", product.image);
    formData.append("active", product.active);
    formData.append("category", product.category);
    const url = `${BASE_API}/${route}/`;
    const params = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateProductApi = async (id, product, token) => {
  try {
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("price", product.price);
    if (product.image) formData.append("image", product.image);
    formData.append("active", product.active);
    formData.append("category", product.category);
    const url = `${BASE_API}/${route}/${id}/`;
    const params = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteProductApi = async (id, token) => {
  try {
    const url = `${BASE_API}/${route}/${id}/`;
    const params = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const getProductsByCategoryApi = async (idCategory) => {
  try {
    const filterCategory = `category=${idCategory}&active=True`;
    const url = `${BASE_API}/${route}/?${filterCategory}`;

    const response = await fetch(url);
    const result = response.json();
    return result;
  } catch (error) {
    throw error;
  }
};
