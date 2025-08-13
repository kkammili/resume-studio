import { useState } from 'react';
import './App.css';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';

function App() {
  const [resumeSections, setResumeSections] = useState([
    'Professional Summary',
    'Technical Skills',
    'Work Experience',
    'Education',
    'Certifications',
    'Awards',
  ]);

  const myResumeJson = {
    name: "KRISHNAM RAJU KAMMILI",
    contact: {
      location: "Plano, TX",
      email: "kkrajus777@gmail.com",
      phone: "469-569-6257",
      linkedin: "in/@krishnamraju-kammili",
      website: "",
    },
    professionalSummary:
      "Senior Full Stack Developer with 8+ years of experience building scalable web applications and cloud-native platforms. Passionate about crafting robust frontend/backend solutions, streamlining DevOps workflows, and leading cross-functional teams. Awarded Lumen's 2022 Employee of the Year and Fidelity's Q2 2024 Most Valuable Associate.",
    technicalSkills: {
      Frontend: ["React", "Angular", "Vue.js", "TypeScript", "JavaScript"],
      Backend: ["Node.js", "Python", "Java", "Express", "Django"],
      "Cloud & DevOps": ["AWS", "Azure", "Docker", "Kubernetes", "CI/CD"],
      Databases: ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
    },
    workExperience: [
      {
        role: "Sr. Full Stack Developer",
        company: "Fidelity",
        location: "Durham, NC",
        startDate: "May 2023",
        endDate: "Present",
        projects: [
          {
            name: "Plan Sponsor WebStation (PSW) Modernization",
            description:
              "Led the modernization of the Plan Sponsor WebStation platform",
            keyAchievements: [
              "Improved data visualization, enabling real-time secure access",
              "Streamlined the cloud migration of legacy systems",
              "Introduced user-centric dashboards and form validations",
              "Built the Edithub frontend using Angular 18 with scalable architecture",
              "Maintained 95%+ test coverage (Jest) and integrated Cypress into CI/CD workflows",
            ],
            techStack: [
              "Angular 18",
              "NgRx Signal Store",
              "RxJS",
              "WireMock",
              "Jest",
              "Cypress",
              "AWS S3",
            ],
          },
        ],
      },
      {
        role: "Sr. Full Stack Developer",
        company: "Lumen",
        location: "Littleton, CO",
        startDate: "Oct 2021",
        endDate: "May 2023",
        projects: [
          {
            name: "Dycon - Global Self-Service Cloud Connectivity Portal",
            description:
              "Led the development of Dycon, a global self-service cloud connectivity portal",
            keyAchievements: [
              "Supported AWS, Azure, and GCP integrations",
              "Implemented scalable cloud-native architecture",
              "Reduced deployment time by 60% through automation",
            ],
            techStack: [
              "React",
              "Node.js",
              "AWS",
              "Azure",
              "GCP",
              "Docker",
              "Kubernetes",
            ],
          },
        ],
      },
    ],
    education: {
      degree: "Bachelor of Science in Computer Science",
      university: "University of Texas at Dallas",
      gpa: "3.8/4.0",
      year: "2016",
    },
    certifications: [
      "AWS Certified Solutions Architect",
      "Microsoft Azure Fundamentals",
      "Google Cloud Professional",
    ],
    awards: [
      "Lumen's 2022 Employee of the Year",
      "Fidelity's Q2 2024 Most Valuable Associate",
    ],
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = resumeSections.indexOf(active.id);
      const newIndex = resumeSections.indexOf(over.id);
      const newSections = Array.from(resumeSections);
      newSections.splice(oldIndex, 1);
      newSections.splice(newIndex, 0, active.id);
      setResumeSections(newSections);
    }
  };

  const DraggableSection = ({ id, children }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id,
    });
    const style = {
      transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
    };

    return (
      <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="resume-section">
        {children}
      </div>
    );
  };

  const DroppableArea = ({ children }) => {
    const { setNodeRef } = useDroppable({
      id: 'droppable',
    });

    return (
      <div ref={setNodeRef}>
        {children}
      </div>
    );
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Resume", 10, 10);
    doc.save("resume.pdf");
  };

  return (
    <div className="resume-studio">
      <h1>Resume Studio</h1>
      <DndContext onDragEnd={handleDragEnd}>
        <DroppableArea>
          {resumeSections.map((section) => (
            <DraggableSection key={section} id={section}>
              {section}
            </DraggableSection>
          ))}
        </DroppableArea>
      </DndContext>
      <button onClick={downloadPDF}>Download as PDF</button>
    </div>
  );
}

export default App;
