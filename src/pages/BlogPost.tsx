import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Clock } from 'lucide-react';
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
  image_alt: string;
  author: string;
  meta_title: string;
  meta_description: string;
  focus_keyword: string;
  published_at: string;
}

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const calculateReadTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${slug}`);
        if (!response.ok) throw new Error('Blog not found');
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog:', error);
        navigate('/blog');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [slug, navigate]);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-bg-primary flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!blog) return null;

  return (
    <Layout>
      <SEO 
        title={blog.meta_title || `${blog.title} | Empire Chauffeur NYC Blog`}
        description={blog.meta_description || blog.excerpt}
        ogImage={blog.image}
        keywords={blog.focus_keyword}
        breadcrumbItems={[
          { name: "Home", item: "https://www.empirechauffeurnyc.com/" },
          { name: "Blog", item: "https://www.empirechauffeurnyc.com/blog" },
          { name: blog.title, item: `https://www.empirechauffeurnyc.com/blog/${blog.slug}` }
        ]}
      />

      <article className="bg-bg-primary">
        {/* Hero Section */}
        <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
          <img 
            src={blog.image} 
            alt={blog.image_alt || blog.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/40 to-transparent" />
          
          <div className="absolute inset-0 flex items-end pb-24">
            <div className="max-w-4xl mx-auto px-6 w-full">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <Link 
                  to="/blog" 
                  className="inline-flex items-center space-x-2 text-gold text-[10px] uppercase tracking-widest font-bold hover:text-white transition-colors"
                >
                  <ArrowLeft size={14} />
                  <span>Back to Journal</span>
                </Link>

                <div className="flex items-center space-x-6 text-[10px] uppercase tracking-widest text-gold font-bold">
                  <div className="flex items-center space-x-2">
                    <Calendar size={12} />
                    <span>{format(new Date(blog.published_at.replace(' ', 'T')), 'MMM dd, yyyy')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User size={12} />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={12} />
                    <span>{calculateReadTime(blog.content)} Min Read</span>
                  </div>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-text-primary leading-tight">
                  {blog.title}
                </h1>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Sidebar / Share */}
            <div className="lg:col-span-1 flex lg:flex-col items-center lg:items-start space-x-6 lg:space-x-0 lg:space-y-8 sticky top-32 h-fit">
              <span className="text-[10px] uppercase tracking-widest text-text-secondary font-bold lg:mb-4">Share</span>
              <button className="w-10 h-10 rounded-full border border-border-primary flex items-center justify-center text-text-secondary hover:text-gold hover:border-gold transition-all">
                <Facebook size={18} />
              </button>
              <button className="w-10 h-10 rounded-full border border-border-primary flex items-center justify-center text-text-secondary hover:text-gold hover:border-gold transition-all">
                <Twitter size={18} />
              </button>
              <button className="w-10 h-10 rounded-full border border-border-primary flex items-center justify-center text-text-secondary hover:text-gold hover:border-gold transition-all">
                <Linkedin size={18} />
              </button>
              <button className="w-10 h-10 rounded-full border border-border-primary flex items-center justify-center text-text-secondary hover:text-gold hover:border-gold transition-all">
                <Share2 size={18} />
              </button>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-8">
              <div className="prose prose-invert prose-gold max-w-none">
                <p className="text-xl text-text-secondary font-light leading-relaxed mb-12 italic border-l-2 border-gold pl-8">
                  {blog.excerpt}
                </p>
                <div className="text-text-secondary text-lg font-light leading-relaxed space-y-8 whitespace-pre-wrap">
                  {blog.content}
                </div>
              </div>

              {/* Author Bio */}
              <div className="mt-24 p-12 bg-charcoal border border-border-primary rounded-sm flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-10">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gold/20 shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop" 
                    alt={blog.author}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <span className="text-gold text-[10px] uppercase tracking-widest font-bold mb-2 block">About the Author</span>
                  <h4 className="text-2xl font-serif text-text-primary mb-4">{blog.author}</h4>
                  <p className="text-text-secondary text-sm font-light leading-relaxed">
                    A seasoned travel expert with over 15 years of experience in the luxury transportation industry. Specializing in executive logistics and high-end concierge services across the Tri-State area.
                  </p>
                </div>
              </div>
            </div>

            {/* Related / Newsletter */}
            <div className="lg:col-span-3 space-y-12">
              <div className="p-8 bg-gold rounded-sm shadow-xl">
                <h4 className="text-bg-primary text-xl font-serif mb-4">The Empire Dispatch</h4>
                <p className="text-bg-primary/80 text-sm font-light mb-8">Join our exclusive list for monthly travel insights and priority booking access.</p>
                <input 
                  type="email" 
                  placeholder="Email Address"
                  className="w-full bg-bg-primary/10 border border-bg-primary/20 rounded-sm py-3 px-4 text-sm mb-4 placeholder:text-bg-primary/40 text-bg-primary focus:outline-none focus:border-bg-primary/50"
                />
                <button className="w-full bg-bg-primary text-white text-[10px] uppercase tracking-widest font-bold py-4 hover:bg-white hover:text-black transition-all">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};
