"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";

const EditEmployee = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params); 

  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [position, setPosition] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`https://employee-management-back.vercel.app//api/employee/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch employee data");
        }
        const data = await response.json();
        const { employee } = data;
        setName(employee.name);
        setPhone(employee.phone);
        setAddress(employee.address);
        setPosition(employee.position);
        setLoading(false);
      } catch (err) {
        setError(`Error fetching employee data. ${err}`);
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://employee-management-back.vercel.app//api/employee/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, address, position }),
      });

      if (response.ok) {
        alert("Employee updated successfully");
        router.push("/"); // Redirect to home or employee list
      } else {
        alert("Error updating employee");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Error updating employee.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Employee</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Enter name"
          />
        </div>
        <div>
          <label className="block text-gray-700">Phone</label>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Enter phone number"
          />
        </div>
        <div>
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Enter address"
          />
        </div>
        <div>
          <label className="block text-gray-700">Position</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Enter position"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800"
        >
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;
