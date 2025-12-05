import { ListChecks, Clock, FileText, Calendar } from 'lucide-react';

export const features = [
    {
        icon: <ListChecks />,
        text: 'Task Management',
        description: 'Create, organize, and track tasks with status options like Not Started, In Progress, and Completed.',
    },
    {
        icon: <Calendar />,
        text: 'Due Date Tracking',
        description: 'Set deadlines and get alerts for upcoming and overdue tasks.',
    },
    {
        icon: <FileText />,
        text: 'Document Editor',
        description: 'Attach documents to tasks with a built-in editor and time tracking.',
    },
    {
        icon: <Clock />,
        text: 'Progress Overview',
        description: 'View your task completion stats and stay on top of your assignments.',
    },
];
