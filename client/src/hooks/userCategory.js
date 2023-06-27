import React, { useState, useEffect } from "react";
import axios from "axios";
import { GiDoubleFaceMask } from "react-icons/gi";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  //get cat
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/category/get-category`
      );
      setCategories(data?.category);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return categories;
}
