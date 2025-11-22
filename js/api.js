// API Configuration
const API_URL = 'http://localhost:5000/api'; // Change to Railway URL when deployed

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// Set token in localStorage
const setToken = (token) => localStorage.setItem('token', token);

// Remove token
const removeToken = () => localStorage.removeItem('token');

// API Helper function
async function apiRequest(endpoint, options = {}) {
  const token = getToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    ...options
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Auth API
const authAPI = {
  register: async (name, email, password) => {
    const data = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });
    setToken(data.token);
    return data;
  },

  login: async (email, password) => {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    setToken(data.token);
    return data;
  },

  logout: () => {
    removeToken();
    window.location.reload();
  },

  getCurrentUser: async () => {
    return await apiRequest('/auth/me');
  },

  isLoggedIn: () => !!getToken()
};

// Routes API
const routesAPI = {
  save: async (routeData) => {
    return await apiRequest('/routes', {
      method: 'POST',
      body: JSON.stringify(routeData)
    });
  },

  getAll: async () => {
    return await apiRequest('/routes');
  },

  getById: async (id) => {
    return await apiRequest(`/routes/${id}`);
  },

  update: async (id, routeData) => {
    return await apiRequest(`/routes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(routeData)
    });
  },

  delete: async (id) => {
    return await apiRequest(`/routes/${id}`, {
      method: 'DELETE'
    });
  },

  share: async (id) => {
    return await apiRequest(`/routes/${id}/share`, {
      method: 'POST'
    });
  },

  getShared: async (token) => {
    return await apiRequest(`/routes/shared/${token}`);
  }
};

// Users API
const usersAPI = {
  updatePreferences: async (preferences) => {
    return await apiRequest('/users/preferences', {
      method: 'PUT',
      body: JSON.stringify(preferences)
    });
  },

  getProfile: async () => {
    return await apiRequest('/users/profile');
  },

  updateProfile: async (profileData) => {
    return await apiRequest('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  }
};

