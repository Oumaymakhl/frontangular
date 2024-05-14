export interface Task {
    id: number;
    user_id: number;
    status: string;
    estimated_time: number;
    time_spent?: number; // Le "?" indique que cette propriété est facultative
    name: string;
    description: string;
    created_at?: string; // Le "?" indique que cette propriété est facultative
    updated_at?: string; // Le "?" indique que cette propriété est facultative
}
