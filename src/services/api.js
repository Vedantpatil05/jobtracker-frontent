const API_BASE_URL = "https://jobtracker-backend-35w2.onrender.com/api";


// Create axios-like functionality
const apiRequest = async (method, url, data = null, headers = {}) => {
  const token = localStorage.getItem('token');
  
  const config = {
    method: method.toUpperCase(),
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (data) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(`${API_BASE_URL}${url}`, config);
  
  if (!response.ok) {
    const error = await response.json();
    throw { response: { data: error } };
  }

  return { data: await response.json() };
};

// Auth API
export const authAPI = {
  login: (email, password) => apiRequest('POST', '/auth/login', { email, password }),
  signup: (name, email, password) => apiRequest('POST', '/auth/signup', { name, email, password }),
  verifyToken: () => apiRequest('GET', '/auth/verify')
};

// Job API
export const jobAPI = {
  getAllJobs: () => apiRequest('GET', '/jobs'),
  createJob: (jobData) => apiRequest('POST', '/jobs', jobData),
  updateJob: (id, jobData) => apiRequest('PUT', `/jobs/${id}`, jobData),
  deleteJob: (id) => apiRequest('DELETE', `/jobs/${id}`)
};

// AI API
export const aiAPI = {
  generateResume: (jobRole, experience) => apiRequest('POST', '/ai/resume', { jobRole, experience }),
  generatePrepPlan: (jobRole, company) => apiRequest('POST', '/ai/prep', { jobRole, company })
};

// For demo purposes, you can use mock data
const MOCK_MODE = true;

if (MOCK_MODE) {
  // Mock Auth API
  authAPI.login = async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'demo@example.com' && password === 'password') {
      return {
        data: {
          token: 'mock-jwt-token',
          user: { id: '1', name: 'Demo User', email: 'demo@example.com' }
        }
      };
    }
    throw { response: { data: { message: 'Invalid credentials' } } };
  };

  authAPI.signup = async (name, email, password) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      data: {
        token: 'mock-jwt-token',
        user: { id: '1', name, email }
      }
    };
  };

  authAPI.verifyToken = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      data: {
        user: { id: '1', name: 'Demo User', email: 'demo@example.com' }
      }
    };
  };

  // Mock Job API
  let mockJobs = [
    {
      _id: '1',
      company: 'Google',
      title: 'Frontend Developer',
      status: 'Interviewing',
      jobUrl: 'https://careers.google.com/jobs/123',
      notes: 'Initial screening completed, technical interview scheduled.',
      appliedDate: new Date('2024-01-15').toISOString(),
      userId: '1'
    },
    {
      _id: '2',
      company: 'Microsoft',
      title: 'Software Engineer',
      status: 'Applied',
      jobUrl: 'https://careers.microsoft.com/jobs/456',
      notes: 'Applied through LinkedIn, waiting for response.',
      appliedDate: new Date('2024-01-10').toISOString(),
      userId: '1'
    }
  ];

  jobAPI.getAllJobs = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { data: mockJobs };
  };

  jobAPI.createJob = async (jobData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newJob = {
      _id: Date.now().toString(),
      ...jobData,
      userId: '1'
    };
    mockJobs.push(newJob);
    return { data: newJob };
  };

  jobAPI.updateJob = async (id, jobData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockJobs.findIndex(job => job._id === id);
    if (index !== -1) {
      mockJobs[index] = { ...mockJobs[index], ...jobData };
      return { data: mockJobs[index] };
    }
    throw { response: { data: { message: 'Job not found' } } };
  };

  jobAPI.deleteJob = async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    mockJobs = mockJobs.filter(job => job._id !== id);
    return { data: { message: 'Job deleted' } };
  };

  // Mock AI API
  aiAPI.generateResume = async (jobRole, experience) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
      data: {
        bulletPoints: [
          `Developed and maintained scalable web applications using modern ${jobRole} technologies, resulting in 25% improved user engagement.`,
          `Led cross-functional team of 5 developers in ${jobRole} projects, delivering high-quality solutions 15% ahead of schedule.`,
          `Implemented advanced ${jobRole} features and optimizations that reduced loading time by 40% and improved overall system performance.`
        ]
      }
    };
  };

  aiAPI.generatePrepPlan = async (jobRole, company) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
      data: {
        prepPlan: `Interview Preparation Plan for ${jobRole} at ${company}

1. TECHNICAL PREPARATION
   • Review core ${jobRole} concepts and best practices
   • Practice coding problems on platforms like LeetCode or HackerRank
   • Prepare to discuss your past projects and technical decisions
   • Review system design principles relevant to the role

2. COMPANY RESEARCH
   • Study ${company}'s mission, values, and recent news
   • Research the team you'll be working with
   • Understand ${company}'s products and services
   • Review the company's engineering culture and practices

3. BEHAVIORAL QUESTIONS
   • Prepare STAR method answers for common behavioral questions
   • Think of examples that demonstrate leadership, problem-solving, and teamwork
   • Practice explaining complex technical concepts in simple terms
   • Prepare questions to ask the interviewer about the role and company

4. SPECIFIC FOCUS AREAS
   • Research ${company}'s technology stack and tools
   • Understand the specific requirements for ${jobRole} at ${company}
   • Review any publicly available engineering blogs or documentation
   • Prepare for role-specific scenarios and challenges

5. FINAL PREPARATION
   • Practice mock interviews with peers or mentors
   • Review your resume and be ready to discuss every point
   • Prepare thoughtful questions about the role, team, and company culture
   • Plan your logistics for the interview day

Good luck with your interview!`
      }
    };
  };
}