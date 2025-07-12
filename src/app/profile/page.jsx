"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react"; // Import useRef
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
  // Use a ref to store the original user data when editing starts
  const originalUserRef = useRef(null);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const fetchUserData = async () => {
    try {
      const res = await fetch("/api/user");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log('profile page fetched data--->', data);
      const fetchedUserData = {
        name: data.name,
        email: data.email,
        university: data.university || "",
        address: data.address || "",
      };
      setUser(fetchedUserData);
      // Store the fetched data as the original state
      originalUserRef.current = fetchedUserData;
    } catch (err) {
      console.error("Failed to load user data:", err);
      toast.error("Failed to load profile data.");
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
        // Update the originalUserRef with the new saved data
        originalUserRef.current = user;
      } else {
        toast.error("Update failed.");
      }
    } catch (err) {
      toast.error("Server error.");
      console.error(err);
    }
  };

  // NEW: handleCancel function
  const handleCancel = () => {
    // Revert user state to the original data
    if (originalUserRef.current) {
      setUser(originalUserRef.current);
    }
    setIsEditing(false); // Exit editing mode
    toast("Changes discarded.", { icon: '👋' });
  };

  useEffect(() => {
    fetchUserData();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 md:p-8">
      <div className="bg-gradient-to-br from-white via-purple-50 to-pink-50 shadow-xl rounded-xl p-6 md:p-10 border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">My Profile</h2>

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
              <p className="text-base">{user.university || 'n/a'}</p>
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
              <p className="text-base">{user.address || 'n/a'}</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-end gap-4"> {/* Added gap-4 for spacing */}
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="btn bg-button-bg text-white hover:bg-button-bg"
              >
                <FaSave className="mr-2" /> Save
              </button>
              {/* NEW: Cancel button */}
              <button
                onClick={handleCancel}
                className="btn bg-gray-400 text-white hover:bg-gray-500"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="btn bg-button-bg text-white hover:bg-bg-button-bg"
            >
              <FaUserEdit className="mr-2" /> Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
