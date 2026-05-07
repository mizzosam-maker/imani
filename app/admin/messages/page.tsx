/*"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  CheckCircle, 
  Trash2, 
  Eye,
  ArrowLeft,
  RefreshCw 
} from "lucide-react";

interface Message {
  _id: string;
  name: string;
  phone: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  productId?: string;
}

export default function AdminMessagesPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [filter, setFilter] = useState<"all" | "read" | "unread">("all");

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      router.push("/login");
      return;
    }
    if (!isAdmin) {
      router.push("/");
      return;
    }
    fetchMessages();
  }, [user, isAdmin, authLoading, router]);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages");
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: "PUT",
      });
      if (res.ok) {
        setMessages(messages.map(msg => 
          msg._id === id ? { ...msg, isRead: true } : msg
        ));
        if (selectedMessage?._id === id) {
          setSelectedMessage({ ...selectedMessage, isRead: true });
        }
      }
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMessages(messages.filter(msg => msg._id !== id));
        if (selectedMessage?._id === id) {
          setSelectedMessage(null);
        }
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const markAllAsRead = async () => {
    const unreadMessages = messages.filter(msg => !msg.isRead);
    for (const message of unreadMessages) {
      await markAsRead(message._id);
    }
  };

  const filteredMessages = messages.filter(msg => {
    if (filter === "read") return msg.isRead;
    if (filter === "unread") return !msg.isRead;
    return true;
  });

  const unreadCount = messages.filter(msg => !msg.isRead).length;

  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e8b924] mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header *
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <div>
          <Link
            href="/admin"
            className="text-[#4d4d4d] hover:text-[#e8b924] transition mb-2 inline-flex items-center space-x-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold mt-2">
            Customer <span className="text-[#e8b924]">Messages</span>
          </h1>
          <p className="text-[#4d4d4d] mt-1">
            View and manage customer inquiries
          </p>
        </div>
        
        <div className="flex gap-3">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="bg-[#e8b924] text-[#0e0e10] px-4 py-2 rounded-lg font-semibold hover:bg-[#ddc25d] transition flex items-center space-x-2"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Mark All as Read</span>
            </button>
          )}
          <button
            onClick={fetchMessages}
            className="border-2 border-[#e8b924] text-[#0e0e10] px-4 py-2 rounded-lg font-semibold hover:bg-[#e8b924] transition flex items-center space-x-2"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Stats Summary *
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#fcf8d6] p-4 rounded-lg">
          <p className="text-sm text-[#4d4d4d]">Total Messages</p>
          <p className="text-2xl font-bold">{messages.length}</p>
        </div>
        <div className="bg-[#fcf8d6] p-4 rounded-lg">
          <p className="text-sm text-[#4d4d4d]">Unread</p>
          <p className="text-2xl font-bold text-[#e8b924]">{unreadCount}</p>
        </div>
        <div className="bg-[#fcf8d6] p-4 rounded-lg">
          <p className="text-sm text-[#4d4d4d]">Read</p>
          <p className="text-2xl font-bold text-green-600">{messages.length - unreadCount}</p>
        </div>
      </div>

      {/* Filter Tabs *
      <div className="flex space-x-2 mb-6 border-b border-[#d5c37d]">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 font-medium transition ${
            filter === "all"
              ? "text-[#e8b924] border-b-2 border-[#e8b924]"
              : "text-[#4d4d4d] hover:text-[#e8b924]"
          }`}
        >
          All Messages
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-4 py-2 font-medium transition ${
            filter === "unread"
              ? "text-[#e8b924] border-b-2 border-[#e8b924]"
              : "text-[#4d4d4d] hover:text-[#e8b924]"
          }`}
        >
          Unread ({unreadCount})
        </button>
        <button
          onClick={() => setFilter("read")}
          className={`px-4 py-2 font-medium transition ${
            filter === "read"
              ? "text-[#e8b924] border-b-2 border-[#e8b924]"
              : "text-[#4d4d4d] hover:text-[#e8b924]"
          }`}
        >
          Read
        </button>
      </div>

      {/* Messages Grid *
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List *
        <div className="lg:col-span-1 space-y-3">
          {filteredMessages.length === 0 ? (
            <div className="bg-[#fcf8d6] rounded-lg p-8 text-center">
              <MessageSquare className="w-12 h-12 text-[#e8b924] mx-auto mb-4" />
              <p className="text-[#4d4d4d]">No messages found</p>
            </div>
          ) : (
            filteredMessages.map((message) => (
              <div
                key={message._id}
                onClick={() => setSelectedMessage(message)}
                className={`bg-[#fcf8d6] rounded-lg p-4 cursor-pointer transition hover:shadow-md ${
                  selectedMessage?._id === message._id
                    ? "ring-2 ring-[#e8b924] shadow-md"
                    : ""
                } ${!message.isRead ? "border-l-4 border-[#e8b924]" : ""}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold">{message.name}</h3>
                    <p className="text-sm text-[#4d4d4d]">{message.phone}</p>
                  </div>
                  {!message.isRead && (
                    <span className="bg-[#e8b924] text-xs px-2 py-1 rounded-full">
                      New
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#4d4d4d] line-clamp-2">{message.message}</p>
                <p className="text-xs text-[#4d4d4d] mt-2">
                  {new Date(message.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Message Detail View *
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <div className="bg-[#fcf8d6] rounded-lg p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{selectedMessage.name}</h2>
                  <div className="flex items-center space-x-4 text-sm text-[#4d4d4d]">
                    <span className="flex items-center space-x-1">
                      <Phone className="w-4 h-4" />
                      <span>{selectedMessage.phone}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Mail className="w-4 h-4" />
                      <span>{new Date(selectedMessage.createdAt).toLocaleString()}</span>
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {!selectedMessage.isRead && (
                    <button
                      onClick={() => markAsRead(selectedMessage._id)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                      title="Mark as read"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteMessage(selectedMessage._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Delete message"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="border-t border-[#d5c37d] pt-4">
                <h3 className="font-semibold mb-2">Message:</h3>
                <p className="text-[#0e0e10] whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </p>
              </div>

              {selectedMessage.productId && (
                <div className="border-t border-[#d5c37d] mt-4 pt-4">
                  <h3 className="font-semibold mb-2">Product Reference:</h3>
                  <Link
                    href={`/product/${selectedMessage.productId}`}
                    target="_blank"
                    className="text-[#e8b924] hover:underline"
                  >
                    View Product →
                  </Link>
                </div>
              )}

              <div className="border-t border-[#d5c37d] mt-6 pt-4">
                <button
                  onClick={() => {
                    const phone = selectedMessage.phone.replace(/\D/g, '');
                    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
                      `Hello ${selectedMessage.name}, thank you for your message. How can we help you today?`
                    )}`;
                    window.open(whatsappUrl, "_blank");
                  }}
                  className="w-full bg-[#25D366] text-white py-3 rounded-lg font-semibold hover:bg-[#128C7E] transition flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Reply on WhatsApp</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-[#fcf8d6] rounded-lg p-12 text-center">
              <MessageSquare className="w-16 h-16 text-[#d5c37d] mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Select a Message</h3>
              <p className="text-[#4d4d4d]">
                Choose a message from the list to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}*/

