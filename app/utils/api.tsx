import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api/v1';

export interface Employee {
  _id: string;
  id: number;
  name: string;
  phone: string;
  address: string;
  position: string;
}

export const fetchEmployees = async (): Promise<Employee[]> => {
    const response = await axios.get('http://localhost:4000/api/v1/employees');
    return response.data.employees;
  };

export const deleteEmployee = async (id: string): Promise<void> =>
  axios.delete(`${API_BASE_URL}/employee/${id}`).then(res => res.data);
