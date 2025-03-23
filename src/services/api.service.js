import { getUserId } from "../utils/utils.service";

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

export const confirmBooking = async (matchId, userId, ticketsCount) => {
  try {
    const token = localStorage.getItem('token');
    const httpResponse = await fetch(`${API_BASE_URL}/bookings/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        "userId": userId,
        "matchId": matchId,
        "bookedTkts": ticketsCount
      }
      )
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


export const getAllBookings = async () => {
  try {
    const token = localStorage.getItem('token');
    const httpResponse = await fetch(`${API_BASE_URL}/bookings/`, {
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

export const getAllUpcomingMatches = async () => {
  try {
    const token = localStorage.getItem('token');
    const httpResponse = await fetch(`${API_BASE_URL}/matches/upcoming`, {
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

export const getAllTeams = async () => {
  try {
    const token = localStorage.getItem('token');
    const httpResponse = await fetch(`${API_BASE_URL}/teams/`, {
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

export const getMatchById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const httpResponse = await fetch(`${API_BASE_URL}/matches/${id}`, {
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

export const createMatch = async (match) => {
  try {
    const token = localStorage.getItem('token');
    const httpResponse = await fetch(`${API_BASE_URL}/matches/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(match)
    });
    
    // reading response stream
    const response = await httpResponse.json();

    // check for failed response
    if(response.exception) {
      throw(response.exception)
    }

    return response.responseData;
  } catch (error) {
    console.error('Error creating match booking:', error);
    throw error;
  }
}

export const updateMatch = async (match, matchId) => {
  try {
    const token = localStorage.getItem('token');
    const httpResponse = await fetch(`${API_BASE_URL}/matches/${matchId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(match)
    });
    
    // reading response stream
    const response = await httpResponse.json();

    // check for failed response
    if(response.exception) {
      throw(response.exception)
    }

    return response.responseData;
  } catch (error) {
    console.error('Error updating match:', error);
    throw error;
  }
}

export const deleteMatch = async (matchId) => {
  try {
    const token = localStorage.getItem('token');
    const httpResponse = await fetch(`${API_BASE_URL}/matches/${matchId}`, {
      method: 'DELETE',
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
    console.error('Error updating match:', error);
    throw error;
  }
}