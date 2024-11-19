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
  
  
export const createEmployee = async (data: Omit<Employee, 'id'>): Promise<Employee> =>
  axios.post(`${API_BASE_URL}/employee/add`, data).then(res => res.data);

export const updateEmployee = async (id: number, data: Omit<Employee, 'id'>): Promise<Employee> =>
  axios.put(`${API_BASE_URL}/employees/${id}`, data).then(res => res.data);

export const deleteEmployee = async (id: string): Promise<void> =>
  axios.delete(`${API_BASE_URL}/employee/${id}`).then(res => res.data);
