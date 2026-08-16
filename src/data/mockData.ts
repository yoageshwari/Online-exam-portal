// Static mock data — stands in for a backend API.

export type ExamStatus = "upcoming" | "completed" | "pending";

export type Question = {
  id: number;
  text: string;
  options: string[];
  answer: number; // index of correct option
};

export type Exam = {
  id: string;
  name: string;
  subject: string;
  date: string;
  duration: number; // minutes
  totalMarks: number;
  status: ExamStatus;
  questions: Question[];
};

export const student = {
  name: "Yoageshwari Sharma",
  studentId: "IT2023045",
  email: "yoageshwari.sharma@college.edu",
  phone: "+91 98765 43210",
  department: "Information Technology",
  semester: "4th Semester",
};

function q(id: number, text: string, options: string[], answer: number): Question {
  return { id, text, options, answer };
}

const networkQuestions: Question[] = [
  q(1, "Which protocol is used to transfer web pages over the internet?", ["FTP", "HTTP", "SMTP", "SSH"], 1),
  q(2, "How many layers are there in the OSI model?", ["5", "6", "7", "8"], 2),
  q(3, "Which device works at the Data Link layer?", ["Hub", "Switch", "Router", "Repeater"], 1),
  q(4, "What is the default port number for HTTPS?", ["21", "80", "443", "8080"], 2),
  q(5, "Which protocol resolves an IP address to a MAC address?", ["DNS", "ARP", "DHCP", "ICMP"], 1),
  q(6, "IPv4 addresses are how many bits long?", ["16", "32", "64", "128"], 1),
  q(7, "Which transport layer protocol is connectionless?", ["TCP", "UDP", "SCTP", "FTP"], 1),
  q(8, "What does DNS primarily do?", ["Assign IP addresses", "Translate domain names to IPs", "Encrypt traffic", "Route packets"], 1),
  q(9, "Which command checks connectivity between two hosts?", ["ping", "grep", "chmod", "netstat -r"], 0),
  q(10, "A subnet mask of 255.255.255.0 means how many host bits?", ["4", "8", "16", "24"], 1),
  q(11, "Which protocol assigns IP addresses dynamically?", ["ARP", "DHCP", "SNMP", "POP3"], 1),
  q(12, "In TCP, the three-way handshake uses which flags?", ["SYN, SYN-ACK, ACK", "ACK, FIN, RST", "PSH, URG, FIN", "SYN, FIN, ACK"], 0),
  q(13, "Which topology connects every node to a central device?", ["Bus", "Ring", "Star", "Mesh"], 2),
  q(14, "What is the maximum data rate concept given by Nyquist related to?", ["Noise", "Bandwidth", "Latency", "Jitter"], 1),
  q(15, "Which layer is responsible for end-to-end delivery?", ["Network", "Transport", "Session", "Physical"], 1),
  q(16, "SMTP is used for?", ["Receiving mail", "Sending mail", "File transfer", "Remote login"], 1),
  q(17, "Which of these is a private IP range?", ["8.8.8.0/24", "192.168.0.0/16", "1.1.1.0/24", "203.0.113.0/24"], 1),
  q(18, "What does NAT stand for?", ["Network Access Table", "Network Address Translation", "Node Address Transfer", "Network Allocation Tool"], 1),
  q(19, "Which protocol is used for secure remote login?", ["Telnet", "SSH", "FTP", "HTTP"], 1),
  q(20, "A router primarily works at which OSI layer?", ["Layer 1", "Layer 2", "Layer 3", "Layer 4"], 2),
];

