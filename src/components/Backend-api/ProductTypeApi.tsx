const baseUrl = 'http://localhost:8081/Product-microservice/api/product-types';

export const createProductType = async (productType) => {
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
  try {
    await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(`Error deleting product type with ID ${id}:`, error);
    throw error;
  }
};
