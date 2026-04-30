"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Search, Trash2, Edit, Shield, User as UserIcon } from "lucide-react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  phone?: string;
  address?: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const { user: currentUser, isAdmin } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
      return;
    }
    if (!isAdmin) {
      router.push("/");
      return;
    }
    fetchUsers();
  }, [currentUser, isAdmin]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    if (id === currentUser?._id) {
      alert("You cannot delete your own account");
      return;
    }

    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;

    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setUsers(users.filter(user => user._id !== id));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const toggleAdmin = async (id: string, currentRole: string) => {
    if (id === currentUser?._id) {
      alert("You cannot change your own role");
      return;
    }

    const newRole = currentRole === "admin" ? "user" : "admin";
    
    if (!confirm(`Are you sure you want to make this user ${newRole === "admin" ? "an admin" : "a regular user"}?`)) return;

    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (res.ok) {
        setUsers(users.map(user => 
          user._id === id ? { ...user, role: newRole as "user" | "admin" } : user
        ));
      }
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const filteredUsers = users.filter(user => {
    return (
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.phone?.includes(search)
    );
  });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e8b924] mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Manage <span className="text-[#e8b924]">Users</span>
      </h1>

      {/* Search */}
      <div className="bg-[#fcf8d6] p-4 rounded-lg mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#4d4d4d]" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#d5c37d] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e8b924] bg-[#fafaf3]"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#fcf8d6] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#e8b924] text-[#0e0e10]">
              <tr>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Contact</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Joined</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#d5c37d]">
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-[#f6e9a6] transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#e8b924] rounded-full flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-[#0e0e10]" />
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-[#4d4d4d]">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <div>{user.phone || "—"}</div>
                      <div className="text-sm text-[#4d4d4d]">{user.address || "—"}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === "admin" 
                        ? "bg-[#e8b924] text-[#0e0e10]" 
                        : "bg-gray-200 text-gray-800"
                    }`}>
                      {user.role === "admin" ? "Admin" : "User"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleAdmin(user._id, user.role)}
                        className="p-1 text-[#e8b924] hover:text-[#ddc25d] transition"
                        title={user.role === "admin" ? "Remove admin" : "Make admin"}
                      >
                        <Shield className="w-5 h-5" />
                      </button>
                      {user._id !== currentUser?._id && (
                        <button
                          onClick={() => deleteUser(user._id)}
                          className="p-1 text-red-600 hover:text-red-800 transition"
                          title="Delete user"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-8">
            <p className="text-[#4d4d4d]">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
}