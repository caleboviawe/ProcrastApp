export type TaskStatus = 'not-started' | 'in-progress' | 'completed' | 'archived';

export interface User {
    id: number;
    username: string;
    email: string;
    password_hash: string;
    role: 'student' | 'admin';
    created_at: string;
    updated_at: string;
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
    category_id: number;
    status_id: number;
    status: TaskStatus;
    title: string;
    description: string | null;
    due_date: Date | null;
    created_at: Date;
    updated_at: Date;
    hasDocument: boolean;
}

export interface Reminder {
    id: number;
    task_id: number;
    remind_at: string;
    created_at: string;
}