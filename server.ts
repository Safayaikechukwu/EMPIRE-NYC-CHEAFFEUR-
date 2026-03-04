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

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer);
  const PORT = 3000;

  app.use(express.json());

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
