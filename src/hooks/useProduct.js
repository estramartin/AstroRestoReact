import { useState } from "react";
import { useAuth } from "./useAuth";
import {
  getProductsApi,
  getProductApi,
  addProductApi,
  updateProductApi,
  deleteProductApi,
  getProductsByCategoryApi,
} from "../api/products";

export const useProduct = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState(null);
  const { auth } = useAuth();

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await getProductsApi();
      setProducts(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getProduct = async (id) => {
    try {
      setLoading(true);
      const response = await getProductApi(id);
      setLoading(false);
      return response;
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const addProduct = async (product) => {
    try {
      setLoading(true);
      const response = await addProductApi(product, auth.token);
      setProducts(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const updateProduct = async (id, product) => {
    try {
      setLoading(true);
      const response = await updateProductApi(id, product, auth.token);
      setProducts(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      const response = await deleteProductApi(id, auth.token);
      setProducts(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getProductsByCategory = async (idCategory) => {
    try {
      setLoading(true);
      const response = await getProductsByCategoryApi(idCategory);
      setLoading(false);
      setProducts(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    error,
    products,
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
  };
};
