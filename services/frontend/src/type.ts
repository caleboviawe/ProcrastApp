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
    category_id: number;
    status_id: number;
    title: string;
    description: string | null;
    due_date: string | null;
    created_at: string;
    updated_at: string;
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