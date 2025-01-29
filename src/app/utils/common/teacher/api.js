import axios from 'axios';

export const fetchTeacherProfile = async (teacherId) => {
  try {
    const response = await axios.get(`/api/teacher/digital-card/${teacherId}`);
   
    return response;
  } catch (error) {
    console.error('Error fetching teacher profile:', error);
  }
};
