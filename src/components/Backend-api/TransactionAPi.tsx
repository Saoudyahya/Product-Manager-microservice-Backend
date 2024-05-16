const baseUrl = 'http://localhost:9091/api/transactions';
const clientUrl = 'http://localhost:8000/api/clients'; 
export const createTransactionProduct = async (transactionProduct) => {
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionProduct),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating transaction product:', error);
    throw error;
  }
};

export const getTransactionClient = async () => {
    try {
      const response = await fetch(clientUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating transaction Client:', error);
      throw error;
    }
  };

export const getAllTransaction = async () => {
  try {
    const response = await fetch(baseUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting transaction products:', error);
    throw error;
  }
};

export const getTransactionById = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/${id}`);
    if (response.status === 404) {
      return null;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error getting transaction product with ID ${id}:`, error);
    throw error;
  }
};

export const updateTransaction = async (id, transactionProduct) => {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionProduct),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error updating transaction product with ID ${id}:`, error);
    throw error;
  }
};

export const deleteTransaction = async (id) => {
  try {
    await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(`Error deleting transaction product with ID ${id}:`, error);
    throw error;
  }
};