"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  CheckCircle, 
  Trash2, 
  Eye,
  ArrowLeft,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Filter
} from "lucide-react";

interface Message {
  _id: string;
  name: string;
  phone: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  productId?: string;
}

export default function AdminMessagesPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [filter, setFilter] = useState<"all" | "read" | "unread">("all");
  const [isMobileListOpen, setIsMobileListOpen] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      router.push("/login");
      return;
    }
    if (!isAdmin) {
      router.push("/");
      return;
    }
    fetchMessages();
  }, [user, isAdmin, authLoading, router]);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages");
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: "PUT",
      });
      if (res.ok) {
        setMessages(messages.map(msg => 
          msg._id === id ? { ...msg, isRead: true } : msg
        ));
        if (selectedMessage?._id === id) {
          setSelectedMessage({ ...selectedMessage, isRead: true });
        }
      }
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMessages(messages.filter(msg => msg._id !== id));
        if (selectedMessage?._id === id) {
          setSelectedMessage(null);
          // On mobile, switch back to list view
          if (window.innerWidth < 1024) {
            setIsMobileListOpen(true);
          }
        }
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const markAllAsRead = async () => {
    const unreadMessages = messages.filter(msg => !msg.isRead);
    for (const message of unreadMessages) {
      await markAsRead(message._id);
    }
  };

  const filteredMessages = messages.filter(msg => {
    if (filter === "read") return msg.isRead;
    if (filter === "unread") return !msg.isRead;
    return true;
  });

  const unreadCount = messages.filter(msg => !msg.isRead).length;

  const handleSelectMessage = (message: Message) => {
    setSelectedMessage(message);
    // On mobile, switch to detail view
    if (window.innerWidth < 1024) {
      setIsMobileListOpen(false);
    }
  };

  const handleBackToList = () => {
    setIsMobileListOpen(true);
  };

  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e8b924] mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-6 lg:py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 lg:mb-8">
        <div>
          <Link
            href="/admin"
            className="text-[#4d4d4d] hover:text-[#e8b924] transition mb-2 inline-flex items-center space-x-1 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold mt-2">
            Customer <span className="text-[#e8b924]">Messages</span>
          </h1>
          <p className="text-[#4d4d4d] mt-1 text-sm sm:text-base">
            View and manage customer inquiries
          </p>
        </div>
        
        <div className="flex gap-3 w-full lg:w-auto">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex-1 lg:flex-initial bg-[#e8b924] text-[#0e0e10] px-3 sm:px-4 py-2 rounded-lg font-semibold hover:bg-[#ddc25d] transition flex items-center justify-center space-x-2 text-sm sm:text-base"
            >
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Mark All Read</span>
            </button>
          )}
          <button
            onClick={fetchMessages}
            className="flex-1 lg:flex-initial border-2 border-[#e8b924] text-[#0e0e10] px-3 sm:px-4 py-2 rounded-lg font-semibold hover:bg-[#e8b924] transition flex items-center justify-center space-x-2 text-sm sm:text-base"
          >
            <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Stats Summary - Hide on mobile? Keep but make responsive */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
        <div className="bg-[#fcf8d6] p-3 sm:p-4 rounded-lg">
          <p className="text-xs sm:text-sm text-[#4d4d4d]">Total</p>
          <p className="text-xl sm:text-2xl font-bold">{messages.length}</p>
        </div>
        <div className="bg-[#fcf8d6] p-3 sm:p-4 rounded-lg">
          <p className="text-xs sm:text-sm text-[#4d4d4d]">Unread</p>
          <p className="text-xl sm:text-2xl font-bold text-[#e8b924]">{unreadCount}</p>
        </div>
        <div className="bg-[#fcf8d6] p-3 sm:p-4 rounded-lg">
          <p className="text-xs sm:text-sm text-[#4d4d4d]">Read</p>
          <p className="text-xl sm:text-2xl font-bold text-green-600">{messages.length - unreadCount}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-4 sm:mb-6 border-b border-[#d5c37d] overflow-x-auto">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 sm:px-4 py-2 text-sm sm:text-base font-medium whitespace-nowrap transition ${
            filter === "all"
              ? "text-[#e8b924] border-b-2 border-[#e8b924]"
              : "text-[#4d4d4d] hover:text-[#e8b924]"
          }`}
        >
          All Messages
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-3 sm:px-4 py-2 text-sm sm:text-base font-medium whitespace-nowrap transition ${
            filter === "unread"
              ? "text-[#e8b924] border-b-2 border-[#e8b924]"
              : "text-[#4d4d4d] hover:text-[#e8b924]"
          }`}
        >
          Unread ({unreadCount})
        </button>
        <button
          onClick={() => setFilter("read")}
          className={`px-3 sm:px-4 py-2 text-sm sm:text-base font-medium whitespace-nowrap transition ${
            filter === "read"
              ? "text-[#e8b924] border-b-2 border-[#e8b924]"
              : "text-[#4d4d4d] hover:text-[#e8b924]"
          }`}
        >
          Read
        </button>
      </div>

      {/* Mobile View Toggle */}
      <div className="lg:hidden mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => setIsMobileListOpen(true)}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
              isMobileListOpen
                ? "bg-[#e8b924] text-[#0e0e10]"
                : "bg-[#fcf8d6] text-[#4d4d4d]"
            }`}
          >
            Messages List
          </button>
          <button
            onClick={() => setIsMobileListOpen(false)}
            disabled={!selectedMessage}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
              !isMobileListOpen
                ? "bg-[#e8b924] text-[#0e0e10]"
                : "bg-[#fcf8d6] text-[#4d4d4d]"
            } ${!selectedMessage && "opacity-50 cursor-not-allowed"}`}
          >
            Message Details
          </button>
        </div>
      </div>

      {/* Messages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Messages List - Hide on mobile when detail is open */}
        <div className={`lg:col-span-1 space-y-3 ${
          !isMobileListOpen ? "hidden lg:block" : "block"
        }`}>
          {/* Back button on mobile detail view */}
          {!isMobileListOpen && selectedMessage && (
            <button
              onClick={handleBackToList}
              className="lg:hidden w-full mb-3 flex items-center justify-center space-x-2 px-4 py-2 bg-[#fcf8d6] rounded-lg text-[#0e0e10]"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back to Messages</span>
            </button>
          )}

          {filteredMessages.length === 0 ? (
            <div className="bg-[#fcf8d6] rounded-lg p-8 text-center">
              <MessageSquare className="w-12 h-12 text-[#e8b924] mx-auto mb-4" />
              <p className="text-[#4d4d4d]">No messages found</p>
            </div>
          ) : (
            filteredMessages.map((message) => (
              <div
                key={message._id}
                onClick={() => handleSelectMessage(message)}
                className={`bg-[#fcf8d6] rounded-lg p-3 sm:p-4 cursor-pointer transition hover:shadow-md ${
                  selectedMessage?._id === message._id && !isMobileListOpen
                    ? "ring-2 ring-[#e8b924] shadow-md lg:ring-2"
                    : ""
                } ${!message.isRead ? "border-l-4 border-l-[#e8b924]" : ""}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base truncate">{message.name}</h3>
                    <p className="text-xs sm:text-sm text-[#4d4d4d]">{message.phone}</p>
                  </div>
                  {!message.isRead && (
                    <span className="bg-[#e8b924] text-[#0e0e10] text-xs px-2 py-1 rounded-full whitespace-nowrap ml-2">
                      New
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-[#4d4d4d] line-clamp-2">{message.message}</p>
                <p className="text-xs text-[#4d4d4d] mt-2">
                  {new Date(message.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Message Detail View */}
        <div className={`lg:col-span-2 ${
          isMobileListOpen ? "hidden lg:block" : "block"
        }`}>
          {selectedMessage ? (
            <div className="bg-[#fcf8d6] rounded-lg p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-0 sm:items-start mb-4 sm:mb-6">
                <div className="w-full sm:w-auto">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-2 break-words">{selectedMessage.name}</h2>
                  <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-[#4d4d4d]">
                    <span className="flex items-center space-x-1">
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="break-all">{selectedMessage.phone}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{new Date(selectedMessage.createdAt).toLocaleString()}</span>
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {!selectedMessage.isRead && (
                    <button
                      onClick={() => markAsRead(selectedMessage._id)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                      title="Mark as read"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteMessage(selectedMessage._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Delete message"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="border-t border-[#d5c37d] pt-4">
                <h3 className="font-semibold text-sm sm:text-base mb-2">Message:</h3>
                <p className="text-sm sm:text-base text-[#0e0e10] whitespace-pre-wrap leading-relaxed break-words">
                  {selectedMessage.message}
                </p>
              </div>

              {selectedMessage.productId && (
                <div className="border-t border-[#d5c37d] mt-4 pt-4">
                  <h3 className="font-semibold text-sm sm:text-base mb-2">Product Reference:</h3>
                  <Link
                    href={`/product/${selectedMessage.productId}`}
                    target="_blank"
                    className="text-[#e8b924] hover:underline text-sm sm:text-base"
                  >
                    View Product →
                  </Link>
                </div>
              )}

              <div className="border-t border-[#d5c37d] mt-6 pt-4">
                <button
                  onClick={() => {
                    const phone = selectedMessage.phone.replace(/\D/g, '');
                    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
                      `Hello ${selectedMessage.name}, thank you for your message. How can we help you today?`
                    )}`;
                    window.open(whatsappUrl, "_blank");
                  }}
                  className="w-full bg-[#25D366] text-white py-3 rounded-lg font-semibold hover:bg-[#128C7E] transition flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Reply on WhatsApp</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-[#fcf8d6] rounded-lg p-8 sm:p-12 text-center">
              <MessageSquare className="w-12 h-12 sm:w-16 sm:h-16 text-[#d5c37d] mx-auto mb-4" />
              <h3 className="text-base sm:text-lg font-semibold mb-2">Select a Message</h3>
              <p className="text-sm sm:text-base text-[#4d4d4d]">
                Choose a message from the list to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}