export const createProductType = async (productType) => {
    const baseUrl = 'http://localhost:9091/api/product-types';
    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productType),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating product type:', error);
      throw error;
    }
  };
  
  export const getAllProductTypes = async () => {
    const baseUrl = 'http://localhost:9091/api/product-types';
    try {
      const response = await fetch(baseUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error getting product types:', error);
      throw error;
    }
  };
  
  export const getProductTypeById = async (id) => {
    const baseUrl = 'http://localhost:9091/api/product-types';
    try {
      const response = await fetch(`${baseUrl}/${id}`);
      if (response.status === 404) {
        return null;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error getting product type with ID ${id}:`, error);
      throw error;
    }
  };
  
  export const updateProductType = async (id, productType) => {
    const baseUrl = 'http://localhost:9091/api/product-types';
    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productType),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error updating product type with ID ${id}:`, error);
      throw error;
    }
  };
  
  export const deleteProductType = async (id) => {
    const baseUrl = 'http://localhost:9091/api/product-types';
    try {
      await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error(`Error deleting product type with ID ${id}:`, error);
      throw error;
    }
  };
  