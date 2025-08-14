import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
});

// File Analysis Endpoints
export const analyzeDeepfake = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return API.post('/analyze/deepfake', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const analyzeVoice = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return API.post('/analyze/voice', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const analyzeDocument = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return API.post('/analyze/document', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Trust Score Calculation
export const calculateTrustScore = (data) => API.post('/calculate/trustscore', data);

// User Registration
export const registerUser = (userData) => API.post('/register', userData);