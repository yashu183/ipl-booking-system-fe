const API_BASE_URL = 'http://localhost:5555/api'; // Update if needed
const token = ""
export const getBookings = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch bookings');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};


export const cancelBooking = async (bookingId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to cancel bookings');
    }
    return await response.json();
  } catch (error) {
    console.error('Error cancelling booking:', error);
    throw error;
  }
};
