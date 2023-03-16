import { BASE_API } from "../utils/constants";

export async function getCategoriesApi() {
  try {
    const url = `${BASE_API}/api/categorias/`;
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

export async function getCategoryApi(id) {
  try {
    const url = `${BASE_API}/api/categorias/${id}/`;
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

export async function addCategoryApi(token, category) {
  try {
    const formData = new FormData();
    formData.append("image", category.image);
    formData.append("title", category.title);
    const url = `${BASE_API}/api/categorias/`;
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
}

export async function deleteCategoryApi(token, id) {
  try {
    const url = `${BASE_API}/api/categorias/${id}/`;
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
}

export async function updateCategoryApi(token, id, category) {
  try {
    const url = `${BASE_API}/api/categorias/${id}/`;
    const formData = new FormData();
    if (category.image) formData.append("image", category.image);
    formData.append("title", category.title);
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
}
