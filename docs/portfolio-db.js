/*
  portfolio-db.js
  A simple client-side "database" representation of the portfolio.
  This can be viewed/edited on-mobile using the "Portfolio DB" modal.
*/

window.portfolioDB = {
  meta: {
    name: "Jaspher",
    title: "Ultra Portfolio",
    lastUpdated: new Date().toISOString(),
  },
  about: {
    headline: "Full-stack developer and UI/UX designer",
    bio: "Hi! I'm Jaspher, a passionate full-stack developer and UI/UX designer with a love for building modern and accessible web applications. With experience in JavaScript, React, Node.js, and responsive design, I bring ideas to life through clean code and thoughtful interfaces. When I'm not coding, I enjoy exploring design trends, contributing to open source, and learning new technologies.",
  },
  skills: [
    { name: "JavaScript", level: 95, description: "Modern ES6+, async/await, DOM manipulation, APIs" },
    { name: "React", level: 90, description: "Hooks, Context API, Redux, Next.js, component architecture" },
    { name: "Node.js", level: 85, description: "Express.js, REST APIs, authentication, database integration" },
    { name: "UI/UX Design", level: 80, description: "Figma, Adobe XD, user research, prototyping, design systems" },
    { name: "Python", level: 75, description: "Django, Flask, data analysis, automation scripts" },
    { name: "Database", level: 80, description: "MongoDB, PostgreSQL, MySQL, Redis, database design" }
  ],
  experience: [
    {
      title: "Senior Full-Stack Developer",
      date: "2024 - Present",
      details: "Leading development of scalable web applications at TechCorp Inc. Architecting microservices, implementing CI/CD pipelines, and mentoring junior developers. Technologies: React, Node.js, AWS, Docker, Kubernetes."
    },
    {
      title: "Frontend Developer",
      date: "2022 - 2024",
      details: "Developed responsive web applications and user interfaces for e-commerce platforms. Collaborated with design teams to implement pixel-perfect designs and optimize performance. Technologies: React, TypeScript, Sass, Webpack."
    },
    {
      title: "UI/UX Developer Intern",
      date: "2021 - 2022",
      details: "Designed and developed user interfaces for mobile and web applications. Created interactive prototypes and conducted user testing sessions. Tools: Figma, Adobe XD, HTML5, CSS3, JavaScript."
    },
    {
      title: "Computer Science Degree",
      date: "2019 - 2023",
      details: "Bachelor of Science in Computer Science with honors. Specialized in software engineering and web technologies. GPA: 3.8/4.0"
    }
  ],
  projects: [
    {
      id: "ecommerce-platform",
      name: "E-Commerce Platform",
      subtitle: "Full-stack e-commerce solution with modern UI",
      description: "A complete e-commerce platform featuring user authentication, product management, shopping cart, payment integration with Stripe, order tracking, and admin dashboard. Built with React, Node.js, MongoDB, and deployed on AWS.",
      url: "https://github.com/jaspher/ecommerce-platform",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS"]
    },
    {
      id: "realtime-chat",
      name: "Real-Time Chat App",
      subtitle: "Scalable chat application with WebSocket",
      description: "A real-time chat application supporting multiple rooms, private messaging, typing indicators, file sharing, and user presence. Features include message encryption, push notifications, and mobile-responsive design.",
      url: "https://github.com/jaspher/realtime-chat",
      technologies: ["React", "Socket.io", "Express", "Redis", "PostgreSQL"]
    },
    {
      id: "portfolio-website",
      name: "Portfolio Website",
      subtitle: "Modern, responsive portfolio with animations",
      description: "This very portfolio website featuring smooth animations, dark/light theme toggle, mobile-responsive design, contact form, and project showcase. Built with modern CSS, JavaScript, and various animation libraries.",
      url: "https://jaspher.dev",
      technologies: ["HTML5", "CSS3", "JavaScript", "AOS", "Particles.js"]
    },
    {
      id: "task-management",
      name: "Task Management App",
      subtitle: "Collaborative project management tool",
      description: "A comprehensive task management application with team collaboration features, real-time updates, project boards, time tracking, and reporting. Includes drag-and-drop functionality and integration with popular tools.",
      url: "https://github.com/jaspher/task-manager",
      technologies: ["Vue.js", "Firebase", "Tailwind CSS", "PWA", "Chart.js"]
    },
    {
      id: "weather-dashboard",
      name: "Weather Dashboard",
      subtitle: "Beautiful weather app with location services",
      description: "An elegant weather dashboard providing current conditions, forecasts, weather maps, and location-based alerts. Features include geolocation, favorite locations, and beautiful data visualizations.",
      url: "https://github.com/jaspher/weather-dashboard",
      technologies: ["React", "Weather API", "Geolocation", "Charts", "Material-UI"]
    },
    {
      id: "blog-platform",
      name: "Blog Platform",
      subtitle: "Content management system with markdown",
      description: "A modern blog platform with markdown support, SEO optimization, comment system, and admin panel. Features include draft management, scheduled publishing, and social media integration.",
      url: "https://github.com/jaspher/blog-platform",
      technologies: ["Next.js", "MDX", "Prisma", "PostgreSQL", "Vercel"]
    }
  ],
  contact: {
    email: "jaspher.dev@example.com",
    phone: "+1 (234) 567-8900",
    social: [
      { type: "GitHub", url: "https://github.com/jaspher" },
      { type: "LinkedIn", url: "https://linkedin.com/in/jaspher" },
      { type: "Twitter", url: "https://twitter.com/jaspher" }
    ]
  }
};
