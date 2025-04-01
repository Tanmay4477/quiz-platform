import { Quiz, User, QuizResult } from '@/interfaces/main';

export const mockUsers: User[] = [
  { id: '1', username: 'user1' },
  { id: '2', username: 'user2' },
  { id: '3', username: 'techguru' },
  { id: '4', username: 'quizmaster' },
  { id: '5', username: 'learner99' },
  { id: '6', username: 'codeenthusiast' },
  { id: '7', username: 'frontend_dev' }
];

export const mockQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'JavaScript Basics',
    description: 'Test your knowledge of JavaScript fundamentals',
    topic: 'Programming',
    createdBy: 'user1',
    createdAt: new Date('2023-01-01'),
    questions: [
      {
        id: '101',
        text: 'What is JavaScript?',
        options: [
          'A programming language',
          'A markup language',
          'A styling language',
          'An operating system'
        ],
        correctOptionIndex: 0,
        explanation: 'JavaScript is a programming language used to create interactive effects within web browsers.'
      },
      {
        id: '102',
        text: 'Which symbol is used for single-line comments in JavaScript?',
        options: [
          '#',
          '//',
          '<!--',
          '/**/'
        ],
        correctOptionIndex: 1,
        explanation: 'In JavaScript, // is used for single-line comments, while /* */ is used for multi-line comments.'
      },
      {
        id: '103',
        text: 'Which method is used to add an element at the end of an array?',
        options: [
          'push()',
          'append()',
          'add()',
          'insert()'
        ],
        correctOptionIndex: 0,
        explanation: 'The push() method adds one or more elements to the end of an array and returns the new length.'
      },
      {
        id: '104',
        text: 'What will console.log(typeof []) output?',
        options: [
          '"array"',
          '"object"',
          '"list"',
          '"undefined"'
        ],
        correctOptionIndex: 1,
        explanation: 'In JavaScript, arrays are actually objects, so typeof [] returns "object".'
      },
      {
        id: '105',
        text: 'Which is not a primitive data type in JavaScript?',
        options: [
          'String',
          'Number',
          'Boolean',
          'Array'
        ],
        correctOptionIndex: 3,
        explanation: 'Array is not a primitive data type in JavaScript. The primitive types are String, Number, Boolean, undefined, null, Symbol, and BigInt.'
      }
    ]
  },
  {
    id: '2',
    title: 'React Fundamentals',
    description: 'Test your understanding of React library concepts',
    topic: 'Programming',
    createdBy: 'user1',
    createdAt: new Date('2023-02-15'),
    questions: [
      {
        id: '201',
        text: 'What is React?',
        options: [
          'A JavaScript library for building user interfaces',
          'A programming language',
          'A database management system',
          'A back-end framework'
        ],
        correctOptionIndex: 0,
        explanation: 'React is a JavaScript library developed by Facebook for building user interfaces, particularly single-page applications.'
      },
      {
        id: '202',
        text: 'What is JSX?',
        options: [
          'A JavaScript extension syntax',
          'A JavaScript XML parser',
          'A JavaScript execution engine',
          'A JavaScript extension library'
        ],
        correctOptionIndex: 0,
        explanation: 'JSX is a syntax extension for JavaScript that looks similar to HTML and makes it easier to write and add HTML in React.'
      },
      {
        id: '203',
        text: 'What is the virtual DOM in React?',
        options: [
          'A complete duplicate of the real DOM',
          'A lightweight copy of the real DOM',
          'A server-side rendering technique',
          'A DOM manipulation library'
        ],
        correctOptionIndex: 1,
        explanation: 'The virtual DOM is a lightweight JavaScript representation of the real DOM. React uses it to improve performance by minimizing direct manipulation of the actual DOM.'
      },
      {
        id: '204',
        text: 'Which hook is used for side effects in React?',
        options: [
          'useState',
          'useEffect',
          'useContext',
          'useReducer'
        ],
        correctOptionIndex: 1,
        explanation: 'useEffect is the React Hook used for performing side effects in function components, such as data fetching, subscriptions, or manually changing the DOM.'
      }
    ]
  },
  {
    id: '3',
    title: 'CSS Mastery',
    description: 'Challenge your CSS styling knowledge',
    topic: 'Web Development',
    createdBy: 'frontend_dev',
    createdAt: new Date('2023-03-10'),
    questions: [
      {
        id: '301',
        text: 'What does CSS stand for?',
        options: [
          'Computer Style Sheets',
          'Creative Style Sheets',
          'Cascading Style Sheets',
          'Colorful Style Sheets'
        ],
        correctOptionIndex: 2,
        explanation: 'CSS stands for Cascading Style Sheets, which is used to style HTML elements.'
      },
      {
        id: '302',
        text: 'Which property is used to change the background color?',
        options: [
          'color',
          'background-color',
          'bgcolor',
          'background'
        ],
        correctOptionIndex: 1,
        explanation: 'The background-color property sets the background color of an element.'
      },
      {
        id: '303',
        text: 'Which CSS property controls the text size?',
        options: [
          'font-size',
          'text-size',
          'font-style',
          'text-style'
        ],
        correctOptionIndex: 0,
        explanation: 'The font-size property is used to control the size of text in CSS.'
      }
    ]
  },
  {
    id: '4',
    title: 'Data Structures',
    description: 'Test your knowledge of common data structures',
    topic: 'Computer Science',
    createdBy: 'quizmaster',
    createdAt: new Date('2023-04-22'),
    questions: [
      {
        id: '401',
        text: 'Which data structure follows the LIFO principle?',
        options: [
          'Queue',
          'Stack',
          'Linked List',
          'Tree'
        ],
        correctOptionIndex: 1,
        explanation: 'A Stack follows the Last In First Out (LIFO) principle, where the last element added is the first one to be removed.'
      },
      {
        id: '402',
        text: 'Which data structure is used to implement a priority queue?',
        options: [
          'Array',
          'Linked List',
          'Heap',
          'Hash Table'
        ],
        correctOptionIndex: 2,
        explanation: 'A Heap is commonly used to implement a priority queue, as it provides efficient operations for inserting and removing the highest (or lowest) priority element.'
      },
      {
        id: '403',
        text: 'What is the time complexity for searching an element in a balanced binary search tree?',
        options: [
          'O(1)',
          'O(log n)',
          'O(n)',
          'O(n²)'
        ],
        correctOptionIndex: 1,
        explanation: 'The time complexity for searching in a balanced binary search tree is O(log n), where n is the number of nodes in the tree.'
      }
    ]
  },
  {
    id: '5',
    title: 'TypeScript Essentials',
    description: 'Check your TypeScript knowledge',
    topic: 'Programming',
    createdBy: 'techguru',
    createdAt: new Date('2023-05-05'),
    questions: [
      {
        id: '501',
        text: 'What is TypeScript?',
        options: [
          'A JavaScript framework',
          'A superset of JavaScript',
          'A JavaScript replacement',
          'A JavaScript compiler'
        ],
        correctOptionIndex: 1,
        explanation: 'TypeScript is a superset of JavaScript that adds static type definitions and other features to JavaScript.'
      },
      {
        id: '502',
        text: 'What is the file extension for TypeScript files?',
        options: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx'
        ],
        correctOptionIndex: 2,
        explanation: '.ts is the standard file extension for TypeScript files, while .tsx is used for TypeScript files that contain JSX syntax.'
      }
    ]
  }
];

