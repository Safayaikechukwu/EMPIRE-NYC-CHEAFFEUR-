import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Eye, 
  Calendar, 
  User,
  X,
  Image as ImageIcon,
  Save,
  AlertCircle,
  FileText
} from 'lucide-react';
import { format } from 'date-fns';

interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  author: string;
  published_at: string;
}

export const AdminBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    image: '',
    author: 'Empire Editorial'
  });

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleOpenModal = (blog?: Blog) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        title: blog.title,
        slug: blog.slug,
        content: blog.content,
        excerpt: blog.excerpt,
        image: blog.image,
        author: blog.author
      });
    } else {
      setEditingBlog(null);
      setFormData({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        image: '',
        author: 'Empire Editorial'
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBlog(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingBlog ? `/api/blogs/${editingBlog.id}` : '/api/blogs';
    const method = editingBlog ? 'PATCH' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchBlogs();
        handleCloseModal();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
      try {
        const response = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
        if (response.ok) {
          fetchBlogs();
        }
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-3xl font-serif text-white mb-2">Blog Management</h1>
          <p className="text-white/40 text-sm font-light uppercase tracking-widest">Manage your editorial content</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="primary-button group"
        >
          <Plus size={18} className="mr-2" />
          <span>New Article</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
          <input 
            type="text" 
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-gold/50 transition-colors text-white"
          />
        </div>
        <button className="flex items-center space-x-2 px-6 py-3 bg-white/5 border border-white/10 rounded-sm text-white/60 hover:text-white transition-colors text-sm">
          <Filter size={18} />
          <span>Filter</span>
        </button>
      </div>

      {/* Blogs Table */}
      <div className="glass-panel rounded-sm border border-white/10 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-bold">Article</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-bold">Author</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-bold">Date</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-bold">Status</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-white/40 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {isLoading ? (
              [1, 2, 3].map(i => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={5} className="px-6 py-8">
                    <div className="h-4 bg-white/5 rounded w-3/4" />
                  </td>
                </tr>
              ))
            ) : filteredBlogs.map((blog) => (
              <tr key={blog.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 py-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-sm overflow-hidden border border-white/10 shrink-0">
                      <img src={blog.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <div className="text-white font-medium mb-1">{blog.title}</div>
                      <div className="text-white/40 text-xs font-light truncate max-w-xs">{blog.excerpt}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <div className="flex items-center space-x-2 text-white/60 text-sm">
                    <User size={14} className="text-gold" />
                    <span>{blog.author}</span>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <div className="flex items-center space-x-2 text-white/60 text-sm">
                    <Calendar size={14} className="text-gold" />
                    <span>{format(new Date(blog.published_at), 'MMM dd, yyyy')}</span>
                  </div>
                </td>
                <td className="px-6 py-6">
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] uppercase tracking-widest font-bold rounded-full border border-emerald-500/20">
                    Published
                  </span>
                </td>
                <td className="px-6 py-6 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button 
                      onClick={() => window.open(`/blog/${blog.slug}`, '_blank')}
                      className="p-2 text-white/40 hover:text-gold transition-colors"
                      title="View Article"
                    >
                      <Eye size={18} />
                    </button>
                    <button 
                      onClick={() => handleOpenModal(blog)}
                      className="p-2 text-white/40 hover:text-gold transition-colors"
                      title="Edit Article"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(blog.id)}
                      className="p-2 text-white/40 hover:text-rose-500 transition-colors"
                      title="Delete Article"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-bg-primary border border-white/10 rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-serif text-white">{editingBlog ? 'Edit Article' : 'Create New Article'}</h2>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest">Draft your next masterpiece</p>
                  </div>
                </div>
                <button onClick={handleCloseModal} className="text-white/40 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-8">
                <form id="blog-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Article Title</label>
                      <input 
                        type="text" 
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-gold/50 transition-colors text-white"
                        placeholder="Enter a compelling title"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">URL Slug</label>
                      <input 
                        type="text" 
                        required
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-gold/50 transition-colors text-white"
                        placeholder="article-url-slug"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Excerpt</label>
                      <textarea 
                        required
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-gold/50 transition-colors text-white h-24 resize-none"
                        placeholder="A brief summary for the listing page..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Author Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-gold/50 transition-colors text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Cover Image URL</label>
                      <div className="flex space-x-2">
                        <div className="relative flex-grow">
                          <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                          <input 
                            type="url" 
                            required
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-sm py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-gold/50 transition-colors text-white"
                            placeholder="https://images.unsplash.com/..."
                          />
                        </div>
                      </div>
                      {formData.image && (
                        <div className="mt-4 aspect-video rounded-sm overflow-hidden border border-white/10">
                          <img src={formData.image} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Article Content</label>
                      <textarea 
                        required
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-sm py-3 px-4 text-sm focus:outline-none focus:border-gold/50 transition-colors text-white h-64 resize-none font-light leading-relaxed"
                        placeholder="Write your article content here..."
                      />
                    </div>
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-white/10 bg-white/5 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-white/40 text-xs">
                  <AlertCircle size={14} />
                  <span>All changes are saved instantly to the database.</span>
                </div>
                <div className="flex space-x-4">
                  <button 
                    onClick={handleCloseModal}
                    className="px-6 py-3 text-white/60 hover:text-white transition-colors text-xs uppercase tracking-widest font-bold"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    form="blog-form"
                    className="primary-button"
                  >
                    <Save size={18} className="mr-2" />
                    <span>{editingBlog ? 'Update Article' : 'Publish Article'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
