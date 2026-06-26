"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { BlogPost } from "../../../../../lib/supabase";

interface DeleteConfirmModalProps {
  post: BlogPost;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmModal({
  post,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative bg-[#111111] border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl"
      >
        {/* Close */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-red-400/10 flex items-center justify-center mb-4">
          <AlertTriangle className="w-7 h-7 text-red-400" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-white mb-2">Delete Post?</h3>
        <p className="text-gray-400 mb-1">
          Are you sure you want to delete:
        </p>
        <p className="text-white font-medium mb-6 p-3 bg-white/5 rounded-lg border border-white/10">
          "{post.title}"
        </p>
        <p className="text-sm text-red-400/80 mb-6">
          ⚠️ This action cannot be undone. The post will be permanently deleted.
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-lg border border-white/10 transition-colors"
          >
            Cancel
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onConfirm}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}