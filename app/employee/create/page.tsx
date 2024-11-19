"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CreateEmployee = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [position, setPosition] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("https://employee-management-back-gj0ho5yab.vercel.app//api/v1/employee/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, address, position }),
      });

      if (response.ok) {
        alert("Employee added successfully");

        setName("");
        setPhone("");
        setAddress("");
        setPosition("");
        router.push("/");
      } else {
        alert("Error adding employee");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Employee</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default CreateEmployee;
