import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, Search, Tag } from 'lucide-react';
import { Layout } from '../components/Layout';
import { SEO } from '../components/SEO';
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

export const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
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

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <SEO 
        title="The Empire Journal | NYC Luxury Travel Blog"
        description="Insights, guides, and news from the world of luxury transportation and executive travel in New York City."
        breadcrumbItems={[
          { name: "Home", item: "https://www.empirechauffeurnyc.com/" },
          { name: "Blog", item: "https://www.empirechauffeurnyc.com/blog" }
        ]}
      />
      
      <div className="pt-32 pb-24 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gold text-xs uppercase tracking-[0.4em] font-bold mb-4 block"
              >
                The Empire Journal
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-serif text-text-primary mb-6"
              >
                Insights in <span className="italic text-gold">Motion</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-text-secondary text-lg font-light leading-relaxed"
              >
                Expert guides, industry news, and luxury lifestyle insights from NYC's premier chauffeur service.
              </motion.p>
            </div>

            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
              <input 
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-charcoal border border-border-primary rounded-full py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-gold/50 transition-colors text-text-primary"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-charcoal h-64 rounded-sm mb-6" />
                  <div className="h-4 bg-charcoal rounded w-1/4 mb-4" />
                  <div className="h-8 bg-charcoal rounded w-3/4 mb-4" />
                  <div className="h-4 bg-charcoal rounded w-full mb-2" />
                  <div className="h-4 bg-charcoal rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredBlogs.map((blog, index) => (
                <motion.article 
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex flex-col h-full"
                >
                  <Link to={`/blog/${blog.slug}`} className="relative h-72 overflow-hidden rounded-sm mb-8 block">
                    <img 
                      src={blog.image} 
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500" />
                    <div className="absolute top-6 left-6 flex flex-col space-y-2">
                      <div className="bg-gold/90 backdrop-blur-md px-4 py-1.5 border border-border-primary">
                        <span className="text-[10px] uppercase tracking-widest text-bg-primary font-bold">Luxury Travel</span>
                      </div>
                      {blog.content && blog.content.split(/\s+/).length >= 1000 && (
                        <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 border border-border-primary">
                          <span className="text-[10px] uppercase tracking-widest text-bg-primary font-bold">Long Read</span>
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="flex items-center space-x-6 mb-4 text-[10px] uppercase tracking-widest text-text-secondary font-bold">
                    <div className="flex items-center space-x-2">
                      <Calendar size={12} className="text-gold" />
                      <span>{format(new Date(blog.published_at.replace(' ', 'T')), 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User size={12} className="text-gold" />
                      <span>{blog.author}</span>
                    </div>
                  </div>

                  <h2 className="text-2xl font-serif text-text-primary mb-4 group-hover:text-gold transition-colors leading-tight">
                    <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                  </h2>
                  
                  <p className="text-text-secondary text-sm font-light leading-relaxed mb-8 flex-grow line-clamp-3">
                    {blog.excerpt}
                  </p>

                  <Link 
                    to={`/blog/${blog.slug}`} 
                    className="flex items-center space-x-2 text-gold text-[10px] uppercase tracking-widest font-bold group-hover:text-white transition-colors"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-charcoal rounded-sm border border-border-primary">
              <p className="text-text-secondary font-light">No articles found matching your search.</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-4 text-gold text-xs uppercase tracking-widest font-bold hover:text-white transition-colors"
              >
                View All Articles
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
