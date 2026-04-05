CREATE TABLE settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  site_name VARCHAR(255) NOT NULL,
  tagline VARCHAR(255),
  headline VARCHAR(255),
  sub_headline VARCHAR(255),

  phone VARCHAR(20),
  whatsapp VARCHAR(20),
  email VARCHAR(255),

  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100),

  facebook_url TEXT,
  tiktok_url TEXT,

  business_hours_weekdays VARCHAR(100),
  business_hours_saturday VARCHAR(100),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE pages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,

  content LONGTEXT,

  meta_title VARCHAR(255),
  meta_description TEXT,

  is_published BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,

  description TEXT,
  image_url TEXT,

  is_featured BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE service_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  service_id INT NOT NULL,

  name VARCHAR(255),
  description TEXT,
  image_url TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);
CREATE TABLE portfolio (
  id INT AUTO_INCREMENT PRIMARY KEY,

  title VARCHAR(255),
  category VARCHAR(100),

  before_image TEXT,
  after_image TEXT,

  description TEXT,

  is_featured BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE gallery (
  id INT AUTO_INCREMENT PRIMARY KEY,

  title VARCHAR(255),
  image_url TEXT,
  category VARCHAR(100),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,

  name VARCHAR(255),
  message TEXT,
  rating INT DEFAULT 5,

  is_featured BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE leads (
  id INT AUTO_INCREMENT PRIMARY KEY,

  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  message TEXT,

  service_id INT NULL,

  status ENUM('new','contacted','closed') DEFAULT 'new',

  ip_address VARCHAR(45),
  user_agent TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE SET NULL
);

CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,

  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,

  role ENUM('super_admin','editor') DEFAULT 'editor',

  last_login TIMESTAMP NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE uploads (
  id INT AUTO_INCREMENT PRIMARY KEY,

  file_name VARCHAR(255),
  file_url TEXT,
  file_type VARCHAR(50),

  uploaded_by INT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (uploaded_by) REFERENCES admins(id) ON DELETE SET NULL
);
CREATE TABLE auth_tokens (
  id INT AUTO_INCREMENT PRIMARY KEY,

  admin_id INT,
  token TEXT,

  expires_at DATETIME,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE
);
CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_portfolio_category ON portfolio(category);
