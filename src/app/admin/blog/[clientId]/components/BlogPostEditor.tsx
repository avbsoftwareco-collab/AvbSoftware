"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Eye,
  Globe,
  Clock,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Code,
  Minus,
  CheckCircle,
  AlertCircle,
  Loader2,
  Tag,
  X,
  ChevronDown,
  User,
  FileText,
  Sparkles,
  Edit3,
} from "lucide-react";
import { Client, BlogPost } from "@/lib/supabase";
import ImageUpload from "../../../ImageUpload";

// ─── Props Interface ──────────────────────────────────────────────────────────

interface BlogPostEditorProps {
  post: BlogPost | null;
  client: Client;
  onSave: (data: Partial<BlogPost>) => Promise<void>;
  onCancel: () => void;
  saveStatus: "idle" | "saving" | "saved" | "error";
}

// ─── Slug Generator ───────────────────────────────────────────────────────────

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ─── Rich Text Toolbar ────────────────────────────────────────────────────────

function RichTextToolbar({
  editorRef,
}: {
  editorRef: React.RefObject<HTMLDivElement>;
}) {
  const exec = (command: string, value?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
  };

  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (url) exec("createLink", url);
  };

  const formatBlock = (tag: string) => {
    exec("formatBlock", tag);
  };

  const toolbarGroups = [
    {
      name: "headings",
      buttons: [
        {
          icon: <Heading1 className="w-4 h-4" />,
          action: () => formatBlock("h1"),
          title: "Heading 1",
        },
        {
          icon: <Heading2 className="w-4 h-4" />,
          action: () => formatBlock("h2"),
          title: "Heading 2",
        },
        {
          icon: <Heading3 className="w-4 h-4" />,
          action: () => formatBlock("h3"),
          title: "Heading 3",
        },
      ],
    },
    {
      name: "format",
      buttons: [
        {
          icon: <Bold className="w-4 h-4" />,
          action: () => exec("bold"),
          title: "Bold",
        },
        {
          icon: <Italic className="w-4 h-4" />,
          action: () => exec("italic"),
          title: "Italic",
        },
        {
          icon: <Underline className="w-4 h-4" />,
          action: () => exec("underline"),
          title: "Underline",
        },
      ],
    },
    {
      name: "lists",
      buttons: [
        {
          icon: <List className="w-4 h-4" />,
          action: () => exec("insertUnorderedList"),
          title: "Bullet List",
        },
        {
          icon: <ListOrdered className="w-4 h-4" />,
          action: () => exec("insertOrderedList"),
          title: "Numbered List",
        },
        {
          icon: <Quote className="w-4 h-4" />,
          action: () => formatBlock("blockquote"),
          title: "Quote",
        },
      ],
    },
    {
      name: "align",
      buttons: [
        {
          icon: <AlignLeft className="w-4 h-4" />,
          action: () => exec("justifyLeft"),
          title: "Align Left",
        },
        {
          icon: <AlignCenter className="w-4 h-4" />,
          action: () => exec("justifyCenter"),
          title: "Align Center",
        },
        {
          icon: <AlignRight className="w-4 h-4" />,
          action: () => exec("justifyRight"),
          title: "Align Right",
        },
      ],
    },
    {
      name: "misc",
      buttons: [
        {
          icon: <Link className="w-4 h-4" />,
          action: insertLink,
          title: "Insert Link",
        },
        {
          icon: <Code className="w-4 h-4" />,
          action: () => formatBlock("pre"),
          title: "Code Block",
        },
        {
          icon: <Minus className="w-4 h-4" />,
          action: () => exec("insertHorizontalRule"),
          title: "Divider",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-1 p-2bg-[var(--theme-bg)] border-b border-white/10">
      {toolbarGroups.map((group, gi) => (
        <div key={group.name} className="flex items-center gap-1">
          {group.buttons.map((btn, bi) => (
            <button
              key={bi}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                btn.action();
              }}
              title={btn.title}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              {btn.icon}
            </button>
          ))}
          {gi < toolbarGroups.length - 1 && (
            <div className="w-px h-5 bg-white/10 mx-1" />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Tag Input ────────────────────────────────────────────────────────────────

function TagInput({
  tags,
  onChange,
}: {
  tags: string[];
  onChange: (tags: string[]) => void;
}) {
  const [input, setInput] = useState("");

  const addTag = (value: string) => {
    const tag = value.trim().toLowerCase().replace(/\s+/g, "-");
    if (tag && !tags.includes(tag)) {
      onChange([...tags, tag]);
    }
    setInput("");
  };

  const removeTag = (tag: string) => {
    onChange(tags.filter((t) => t !== tag));
  };

  return (
    <div className="flex flex-wrap gap-2 p-3bg-[var(--theme-bg)] border border-white/10 rounded-lg min-h-[48px] focus-within:border-amber-500/50 transition-colors">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500/10 text-amber-400 text-sm rounded-full border border-amber-500/20"
        >
          #{tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="hover:text-white transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (["Enter", ",", " "].includes(e.key)) {
            e.preventDefault();
            addTag(input);
          }
          if (e.key === "Backspace" && !input && tags.length > 0) {
            removeTag(tags[tags.length - 1]);
          }
        }}
        onBlur={() => input && addTag(input)}
        placeholder={
          tags.length === 0 ? "Add tags (press Enter or comma)" : ""
        }
        className="flex-1 min-w-[120px] bg-transparent text-white text-sm outline-none placeholder-gray-600"
      />
    </div>
  );
}

// ─── SEO Check Component ──────────────────────────────────────────────────────

function SeoCheck({
  label,
  value,
  min,
  max,
  message,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  message: string;
}) {
  const status =
    value === 0
      ? "empty"
      : value < min
      ? "short"
      : value > max
      ? "long"
      : "good";

  const colors = {
    empty: "text-red-400",
    short: "text-amber-400",
    long: "text-amber-400",
    good: "text-green-400",
  };

  return (
    <div className="p-3bg-[var(--theme-bg)] rounded-lg border border-white/10">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-gray-400">{label}</span>
        <span className={`text-xs ${colors[status]}`}>{message}</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            status === "good"
              ? "bg-green-400"
              : status === "empty"
              ? "bg-red-400"
              : "bg-amber-400"
          }`}
          style={{
            width: `${Math.min((value / max) * 100, 100)}%`,
          }}
        />
      </div>
    </div>
  );
}

// ─── Main Editor Component ────────────────────────────────────────────────────

export default function BlogPostEditor({
  post,
  client,
  onSave,
  onCancel,
  saveStatus,
}: BlogPostEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"content" | "settings" | "seo">(
    "content"
  );

  // ── Form State ──
  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [content, setContent] = useState(post?.content || "");
  const [coverImage, setCoverImage] = useState(post?.cover_image || "");
  const [category, setCategory] = useState(post?.category || "");
  const [tags, setTags] = useState<string[]>(post?.tags || []);
  const [authorName, setAuthorName] = useState(
    post?.author_name || client?.business_name || ""
  );
  const [authorImage, setAuthorImage] = useState(post?.author_image || "");
  const [status, setStatus] = useState<"draft" | "published">(
    post?.status || "draft"
  );
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(!!post?.slug);

  // ── Site URL helper ──
  const siteUrl = client.custom_domain
    ? client.custom_domain
    : `${client.subdomain || "site"}.avbsoftware.com`;

  // ── Auto-generate slug from title ──
  useEffect(() => {
    if (!slugManuallyEdited && title) {
      setSlug(generateSlug(title));
    }
  }, [title, slugManuallyEdited]);

  // ── Set initial editor content ──
  useEffect(() => {
    if (editorRef.current && post?.content) {
      editorRef.current.innerHTML = post.content;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditorInput = useCallback(() => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  }, []);

  // ── Submit Handler ──
  const handleSubmit = async (publishStatus?: "draft" | "published") => {
    const finalContent = editorRef.current?.innerHTML || content;
    const finalStatus = publishStatus || status;

    await onSave({
      title,
      slug: slug || generateSlug(title),
      excerpt,
      content: finalContent,
      cover_image: coverImage,
      category,
      tags,
      author_name: authorName,
      author_image: authorImage,
      status: finalStatus,
      published_at:
        finalStatus === "published"
          ? post?.published_at || new Date().toISOString()
          : undefined,
    });
  };

  const categories = [
    "News",
    "Recipes",
    "Events",
    "Behind the Scenes",
    "Tips & Tricks",
    "Seasonal",
    "Special Offers",
    "Stories",
    "Health & Wellness",
    "Tutorials",
  ];

  return (
    <div className="min-h-screenbg-[var(--theme-bg)] flex flex-col">
      {/* ── Editor Header ── */}
      <div className="sticky top-0 z-40 bg-[#111111] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left */}
            <div className="flex items-center gap-4">
              <button
                onClick={onCancel}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back</span>
              </button>
              <div className="w-px h-4 bg-white/20" />
              <div>
                <h2 className="text-sm font-semibold text-white">
                  {post ? "Edit Post" : "New Post"}
                </h2>
                <p className="text-xs text-gray-400">{client.business_name}</p>
              </div>
            </div>

            {/* Center Tabs - Desktop */}
            <div className="hidden sm:flex items-center gap-1bg-[var(--theme-bg)] rounded-lg p-1 border border-white/10">
              {(["content", "settings", "seo"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab
                      ? "bg-amber-500 text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab === "seo"
                    ? "SEO"
                    : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Save Status Indicator */}
              <AnimatePresence mode="wait">
                {saveStatus === "saving" && (
                  <motion.div
                    key="saving"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-sm text-gray-400"
                  >
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </motion.div>
                )}
                {saveStatus === "saved" && (
                  <motion.div
                    key="saved"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-sm text-green-400"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Saved!
                  </motion.div>
                )}
                {saveStatus === "error" && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-sm text-red-400"
                  >
                    <AlertCircle className="w-4 h-4" />
                    Error saving
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Save Draft Button */}
              <button
                onClick={() => handleSubmit("draft")}
                disabled={saveStatus === "saving" || !title}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg border border-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Clock className="w-4 h-4" />
                Save Draft
              </button>

              {/* Publish Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSubmit("published")}
                disabled={saveStatus === "saving" || !title}
                className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Globe className="w-4 h-4" />
                {status === "published" ? "Update" : "Publish"}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Editor Body ── */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Main Content Column ── */}
          <div className="lg:col-span-2 space-y-4">
            {/* Mobile Tabs */}
            <div className="flex sm:hidden items-center gap-1 bg-[#111111] rounded-lg p-1 border border-white/10">
              {(["content", "settings", "seo"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-1.5 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab
                      ? "bg-amber-500 text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab === "seo" ? "SEO" : tab}
                </button>
              ))}
            </div>

            {/* ── CONTENT TAB ── */}
            {activeTab === "content" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Title Input */}
                <div>
                  <textarea
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Post title..."
                    rows={2}
                    className="w-full bg-transparent text-3xl sm:text-4xl font-bold text-white placeholder-gray-600 outline-none resize-none leading-tight"
                  />
                </div>

                {/* Slug Input */}
                <div className="flex items-center gap-2 p-3 bg-[#111111] border border-white/10 rounded-lg">
                  <span className="text-gray-500 text-sm flex-shrink-0">
                    /blog/
                  </span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => {
                      setSlug(e.target.value);
                      setSlugManuallyEdited(true);
                    }}
                    placeholder="post-slug"
                    className="flex-1 bg-transparent text-sm text-amber-400 font-mono outline-none"
                  />
                  {!slugManuallyEdited && (
                    <span className="text-xs text-gray-600">Auto</span>
                  )}
                  {slugManuallyEdited && (
                    <button
                      type="button"
                      onClick={() => {
                        setSlugManuallyEdited(false);
                        setSlug(generateSlug(title));
                      }}
                      className="text-xs text-gray-500 hover:text-amber-400 transition-colors"
                    >
                      Reset
                    </button>
                  )}
                </div>

                {/* Cover Image Upload */}
                <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-white/10">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-amber-400" />
                      Cover Image
                    </h3>
                  </div>
                  <div className="p-4">
                  <ImageUpload
  currentImage={coverImage}
  onUpload={setCoverImage}
  subdomain={client.subdomain || "default"}
  type="hero"
  label="Upload Cover Image"
/>
                  </div>
                </div>

                {/* Excerpt */}
                <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-white/10">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-amber-400" />
                      Excerpt
                      <span className="text-xs text-gray-500 font-normal ml-1">
                        (shown in blog listing)
                      </span>
                    </h3>
                  </div>
                  <div className="p-4">
                    <textarea
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="Write a brief summary of this post..."
                      rows={3}
                      className="w-fullbg-[var(--theme-bg)] border border-white/10 rounded-lg p-3 text-sm text-white placeholder-gray-600 outline-none focus:border-amber-500/50 transition-colors resize-none"
                    />
                    <p className="text-xs text-gray-600 mt-1">
                      {excerpt.length}/300 characters
                    </p>
                  </div>
                </div>

                {/* Rich Text Editor */}
                <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-white/10">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Edit3 className="w-4 h-4 text-amber-400" />
                      Content
                    </h3>
                  </div>

                  {/* Toolbar */}
                  <RichTextToolbar editorRef={editorRef} />

                  {/* Editable Content Area */}
                  <div
                    ref={editorRef}
                    contentEditable
                    suppressContentEditableWarning
                    onInput={handleEditorInput}
                    data-placeholder="Start writing your blog post..."
                    className="
                      min-h-[400px] p-6 text-gray-200 outline-none leading-relaxed
                      [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:mb-4 [&_h1]:mt-6
                      [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mb-3 [&_h2]:mt-5
                      [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mb-2 [&_h3]:mt-4
                      [&_p]:mb-4 [&_p]:leading-relaxed
                      [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-1
                      [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol]:space-y-1
                      [&_blockquote]:border-l-4 [&_blockquote]:border-amber-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-300 [&_blockquote]:my-4
                      [&_pre]:bg-black [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:my-4 [&_pre]:text-sm [&_pre]:font-mono [&_pre]:text-green-400
                      [&_a]:text-amber-400 [&_a]:underline
                      [&_strong]:text-white [&_strong]:font-bold
                      [&_hr]:border-white/20 [&_hr]:my-6
                      empty:before:content-[attr(data-placeholder)] empty:before:text-gray-600 empty:before:pointer-events-none
                    "
                  />
                </div>
              </motion.div>
            )}

            {/* ── SETTINGS TAB ── */}
            {activeTab === "settings" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Author Info */}
                <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-white/10">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <User className="w-4 h-4 text-amber-400" />
                      Author Information
                    </h3>
                  </div>
                  <div className="p-4 space-y-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5">
                        Author Name
                      </label>
                      <input
                        type="text"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        placeholder="Author name"
                        className="w-fullbg-[var(--theme-bg)] border border-white/10 rounded-lg p-3 text-sm text-white placeholder-gray-600 outline-none focus:border-amber-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1.5">
                        Author Photo
                      </label>
                     <ImageUpload
  currentImage={authorImage}
  onUpload={setAuthorImage}
  subdomain={client.subdomain || "default"}
  type="team"
  label="Upload Author Photo"
/>
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-white/10">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-amber-400" />
                      Category
                    </h3>
                  </div>
                  <div className="p-4 space-y-2">
                    {/* Dropdown */}
                    <div className="relative">
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full appearance-nonebg-[var(--theme-bg)] border border-white/10 rounded-lg p-3 text-sm text-white outline-none focus:border-amber-500/50 transition-colors pr-8"
                      >
                        <option value="">Select category...</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                    {/* Custom Category */}
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="Or type custom category..."
                      className="w-fullbg-[var(--theme-bg)] border border-white/10 rounded-lg p-3 text-sm text-white placeholder-gray-600 outline-none focus:border-amber-500/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-white/10">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Tag className="w-4 h-4 text-amber-400" />
                      Tags
                      <span className="text-xs text-gray-500 font-normal ml-1">
                        (used for SEO)
                      </span>
                    </h3>
                  </div>
                  <div className="p-4">
                    <TagInput tags={tags} onChange={setTags} />
                    <p className="text-xs text-gray-600 mt-2">
                      Press Enter, comma, or space to add a tag
                    </p>
                  </div>
                </div>

                {/* Publish Status */}
                <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-white/10">
                    <h3 className="text-sm font-semibold text-white">
                      Publish Settings
                    </h3>
                  </div>
                  <div className="p-4 space-y-3">
                    {(["draft", "published"] as const).map((s) => (
                      <label
                        key={s}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                          status === s
                            ? "border-amber-500/50 bg-amber-500/5"
                            : "border-white/10 hover:border-white/20"
                        }`}
                      >
                        <input
                          type="radio"
                          name="status"
                          value={s}
                          checked={status === s}
                          onChange={() => setStatus(s)}
                          className="accent-amber-500"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white capitalize">
                            {s === "draft" ? "Draft" : "Published"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {s === "draft"
                              ? "Only visible to admins"
                              : "Visible to all visitors"}
                          </p>
                        </div>
                        {s === "published" ? (
                          <Globe className="w-4 h-4 text-green-400" />
                        ) : (
                          <Clock className="w-4 h-4 text-amber-400" />
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── SEO TAB ── */}
            {activeTab === "seo" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Google Preview */}
                <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-white/10">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Globe className="w-4 h-4 text-amber-400" />
                      Google Preview
                    </h3>
                  </div>
                  <div className="p-4">
                    <div className="bg-white rounded-lg p-4 font-sans">
                      <p className="text-xs text-gray-500 mb-1">
                        {siteUrl}/blog/{slug || "post-slug"}
                      </p>
                      <h4 className="text-blue-700 text-lg font-medium hover:underline cursor-pointer leading-tight mb-1">
                        {title || "Your Post Title — Will Appear Here"}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {excerpt ||
                          "Your post excerpt will appear here in Google search results. Make it compelling to improve click-through rates."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* SEO Analysis */}
                <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-white/10">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      SEO Analysis
                    </h3>
                  </div>
                  <div className="p-4 space-y-3">
                    <SeoCheck
                      label="Title Length"
                      value={title.length}
                      min={30}
                      max={60}
                      message={`${title.length} characters (ideal: 30-60)`}
                    />
                    <SeoCheck
                      label="Meta Description"
                      value={excerpt.length}
                      min={100}
                      max={160}
                      message={`${excerpt.length} characters (ideal: 100-160)`}
                    />
                    {/* Slug */}
                    <div className="flex items-center justify-between p-3bg-[var(--theme-bg)] rounded-lg border border-white/10">
                      <span className="text-sm text-gray-400">URL Slug</span>
                      <span
                        className={`text-sm font-mono ${
                          slug ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {slug || "missing"}
                      </span>
                    </div>
                    {/* Tags */}
                    <div className="flex items-center justify-between p-3bg-[var(--theme-bg)] rounded-lg border border-white/10">
                      <span className="text-sm text-gray-400">
                        Keywords (Tags)
                      </span>
                      <span
                        className={`text-sm ${
                          tags.length > 0
                            ? "text-green-400"
                            : "text-amber-400"
                        }`}
                      >
                        {tags.length > 0
                          ? `${tags.length} tags added`
                          : "No tags yet"}
                      </span>
                    </div>
                    {/* Cover Image */}
                    <div className="flex items-center justify-between p-3bg-[var(--theme-bg)] rounded-lg border border-white/10">
                      <span className="text-sm text-gray-400">
                        Open Graph Image
                      </span>
                      <span
                        className={`text-sm ${
                          coverImage ? "text-green-400" : "text-amber-400"
                        }`}
                      >
                        {coverImage ? "✓ Set" : "Not set"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Schema Info Banner */}
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
                  <p className="text-sm text-amber-400 font-medium mb-1">
                    ✨ Auto-generated Schema.org Markup
                  </p>
                  <p className="text-xs text-gray-400">
                    Article schema, Open Graph tags, Twitter Cards, and sitemap
                    entries are automatically generated for all published posts
                    on the Professional plan.
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* ── Sidebar Column ── */}
          <div className="space-y-4">
            {/* Quick Actions */}
            <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-white/10">
                <h3 className="text-sm font-semibold text-white">
                  Quick Actions
                </h3>
              </div>
              <div className="p-4 space-y-2">
                <button
                  onClick={() => handleSubmit("draft")}
                  disabled={saveStatus === "saving" || !title}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg border border-white/10 transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  Save as Draft
                </button>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleSubmit("published")}
                  disabled={saveStatus === "saving" || !title}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold rounded-lg transition-colors disabled:opacity-50"
                >
                  <Globe className="w-4 h-4" />
                  {status === "published" ? "Update Post" : "Publish Now"}
                </motion.button>
              </div>
            </div>

            {/* Post Summary */}
            <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-white/10">
                <h3 className="text-sm font-semibold text-white">Summary</h3>
              </div>
              <div className="p-4 space-y-3 text-sm">
                {[
                  {
                    label: "Status",
                    value: status,
                    color:
                      status === "published"
                        ? "text-green-400"
                        : "text-amber-400",
                  },
                  {
                    label: "Category",
                    value: category || "—",
                    color: "text-white",
                  },
                  {
                    label: "Tags",
                    value: String(tags.length),
                    color: "text-white",
                  },
                  {
                    label: "Author",
                    value: authorName || "—",
                    color: "text-white",
                  },
                  {
                    label: "Cover",
                    value: coverImage ? "✓ Set" : "Not set",
                    color: coverImage ? "text-green-400" : "text-gray-600",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between">
                    <span className="text-gray-500">{item.label}</span>
                    <span
                      className={`font-medium capitalize truncate max-w-[130px] ${item.color}`}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Template & Site Info */}
            <div className="bg-[#111111] border border-white/10 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">
                Template:{" "}
                <span className="text-amber-400 font-medium capitalize">
                  {client.template || "default"}
                </span>
              </p>
              <p className="text-xs text-gray-500">Blog URL:</p>
              <p className="text-xs font-mono text-gray-400 mt-0.5 break-all">
                {siteUrl}/blog
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}