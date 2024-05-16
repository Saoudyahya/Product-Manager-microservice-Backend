const BASE_URL = 'http://localhost:9090/api/suppliers';

export async function getAllSuppliers() {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch suppliers');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching suppliers:', error.message);
    throw error;
  }
}

export async function getSupplierById(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Supplier not found');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching supplier by ID:', error.message);
    throw error;
  }
}

export async function createSupplier(supplierData) {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(supplierData)
      
    });
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error creating supplier:', error.message);
    throw error;
  }
}

export async function updateSupplier(id, updatedSupplierData) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedSupplierData)
    });
    if (!response.ok) {
      throw new Error('Failed to update supplier');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating supplier:', error.message);
    throw error;
  }
}

export async function deleteSupplier(id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to delete supplier');
    }
  } catch (error) {
    console.error('Error deleting supplier:', error.message);
    throw error;
  }
}
