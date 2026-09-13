export interface Project {
  id: string;
  title: string;
  description: string;
  role: string;
  technologies: string[];
  image: string;
  imageAlt: string;
  githubUrl: string;
  liveUrl?: string;
  caseStudy: {
    problem: string;
    approach: string;
    outcome: string;
  };
}

export const projects: Project[] = [
  {
    id: 'ne-attend',
    title: 'NE-Attend',
    description:
      'Automated attendance monitoring for students and instructors specifically designed for Google Meet.',
    role: 'Full-Stack Developer',
    technologies: ['React', 'Vite', 'Node.js', 'MongoDB', 'Socket.IO'],
    image: '/projects/ne-attend.png',
    imageAlt: 'NE-Attend Google Meet attendance login screen',
    githubUrl: 'https://github.com/Reychie/NE_ATTEND-Update',
    liveUrl: 'https://ne-attend-update.vercel.app/',
    caseStudy: {
      problem:
        'Online class attendance in Google Meet is hard to track reliably when instructors rely on manual roll call or after-the-fact participant lists.',
      approach:
        'Built a React and Node.js platform with Admin, Instructor, and Student roles, backed by MongoDB and Socket.IO. A companion browser extension reads Google Meet participants and syncs presence into session records, including late and absence policy rules.',
      outcome:
        'Instructors and students get centralized Meet attendance monitoring with live updates, session history, and reporting instead of scattered manual tracking.',
    },
  },
  {
    id: 'useapp',
    title: 'USEAPP',
    description:
      'A real-time employee attendance monitoring and payroll processing system with a companion mobile app.',
    role: 'Full-Stack Developer',
    technologies: ['PHP', 'MySQL', 'React Native', 'JavaScript'],
    image: '/projects/useapp.png',
    imageAlt: 'USEAPP employee attendance login screen',
    githubUrl: 'https://github.com/Reychie/USEAPP',
    liveUrl: 'https://useapp-f783.vercel.app/',
    caseStudy: {
      problem:
        'Employee timekeeping and payroll are often handled in separate tools, so clock-in records, late or absent days, and pay calculations are easy to disconnect.',
      approach:
        'Implemented a PHP and MySQL web console for attendance and payroll administration alongside an Expo mobile app where employees clock in and out. Attendance status feeds salary and payslip workflows used by both admin and employee views.',
      outcome:
        'Organizations can record daily attendance on mobile or web and process payroll from the same attendance history, with payslips and admin payroll tools in one system.',
    },
  },
];
