export type CourseGroupIconId = "laptop-code" | "calculator";

export type CourseGroup = {
  title: string;
  iconId: CourseGroupIconId;
  courses: string[];
};

export type Education = {
  school: string;
  degree: string;
  gpa: string;
  courseGroups: CourseGroup[];
};

export const education: Education = {
  school: "Central Connecticut State University",
  degree: "B.S. Computer Science, Cum Laude — Dec 2024",
  gpa: "3.59",
  courseGroups: [
    {
      title: "Computer Science & Development",
      iconId: "laptop-code",
      courses: [
        "Software Engineering",
        "Web Programming",
        "Mobile App Development",
        "Computer Game Development",
        "Systems Programming",
        "Data and File Structures",
        "Computer Science I & II",
        "Computer Architecture",
        "Digital Systems Design",
        "Computer Security",
        "Principles of Software Testing & QA",
        "Programming Languages",
        "Algorithms",
        "Intro to Computer Forensics",
        "Cloud Computing Technology & Services",
      ],
    },
    {
      title: "Mathematics",
      iconId: "calculator",
      courses: [
        "Discrete Mathematics for Computer Science",
        "Linear Algebra & Probability for Engineers",
      ],
    },
  ],
};