const baseUrl = 'http://localhost:8081/import-export-service/api/operations';

export const createOperation = async (operation) => {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(operation),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating operation:', error);
    throw error;
  }
};

export const getAllOperations = async () => {
  try {
    const response = await fetch(baseUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting operations:', error);
    throw error;
  }
};

export const getOperationById = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/${id}`);
    if (response.status === 404) {
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error getting operation with ID ${id}:`, error);
    throw error;
  }
};

export const updateOperation = async (id, operation) => {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(operation),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error updating operation with ID ${id}:`, error);
    throw error;
  }
};

export const deleteOperation = async (id) => {
  try {
    await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(`Error deleting operation with ID ${id}:`, error);
    throw error;
  }
};
