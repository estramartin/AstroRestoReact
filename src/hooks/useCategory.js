import { useState } from "react";

import {
  getCategoryApi,
  getCategoriesApi,
  addCategoryApi,
  deleteCategoryApi,
  updateCategoryApi,
} from "../api/categories";

import { useAuth } from "./useAuth";

export function useCategory() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState(null);
  const { auth } = useAuth();

  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await getCategoriesApi();
      setCategories(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const getCategory = async (id) => {
    try {
      setLoading(true);
      const response = await getCategoryApi(id);
      setCategories(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const addCategory = async (category) => {
    try {
      setLoading(true);
      const response = await addCategoryApi(auth.token, category);
      setCategories(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const deleteCategery = async (id) => {
    try {
      setLoading(true);
      const response = await deleteCategoryApi(auth.token, id);
      setCategories(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const updateCategory = async (id, category) => {
    try {
      setLoading(true);
      const response = await updateCategoryApi(auth.token, id, category);
      setCategories(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    error,
    categories,
    getCategories,
    getCategory,
    addCategory,
    deleteCategery,
    updateCategory,
  };
}
