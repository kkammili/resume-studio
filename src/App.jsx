import { useState } from 'react';
import './App.css';
import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

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

  const [fontSize, setFontSize] = useState(14);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontWeight, setFontWeight] = useState('normal');
  const [fontStyle, setFontStyle] = useState('normal');
  const [textAlign, setTextAlign] = useState('left');

  const handleStyleChange = (style, value) => {
    switch (style) {
      case 'fontSize':
        setFontSize(value);
        break;
      case 'fontFamily':
        setFontFamily(value);
        break;
      case 'fontWeight':
        setFontWeight(value);
        break;
      case 'fontStyle':
        setFontStyle(value);
        break;
      case 'textAlign':
        setTextAlign(value);
        break;
      default:
        break;
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Resume", 10, 10);
    doc.save("resume.pdf");
  };

  const downloadDOCX = () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Resume",
                  bold: true,
                }),
              ],
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "resume.docx");
    });
  };

  return (
    <div className="resume-studio">
      <h1>Resume Studio</h1>
      <div className="controls">
        <label>
          Font Size:
          <input
            type="number"
            value={fontSize}
            onChange={(e) => handleStyleChange('fontSize', e.target.value)}
          />
        </label>
        <label>
          Font Family:
          <select
            value={fontFamily}
            onChange={(e) => handleStyleChange('fontFamily', e.target.value)}
          >
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
          </select>
        </label>
        <label>
          Bold:
          <input
            type="checkbox"
            checked={fontWeight === 'bold'}
            onChange={(e) => handleStyleChange('fontWeight', e.target.checked ? 'bold' : 'normal')}
          />
        </label>
        <label>
          Italics:
          <input
            type="checkbox"
            checked={fontStyle === 'italic'}
            onChange={(e) => handleStyleChange('fontStyle', e.target.checked ? 'italic' : 'normal')}
          />
        </label>
        <label>
          Text Align:
          <select
            value={textAlign}
            onChange={(e) => handleStyleChange('textAlign', e.target.value)}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </label>
      </div>
      <div
        className="resume"
        contentEditable
        style={{
          fontSize: `${fontSize}px`,
          fontFamily: fontFamily,
          fontWeight: fontWeight,
          fontStyle: fontStyle,
          textAlign: textAlign,
        }}
      >
        <h2>{myResumeJson.name}</h2>
        <p>{myResumeJson.professionalSummary}</p>
        {/* Render other sections similarly */}
      </div>
      <button onClick={downloadPDF}>Download as PDF</button>
      <button onClick={downloadDOCX}>Download as DOCX</button>
    </div>
  );
}

export default App;
