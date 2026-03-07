import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("empire.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'admin'
  );

  CREATE TABLE IF NOT EXISTS blogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    slug TEXT UNIQUE,
    content TEXT,
    excerpt TEXT,
    image TEXT,
    image_alt TEXT,
    author TEXT,
    meta_title TEXT,
    meta_description TEXT,
    focus_keyword TEXT,
    published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS vehicles (
    id TEXT PRIMARY KEY,
    name TEXT,
    category TEXT,
    passengers INTEGER,
    luggage INTEGER,
    status TEXT DEFAULT 'Available',
    image TEXT
  );

  CREATE TABLE IF NOT EXISTS chauffeurs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    status TEXT DEFAULT 'Active',
    rating REAL DEFAULT 5.0,
    trips INTEGER DEFAULT 0,
    phone TEXT,
    image TEXT
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT,
    customer_email TEXT,
    customer_phone TEXT,
    pickup_location TEXT,
    dropoff_location TEXT,
    pickup_time TEXT,
    vehicle_id TEXT,
    chauffeur_id INTEGER,
    status TEXT DEFAULT 'Pending',
    total_price REAL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(vehicle_id) REFERENCES vehicles(id),
    FOREIGN KEY(chauffeur_id) REFERENCES chauffeurs(id)
  );
`);

// Seed initial data if empty
const vehicleCount = db.prepare("SELECT COUNT(*) as count FROM vehicles").get() as { count: number };
if (vehicleCount.count === 0) {
  const insertVehicle = db.prepare("INSERT INTO vehicles (id, name, category, passengers, luggage, status, image) VALUES (?, ?, ?, ?, ?, ?, ?)");
  insertVehicle.run('s-class', 'Mercedes-Benz S-Class', 'Executive Sedan', 3, 3, 'Available', 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop');
  insertVehicle.run('escalade', 'Cadillac Escalade ESV', 'Luxury SUV', 6, 6, 'Available', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop');
  insertVehicle.run('sprinter-exec', 'Mercedes-Benz Sprinter', 'Executive Sprinter', 14, 14, 'Available', 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2070&auto=format&fit=crop');
}

const chauffeurCount = db.prepare("SELECT COUNT(*) as count FROM chauffeurs").get() as { count: number };
if (chauffeurCount.count === 0) {
  const insertChauffeur = db.prepare("INSERT INTO chauffeurs (name, status, rating, trips, phone, image) VALUES (?, ?, ?, ?, ?, ?)");
  insertChauffeur.run('James Sterling', 'Active', 4.9, 1240, '(305) 555-0123', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop');
  insertChauffeur.run('Elena Rodriguez', 'Active', 5.0, 850, '(305) 555-0124', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2070&auto=format&fit=crop');
}

const userCount = db.prepare("SELECT COUNT(*) as count FROM users").get() as { count: number };
if (userCount.count === 0) {
  const insertUser = db.prepare("INSERT INTO users (username, password, role) VALUES (?, ?, ?)");
  // In a real app, use bcrypt to hash passwords. For this demo, we'll use plain text.
  insertUser.run('admin', 'empire2025', 'admin');
}

const blogCount = db.prepare("SELECT COUNT(*) as count FROM blogs").get() as { count: number };
if (blogCount.count === 0) {
  const insertBlog = db.prepare("INSERT INTO blogs (title, slug, content, excerpt, image, author) VALUES (?, ?, ?, ?, ?, ?)");
  insertBlog.run(
    'The Ultimate Guide to NYC Airport Transfers', 
    'nyc-airport-transfer-guide', 
    'Navigating New York City airports can be a daunting task. From JFK to LGA and EWR, each hub has its own set of challenges. In this guide, we explore the best ways to ensure a seamless arrival and departure experience using professional chauffeur services...', 
    'Everything you need to know about navigating JFK, LGA, and EWR with ease.', 
    'https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?q=80&w=2070&auto=format&fit=crop', 
    'Empire Editorial'
  );
  insertBlog.run(
    'Why Executive Chauffeurs are Better Than Ride-Sharing', 
    'chauffeur-vs-rideshare', 
    'When it comes to professional business travel, reliability and discretion are paramount. While ride-sharing apps offer convenience, they often lack the consistency and elite standards required by executives. We break down the key differences...', 
    'Discover why top executives choose private chauffeurs over standard ride-sharing apps.', 
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2070&auto=format&fit=crop', 
    'James Sterling'
  );
  insertBlog.run(
    'Navigating Teterboro (TEB): The Private Jet Traveler\'s Guide', 
    'teterboro-airport-chauffeur-guide', 
    'Teterboro Airport (TEB) is the primary gateway for private aviation in the New York metropolitan area. Unlike JFK or EWR, Teterboro offers a level of discretion and efficiency that elite travelers demand. However, the transition from the tarmac to the city requires precision. At Empire Chauffeur NYC, we specialize in FBO (Fixed Base Operator) pickups at Signature, Jet Aviation, and Atlantic Aviation. Our chauffeurs are vetted for security and discretion, ensuring that your ground transportation is as seamless as your flight. We monitor tail numbers in real-time and coordinate directly with flight crews to ensure your vehicle is waiting on the ramp or at the terminal the moment you land.', 
    'A comprehensive guide for private jet travelers arriving at Teterboro Airport, focusing on seamless transitions to Manhattan.', 
    'https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2070&auto=format&fit=crop', 
    'Empire Logistics Team'
  );
  insertBlog.run(
    'Mastering the Manhattan Corporate Roadshow', 
    'manhattan-corporate-roadshow-logistics', 
    'In the fast-paced world of finance and global business, a corporate roadshow is a high-stakes endeavor. Multiple meetings across Midtown, the Financial District, and Hudson Yards require a logistics partner who understands the rhythm of the city. Our hourly chauffeur service is designed for this exact scenario. With a dedicated vehicle and a chauffeur who knows every shortcut and back entrance in Manhattan, executives can focus on their presentations while we handle the traffic. We provide Wi-Fi equipped vehicles and bottled water, turning your car into a mobile office between stops. Our dispatch team monitors traffic patterns 24/7 to reroute your chauffeur instantly if a delay occurs.', 
    'How professional chauffeur services ensure executive productivity during high-stakes multi-stop meetings in NYC.', 
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop', 
    'Elena Rodriguez'
  );
  insertBlog.run(
    'Luxury Transportation for NYC Gala & Event Season', 
    'nyc-gala-event-transportation-luxury', 
    'New York City\'s social calendar is legendary. From the glamour of the Met Gala to the high-stakes fundraisers at Cipriani, arriving in style is not just about the vehicle—it\'s about the experience. Our fleet of late-model Mercedes-Benz S-Class sedans and Cadillac Escalades provides the perfect backdrop for your evening. We understand the complexities of event drop-offs and the importance of being ready for immediate pickup the moment the event concludes. Our chauffeurs coordinate with event security and valets to ensure a smooth arrival, allowing you to make an entrance that matches the prestige of the occasion. For larger groups, our Executive Sprinters offer the same level of luxury with expanded capacity for your entire party.', 
    'Arrive in style during New York City\'s most prestigious event seasons, from the Met Gala to Wall Street fundraisers.', 
    'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop', 
    'Empire Lifestyle'
  );
}

// Ensure specific SEO blogs exist
const seoBlogs = [
  {
    title: 'Navigating Teterboro (TEB): The Private Jet Traveler\'s Guide',
    slug: 'teterboro-airport-chauffeur-guide',
    content: 'Teterboro Airport (TEB) is the primary gateway for private aviation in the New York metropolitan area. Unlike JFK or EWR, Teterboro offers a level of discretion and efficiency that elite travelers demand. However, the transition from the tarmac to the city requires precision. At Empire Chauffeur NYC, we specialize in FBO (Fixed Base Operator) pickups at Signature, Jet Aviation, and Atlantic Aviation. Our chauffeurs are vetted for security and discretion, ensuring that your ground transportation is as seamless as your flight. We monitor tail numbers in real-time and coordinate directly with flight crews to ensure your vehicle is waiting on the ramp or at the terminal the moment you land.',
    excerpt: 'A comprehensive guide for private jet travelers arriving at Teterboro Airport, focusing on seamless transitions to Manhattan.',
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2070&auto=format&fit=crop',
    author: 'Empire Logistics Team'
  },
  {
    title: 'Mastering the Manhattan Corporate Roadshow',
    slug: 'manhattan-corporate-roadshow-logistics',
    content: 'In the fast-paced world of finance and global business, a corporate roadshow is a high-stakes endeavor. Multiple meetings across Midtown, the Financial District, and Hudson Yards require a logistics partner who understands the rhythm of the city. Our hourly chauffeur service is designed for this exact scenario. With a dedicated vehicle and a chauffeur who knows every shortcut and back entrance in Manhattan, executives can focus on their presentations while we handle the traffic. We provide Wi-Fi equipped vehicles and bottled water, turning your car into a mobile office between stops. Our dispatch team monitors traffic patterns 24/7 to reroute your chauffeur instantly if a delay occurs.',
    excerpt: 'How professional chauffeur services ensure executive productivity during high-stakes multi-stop meetings in NYC.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    author: 'Elena Rodriguez'
  },
  {
    title: 'Luxury Transportation for NYC Gala & Event Season',
    slug: 'nyc-gala-event-transportation-luxury',
    content: 'New York City\'s social calendar is legendary. From the glamour of the Met Gala to the high-stakes fundraisers at Cipriani, arriving in style is not just about the vehicle—it\'s about the experience. Our fleet of late-model Mercedes-Benz S-Class sedans and Cadillac Escalades provides the perfect backdrop for your evening. We understand the complexities of event drop-offs and the importance of being ready for immediate pickup the moment the event concludes. Our chauffeurs coordinate with event security and valets to ensure a smooth arrival, allowing you to make an entrance that matches the prestige of the occasion. For larger groups, our Executive Sprinters offer the same level of luxury with expanded capacity for your entire party.',
    excerpt: 'Arrive in style during New York City\'s most prestigious event seasons, from the Met Gala to Wall Street fundraisers.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
    author: 'Empire Lifestyle'
  }
];

for (const blog of seoBlogs) {
  const exists = db.prepare("SELECT id FROM blogs WHERE slug = ?").get(blog.slug);
  if (!exists) {
    db.prepare("INSERT INTO blogs (title, slug, content, excerpt, image, author) VALUES (?, ?, ?, ?, ?, ?)")
      .run(blog.title, blog.slug, blog.content, blog.excerpt, blog.image, blog.author);
  }
}

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer);
  const PORT = 3000;

  app.use(express.json());

  // Auth Routes
  app.post("/api/auth/login", (req, res) => {
    const { username, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE username = ? AND password = ?").get(username, password) as any;
    
    if (user) {
      // In a real app, generate a JWT token.
      res.json({ 
        success: true, 
        user: { id: user.id, username: user.username, role: user.role } 
      });
    } else {
      res.status(401).json({ success: false, error: "Invalid credentials" });
    }
  });

  // Blog Routes
  app.get("/api/blogs", (req, res) => {
    const blogs = db.prepare("SELECT * FROM blogs ORDER BY published_at DESC").all();
    res.json(blogs);
  });

  app.get("/api/blogs/:slug", (req, res) => {
    const blog = db.prepare("SELECT * FROM blogs WHERE slug = ?").get(req.params.slug);
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  });

  app.post("/api/blogs", (req, res) => {
    const { title, slug, content, excerpt, image, image_alt, author, meta_title, meta_description, focus_keyword } = req.body;
    try {
      const info = db.prepare(`
        INSERT INTO blogs (title, slug, content, excerpt, image, image_alt, author, meta_title, meta_description, focus_keyword)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(title, slug, content, excerpt, image, image_alt, author, meta_title, meta_description, focus_keyword);
      
      const newBlog = db.prepare("SELECT * FROM blogs WHERE id = ?").get(info.lastInsertRowid);
      res.json(newBlog);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/blogs/:id", (req, res) => {
    const { title, slug, content, excerpt, image, image_alt, author, meta_title, meta_description, focus_keyword } = req.body;
    const { id } = req.params;
    
    db.prepare(`
      UPDATE blogs 
      SET title = ?, slug = ?, content = ?, excerpt = ?, image = ?, image_alt = ?, author = ?, meta_title = ?, meta_description = ?, focus_keyword = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `).run(title, slug, content, excerpt, image, image_alt, author, meta_title, meta_description, focus_keyword, id);
    
    const updatedBlog = db.prepare("SELECT * FROM blogs WHERE id = ?").get(id);
    res.json(updatedBlog);
  });

  app.delete("/api/blogs/:id", (req, res) => {
    db.prepare("DELETE FROM blogs WHERE id = ?").run(req.params.id);
    res.json({ success: true });
  });

  // API Routes
  app.get("/api/stats", (req, res) => {
    const totalBookings = db.prepare("SELECT COUNT(*) as count FROM bookings").get() as { count: number };
    const activeBookings = db.prepare("SELECT COUNT(*) as count FROM bookings WHERE status = 'Active'").get() as { count: number };
    const totalRevenue = db.prepare("SELECT SUM(total_price) as sum FROM bookings WHERE status = 'Completed'").get() as { sum: number };
    const vehicleStatus = db.prepare("SELECT status, COUNT(*) as count FROM vehicles GROUP BY status").all();
    
    res.json({
      totalBookings: totalBookings.count,
      activeBookings: activeBookings.count,
      totalRevenue: totalRevenue.sum || 0,
      vehicleStatus
    });
  });

  app.get("/api/bookings", (req, res) => {
    const bookings = db.prepare(`
      SELECT b.*, v.name as vehicle_name, c.name as chauffeur_name 
      FROM bookings b
      LEFT JOIN vehicles v ON b.vehicle_id = v.id
      LEFT JOIN chauffeurs c ON b.chauffeur_id = c.id
      ORDER BY b.created_at DESC
    `).all();
    res.json(bookings);
  });

  app.post("/api/bookings", (req, res) => {
    const { customer_name, customer_email, customer_phone, pickup_location, dropoff_location, pickup_time, vehicle_id, total_price } = req.body;
    const info = db.prepare(`
      INSERT INTO bookings (customer_name, customer_email, customer_phone, pickup_location, dropoff_location, pickup_time, vehicle_id, total_price)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(customer_name, customer_email, customer_phone, pickup_location, dropoff_location, pickup_time, vehicle_id, total_price);
    
    const newBooking = db.prepare("SELECT * FROM bookings WHERE id = ?").get(info.lastInsertRowid);
    io.emit("booking:created", newBooking);
    res.json(newBooking);
  });

  app.patch("/api/bookings/:id", (req, res) => {
    const { status, chauffeur_id } = req.body;
    const { id } = req.params;
    
    if (status && chauffeur_id) {
      db.prepare("UPDATE bookings SET status = ?, chauffeur_id = ? WHERE id = ?").run(status, chauffeur_id, id);
    } else if (status) {
      db.prepare("UPDATE bookings SET status = ? WHERE id = ?").run(status, id);
    }
    
    const updatedBooking = db.prepare("SELECT * FROM bookings WHERE id = ?").get(id);
    io.emit("booking:updated", updatedBooking);
    res.json(updatedBooking);
  });

  app.get("/api/vehicles", (req, res) => {
    const vehicles = db.prepare("SELECT * FROM vehicles").all();
    res.json(vehicles);
  });

  app.get("/api/chauffeurs", (req, res) => {
    const chauffeurs = db.prepare("SELECT * FROM chauffeurs").all();
    res.json(chauffeurs);
  });

  app.post("/api/bookings/:id/send-email", (req, res) => {
    const { id } = req.params;
    const { type } = req.body; // 'confirmation', 'reminder', 'completion'
    
    const booking = db.prepare(`
      SELECT b.*, v.name as vehicle_name, c.name as chauffeur_name 
      FROM bookings b
      LEFT JOIN vehicles v ON b.vehicle_id = v.id
      LEFT JOIN chauffeurs c ON b.chauffeur_id = c.id
      WHERE b.id = ?
    `).get(id) as any;

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    console.log(`[MOCK EMAIL] Sending ${type} email to ${booking.customer_email}`);
    console.log(`Subject: Empire Chauffeur NYC - ${type === 'confirmation' ? 'Booking Confirmed' : 'Update'}`);
    console.log(`Body: Hello ${booking.customer_name}, your booking #BK-${booking.id} for ${booking.pickup_time} is ${booking.status}.`);

    res.json({ success: true, message: `Email (${type}) sent successfully to ${booking.customer_email}` });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  io.on("connection", (socket) => {
    console.log("Client connected to WebSocket");
  });

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