const dsQuestions: Question[] = [
  q(1, "What is the time complexity of binary search on a sorted array?", ["O(n)", "O(log n)", "O(n log n)", "O(1)"], 1),
  q(2, "Which data structure uses FIFO order?", ["Stack", "Queue", "Tree", "Graph"], 1),
  q(3, "A stack follows which principle?", ["FIFO", "LIFO", "Random", "Priority"], 1),
  q(4, "Worst case time complexity of Quick Sort?", ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"], 2),
  q(5, "Which traversal visits root, left, right?", ["Inorder", "Preorder", "Postorder", "Level order"], 1),
  q(6, "Minimum number of nodes in a binary tree of height 3?", ["3", "4", "7", "8"], 1),
  q(7, "Which structure is used for BFS?", ["Stack", "Queue", "Heap", "Set"], 1),
  q(8, "A hash table collision can be solved by?", ["Chaining", "Sorting", "Recursion", "Hashing twice only"], 0),
  q(9, "Which sorting algorithm is stable?", ["Quick Sort", "Merge Sort", "Heap Sort", "Selection Sort"], 1),
  q(10, "Time complexity of inserting at the head of a linked list?", ["O(1)", "O(n)", "O(log n)", "O(n^2)"], 0),
];

const dbmsQuestions: Question[] = [
  q(1, "Which normal form removes partial dependency?", ["1NF", "2NF", "3NF", "BCNF"], 1),
  q(2, "SQL command to remove a table completely?", ["DELETE", "DROP", "TRUNCATE", "REMOVE"], 1),
  q(3, "A primary key can be?", ["NULL", "Duplicate", "Unique and not null", "Any value"], 2),
  q(4, "ACID stands for Atomicity, Consistency, Isolation and?", ["Durability", "Dependency", "Delivery", "Distribution"], 0),
  q(5, "Which join returns all rows from both tables?", ["INNER JOIN", "LEFT JOIN", "FULL OUTER JOIN", "CROSS JOIN"], 2),
  q(6, "Which key references another table's primary key?", ["Candidate key", "Foreign key", "Super key", "Alternate key"], 1),
  q(7, "Indexing mainly improves?", ["Insert speed", "Read speed", "Storage size", "Security"], 1),
  q(8, "GROUP BY is used with which type of function?", ["Scalar", "Aggregate", "String", "Date"], 1),
  q(9, "Which language subset contains COMMIT and ROLLBACK?", ["DDL", "DML", "TCL", "DCL"], 2),
  q(10, "A view in SQL is?", ["A physical table", "A virtual table", "An index", "A trigger"], 1),
];

const oopQuestions: Question[] = [
  q(1, "Which OOP concept hides internal details?", ["Inheritance", "Encapsulation", "Polymorphism", "Abstraction"], 1),
  q(2, "Method overloading is an example of?", ["Runtime polymorphism", "Compile-time polymorphism", "Inheritance", "Encapsulation"], 1),
  q(3, "A constructor has which return type?", ["void", "int", "No return type", "Same as class"], 2),
  q(4, "Which keyword prevents inheritance in Java?", ["static", "final", "const", "sealed"], 1),
  q(5, "An abstract class can?", ["Only have abstract methods", "Have both abstract and concrete methods", "Be instantiated", "Not have constructors"], 1),
  q(6, "Which relationship is 'has-a'?", ["Inheritance", "Composition", "Overloading", "Overriding"], 1),
  q(7, "Interfaces mainly provide?", ["Multiple inheritance of type", "Memory management", "Faster execution", "Data storage"], 0),
  q(8, "'this' keyword refers to?", ["Parent class", "Current object", "Static context", "Interface"], 1),
  q(9, "Overriding requires the method signature to be?", ["Different", "Same", "Static", "Private"], 1),
  q(10, "Which is not an OOP principle?", ["Abstraction", "Compilation", "Inheritance", "Polymorphism"], 1),
];

const webQuestions: Question[] = [
  q(1, "Which hook manages state in a React function component?", ["useEffect", "useState", "useMemo", "useRef"], 1),
  q(2, "CSS property to create a flex container?", ["display: block", "display: flex", "position: flex", "float: flex"], 1),
  q(3, "Which HTML tag links an external stylesheet?", ["<style>", "<script>", "<link>", "<meta>"], 2),
  q(4, "JSON stands for?", ["JavaScript Object Notation", "Java Standard Object Name", "JavaScript Ordered Nodes", "Java Source Object Notation"], 0),
  q(5, "Which method sends data to a server in a form?", ["GET only", "POST", "PUT only", "HEAD"], 1),
  q(6, "In React, data is passed to child components using?", ["state", "props", "refs", "context only"], 1),
  q(7, "Which selector has the highest CSS specificity?", ["Element", "Class", "ID", "Universal"], 2),
  q(8, "localStorage data is?", ["Cleared on refresh", "Persisted in the browser", "Stored on server", "Encrypted by default"], 1),
  q(9, "Which tag is semantic HTML?", ["<div>", "<span>", "<article>", "<b>"], 2),
  q(10, "Media queries are used for?", ["Animations", "Responsive design", "Routing", "Validation"], 1),
];

export const exams: Exam[] = [
  {
    id: "cn-101",
    name: "Computer Networks – Mid Term",
    subject: "Computer Networks",
    date: "2026-09-02",
    duration: 45,
    totalMarks: 100,
    status: "upcoming",
    questions: networkQuestions,
  },
  {
    id: "ds-201",
    name: "Data Structures – Unit Test 2",
    subject: "Data Structures",
    date: "2026-09-05",
    duration: 30,
    totalMarks: 50,
    status: "upcoming",
    questions: dsQuestions,
  },
  {
    id: "dbms-301",
    name: "DBMS – Practice Quiz",
    subject: "Database Management Systems",
    date: "2026-09-08",
    duration: 30,
    totalMarks: 50,
    status: "upcoming",
    questions: dbmsQuestions,
  },
  {
    id: "oop-401",
    name: "OOP Concepts – Class Test",
    subject: "Object-Oriented Programming",
    date: "2026-08-12",
    duration: 25,
    totalMarks: 50,
    status: "pending",
    questions: oopQuestions,
  },
  {
    id: "wt-501",
    name: "Web Technology – Lab Quiz",
    subject: "Web Technology",
    date: "2026-08-10",
    duration: 25,
    totalMarks: 50,
    status: "pending",
    questions: webQuestions,
  },
  {
    id: "ds-202",
    name: "Data Structures – Unit Test 1",
    subject: "Data Structures",
    date: "2026-07-18",
    duration: 30,
    totalMarks: 50,
    status: "completed",
    questions: dsQuestions,
  },
  {
    id: "dbms-302",
    name: "DBMS – SQL Basics",
    subject: "Database Management Systems",
    date: "2026-07-04",
    duration: 30,
    totalMarks: 50,
    status: "completed",
    questions: dbmsQuestions,
  },
];

export type ResultRecord = {
  id: string;
  examId: string;
  examName: string;
  subject: string;
  date: string;
  score: number;
  total: number;
  correct: number;
  incorrect: number;
  unanswered: number;
};

export const pastResults: ResultRecord[] = [
  {
    id: "r-1",
    examId: "ds-202",
    examName: "Data Structures – Unit Test 1",
    subject: "Data Structures",
    date: "2026-07-18",
    score: 42,
    total: 50,
    correct: 8,
    incorrect: 1,
    unanswered: 1,
  },
  {
    id: "r-2",
    examId: "dbms-302",
    examName: "DBMS – SQL Basics",
    subject: "Database Management Systems",
    date: "2026-07-04",
    score: 36,
    total: 50,
    correct: 7,
    incorrect: 3,
    unanswered: 0,
  },
  {
    id: "r-3",
    examId: "wt-501",
    examName: "Web Technology – Lab Quiz",
    subject: "Web Technology",
    date: "2026-06-21",
    score: 45,
    total: 50,
    correct: 9,
    incorrect: 1,
    unanswered: 0,
  },
];

export const subjects = [
  "Data Structures",
  "Database Management Systems",
  "Computer Networks",
  "Object-Oriented Programming",
  "Web Technology",
];