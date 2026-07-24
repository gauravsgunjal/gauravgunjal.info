import { ExperienceEntry } from '../models/experience.model';

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: 'Tata Consultancy Services (TCS)',
    role: 'Software Engineer',
    startDate: 'Sep 2021',
    endDate: 'Present',
    location: 'Pune, India',
    summary:
      'Building enterprise-scale applications on the Java ecosystem, pairing Spring Boot services with ' +
      'Angular front ends for large client engagements, while expanding into cloud architecture and AI-' +
      'assisted engineering workflows.',
    responsibilities: [
      'Design and develop backend services and REST APIs using Java, Spring Boot, and Maven for enterprise clients.',
      'Build and maintain Angular-based user interfaces integrated with those backend services.',
      'Contribute to cloud-based, scalable solution design as part of enterprise application architecture.',
      'Collaborate with cross-functional teams on requirement analysis, technical design, and delivery.',
      'Apply clean-code and maintainability practices across the Java and Angular codebases.'
    ],
    achievements: [
      'Transitioned from a PHP/CodeIgniter background into enterprise Java and Spring Boot within an ' +
        'accelerated ramp-up, while continuing to ship Angular front-end work.',
      'Actively expanding into AWS cloud architecture, PostgreSQL, Docker, and CI/CD as part of modernizing ' +
        'enterprise delivery practices.',
      'Exploring and piloting AI-assisted development tooling to improve engineering workflows.'
    ],
    technologies: ['Java', 'Spring Boot', 'Maven', 'Angular', 'TypeScript', 'AWS', 'PostgreSQL', 'Docker', 'REST APIs', 'CI/CD']
  },
  {
    company: 'Berkeley Energy Commercial Industrial Solutions (BECIS)',
    companyUrl: 'https://be-cis.com/',
    role: 'Senior Software Developer',
    startDate: 'Jul 2021',
    endDate: 'Sep 2021',
    location: 'Pune, India',
    summary:
      'Built SCADA (Supervisory Control and Data Acquisition) monitoring software for renewable energy plant ' +
      'owners, covering solar and bio-energy installations.',
    responsibilities: [
      'Developed plant and device registry modules for monitoring solar and bio-energy power plants.',
      'Built performance-comparison and monitoring dashboards using chart libraries (amCharts, Chart.js, Toast UI).',
      'Implemented alerting for plant-generated faults and a ticketing system for owners, plant managers, and monitoring teams.',
      'Generated exportable performance reports in graph and Excel formats.'
    ],
    achievements: [
      'Delivered the BEAT Solar and BEAT Bio-Energy monitoring platforms used by plant owners internationally.',
      'Built individual-device comparison tooling to help teams pinpoint underperforming equipment faster.'
    ],
    technologies: ['CodeIgniter', 'PHP', 'MySQL', 'JavaScript', 'jQuery', 'AJAX', 'amCharts', 'Chart.js']
  },
  {
    company: 'Invictus Corporation Pvt. Ltd. (ITWizz)',
    companyUrl: 'http://itwizz.in/',
    role: 'Senior Software Developer',
    startDate: 'Mar 2017',
    endDate: 'Jun 2021',
    location: 'Pune, India',
    summary:
      'Full-stack web developer responsible for designing, building, and deploying a wide range of client ' +
      'applications — from institutional management systems to e-commerce platforms — while owning production ' +
      'server infrastructure.',
    responsibilities: [
      'Gathered requirements directly from clients and translated them into technical designs.',
      'Built full-stack applications using PHP, CodeIgniter, MySQL, HTML5, CSS3, JavaScript, jQuery, and AJAX.',
      'Deployed and maintained websites and web applications on AWS and Linux-based Apache servers (WHM/cPanel).',
      'Debugged and resolved production issues across the stack, from database queries to front-end rendering.',
      'Delivered custom reporting (PDF, Excel, Word), charting, and mapping features per client requirements.'
    ],
    achievements: [
      'Built the Maharashtra State Commerce Educational Institutes Association (MSCEIA) platform, managing ' +
        'institute registration, exam-centre allocation, and results generation for institutes across Maharashtra.',
      'Delivered the MIT Academy of Engineering Student Management System (admissions, fee collection, and ' +
        'document generation) and Human Resource Management System (employee records and leave workflows).',
      'Shipped college portals for ICDMI and IICMR, a travel booking and accounting system for Vision Holidays, ' +
        'and multiple e-commerce and business websites.',
      'Independently owned end-to-end delivery — from client requirements to AWS/Apache server deployment — ' +
        'across more than a dozen production applications.'
    ],
    technologies: ['PHP', 'CodeIgniter', 'MySQL', 'Angular', 'JavaScript', 'jQuery', 'AJAX', 'HTML5', 'CSS3', 'AWS', 'WHM/cPanel']
  }
];
