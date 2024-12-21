// src/services/reportService.js
import axios from 'axios';
import { BASE_URL } from '../environment/environment';


export const fetchPeakTimes = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/reports/peak-times`, {
      params: { startDate, endDate }
    });
    return response.data.report;
  } catch (error) {
    console.error('Error fetching peak times:', error);
    throw error;
  }
};

export const fetchPeakTimes2 = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/reports/peak-times2`, {
      params: { startDate, endDate }
    });
    return response.data.report;
  } catch (error) {
    console.error('Error fetching peak times:', error);
    throw error;
  }
};

