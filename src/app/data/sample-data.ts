//  '' -> issue
import { BoardType } from '../models/kanban.types';

let boardId = 0;
let columnId = 0;
let taskId = 0;
let subtaskId = 0;

export const generateBoardId = () => `board-${++boardId}`;
export const generateColumnId = () => `column-${++columnId}`;
export const generateTaskId = () => `task-${++taskId}`;
export const generateSubtaskId = () => `subtask-${++subtaskId}`;

export const SAMPLE_DATA: { boards: BoardType[] } = {
  boards: [
    {
      id: generateBoardId(),
      name: 'Platform Launch',
      columns: [
        {
          id: generateColumnId(),
          name: 'Todo',
          tasks: [
            {
              id: generateTaskId(),
              title: 'Build UI for onboarding flow',
              description: '',
              status: 'Todo',
              subtasks: [
                {
                  id: generateSubtaskId(),

                  title: 'Sign up page',
                  isCompleted: true,
                },
                {
                  id: generateSubtaskId(),
                  title: 'Sign in page',
                  isCompleted: false,
                },
                {
                  id: generateSubtaskId(),

                  title: 'Welcome page',
                  isCompleted: false,
                },
              ],
            },
            {
              id: generateTaskId(),
              title: 'Build UI for search',
              description: '',
              status: 'Todo',
              subtasks: [
                {
                  id: generateSubtaskId(),

                  title: 'Search page',
                  isCompleted: false,
                },
              ],
            },
            {
              id: generateTaskId(),
              title: 'Build settings UI',
              description: '',
              status: 'Todo',
              subtasks: [
                {
                  id: generateSubtaskId(),

                  title: 'Account page',
                  isCompleted: false,
                },
                {
                  id: generateSubtaskId(),

                  title: 'Billing page',
                  isCompleted: false,
                },
              ],
            },
            {
              id: generateTaskId(),
              title: 'QA and test all major user journeys',
              description:
                'Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.',
              status: 'Todo',
              subtasks: [
                {
                  id: generateSubtaskId(),

                  title: 'Internal testing',
                  isCompleted: false,
                },
                {
                  id: generateSubtaskId(),

                  title: 'External testing',
                  isCompleted: false,
                },
              ],
            },
          ],
        },
        {
          id: generateColumnId(),
          name: 'Doing',
          tasks: [
            {
              id: generateTaskId(),
              title: 'Design settings and search pages',
              description: '',
              status: 'Doing',
              subtasks: [
                {
                  id: generateSubtaskId(),

                  title: 'Settings - Account page',
                  isCompleted: true,
                },
                {
                  id: generateSubtaskId(),

                  title: 'Settings - Billing page',
                  isCompleted: true,
                },
                {
                  id: generateSubtaskId(),

                  title: 'Search page',
                  isCompleted: false,
                },
              ],
            },
            {
              id: generateTaskId(),
              title: 'Add account management endpoints',
              description: '',
              status: 'Doing',
              subtasks: [
                {
                  id: generateSubtaskId(),

                  title: 'Upgrade plan',
                  isCompleted: true,
                },
                {
                  id: generateSubtaskId(),

                  title: 'Cancel plan',
                  isCompleted: true,
                },
                {
                  id: generateSubtaskId(),

                  title: 'Update payment method',
                  isCompleted: false,
                },
              ],
            },
            {
              id: generateTaskId(),
              title: 'Design onboarding flow',
              description: '',
              status: 'Doing',
              subtasks: [
                {
                  id: generateSubtaskId(),

                  title: 'Sign up page',
                  isCompleted: true,
                },
                {
                  id: generateSubtaskId(),

                  title: 'Sign in page',
                  isCompleted: false,
                },
                {
                  id: generateSubtaskId(),

                  title: 'Welcome page',
                  isCompleted: false,
                },
              ],
            },
            {
              id: generateTaskId(),
              title: 'Add search enpoints',
              description: '',
              status: 'Doing',
              subtasks: [
                {
                  id: generateSubtaskId(),

                  title: 'Add search endpoint',
                  isCompleted: true,
                },
                {
                  id: generateSubtaskId(),

                  title: 'Define search filters',
                  isCompleted: false,
                },
              ],
            },
            {
              id: generateTaskId(),
              title: 'Add authentication endpoints',
              description: '',
              status: 'Doing',
              subtasks: [
                {
                  id: generateSubtaskId(),

                  title: 'Define user model',
                  isCompleted: true,
                },
                {
                  id: generateSubtaskId(),

                  title: 'Add auth endpoints',
                  isCompleted: false,
                },
              ],
            },
            {
              id: generateTaskId(),
              title:
                'Research pricing points of various competitors and trial different business models',
              description:
                "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
              status: 'Doing',
              subtasks: [
                {
                  id: generateSubtaskId(),

                  title: 'Research competitor pricing and business models',
                  isCompleted: true,
                },
                {
                  id: generateSubtaskId(),

                  title: 'Outline a business model that works for our solution',
                  isCompleted: false,
                },
                {
                  id: generateSubtaskId(),

                  title:
                    'Talk to potential customers about our proposed solution and ask for fair price expectancy',
                  isCompleted: false,
                },
              ],
            },
          ],
        },
        {
          id: generateColumnId(),
          name: 'Done',
          tasks: [
            {
              id: generateTaskId(),
              title: 'Conduct 5 wireframe tests',
              description:
                'Ensure the layout continues to make sense and we have strong buy-in from potential users.',
              status: 'Done',
              subtasks: [
                {
                  id: generateSubtaskId(),

                  title: 'Complete 5 wireframe prototype tests',
                  isCompleted: true,
                },
              ],
            },
            {
              id: generateTaskId(),
              title: 'Create wireframe prototype',
              description:
                'Create a greyscale clickable wireframe prototype to test our asssumptions so far.',
              status: 'Done',
              subtasks: [
                {
                  id: generateSubtaskId(),

                  title: 'Create clickable wireframe prototype in Balsamiq',
                  isCompleted: true,
                },
              ],
            },
            {
              id: generateTaskId(),
              title: 'Review results of usability tests and iterate',
              description:
                "Keep iterating through the subtasks until we're clear on the core concepts for the app.",
              status: 'Done',
              subtasks: [
                {
                  id: generateSubtaskId(),

                  title: 'Meet to review notes from previous tests and plan changes',
                  isCompleted: true,
                },
                {
                  id: generateSubtaskId(),

                  title: 'Make changes to paper prototypes',
                  isCompleted: true,
                },
                {
                  id: generateSubtaskId(),

                  title: 'Conduct 5 usability tests',
                  isCompleted: true,
                },
              ],
            },
            {
              id: generateTaskId(),
              title:
                'Create paper prototypes and conduct 10 usability tests with potential customers',
              description: '',
              status: 'Done',
              subtasks: [
                {
                  id: generateSubtaskId(),

                  title: 'Create paper prototypes for version one',
                  isCompleted: true,
                },
                {
                  id: generateSubtaskId(),

                  title: 'Complete 10 usability tests',
                  isCompleted: true,
                },
              ],
            },
            {
              id: generateTaskId(),
              title: 'Market discovery',
              description:
                'We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP.',
              status: 'Done',
              subtasks: [
                {
                  id: generateSubtaskId(),

                  title: 'Interview 10 prospective customers',
                  isCompleted: true,
                },
              ],
            },
            {
              id: generateTaskId(),
              title: 'Competitor analysis',
              description: '',
              status: 'Done',
              subtasks: [
                {
                  id: generateSubtaskId(),
                  title: 'Find direct and indirect competitors',
                  isCompleted: true,
                },
                {
                  id: generateSubtaskId(),

                  title: 'SWOT analysis for each competitor',
                  isCompleted: true,
                },
              ],
            },
            {
              id: generateTaskId(),
              title: 'Research the market',
              description:
                'We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.',
              status: 'Done',
              subtasks: [
                {
                  id: generateSubtaskId(),
                  title: 'Write up research analysis',
                  isCompleted: true,
                },
                {
                  id: generateSubtaskId(),
                  title: 'Calculate TAM',
                  isCompleted: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: generateBoardId(),
      name: 'Marketing Plan',
      columns: [
        {
          id: generateColumnId(),
          name: 'Todo',
          tasks: [
            {
              id: generateTaskId(),
              title: 'Plan Product Hunt launch',
              description: '',
              status: 'Todo',
              subtasks: [
                {
                  id: generateSubtaskId(),
                  title: 'Find hunter',
                  isCompleted: false,
                },
                {
                  id: generateSubtaskId(),
                  title: 'Gather assets',
                  isCompleted: false,
                },
                {
                  id: generateSubtaskId(),
                  title: 'Draft product page',
                  isCompleted: false,
                },
                {
                  id: generateSubtaskId(),
                  title: 'Notify customers',
                  isCompleted: false,
                },
                {
                  id: generateSubtaskId(),
                  title: 'Notify network',
                  isCompleted: false,
                },
                {
                  id: generateSubtaskId(),
                  title: 'Launch!',
                  isCompleted: false,
                },
              ],
            },
            {
              id: generateTaskId(),
              title: 'Share on Show HN',
              description: '',
              status: '',
              subtasks: [
                {
                  id: generateSubtaskId(),
                  title: 'Draft out HN post',
                  isCompleted: false,
                },
                {
                  id: generateSubtaskId(),
                  title: 'Get feedback and refine',
                  isCompleted: false,
                },
                {
                  id: generateSubtaskId(),
                  title: 'Publish post',
                  isCompleted: false,
                },
              ],
            },
            {
              id: generateTaskId(),
              title: 'Write launch article to publish on multiple channels',
              description: '',
              status: '',
              subtasks: [
                {
                  id: generateSubtaskId(),
                  title: 'Write article',
                  isCompleted: false,
                },
                {
                  id: generateSubtaskId(),
                  title: 'Publish on LinkedIn',
                  isCompleted: false,
                },
                {
                  id: generateSubtaskId(),
                  title: 'Publish on Inndie Hackers',
                  isCompleted: false,
                },
                {
                  id: generateSubtaskId(),
                  title: 'Publish on Medium',
                  isCompleted: false,
                },
              ],
            },
          ],
        },
        {
          id: generateColumnId(),
          name: 'Doing',
          tasks: [],
        },
        {
          id: generateColumnId(),
          name: 'Done',
          tasks: [],
        },
      ],
    },
    {
      id: generateBoardId(),
      name: 'Roadmap',
      columns: [
        {
          id: generateColumnId(),
          name: 'Now',
          tasks: [
            {
              id: generateTaskId(),
              title: 'Launch version one',
              description: '',
              status: '',
              subtasks: [
                {
                  id: generateSubtaskId(),
                  title: 'Launch privately to our waitlist',
                  isCompleted: false,
                },
                {
                  id: generateSubtaskId(),
                  title: 'Launch publicly on PH, HN, etc.',
                  isCompleted: false,
                },
              ],
            },
            {
              id: generateTaskId(),
              title: 'Review early feedback and plan next steps for roadmap',
              description:
                "Beyond the initial launch, we're keeping the initial roadmap completely empty. This meeting will help us plan out our next steps based on actual customer feedback.",
              status: '',
              subtasks: [
                {
                  id: generateSubtaskId(),
                  title: 'Interview 10 customers',
                  isCompleted: false,
                },
                {
                  id: generateSubtaskId(),
                  title: 'Review common customer pain points and suggestions',
                  isCompleted: false,
                },
                {
                  id: generateSubtaskId(),
                  title: 'Outline next steps for our roadmap',
                  isCompleted: false,
                },
              ],
            },
          ],
        },
        {
          id: generateColumnId(),
          name: 'Next',
          tasks: [],
        },
        {
          id: generateColumnId(),
          name: 'Later',
          tasks: [],
        },
      ],
    },
  ],
};
