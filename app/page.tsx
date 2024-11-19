"use client";

import { useEffect, useState } from "react";
import { fetchEmployees, deleteEmployee, Employee } from "./utils/api";
import Link from "next/link";

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await fetchEmployees();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    loadEmployees();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteEmployee(id);
      setEmployees((prev) => prev.filter((emp) => emp._id !== id));
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Employee Management</h1>
      <div className="overflow-x-auto">
      <Link
        className="px-2 bg-purple-700 text-white text-2xl p-3 m-5 rounded-md"
        href="/employee/create"
      >
        Add Employee
      </Link>      

        <table className="min-w-full border-collapse border border-gray-200 shadow-md mt-5">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase">
                Name
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase">
                Phone
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase">
                Address
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase">
                Position
              </th>
              <th className="px-6 py-3 border-b border-gray-200 text-center text-sm font-semibold text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {employees.length > 0 ? (
              employees.map((emp) => (
                <tr key={emp._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                    {emp.name}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                    {emp.phone}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                    {emp.address}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                    {emp.position}
                  </td>
                  <td className="px-6 py-4 border-b border-gray-200 text-center flex gap-2">
                  <Link
                  href={`/employee/edit/${emp._id}`}
                  className="bg-blue-500 text-white px-4 py-2 text-sm rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                >
                  Edit
                </Link>
                    <button
                      className="bg-red-500 text-white px-4 py-2 text-sm rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                      onClick={() => handleDelete(emp._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-4 border-b border-gray-200 text-center text-sm text-gray-500"
                >
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
