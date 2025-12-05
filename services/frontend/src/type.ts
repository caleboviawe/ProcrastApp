export type TaskStatus = 'not-started' | 'in-progress' | 'completed' | 'archived';

export interface User {
    id: number;
    username: string;
    email: string;
    role: 'student' | 'admin';
    createdAt: Date;
    updatedAt: Date;
    googleId: string | null;
    notifyDeadlines: boolean;
    notifyDailySummary: boolean;
    notifyOverdue: boolean;
}

export interface Status {
    id: number;
    name: string;
}

export interface Category {
    id: number;
    name: string;
    description: string | null;
}

export interface Task {
    id: number;
    user_id: number;
    status_id: number;
    status: TaskStatus;
    category: string;
    title: string;
    description: string | null;
    due_date: Date | null;
    created_at: Date;
    updated_at: Date;
    has_document: boolean;
    document_id: number | null;
}

export interface Reminder {
    id: number;
    task_id: number;
    remind_at: string;
    created_at: string;
}

export interface EditingUserType {
    id: number;
    username: string;
    email: string;
    role: "student" | "admin";
}