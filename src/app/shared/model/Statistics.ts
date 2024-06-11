export interface Statistics {
    reunions_count?: number;
    tasks_count?: number;
    users_count?: number;
    average_reunions_per_user?: number;
    tasks_by_status?: { status: string, count: number }[];
    task_completion_rate_by_user?: any[]; 
    average_tasks_per_user?: number;
    users_by_company?: { company_id: number, count: number }[];
    completed_tasks_count?: number;
    tasks_to_do_count?: number;
    tasks_per_user?: { user_id: number, count: number }[];
    completed_tasks_per_user?: { user_id: number, count: number }[];
    admin_count?: number;
    document_count?: number;
    decision_count?: number;
    like_count?: number;
    dislike_count?: number;
    decision_countAdmin?: number;
    task_countAdmin?: number;
}
