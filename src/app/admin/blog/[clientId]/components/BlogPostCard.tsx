"use client";

import { motion } from "framer-motion";
import {
  Edit3,
  Trash2,
  Eye,
  Globe,
  Clock,
  Calendar,
  Tag,
  ToggleLeft,
  ToggleRight,
  ExternalLink,
} from "lucide-react";
import { BlogPost } from "@/lib/supabase";

interface BlogPostCardProps {
  post: BlogPost;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
  onPreview: () => void;
  onToggleStatus: () => void;
}

export default function BlogPostCard({
  post,
  index,
  onEdit,
  onDelete,
  onPreview,
  onToggleStatus,
}: BlogPostCardProps) {
  const isPublished = post.status === "published";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group bg-[#111111] border border-white/10 rounded-xl overflow-hidden hover:border-amber-500/30 transition-all duration-300"
    >
      <div className="flex items-start gap-4 p-4 sm:p-6">
        {/* Cover Image Thumbnail */}
        <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-white/5">
          {post.cover_image ? (
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Eye className="w-8 h-8 text-gray-600" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            {/* Title & Meta */}
            <div className="flex-1 min-w-0">
              {/* Status + Category */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                    isPublished
                      ? "bg-green-400/10 text-green-400 border border-green-400/20"
                      : "bg-amber-400/10 text-amber-400 border border-amber-400/20"
                  }`}
                >
                  {isPublished ? (
                    <Globe className="w-3 h-3" />
                  ) : (
                    <Clock className="w-3 h-3" />
                  )}
                  {isPublished ? "Published" : "Draft"}
                </span>

                {post.category && (
                  <span className="px-2 py-0.5 bg-blue-400/10 text-blue-400 text-xs rounded-full border border-blue-400/20">
                    {post.category}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-semibold text-white truncate group-hover:text-amber-400 transition-colors">
                {post.title}
              </h3>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                  {post.excerpt}
                </p>
              )}

              {/* Footer Meta */}
              <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-gray-500">
                {post.published_at && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.published_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                )}
                {post.author_name && (
                  <span>by {post.author_name}</span>
                )}
                {post.tags && post.tags.length > 0 && (
                  <span className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {post.tags.slice(0, 2).join(", ")}
                    {post.tags.length > 2 && ` +${post.tags.length - 2}`}
                  </span>
                )}
                {/* Slug */}
                <span className="text-gray-600 font-mono">/{post.slug}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 flex-shrink-0">
              {/* Toggle Status */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onToggleStatus}
                title={isPublished ? "Set as Draft" : "Publish"}
                className={`p-2 rounded-lg transition-colors ${
                  isPublished
                    ? "bg-green-400/10 text-green-400 hover:bg-green-400/20"
                    : "bg-gray-400/10 text-gray-400 hover:bg-gray-400/20"
                }`}
              >
                {isPublished ? (
                  <ToggleRight className="w-5 h-5" />
                ) : (
                  <ToggleLeft className="w-5 h-5" />
                )}
              </motion.button>

              {/* Preview */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onPreview}
                title="Preview"
                className="p-2 rounded-lg bg-blue-400/10 text-blue-400 hover:bg-blue-400/20 transition-colors"
              >
                <Eye className="w-4 h-4" />
              </motion.button>

              {/* Edit */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onEdit}
                title="Edit"
                className="p-2 rounded-lg bg-amber-400/10 text-amber-400 hover:bg-amber-400/20 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
              </motion.button>

              {/* Delete */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onDelete}
                title="Delete"
                className="p-2 rounded-lg bg-red-400/10 text-red-400 hover:bg-red-400/20 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}