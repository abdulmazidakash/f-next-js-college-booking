"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaUserEdit, FaSave } from "react-icons/fa";
import { MdEmail, MdSchool, MdLocationOn } from "react-icons/md";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    university: "",
    address: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const fetchUserData = async () => {
    try {
      const res = await fetch("/api/user");
      const data = await res.json();
      console.log('profile page fetch data--->', data);
      setUser({
        name: data.name,
        email: data.email,
        university: data.university || "",
        address: data.address || "",
      });
    } catch (err) {
      console.error("Failed to load user data:", err);
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      } else {
        toast.error("Update failed.");
      }
    } catch (err) {
      toast.error("Server error.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="bg-white shadow-xl rounded-xl p-6 md:p-10 border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">My Profile</h2>

        <div className="space-y-6">
          {/* Image */}
          <div className="flex justify-center">
            <Image
              title={session?.user?.name}
              src={session?.user?.image || "/assets/default-avatar.png"}
              width={80}
              height={80}
              alt="user-avatar"
              className="rounded-full border border-gray-300"
              priority
            />
          </div>

          {/* Name */}
          <div className="flex items-center gap-3">
            <FaUserEdit className="text-xl text-gray-600" />
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="input input-bordered w-full max-w-md"
                placeholder="Your name"
              />
            ) : (
              <p className="text-lg font-medium">{user.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex items-center gap-3">
            <MdEmail className="text-xl text-gray-600" />
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="input input-bordered w-full max-w-md"
                placeholder="Email"
              />
            ) : (
              <p className="text-base">{user.email}</p>
            )}
          </div>

          {/* University */}
          <div className="flex items-center gap-3">
            <MdSchool className="text-xl text-gray-600" />
            {isEditing ? (
              <input
                type="text"
                name="university"
                value={user.university}
                onChange={handleChange}
                className="input input-bordered w-full max-w-md"
                placeholder="University"
              />
            ) : (
              <p className="text-base">{user.university}</p>
            )}
          </div>

          {/* Address */}
          <div className="flex items-center gap-3">
            <MdLocationOn className="text-xl text-gray-600" />
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={user.address}
                onChange={handleChange}
                className="input input-bordered w-full max-w-md"
                placeholder="Address"
              />
            ) : (
              <p className="text-base">{user.address}</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-end">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="btn bg-green-600 text-white hover:bg-green-700"
            >
              <FaSave className="mr-2" /> Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="btn bg-blue-600 text-white hover:bg-blue-700"
            >
              <FaUserEdit className="mr-2" /> Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