export const mockResults: QuizResult[] = [
  {
    id: 'result1',
    quizId: '1',
    username: 'user2',
    score: 8,
    totalQuestions: 10,
    completedAt: new Date('2023-01-02')
  },
  {
    id: 'result2',
    quizId: '1',
    username: 'techguru',
    score: 9,
    totalQuestions: 10,
    completedAt: new Date('2023-01-15')
  },
  {
    id: 'result3',
    quizId: '1',
    username: 'learner99',
    score: 7,
    totalQuestions: 10,
    completedAt: new Date('2023-01-20')
  },
  {
    id: 'result4',
    quizId: '2',
    username: 'user2',
    score: 3,
    totalQuestions: 4,
    completedAt: new Date('2023-02-20')
  },
  {
    id: 'result5',
    quizId: '2',
    username: 'quizmaster',
    score: 4,
    totalQuestions: 4,
    completedAt: new Date('2023-02-25')
  },
  {
    id: 'result6',
    quizId: '3',
    username: 'user1',
    score: 2,
    totalQuestions: 3,
    completedAt: new Date('2023-03-15')
  },
  {
    id: 'result7',
    quizId: '3',
    username: 'codeenthusiast',
    score: 3,
    totalQuestions: 3,
    completedAt: new Date('2023-03-22')
  },
  {
    id: 'result8',
    quizId: '4',
    username: 'techguru',
    score: 2,
    totalQuestions: 3,
    completedAt: new Date('2023-04-30')
  },
  {
    id: 'result9',
    quizId: '4',
    username: 'frontend_dev',
    score: 3,
    totalQuestions: 3,
    completedAt: new Date('2023-05-02')
  },
  {
    id: 'result10',
    quizId: '5',
    username: 'user2',
    score: 1,
    totalQuestions: 2,
    completedAt: new Date('2023-05-10')
  },
  {
    id: 'result11',
    quizId: '5',
    username: 'codeenthusiast',
    score: 2,
    totalQuestions: 2,
    completedAt: new Date('2023-05-15')
  },
  {
    id: 'result12',
    quizId: '1',
    username: 'frontend_dev',
    score: 6,
    totalQuestions: 10,
    completedAt: new Date('2023-01-25')
  },
  {
    id: 'result13',
    quizId: '3',
    username: 'techguru',
    score: 3,
    totalQuestions: 3,
    completedAt: new Date('2023-03-27')
  },
  {
    id: 'result14',
    quizId: '4',
    username: 'quizmaster',
    score: 3,
    totalQuestions: 3,
    completedAt: new Date('2023-04-15')
  },
  {
    id: 'result15',
    quizId: '2',
    username: 'learner99',
    score: 2,
    totalQuestions: 4,
    completedAt: new Date('2023-02-28')
  }
];