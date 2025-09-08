const express = require('express');
const router = express.Router();

// Sample portfolio data for Alisher Namozov
const portfolioData = {
  profile: {
    name: "Alisher Namozov",
    title: "Full-Stack Developer",
    bio: "Passionate full-stack developer with expertise in modern web technologies. I love creating beautiful, functional, and user-friendly applications that solve real-world problems.",
    location: "Uzbekistan",
    email: "alisher.namozov@example.com",
    phone: "+998 XX XXX XX XX",
    avatar: "/api/placeholder/300/300"
  },
  skills: [
    { name: "React.js", level: 90, category: "Frontend" },
    { name: "Node.js", level: 85, category: "Backend" },
    { name: "Express.js", level: 85, category: "Backend" },
    { name: "JavaScript", level: 95, category: "Programming Language" },
    { name: "TypeScript", level: 80, category: "Programming Language" },
    { name: "Tailwind CSS", level: 90, category: "Frontend" },
    { name: "MongoDB", level: 75, category: "Database" },
    { name: "JWT Authentication", level: 85, category: "Backend" },
    { name: "Git & GitHub", level: 88, category: "Tools" }
  ],
  projects: [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce platform built with React.js and Node.js featuring user authentication, product management, and payment integration.",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Stripe"],
      liveUrl: "https://example-ecommerce.com",
      githubUrl: "https://github.com/alisher/ecommerce",
      imageUrl: "/images/projects/ecommerce-platform.svg",
      featured: true
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      technologies: ["React.js", "Socket.io", "Node.js", "PostgreSQL"],
      liveUrl: "https://example-taskapp.com",
      githubUrl: "https://github.com/alisher/taskapp",
      imageUrl: "/images/projects/task-management-app.svg",
      featured: true
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A responsive weather dashboard that displays current weather conditions and forecasts using external APIs.",
      technologies: ["React.js", "OpenWeather API", "Tailwind CSS"],
      liveUrl: "https://example-weather.com",
      githubUrl: "https://github.com/alisher/weather",
      imageUrl: "/images/projects/weather-dashboard.svg",
      featured: false
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website built with React.js and Tailwind CSS, featuring smooth animations and interactive components.",
      technologies: ["React.js", "Tailwind CSS", "Framer Motion", "Vite"],
      liveUrl: "https://alisher-portfolio.com",
      githubUrl: "https://github.com/alisher/portfolio",
      imageUrl: "/images/projects/portfolio-website.svg",
      featured: true
    },
    {
      id: 5,
      title: "Real-time Chat Application",
      description: "A real-time chat application with Socket.io featuring instant messaging, user presence indicators, and file sharing capabilities.",
      technologies: ["React.js", "Socket.io", "Node.js", "Express.js", "MongoDB"],
      liveUrl: "https://example-chatapp.com",
      githubUrl: "https://github.com/alisher/chatapp",
      imageUrl: "/images/projects/chat-application.svg",
      featured: false
    }
  ],
  experience: [
    {
      id: 1,
      company: "Tech Innovations LLC",
      position: "Full-Stack Developer",
      duration: "2022 - Present",
      description: "Developing and maintaining web applications using React.js, Node.js, and Express.js. Collaborated with cross-functional teams to deliver high-quality software solutions."
    },
    {
      id: 2,
      company: "Digital Solutions Agency",
      position: "Frontend Developer",
      duration: "2021 - 2022",
      description: "Created responsive and interactive user interfaces using React.js and modern CSS frameworks. Worked closely with designers to implement pixel-perfect designs."
    }
  ],
  education: [
    {
      id: 1,
      institution: "Tashkent University of Information Technologies",
      degree: "Bachelor's in Computer Science",
      duration: "2025 - 2030",
      description: "Focused on software engineering, algorithms, and web development technologies."
    }
  ]
};

// Get full portfolio data
router.get('/', (req, res) => {
  res.json({
    message: "Portfolio data retrieved successfully",
    data: portfolioData
  });
});

// Get profile information
router.get('/profile', (req, res) => {
  res.json({
    message: "Profile data retrieved successfully",
    data: portfolioData.profile
  });
});

// Get skills
router.get('/skills', (req, res) => {
  res.json({
    message: "Skills data retrieved successfully",
    data: portfolioData.skills
  });
});

// Get projects
router.get('/projects', (req, res) => {
  const { featured } = req.query;
  let projects = portfolioData.projects;
  
  if (featured === 'true') {
    projects = projects.filter(project => project.featured);
  }
  
  res.json({
    message: "Projects data retrieved successfully",
    data: projects
  });
});

// Get single project
router.get('/projects/:id', (req, res) => {
  const projectId = parseInt(req.params.id);
  const project = portfolioData.projects.find(p => p.id === projectId);
  
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }
  
  res.json({
    message: "Project data retrieved successfully",
    data: project
  });
});

// Get experience
router.get('/experience', (req, res) => {
  res.json({
    message: "Experience data retrieved successfully",
    data: portfolioData.experience
  });
});

// Get education
router.get('/education', (req, res) => {
  res.json({
    message: "Education data retrieved successfully",
    data: portfolioData.education
  });
});

// Contact form endpoint
router.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ 
      message: "Please provide name, email, and message" 
    });
  }
  
  // Log the contact form submission
  console.log('Contact form submission:', { name, email, subject, message });
  
  // Try to send Telegram notification
  try {
    const telegramBotService = require('../services/telegramBot');
    if (telegramBotService.isInitialized()) {
      await telegramBotService.sendContactNotification({
        name,
        email,
        subject,
        message
      });
      console.log('✅ Telegram notification sent successfully');
    }
  } catch (telegramError) {
    console.error('⚠️ Failed to send Telegram notification:', telegramError.message);
    // Don't fail the entire request if Telegram fails
  }
  
  res.json({
    message: "Thank you for your message! I'll get back to you soon.",
    success: true
  });
});

module.exports = router;