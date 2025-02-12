import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon,
  Clock,
  AlertCircle,
  CheckCircle,
  Bell,
  Filter,
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
  Loader,
  AlertOctagon,
  Settings,
  RotateCcw
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  deadline: Date;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  assignee?: string;
  completedAt?: Date;
  deletedAt?: Date;
}

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: Date;
}

const Schedule: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Project Presentation',
      description: 'Quarterly team presentation for Q1 2024',
      startDate: new Date(2024, 1, 10),
      deadline: new Date(2024, 1, 14),
      priority: 'high',
      status: 'in-progress',
      assignee: 'John Doe'
    },
    {
      id: '2',
      title: 'Team Meeting',
      description: 'Monthly strategy discussion and planning',
      startDate: new Date(2024, 1, 20),
      deadline: new Date(2024, 1, 19),
      priority: 'medium',
      status: 'pending',
      assignee: 'Jane Smith'
    },
    {
      id: '3',
      title: 'Client Review',
      description: 'Review project progress with client',
      startDate: new Date(2024, 1, 5),
      deadline: new Date(2024, 1, 12),
      priority: 'high',
      status: 'overdue',
      assignee: 'Mike Johnson'
    }
  ]);

  // New state for additional features
  const [deletedTasks, setDeletedTasks] = useState<Task[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [cleanupDays, setCleanupDays] = useState(3);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDeletedTasks, setShowDeletedTasks] = useState(false);

  // Existing state
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed' | 'overdue'>('all');
  const [showAddTask, setShowAddTask] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showStatusOptions, setShowStatusOptions] = useState<string | null>(null);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    priority: 'medium',
    status: 'pending'
  });

  // Add notification helper
  const addNotification = (message: string, type: Notification['type'] = 'info') => {
    const newNotification: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      message,
      type,
      timestamp: new Date()
    };
    setNotifications(prev => [newNotification, ...prev].slice(0, 5)); // Keep last 5 notifications
  };

  // Enhanced cleanup effect with notifications
  useEffect(() => {
    const cleanupCompletedTasks = () => {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - cleanupDays);

      setTasks(prevTasks => {
        const tasksToDelete = prevTasks.filter(task => 
          task.status === 'completed' && 
          task.completedAt && 
          task.completedAt < cutoffDate
        );

        if (tasksToDelete.length > 0) {
          // Add deleted tasks to recoverable list with deletion timestamp
          const tasksWithDeletionDate = tasksToDelete.map(task => ({
            ...task,
            deletedAt: new Date()
          }));
          setDeletedTasks(prev => [...tasksWithDeletionDate, ...prev]);

          // Notify about deleted tasks
          addNotification(
            `${tasksToDelete.length} completed task(s) have been archived`,
            'info'
          );
        }

        return prevTasks.filter(task => {
          if (task.status === 'completed' && task.completedAt) {
            return task.completedAt >= cutoffDate;
          }
          return true;
        });
      });
    };

    // Run cleanup immediately
    cleanupCompletedTasks();

    // Set up interval to run cleanup every day
    const cleanupInterval = setInterval(cleanupCompletedTasks, 24 * 60 * 60 * 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(cleanupInterval);
  }, [cleanupDays]);

  // Task recovery function
  const handleTaskRecover = (taskId: string) => {
    const taskToRecover = deletedTasks.find(task => task.id === taskId);
    if (taskToRecover) {
      // Remove from deleted tasks
      setDeletedTasks(prev => prev.filter(task => task.id !== taskId));
      
      // Add back to active tasks
      setTasks(prev => [...prev, { ...taskToRecover, deletedAt: undefined }]);
      
      // Notify about recovery
      addNotification(`Task "${taskToRecover.title}" has been recovered`, 'success');
    }
  };

  // Permanently delete task
  const handlePermanentDelete = (taskId: string) => {
    const taskToDelete = deletedTasks.find(task => task.id === taskId);
    if (taskToDelete) {
      setDeletedTasks(prev => prev.filter(task => task.id !== taskId));
      addNotification(`Task "${taskToDelete.title}" has been permanently deleted`, 'warning');
    }
  };

  // Clear all notifications
  const clearNotifications = () => {
    setNotifications([]);
  };

  const statusOptions: { status: Task['status']; icon: React.ReactNode; label: string }[] = [
    { status: 'pending', icon: <AlertCircle size={14} />, label: 'Pending' },
    { status: 'in-progress', icon: <Loader size={14} className="animate-spin" />, label: 'In Progress' },
    { status: 'completed', icon: <CheckCircle size={14} />, label: 'Completed' },
    { status: 'overdue', icon: <AlertOctagon size={14} />, label: 'Overdue' }
  ];

  const getFilteredTasks = (status: Task['status'] | 'all') => {
    if (status === 'all') {
      return tasks.filter(task => task.status !== 'completed');
    }
    return tasks.filter(task => task.status === status);
  };

  const filteredTasks = getFilteredTasks(filter);

  const completedTasks = tasks.filter(task => task.status === 'completed')
    .sort((a, b) => (b.completedAt?.getTime() || 0) - (a.completedAt?.getTime() || 0));

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusStyle = (status: Task['status']) => {
    const baseClasses = 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors';
    switch (status) {
      case 'pending':
        return `${baseClasses} bg-gray-100 text-gray-800 hover:bg-gray-200`;
      case 'in-progress':
        return `${baseClasses} bg-blue-100 text-blue-800 hover:bg-blue-200`;
      case 'completed':
        return `${baseClasses} bg-green-100 text-green-800 hover:bg-green-200`;
      case 'overdue':
        return `${baseClasses} bg-red-100 text-red-800 hover:bg-red-200`;
      default:
        return baseClasses;
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    const option = statusOptions.find(opt => opt.status === status);
    return option?.icon;
  };

  const handleAddTask = () => {
    if (newTask.title && newTask.startDate && newTask.deadline) {
      const task = {
        id: (tasks.length + 1).toString(),
        title: newTask.title,
        description: newTask.description || '',
        startDate: new Date(newTask.startDate),
        deadline: new Date(newTask.deadline),
        priority: newTask.priority as Task['priority'],
        status: newTask.status as Task['status'],
        assignee: newTask.assignee
      };
      
      setTasks(prev => [...prev, task]);
      setShowAddTask(false);
      setNewTask({
        priority: 'medium',
        status: 'pending'
      });
    }
  };

  const handleStatusChange = (taskId: string, newStatus: Task['status']) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          status: newStatus,
          completedAt: newStatus === 'completed' ? new Date() : undefined
        };
      }
      return task;
    }));
    setShowStatusOptions(null);

    if (newStatus === 'completed' && filter === 'all') {
      setFilter('completed');
    }
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const getTasksForDate = (day: number) => {
    return tasks.filter(task => {
      const taskDate = task.deadline;
      return taskDate.getDate() === day &&
             taskDate.getMonth() === currentDate.getMonth() &&
             taskDate.getFullYear() === currentDate.getFullYear();
    });
  };

  const changeMonth = (increment: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showStatusOptions && !(event.target as Element).closest('.status-dropdown')) {
        setShowStatusOptions(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showStatusOptions]);

  return (
    <div className="p-6 bg-gray-900">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Schedule</h1>
        <div className="flex gap-4 items-center">
          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-gray-300 hover:text-white relative"
            >
              <Bell size={20} />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>
            
            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-lg z-50">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-white">Notifications</h3>
                    <button
                      onClick={clearNotifications}
                      className="text-sm text-gray-400 hover:text-white"
                    >
                      Clear all
                    </button>
                  </div>
                  {notifications.length === 0 ? (
                    <p className="text-gray-400 text-center py-2">No notifications</p>
                  ) : (
                    <div className="space-y-2">
                      {notifications.map(notification => (
                        <div
                          key={notification.id}
                          className={`p-3 rounded-lg ${
                            notification.type === 'success' ? 'bg-green-900/50' :
                            notification.type === 'warning' ? 'bg-yellow-900/50' :
                            notification.type === 'error' ? 'bg-red-900/50' :
                            'bg-gray-700/50'
                          }`}
                        >
                          <p className="text-sm text-white">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {notification.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Settings Button */}
          <button
            onClick={() => setShowSettings(true)}
            className="p-2 text-gray-300 hover:text-white"
          >
            <Settings size={20} />
          </button>

          {/* Deleted Tasks Button */}
          <button
            onClick={() => setShowDeletedTasks(true)}
            className="p-2 text-gray-300 hover:text-white"
          >
            <RotateCcw size={20} />
          </button>

          {/* View Toggle */}
          <div className="flex bg-gray-800 rounded-lg">
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded-l-lg ${view === 'list' ? 'bg-blue-600 text-white' : 'text-gray-300'}`}
            >
              List
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`px-4 py-2 rounded-r-lg ${view === 'calendar' ? 'bg-blue-600 text-white' : 'text-gray-300'}`}
            >
              Calendar
            </button>
          </div>

          {/* Add Task Button */}
          <button
            onClick={() => setShowAddTask(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} />
            Add Task
          </button>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Settings</h2>
              <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">
                  Auto-cleanup period (days)
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={cleanupDays}
                  onChange={(e) => setCleanupDays(Number(e.target.value))}
                  className="w-full bg-gray-700 text-white rounded px-3 py-2"
                />
                <p className="text-sm text-gray-400 mt-1">
                  Completed tasks will be archived after {cleanupDays} days
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Deleted Tasks Modal */}
      {showDeletedTasks && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Archived Tasks</h2>
              <button onClick={() => setShowDeletedTasks(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              {deletedTasks.length === 0 ? (
                <p className="text-gray-400 text-center py-4">No archived tasks</p>
              ) : (
                deletedTasks.map(task => (
                  <div key={task.id} className="bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{task.title}</h3>
                        <p className="text-gray-400">{task.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleTaskRecover(task.id)}
                          className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
                        >
                          Recover
                        </button>
                        <button
                          onClick={() => handlePermanentDelete(task.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">
                      Archived on: {task.deletedAt?.toLocaleDateString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {view === 'list' && (
        <>
          <div className="mb-4 flex gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
              className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700"
            >
              <option value="all">Active Tasks</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                {filter === 'all' ? 'Active Tasks' : 
                 filter.charAt(0).toUpperCase() + filter.slice(1) + ' Tasks'}
              </h2>
              {filteredTasks.length === 0 ? (
                <div className="text-gray-400 text-center py-4">
                  No tasks found
                </div>
              ) : (
                filteredTasks.map(task => (
                  <div key={task.id} className="mb-4 last:mb-0 bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{task.title}</h3>
                        <p className="text-gray-400">{task.description}</p>
                      </div>
                      <div className="relative status-dropdown">
                        <button
                          onClick={() => setShowStatusOptions(showStatusOptions === task.id ? null : task.id)}
                          className={getStatusStyle(task.status)}
                        >
                          {getStatusIcon(task.status)}
                          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        </button>
                        {showStatusOptions === task.id && (
                          <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-lg shadow-lg py-1 z-10">
                            {statusOptions.map(option => (
                              <button
                                key={option.status}
                                onClick={() => handleStatusChange(task.id, option.status)}
                                className={`w-full flex items-center gap-2 px-4 py-2 text-sm ${
                                  task.status === option.status ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
                                }`}
                              >
                                {option.icon}
                                {option.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <span className={`flex items-center gap-1 ${getPriorityColor(task.priority)}`}>
                        <AlertCircle size={16} />
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                      </span>
                      <span className="text-gray-400">
                        <Clock size={16} className="inline mr-1" />
                        {task.deadline.toLocaleDateString()}
                      </span>
                      {task.assignee && (
                        <span className="text-gray-400">
                          Assigned to: {task.assignee}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {filter === 'all' && completedTasks.length > 0 && (
              <div className="bg-gray-800/50 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Recently Completed
                </h2>
                {completedTasks.slice(0, 3).map(task => (
                  <div key={task.id} className="mb-4 last:mb-0 bg-gray-700/50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{task.title}</h3>
                        <p className="text-gray-400">{task.description}</p>
                      </div>
                      <div className={getStatusStyle(task.status)}>
                        {getStatusIcon(task.status)}
                        Completed
                      </div>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <span className={`flex items-center gap-1 ${getPriorityColor(task.priority)}`}>
                        <AlertCircle size={16} />
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                      </span>
                      <span className="text-gray-400">
                        <Clock size={16} className="inline mr-1" />
                        Completed on {task.completedAt?.toLocaleDateString()}
                      </span>
                      {task.assignee && (
                        <span className="text-gray-400">
                          Assigned to: {task.assignee}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {completedTasks.length > 3 && (
                  <button
                    onClick={() => setFilter('completed')}
                    className="mt-4 text-blue-400 hover:text-blue-300 text-sm"
                  >
                    View all {completedTasks.length} completed tasks
                  </button>
                )}
              </div>
            )}
          </div>
        </>
      )}

      {view === 'calendar' && (
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => changeMonth(-1)}
              className="p-2 hover:bg-gray-700 rounded-full"
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-xl font-semibold">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h2>
            <button
              onClick={() => changeMonth(1)}
              className="p-2 hover:bg-gray-700 rounded-full"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-gray-400 py-2">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {generateCalendarDays().map((day, index) => {
              const tasksForDay = day ? getTasksForDate(day) : [];
              return (
                <div
                  key={index}
                  className={`min-h-[100px] p-2 rounded-lg ${
                    day ? 'bg-gray-700' : 'bg-transparent'
                  }`}
                >
                  {day && (
                    <>
                      <div className="text-gray-400 mb-1">{day}</div>
                      <div className="space-y-1">
                        {tasksForDay.map(task => (
                          <div
                            key={task.id}
                            className={`text-xs p-1 rounded flex items-center gap-1 ${
                              task.status === 'completed' ? 'bg-green-900/50 text-green-200' :
                              task.status === 'overdue' ? 'bg-red-900/50 text-red-200' :
                              task.status === 'in-progress' ? 'bg-blue-900/50 text-blue-200' :
                              'bg-gray-800/50 text-gray-200'
                            }`}
                          >
                            {getStatusIcon(task.status)}
                            <span className="truncate">{task.title}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {showAddTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Add New Task</h2>
              <button onClick={() => setShowAddTask(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-1">Title</label>
                <input
                  type="text"
                  value={newTask.title || ''}
                  onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-gray-700 text-white rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Description</label>
                <textarea
                  value={newTask.description || ''}
                  onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full bg-gray-700 text-white rounded px-3 py-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-1">Start Date</label>
                  <input
                    type="date"
                    onChange={(e) => setNewTask(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full bg-gray-700 text-white rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Deadline</label>
                  <input
                    type="date"
                    onChange={(e) => setNewTask(prev => ({ ...prev, deadline: e.target.value }))}
                    className="w-full bg-gray-700 text-white rounded px-3 py-2"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value as Task['priority'] }))}
                  className="w-full bg-gray-700 text-white rounded px-3 py-2"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 mb-1">Assignee</label>
                <input
                  type="text"
                  value={newTask.assignee || ''}
                  onChange={(e) => setNewTask(prev => ({ ...prev, assignee: e.target.value }))}
                  className="w-full bg-gray-700 text-white rounded px-3 py-2"
                />
              </div>
              <button
                onClick={handleAddTask}
                className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;