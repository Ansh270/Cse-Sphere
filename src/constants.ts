import { NewsItem, Note, DiscussionThread } from './types';

export const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'New AI Research Lab Opening',
    content: 'The department is proud to announce the opening of a new Artificial Intelligence research lab in Room 402. Students are encouraged to apply for positions.',
    date: 'Oct 15, 2023',
    category: 'academic',
    author: 'Dr. Sarah Jenkins',
    imageUrl: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: '2',
    title: 'Hackathon 2024: Registration Open',
    content: 'Join us for the annual 48-hour coding marathon. Prizes include internships and state-of-the-art tech gear.',
    date: 'Nov 02, 2023',
    category: 'event',
    author: 'CSE Student Body',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=60'
  }
];

export const MOCK_NOTES: Note[] = [
  {
    id: 'n1',
    title: 'Data Structures Quick Guide',
    description: 'A comprehensive summary of trees, graphs, and hash tables for mid-semester exams.',
    authorId: 'u1',
    authorName: 'Alex Chen',
    fileUrl: '#',
    category: 'Year 2',
    tags: ['Algorithms', 'C++'],
    createdAt: '2023-09-20',
    downloads: 145
  },
  {
    id: 'n2',
    title: 'Operating Systems Cheat Sheet',
    description: 'Process scheduling and memory management key concepts.',
    authorId: 'u2',
    authorName: 'Priya Sharma',
    fileUrl: '#',
    category: 'Year 3',
    tags: ['OS', 'UNIX'],
    createdAt: '2023-10-05',
    downloads: 87
  }
];

export const MOCK_DISCUSSIONS: DiscussionThread[] = [
  {
    id: 'd1',
    title: 'Best resources for learning Rust?',
    authorId: 'u3',
    authorName: 'Mark Wilson',
    content: 'I want to start learning systems programming with Rust. Any book or course recommendations?',
    replies: [
      {
        id: 'r1',
        authorId: 'u4',
        authorName: 'Sophia Lee',
        content: 'Check out "The Rust Programming Language" book, it is excellent and free online!',
        createdAt: '2023-10-10'
      }
    ],
    tags: ['Rust', 'Learning'],
    createdAt: '2023-10-09',
    likes: 12
  }
];
