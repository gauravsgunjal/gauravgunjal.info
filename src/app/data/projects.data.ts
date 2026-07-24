import { Project } from '../models/project.model';

export const PROJECTS: Project[] = [
  {
    id: 'beat-solar',
    name: 'BEAT Solar — SCADA Monitoring Platform',
    description:
      'Supervisory monitoring dashboard for solar power plant owners, tracking device performance, ' +
      'alerts, and comparative analytics across installations worldwide.',
    longDescription:
      'A SCADA-style web application built for BECIS to help solar power plant owners monitor plant and ' +
      'device health in real time. Includes device registries, graph-based performance reporting (amCharts, ' +
      'Chart.js), Excel export, individual-device comparison, and an alerting/ticketing workflow spanning ' +
      'owners, plant managers, and the monitoring team.',
    image: 'assets/images/projects/beat-solar.jpg',
    technologies: ['CodeIgniter', 'PHP', 'MySQL', 'jQuery', 'AJAX', 'Chart.js', 'amCharts'],
    liveUrl: 'https://beatsolarindia.be-cis.com/',
    featured: true,
    category: 'SCADA / IoT'
  },
  {
    id: 'beat-bio-energy',
    name: 'BEAT Bio-Energy — Plant Monitoring System',
    description:
      'Monitoring platform for bio-energy power plant owners, mirroring the BEAT Solar architecture for a ' +
      'different renewable energy vertical.',
    longDescription:
      'Extends the BEAT monitoring architecture to bio-energy plants, maintaining device registries, ' +
      'performance reports, and fault alerting for plant owners across multiple regions.',
    image: 'assets/images/projects/beat-bio-energy.jpg',
    technologies: ['CodeIgniter', 'PHP', 'MySQL', 'jQuery', 'AJAX'],
    liveUrl: 'https://beatbiosea.be-cis.com/',
    featured: true,
    category: 'SCADA / IoT'
  },
  {
    id: 'msceia',
    name: 'MSCEIA — Institute & Exam Management',
    description:
      'Statewide platform for the Maharashtra State Commerce Educational Institutes Association managing ' +
      'institute registration, exam logistics, and results.',
    longDescription:
      'Built for computer typing institutes across Maharashtra. Handles institute registration, exam-centre ' +
      'allocation, controller assignment, student fee tracking, GR management, and results generation, giving ' +
      'the association a single system of record across all affiliated institutes.',
    image: 'assets/images/projects/msceia.jpg',
    technologies: ['CodeIgniter', 'MySQL', 'HTML', 'jQuery', 'AJAX'],
    liveUrl: 'https://msceia.in/',
    featured: true,
    category: 'Enterprise'
  },
  {
    id: 'mit-sms',
    name: 'MIT Student Management System',
    description:
      'Admissions platform for MIT Academy of Engineering supporting online form submission, fee payment ' +
      '(full and installment), and document generation.',
    longDescription:
      'Manages the full student admission lifecycle — form submission, full or installment fee payment, ' +
      'bonafide and leaving-certificate downloads, course/fee configuration, bulk student data import from ' +
      'Excel, and role- and field-level configuration for administrators.',
    image: 'assets/images/projects/mit-sms.jpg',
    technologies: ['CodeIgniter', 'MySQL', 'HTML', 'jQuery', 'AJAX'],
    liveUrl: 'http://mitaoe.edu.in/sms/',
    featured: true,
    category: 'Enterprise'
  },
  {
    id: 'mit-hrms',
    name: 'MIT Human Resource Management System',
    description:
      'HRMS for MIT Academy of Engineering covering employee records, leave workflows, and staff reporting.',
    longDescription:
      'Maintains full employee lifecycle records, block/unblock controls, leave allocation and application, ' +
      'multi-step leave approval, and a range of staff reports for administrators.',
    image: 'assets/images/projects/mit-hrms.jpg',
    technologies: ['CodeIgniter', 'MySQL', 'HTML', 'jQuery', 'AJAX'],
    liveUrl: 'http://mitaoe.edu.in/hrms/',
    featured: false,
    category: 'Enterprise'
  },
  {
    id: 'vision-holidays',
    name: 'Vision Holidays — Booking & Accounting',
    description:
      'Operations platform for a travel agency covering service sales, group tour bookings, and financial ' +
      'reporting.',
    longDescription:
      'Handles service and group-tour sales, bank verification, currency exchange, receipt generation, and ' +
      'reporting for a travel and holidays business.',
    image: 'assets/images/projects/vision-holidays.jpg',
    technologies: ['CodeIgniter', 'MySQL', 'HTML', 'jQuery', 'AJAX'],
    liveUrl: 'http://visionholidayss.com/',
    featured: false,
    category: 'E-Commerce'
  },
  {
    id: 'college-portals',
    name: 'ICDMI & IICMR College Portals',
    description:
      'Institutional websites for two colleges covering information, events, registration, and document ' +
      'downloads.',
    longDescription:
      'Public-facing college websites maintaining institutional information, activities and events, online ' +
      'registration, news updates, and downloadable documents.',
    image: 'assets/images/projects/college-portals.jpg',
    technologies: ['CodeIgniter', 'MySQL', 'HTML', 'jQuery', 'AJAX'],
    liveUrl: 'https://www.iicmr.org/',
    featured: false,
    category: 'Web App'
  },
  {
    id: 'spring-boot-rest-api',
    name: 'Spring Boot REST API',
    description:
      'Open-source reference implementation of a RESTful API built with Spring Boot — part of my ongoing ' +
      'transition into the Java ecosystem.',
    longDescription:
      'A hands-on Spring Boot project used to build and demonstrate REST API fundamentals: layered ' +
      'architecture, request validation, and clean controller/service/repository separation.',
    image: 'assets/images/projects/spring-boot-rest-api.jpg',
    technologies: ['Java', 'Spring Boot', 'Maven', 'REST API'],
    githubUrl: 'https://github.com/gauravsgunjal/SprintBootRestAPI',
    featured: true,
    category: 'API'
  }
];
