"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Plus,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Search,
  Filter,
  Calendar,
  Tag,
  User,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  Save,
  Globe,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import {
  Client,
  BlogPost,
  getClientById,
  getAllClientBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from "@/lib/supabase";
import BlogPostEditor from "./components/BlogPostEditor";
import BlogPostCard from "./components/BlogPostCard";
import DeleteConfirmModal from "./components/DeleteConfirmModal";

// ─── Types ───────────────────────────────────────────────────────────────────

type ViewMode = "list" | "editor" | "preview";
type FilterStatus = "all" | "published" | "draft";

// ─── Main Page Component ──────────────────────────────────────────────────────

export default function BlogEditorPage() {
  const params = useParams();
  const router = useRouter();
  const clientId = params.clientId as string;

  // ── State ──
  const [client, setClient] = useState<Client | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [deletingPost, setDeletingPost] = useState<BlogPost | null>(null);
  const [previewPost, setPreviewPost] = useState<BlogPost | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");

  // ── Fetch Data ──
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [clientData, postsData] = await Promise.all([
        getClientById(clientId),
        getAllClientBlogPosts(clientId),
      ]);

      if (!clientData) {
        setError("Client not found");
        return;
      }

      setClient(clientData);
      setPosts(postsData || []);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ── Filtered Posts ──
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "published" && post.status === "published") ||
      (filterStatus === "draft" && post.status === "draft");

    return matchesSearch && matchesFilter;
  });

  // ── Stats ──
  const stats = {
    total: posts.length,
    published: posts.filter((p) => p.status === "published").length,
    drafts: posts.filter((p) => p.status === "draft").length,
  };

  // ── Handlers ──
  const handleNewPost = () => {
    setEditingPost(null);
    setViewMode("editor");
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setViewMode("editor");
  };

  const handlePreviewPost = (post: BlogPost) => {
    setPreviewPost(post);
    setViewMode("preview");
  };

  const handleSavePost = async (postData: Partial<BlogPost>) => {
    try {
      setSaveStatus("saving");

      if (editingPost?.id) {
        // Update existing
        const updated = await updateBlogPost(editingPost.id, {
          ...postData,
          client_id: clientId,
        });
        setPosts((prev) =>
          prev.map((p) => (p.id === editingPost.id ? { ...p, ...updated } : p))
        );
      } else {
        // Create new
        const newPost = await createBlogPost({
          ...postData,
          client_id: clientId,
          status: postData.status || "draft",
        } as Omit<BlogPost, "id" | "created_at" | "updated_at">);
        setPosts((prev) => [newPost, ...prev]);
      }

      setSaveStatus("saved");
      setTimeout(() => {
        setSaveStatus("idle");
        setViewMode("list");
        setEditingPost(null);
      }, 1500);
    } catch (err) {
      console.error("Error saving post:", err);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  };

  const handleDeletePost = async (post: BlogPost) => {
    try {
      await deleteBlogPost(post.id);
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
      setDeletingPost(null);
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const handleToggleStatus = async (post: BlogPost) => {
    try {
      const newStatus = post.status === "published" ? "draft" : "published";
      const updated = await updateBlogPost(post.id, {
        status: newStatus,
        published_at:
          newStatus === "published" ? new Date().toISOString() : null,
      });
      setPosts((prev) =>
        prev.map((p) => (p.id === post.id ? { ...p, ...updated } : p))
      );
    } catch (err) {
      console.error("Error toggling status:", err);
    }
  };

  const handleBackToList = () => {
    setViewMode("list");
    setEditingPost(null);
    setPreviewPost(null);
  };

  // ── Loading State ──
  if (loading) {
    return <BlogEditorSkeleton />;
  }

  // ── Error State ──
  if (error) {
    return (
      <div className="min-h-screenbg-[var(--theme-bg)] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={fetchData}
            className="px-6 py-3 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ── Preview Mode ──
  if (viewMode === "preview" && previewPost) {
    return (
      <BlogPreview
        post={previewPost}
        client={client!}
        onBack={handleBackToList}
      />
    );
  }

  // ── Editor Mode ──
  if (viewMode === "editor") {
    return (
      <BlogPostEditor
        post={editingPost}
        client={client!}
        onSave={handleSavePost}
        onCancel={handleBackToList}
        saveStatus={saveStatus}
      />
    );
  }

  // ── List Mode ──
  return (
    <div className="min-h-screenbg-[var(--theme-bg)]">
      {/* ── Header ── */}
      <div className="border-b border-white/10 bg-[#111111] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left */}
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Dashboard</span>
              </Link>
              <div className="w-px h-4 bg-white/20" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h1 className="text-sm font-semibold text-white">
                    Blog Manager
                  </h1>
                  {client && (
                    <p className="text-xs text-gray-400">{client.name}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              {/* Plan Badge */}
              {client && (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    client.plan_type === "professional"
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                  }`}
                >
                  {client.plan_type === "professional"
                    ? "Professional"
                    : "Starter"}
                </span>
              )}

              {/* New Post Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNewPost}
                className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-black font-semibold text-sm rounded-lg hover:bg-amber-400 transition-colors"
              >
                <Plus className="w-4 h-4" />
                New Post
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            {
              label: "Total Posts",
              value: stats.total,
              icon: FileText,
              color: "text-blue-400",
              bg: "bg-blue-400/10",
            },
            {
              label: "Published",
              value: stats.published,
              icon: Globe,
              color: "text-green-400",
              bg: "bg-green-400/10",
            },
            {
              label: "Drafts",
              value: stats.drafts,
              icon: Clock,
              color: "text-amber-400",
              bg: "bg-amber-400/10",
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#111111] border border-white/10 rounded-xl p-4 flex items-center gap-4"
            >
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#111111] border border-white/10 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 bg-[#111111] border border-white/10 rounded-lg p-1">
            {(["all", "published", "draft"] as FilterStatus[]).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-all ${
                  filterStatus === status
                    ? "bg-amber-500 text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <AnimatePresence mode="wait">
          {filteredPosts.length === 0 ? (
            <EmptyState
              searchQuery={searchQuery}
              filterStatus={filterStatus}
              onNewPost={handleNewPost}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid gap-4"
            >
              {filteredPosts.map((post, index) => (
                <BlogPostCard
                  key={post.id}
                  post={post}
                  index={index}
                  onEdit={() => handleEditPost(post)}
                  onDelete={() => setDeletingPost(post)}
                  onPreview={() => handlePreviewPost(post)}
                  onToggleStatus={() => handleToggleStatus(post)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Delete Confirm Modal */}
      <AnimatePresence>
        {deletingPost && (
          <DeleteConfirmModal
            post={deletingPost}
            onConfirm={() => handleDeletePost(deletingPost)}
            onCancel={() => setDeletingPost(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({
  searchQuery,
  filterStatus,
  onNewPost,
}: {
  searchQuery: string;
  filterStatus: FilterStatus;
  onNewPost: () => void;
}) {
  const isFiltered = searchQuery || filterStatus !== "all";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="w-20 h-20 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6">
        {isFiltered ? (
          <Search className="w-10 h-10 text-amber-400/50" />
        ) : (
          <FileText className="w-10 h-10 text-amber-400/50" />
        )}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">
        {isFiltered ? "No posts found" : "No blog posts yet"}
      </h3>
      <p className="text-gray-400 mb-8 max-w-sm">
        {isFiltered
          ? "Try adjusting your search or filter to find what you're looking for."
          : "Create your first blog post to engage your audience and improve SEO."}
      </p>
      {!isFiltered && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNewPost}
          className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create First Post
        </motion.button>
      )}
    </motion.div>
  );
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────

function BlogEditorSkeleton() {
  return (
    <div className="min-h-screenbg-[var(--theme-bg)]">
      <div className="border-b border-white/10 bg-[#111111] h-16" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-[#111111] border border-white/10 rounded-xl p-4 h-20 animate-pulse"
            />
          ))}
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-[#111111] border border-white/10 rounded-xl p-6 h-32 animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Blog Preview ─────────────────────────────────────────────────────────────

function BlogPreview({
  post,
  client,
  onBack,
}: {
  post: BlogPost;
  client: Client;
  onBack: () => void;
}) {
  return (
    <div className="min-h-screenbg-[var(--theme-bg)]">
      {/* Preview Header */}
      <div className="sticky top-0 z-40 bg-amber-500 text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center gap-3">
              <Eye className="w-4 h-4" />
              <span className="text-sm font-semibold">Preview Mode</span>
            </div>
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-sm font-medium hover:underline"
            >
              <X className="w-4 h-4" />
              Close Preview
            </button>
          </div>
        </div>
      </div>

      {/* Blog Content Preview */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Cover Image */}
        {post.cover_image && (
          <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden mb-8">
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {post.category && (
            <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-medium rounded-full border border-amber-500/30">
              {post.category}
            </span>
          )}
          {post.published_at && (
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar className="w-3 h-3" />
              {new Date(post.published_at).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          )}
          {post.author_name && (
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <User className="w-3 h-3" />
              {post.author_name}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-lg text-gray-300 mb-8 leading-relaxed border-l-4 border-amber-500 pl-4">
            {post.excerpt}
          </p>
        )}

        {/* Content */}
        <div
          className="prose prose-invert prose-amber max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-white/10">
            <Tag className="w-4 h-4 text-gray-400 mt-0.5" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/5 text-gray-400 text-xs rounded-full border border-white/10"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}