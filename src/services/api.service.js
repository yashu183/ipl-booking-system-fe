const API_BASE_URL = 'http://localhost:5555/api';

export const getBookings = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const httpResponse = await fetch(`${API_BASE_URL}/bookings/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    // reading response stream
    const response = await httpResponse.json();

    // check for failed response
    if(response.exception) {
      throw(response.exception)
    }

    return response.responseData;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

export const cancelBooking = async (bookingId) => {
  try {
    const token = localStorage.getItem('token');
    const httpResponse = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    
    // reading response stream
    const response = await httpResponse.json();

    // check for failed response
    if(response.exception) {
      throw(response.exception)
    }

    return response.responseData;
  } catch (error) {
    console.error('Error cancelling booking:', error);
    throw error;
  }
};

export const loginUser = async (user) => {
  try {
    const token = localStorage.getItem('token');
    const httpResponse = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user)
    });
    
    // reading response stream
    const response = await httpResponse.json();

    // check for failed response
    if(response.exception) {
      throw(response.exception)
    }

    return response.responseData;
  } catch (error) {
    console.error('Error cancelling booking:', error);
    throw error;
  }
}

export const getUserById = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const httpResponse = await fetch(`${API_BASE_URL}/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });
    
    // reading response stream
    const response = await httpResponse.json();

    // check for failed response
    if(response.exception) {
      throw(response.exception)
    }

    return response.responseData;
  } catch (error) {
    console.error('Error getting the user by ID:', error);
    throw error;
  }
}

export const registerUser = async (user) => {
  try {
    const token = localStorage.getItem('token');
    const httpResponse = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user)
    });
    
    // reading response stream
    const response = await httpResponse.json();

    // check for failed response
    if(response.exception) {
      throw(response.exception)
    }

    return response.responseData;
  } catch (error) {
    console.error('Error registering the user:', error);
    throw error;
  }
}
