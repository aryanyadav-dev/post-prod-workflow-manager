export interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high';
  description: string;
  assignee?: string;
  dueDate?: string;
  fileMetadata?: {
    filename: string;
    size: string;
    format?: string;
    duration?: string;
    resolution?: string;
  };
}

export interface Stage {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  tasks: Task[];
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthUser {
  username: string;
  password: string;
  active?: true;
}

export interface TeamMember {
  name: string;
  count: number;
}

export interface Project {
  id?: string;
  name: string;
  description: string;
  projectType: string;
  teamMembers: TeamMember[];
}