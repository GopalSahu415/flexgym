import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const submitLead = (data) => API.post('/leads', data);
export const bookAppointment = (data) => API.post('/appointments', data);
export const getAdminStats = () => API.get('/admin/stats');
export const getLeads = () => API.get('/admin/leads');
export const getAppointments = () => API.get('/admin/appointments');
export const updateLeadStatus = (id, status) => API.patch(`/leads/${id}`, { status });
export const updateAppointmentStatus = (id, status) => API.patch(`/appointments/${id}`, { status });

export default API;
