const API_BASE_URL = 'http://localhost:5555/api'; // Update if needed
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiY3lhc2h1MjAwMEBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NDI0OTc0OTksImV4cCI6MTc0MjUwMTA5OX0.5EZuLZ-ieJLg6oj3tHxfcQonAuBeDfYlcqJH1a1aZlA";

export const getBookings = async (userId) => {
  try {
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
