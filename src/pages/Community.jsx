import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { 
  MessageCircle, Send, Heart, Flag, Trash2, 
  Users, Sparkles, Shield, ArrowLeft,
  Ban, AlertTriangle, X, Settings, Eye, EyeOff
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Enhanced content filter with categories
const OFFENSIVE_PATTERNS = {
  bullying: ['stupid', 'idiot', 'loser', 'dumb', 'worthless', 'pathetic', 'trash'],
  threats: ['hate', 'kill', 'die', 'hurt', 'attack'],
  appearance: ['ugly', 'fat', 'hideous'],
  profanity: ['damn', 'hell', 'crap'],
};

const containsOffensiveContent = (text) => {
  const lowerText = text.toLowerCase();
  const allKeywords = Object.values(OFFENSIVE_PATTERNS).flat();
  return allKeywords.some(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    return regex.test(lowerText);
  });
};

const getOffensiveCategory = (text) => {
  const lowerText = text.toLowerCase();
  for (const [category, keywords] of Object.entries(OFFENSIVE_PATTERNS)) {
    if (keywords.some(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'i');
      return regex.test(lowerText);
    })) {
      return category;
    }
  }
  return null;
};

export default function Community() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [reportedMessages, setReportedMessages] = useState(new Set());
  const [likedMessages, setLikedMessages] = useState(new Set());
  const [blockedUsers, setBlockedUsers] = useState(new Set());
  const [showBlockedUsers, setShowBlockedUsers] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportTarget, setReportTarget] = useState(null);
  const [reportReason, setReportReason] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    
    fetchMessages();
    fetchBlockedUsers();
  }, [user, navigate]);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("community_messages")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (!error) {
        setMessages(data || []);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const fetchBlockedUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("user_blocks")
        .select("blocked_id")
        .eq("blocker_id", user.id);

      if (!error && data) {
        setBlockedUsers(new Set(data.map(block => block.blocked_id)));
      }
    } catch (error) {
      console.error("Error fetching blocked users:", error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;

    const category = getOffensiveCategory(newMessage);
    if (category) {
      const categoryMessages = {
        bullying: "Your message contains language that could be hurtful. Let's keep our community supportive! 💜",
        threats: "Your message contains threatening language. This community is a safe space for everyone.",
        appearance: "Comments about appearance aren't allowed. Let's focus on uplifting each other! ✨",
        profanity: "Please keep language family-friendly and respectful.",
      };
      
      alert(`⚠️ ${categoryMessages[category] || "Your message contains inappropriate content."}`);
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from("community_messages")
        .insert({
          user_id: user.id,
          message: newMessage.trim(),
          likes: 0,
          reports: 0
        });

      if (!error) {
        setNewMessage("");
        fetchMessages();
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (messageId, currentLikes) => {
    if (likedMessages.has(messageId)) return;

    try {
      const { error } = await supabase
        .from("community_messages")
        .update({ likes: currentLikes + 1 })
        .eq("id", messageId);

      if (!error) {
        setLikedMessages(prev => new Set([...prev, messageId]));
        fetchMessages();
      }
    } catch (error) {
      console.error("Error liking message:", error);
    }
  };

  const handleReport = async (messageId, currentReports) => {
    if (reportedMessages.has(messageId)) {
      alert("You've already reported this message.");
      return;
    }

    try {
      const newReportCount = currentReports + 1;
      
      const { error } = await supabase
        .from("community_messages")
        .update({ 
          reports: newReportCount,
          is_hidden: newReportCount >= 3
        })
        .eq("id", messageId);

      if (!error) {
        setReportedMessages(prev => new Set([...prev, messageId]));
        alert("Thank you for reporting. This helps keep our community safe! 🛡️");
        fetchMessages();
      }
    } catch (error) {
      console.error("Error reporting message:", error);
    }
  };

  const handleReportUser = (message) => {
    setReportTarget(message);
    setShowReportModal(true);
  };

  const submitUserReport = async () => {
    if (!reportReason.trim() || !reportTarget) return;

    try {
      const { error } = await supabase
        .from("user_reports")
        .insert({
          reporter_id: user.id,
          reported_user_id: reportTarget.user_id,
          message_id: reportTarget.id,
          reason: reportReason.trim(),
          status: 'pending'
        });

      if (!error) {
        alert("User reported successfully. Our team will review this report. Thank you for keeping our community safe! 🛡️");
        setShowReportModal(false);
        setReportTarget(null);
        setReportReason("");
        
        // Also report the message
        await handleReport(reportTarget.id, reportTarget.reports);
      }
    } catch (error) {
      if (error.code === '23505') {
        alert("You've already reported this user for this message.");
      } else {
        console.error("Error reporting user:", error);
        alert("Failed to submit report. Please try again.");
      }
    }
  };

  const handleBlockUser = async (userId) => {
    if (userId === user.id) return;

    const confirmed = window.confirm(
      "Are you sure you want to block this user? You won't see their messages anymore."
    );

    if (!confirmed) return;

    try {
      const { error } = await supabase
        .from("user_blocks")
        .insert({
          blocker_id: user.id,
          blocked_id: userId,
          reason: "User blocked from community"
        });

      if (!error) {
        setBlockedUsers(prev => new Set([...prev, userId]));
        alert("User blocked successfully. Their messages will no longer appear for you.");
        fetchMessages();
      }
    } catch (error) {
      if (error.code === '23505') {
        alert("You've already blocked this user.");
      } else {
        console.error("Error blocking user:", error);
      }
    }
  };

  const handleUnblockUser = async (userId) => {
    try {
      const { error } = await supabase
        .from("user_blocks")
        .delete()
        .eq("blocker_id", user.id)
        .eq("blocked_id", userId);

      if (!error) {
        setBlockedUsers(prev => {
          const newSet = new Set(prev);
          newSet.delete(userId);
          return newSet;
        });
        fetchMessages();
      }
    } catch (error) {
      console.error("Error unblocking user:", error);
    }
  };

  const handleDelete = async (messageId) => {
    const confirmed = window.confirm("Are you sure you want to delete this message?");
    if (!confirmed) return;

    try {
      const { error } = await supabase
        .from("community_messages")
        .delete()
        .eq("id", messageId)
        .eq("user_id", user.id);

      if (!error) {
        fetchMessages();
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const getUserDisplay = () => {
    return user?.user_metadata?.name || 
           user?.email?.split("@")[0] || 
           "User";
  };

  const getFilteredMessages = () => {
    return messages.filter(msg => 
      !msg.is_hidden && !blockedUsers.has(msg.user_id)
    );
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F8F7FF] dark:bg-[#0B0E14] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-100 via-pink-50 to-white dark:from-purple-900/20 dark:via-fuchsia-900/10 dark:to-[#0B0E14] transition-colors duration-300">
      
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl bg-purple-400/20 dark:bg-purple-700/20"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl bg-pink-400/20 dark:bg-pink-700/20"
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={() => navigate("/dashboard")}
                className="p-2.5 sm:p-3 rounded-xl transition-all hover:scale-105 bg-white/90 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 text-purple-600 dark:text-purple-400 shadow-lg border border-purple-100 dark:border-white/10"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              
              <div className="flex-1">
                <h1 className="text-2xl sm:text-4xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                  <Users className="w-6 sm:w-8 h-6 sm:h-8" />
                  Community
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Connect, share, and support 💜
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={() => setShowBlockedUsers(!showBlockedUsers)}
                className="p-2.5 sm:p-3 rounded-xl transition-all hover:scale-105 bg-white/90 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 text-purple-600 dark:text-purple-400 shadow-lg border border-purple-100 dark:border-white/10"
                title="Blocked users"
              >
                {showBlockedUsers ? <EyeOff className="w-5 h-5" /> : <Settings className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Blocked Users Panel */}
        <AnimatePresence>
          {showBlockedUsers && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 sm:p-6 rounded-2xl border-2 overflow-hidden bg-red-50/70 dark:bg-red-900/20 border-red-200 dark:border-red-500/30 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  Blocked Users ({blockedUsers.size})
                </h3>
                <button
                  onClick={() => setShowBlockedUsers(false)}
                  className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {blockedUsers.size === 0 ? (
                <p className="text-sm text-slate-600 dark:text-gray-400">
                  You haven't blocked anyone yet.
                </p>
              ) : (
                <div className="space-y-2">
                  {Array.from(blockedUsers).map((userId) => (
                    <div
                      key={userId}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/50 dark:bg-white/5"
                    >
                      <span className="text-slate-700 dark:text-gray-300">
                        Blocked User
                      </span>
                      <button
                        onClick={() => handleUnblockUser(userId)}
                        className="px-4 py-2 rounded-lg font-medium transition-all bg-purple-100 hover:bg-purple-200 dark:bg-purple-500/20 dark:hover:bg-purple-500/30 text-purple-600 dark:text-purple-300"
                      >
                        Unblock
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Community Guidelines */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 sm:p-6 rounded-2xl border-2 bg-white/90 dark:bg-white/5 border-purple-100 dark:border-purple-500/30 backdrop-blur shadow-lg"
        >
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="p-2.5 sm:p-3 rounded-xl flex-shrink-0 bg-purple-100 dark:bg-purple-500/20">
              <Shield className="w-5 sm:w-6 h-5 sm:h-6 text-purple-600 dark:text-purple-300" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold mb-2 text-sm sm:text-base text-slate-900 dark:text-white">
                Community Guidelines
              </h3>
              <ul className="text-xs sm:text-sm space-y-1 text-slate-600 dark:text-purple-200">
                <li>✨ Be kind, supportive, and encouraging</li>
                <li>🤝 Respect different perspectives</li>
                <li>🚫 No offensive language or harassment</li>
                <li>💪 Share your journey and uplift others</li>
                <li>🛡️ Report & block to keep our space safe</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Message Input */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-2xl bg-white/90 dark:bg-white/10 backdrop-blur border border-purple-100 dark:border-white/20 shadow-xl"
        >
          <form onSubmit={handleSendMessage} className="space-y-4">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-base sm:text-lg flex-shrink-0 bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                {getUserDisplay().charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Share your thoughts, ask questions, or offer support..."
                  rows="3"
                 className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 resize-none transition-all text-sm sm:text-base bg-white dark:bg-black border-purple-200 dark:border-purple-500/30 text-slate-900 dark:text-black placeholder-gray-400 dark:placeholder-gray-600 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-500/50 dark:focus:border-purple-400"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <p className="text-xs sm:text-sm text-slate-500 dark:text-gray-400">
                <Sparkles className="inline w-3.5 sm:w-4 h-3.5 sm:h-4 mb-0.5" /> Keep it positive
              </p>
              <button
                type="submit"
                disabled={loading || !newMessage.trim()}
                className={`w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm sm:text-base ${
                  loading || !newMessage.trim()
                    ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105"
                }`}
              >
                {loading ? "Sending..." : "Post"} <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </motion.div>

        {/* Messages Feed */}
        <AnimatePresence mode="popLayout">
          <div className="space-y-4">
            {getFilteredMessages().map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.03 }}
                className="p-4 sm:p-6 rounded-2xl transition-all hover:scale-[1.01] bg-white/90 dark:bg-white/10 backdrop-blur border border-purple-100 dark:border-white/20 hover:border-purple-200 dark:hover:border-white/30 shadow-lg hover:shadow-xl"
              >
                <div className="flex gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-base sm:text-lg flex-shrink-0 bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                    U
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm sm:text-base truncate text-slate-900 dark:text-white">
                          Community Member
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-gray-400">
                          {new Date(message.created_at).toLocaleString()}
                        </p>
                      </div>
                      
                      {message.user_id === user.id && (
                        <button
                          onClick={() => handleDelete(message.id)}
                          className="p-2 rounded-lg transition-colors flex-shrink-0 hover:bg-red-50 dark:hover:bg-red-500/20 text-red-500 dark:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    
                    <p className="mb-4 text-sm sm:text-base break-words text-slate-700 dark:text-gray-200">
                      {message.message}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleLike(message.id, message.likes)}
                        disabled={likedMessages.has(message.id)}
                        className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-xs sm:text-sm ${
                          likedMessages.has(message.id)
                            ? "bg-pink-100 dark:bg-pink-500/30 text-pink-600 dark:text-pink-300"
                            : "hover:bg-purple-50 dark:hover:bg-white/10 text-slate-600 dark:text-gray-300 hover:scale-105"
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${
                          likedMessages.has(message.id) ? "fill-current" : ""
                        }`} />
                        {message.likes}
                      </button>
                      
                      {message.user_id !== user.id && (
                        <>
                          <button
                            onClick={() => handleReport(message.id, message.reports)}
                            disabled={reportedMessages.has(message.id)}
                            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-xs sm:text-sm ${
                              reportedMessages.has(message.id)
                                ? "bg-orange-100 dark:bg-orange-500/30 text-orange-600 dark:text-orange-300"
                                : "hover:bg-gray-100 dark:hover:bg-white/10 text-slate-500 dark:text-gray-400 hover:scale-105"
                            }`}
                          >
                            <Flag className="w-4 h-4" />
                            {reportedMessages.has(message.id) ? "Reported" : "Report"}
                          </button>
                          
                          <button
                            onClick={() => handleReportUser(message)}
                            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-xs sm:text-sm hover:bg-red-50 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 hover:scale-105"
                          >
                            <AlertTriangle className="w-4 h-4" />
                            Report User
                          </button>
                          
                          <button
                            onClick={() => handleBlockUser(message.user_id)}
                            disabled={blockedUsers.has(message.user_id)}
                            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-xs sm:text-sm ${
                              blockedUsers.has(message.user_id)
                                ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
                                : "hover:bg-red-50 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 hover:scale-105"
                            }`}
                          >
                            <Ban className="w-4 h-4" />
                            Block
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {getFilteredMessages().length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 sm:py-16 text-slate-500 dark:text-gray-400"
              >
                <MessageCircle className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-4 opacity-50" />
                <p className="text-base sm:text-lg font-medium">No messages yet</p>
                <p className="text-xs sm:text-sm">Be the first to start a conversation!</p>
              </motion.div>
            )}
          </div>
        </AnimatePresence>
      </div>

      {/* Report User Modal */}
      <AnimatePresence>
        {showReportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowReportModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md p-6 rounded-2xl bg-white dark:bg-slate-800 border border-purple-100 dark:border-white/20 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                  Report User
                </h3>
                <button
                  onClick={() => setShowReportModal(false)}
                  className="p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="mb-4 text-sm text-slate-600 dark:text-gray-300">
                Please provide a reason for reporting this user. Our team will review your report.
              </p>

              <textarea
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                placeholder="Describe why you're reporting this user..."
                rows="4"
                className="w-full px-4 py-3 rounded-xl border-2 resize-none mb-4 bg-white dark:bg-black border-gray-300 dark:border-purple-500/30 text-slate-900 dark:text-black placeholder-gray-400 dark:placeholder-gray-600 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-500/50"></textarea>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowReportModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl font-medium transition-all bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-700 dark:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={submitUserReport}
                  disabled={!reportReason.trim()}
                  className={`flex-1 px-4 py-3 rounded-xl font-bold transition-all ${
                    !reportReason.trim()
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-red-500 to-orange-500 text-white hover:shadow-lg hover:scale-105"
                  }`}
                >
                  Submit Report
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}