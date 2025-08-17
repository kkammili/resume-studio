import { useState } from 'react';
import './App.css';
// import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';
// import { saveAs } from 'file-saver';

function App() {
  const [fontFamily, setFontFamily] = useState('Inter');
  // const [resumeSections, setResumeSections] = useState([
  //   'Professional Summary',
  //   'Technical Skills',
  //   'Work Experience',
  //   'Education',
  //   'Certifications',
  //   'Awards',
  // ]);

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
        role: "Sr. Full Stack Developer", company: "Fidelity", location: "Durham, NC", startDate: "May 2023", endDate: "Present", projects: [
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


  const applyStyle = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  // const downloadPDF = () => {
  //   const doc = new jsPDF();
  //   doc.text("Resume", 10, 10);
  //   doc.save("resume.pdf");
  // };

  // const downloadDOCX = () => {
  //   const doc = new Document({
  //     sections: [
  //       {
  //         children: [
  //           new Paragraph({
  //             children: [
  //               new TextRun({
  //                 text: "Resume",
  //                 bold: true,
  //               }),
  //             ],
  //           }),
  //         ],
  //       },
  //     ],
  //   });

  //   Packer.toBlob(doc).then((blob) => {
  //     saveAs(blob, "resume.docx");
  //   });
  // };


  return (
    <div className="container max-w-2xl mx-auto p-5 shadow-md rounded-md bg-white text-black">
      <h1>Resume Studio</h1>
      <div className="controls flex justify-between items-center">
        <label>
          Font Family:
          <select onChange={(e) => {
            setFontFamily(e.target.value);
            applyStyle('fontName', e.target.value);
          }}>
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
          </select>
        </label>
      </div>
      <div
        className="resume"
        contentEditable
        style={{
          fontFamily: fontFamily,
        }}
      >
        <h2 className="text-center">{myResumeJson.name}</h2>
        <div className="contact-info mb-4 flex">
          <p>{myResumeJson.contact.location} | {myResumeJson.contact.email} | {myResumeJson.contact.phone} | {myResumeJson.contact.linkedin}</p>
        </div>
        <div className="mt-6">
          <h3>Professional Summary</h3>
          <p>{myResumeJson.professionalSummary}</p>
        </div>
        <div className="mt-6">
          <h3>Technical Skills</h3>
          {Object.entries(myResumeJson.technicalSkills).map(([category, skills]) => (
            <div key={category}>
              <strong>{category}:</strong> {skills.join(', ')}
            </div>
          ))}
        </div>
        <div>
          <h3>Work Experience</h3>
          {myResumeJson.workExperience.map((job, index) => (
            <div key={index}>
              <p><strong>{job.role} at {job.company}</strong> | {job.location} | {job.startDate} - {job.endDate}</p>
              {job.projects.map((project, pIndex) => (
                <div key={pIndex}>
                  <strong>Project: {project.name}</strong>
                  <p>{project.description}</p>
                  <ul>
                    {project.keyAchievements.map((achievement, aIndex) => (
                      <li key={aIndex}>{achievement}</li>
                    ))}
                  </ul>
                  <p>Tech Stack: {project.techStack.join(', ')}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div>
          <h3>Education & Certifications</h3>
          <div className="education-info mb-4 flex">
            <p>{myResumeJson.education.degree} | {myResumeJson.education.university} | GPA: {myResumeJson.education.gpa} | Year: {myResumeJson.education.year}</p>
          </div>
          <ul>
            {myResumeJson.awards.map((award, index) => (
              <li key={index}>{award}</li>
            ))}
          </ul>
          <ul>
            {myResumeJson.certifications.map((certification, index) => (
              <li key={index}>{certification}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={downloadPDF}
      >
        Download as PDF
      </button>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ml-2"
        onClick={downloadDOCX}
      >
        Download as DOCX
      </button> */}
    </div>
  );
}

export default App;
