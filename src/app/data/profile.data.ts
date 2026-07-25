import { Profile } from '../models/profile.model';
import { calculateExperience } from '../core/utils/career.util';

const experience = calculateExperience();

export const PROFILE: Profile = {
  fullName: 'Gaurav Sanjay Gunjal',
  displayName: 'Gaurav Gunjal',
  title: 'Senior Full Stack Engineer',
  taglines: [
    'Senior Full Stack Engineer',
    'Java & Spring Boot Specialist',
    'Angular Frontend Architect',
    'AWS Cloud-Native Developer',
    'AI Enthusiast'
  ],
  location: 'Pune, India',
  email: 'gauravgunjal.info@gmail.com',
  phone: '+91 96577 26462',
  summary:
    `Senior Full Stack Engineer with ${experience.label} of experience designing and shipping enterprise-grade ` +
    'applications across the Java, Spring Boot, Angular, and PHP ecosystems. Currently building scalable ' +
    'backend services and modern Angular interfaces at Tata Consultancy Services, with a track record of ' +
    'delivering 15+ production systems — from SCADA monitoring platforms for renewable energy plants to ' +
    'HRMS, admissions, and e-commerce platforms used by real institutions and businesses.',
  aboutParagraphs: [
    'My engineering journey started in March 2017 building full-stack web applications in PHP and CodeIgniter for ' +
      'Invictus Corporation (ITWizz), where I shipped and maintained more than a dozen production systems — ' +
      'student admission and HRMS portals for MIT Academy of Engineering, association management software ' +
      'for MSCEIA, college websites, e-commerce platforms, and booking systems — while also owning AWS and ' +
      'Linux-based Apache server deployments end to end.',
    'In 2021 I moved into industrial SCADA software at Berkeley Energy Commercial Industrial Solutions (BECIS), ' +
      'building monitoring dashboards for solar and bio-energy power plants used by plant owners across ' +
      'multiple countries — device registries, alerting, ticketing workflows, and performance-comparison ' +
      'reporting rendered through interactive charts.',
    'Since September 2021, I have been with Tata Consultancy Services as a Software Engineer, where my focus ' +
      'shifted toward the Java ecosystem — building enterprise-scale backend services with Spring Boot and ' +
      'Maven, and pairing them with Angular front ends. Alongside client-facing enterprise work, I have been ' +
      'deepening my expertise in AWS cloud architecture, PostgreSQL, Docker, and CI/CD pipelines, and I am ' +
      'now actively exploring how AI-powered tooling and workflows can be integrated into enterprise software.',
    'Across every role, the throughline has been the same: talk directly to the people who will use the ' +
      'software, design a solution that is genuinely simple to operate, and take ownership all the way from ' +
      'requirements to the server it runs on.'
  ],
  strengths: [
    'Full-stack versatility across PHP, Java/Spring Boot, and Angular',
    'End-to-end ownership — from requirements gathering to production server deployment',
    'Fast adoption of new frameworks and cloud technologies',
    'Strong analytical, debugging, and root-cause tracing skills',
    'Client-facing requirement gathering and translating business needs into technical design',
    'Clean, maintainable architecture with an eye for long-term scalability'
  ],
  achievements: [
    `Delivered 15+ production web and enterprise applications across EdTech, association management, HR, ` +
      `e-commerce, and industrial SCADA domains over a ${experience.wholeYears}-year career.`,
    'Built SCADA monitoring platforms (BEAT Solar, BEAT Bio-Energy) tracking renewable energy plant ' +
      'performance for owners across multiple countries, including alerting, ticketing, and comparative ' +
      'analytics dashboards.',
    'Owned production deployments on AWS and Linux-based Apache servers (WHM/cPanel) for a full portfolio ' +
      'of client applications, ensuring uptime and performance without a dedicated ops team.',
    'Transitioned from PHP/CodeIgniter full-stack development into enterprise Java, Spring Boot, and cloud-' +
      'native architecture at Tata Consultancy Services, while continuing to expand into AI-assisted ' +
      'engineering workflows.'
  ],
  stats: [
    { label: 'Years of Experience', value: experience.wholeYears, suffix: '+' },
    { label: 'Applications Delivered', value: 15, suffix: '+' },
    { label: 'Companies', value: 3 },
    { label: 'Core Technology Domains', value: 6 }
  ],
  social: [
    { label: 'GitHub', url: 'https://github.com/gauravsgunjal', icon: 'github' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/gauravgunjal07', icon: 'linkedin' },
    { label: 'Email', url: 'mailto:gauravgunjal.info@gmail.com', icon: 'mail' }
  ],
  // TODO: replace with your real headshot (assets/images/profile/profile.jpg) and updated resume PDF.
  resumeUrl: 'assets/resume/gaurav-gunjal-resume.pdf',
  profileImage: 'assets/images/profile/profile.png'
};
