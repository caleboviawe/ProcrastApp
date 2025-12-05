export type TaskStatus = 'not-started' | 'in-progress' | 'completed';

export type TaskCategory = 'reading' | 'coding' | 'writing' | 'group-work' | 'other';

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  status: TaskStatus;
  dueDate?: Date;
  createdAt: Date;
  order: number;
}

export const TASK_CATEGORIES: { value: TaskCategory; label: string; emoji: string }[] = [
  { value: 'reading', label: 'Reading', emoji: '📚' },
  { value: 'coding', label: 'Coding', emoji: '💻' },
  { value: 'writing', label: 'Writing', emoji: '✍️' },
  { value: 'group-work', label: 'Group Work', emoji: '👥' },
  { value: 'other', label: 'Other', emoji: '📌' },
];

export const TASK_STATUSES: { value: TaskStatus; label: string; emoji: string }[] = [
  { value: 'not-started', label: 'Not Started', emoji: '⭕' },
  { value: 'in-progress', label: 'In Progress', emoji: '🚀' },
  { value: 'completed', label: 'Completed', emoji: '✅' },
];