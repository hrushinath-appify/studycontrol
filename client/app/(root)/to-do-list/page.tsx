'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Plus, 
  Search, 
  CheckCircle2, 
  Circle, 
  Edit2, 
  Trash2, 
  Calendar,
  Flag,
  Target,
  TrendingUp,
  Clock,
  BookOpen,
  Briefcase,
  Home,
  User,
  X,
  Check
} from 'lucide-react'
import { TasksApi, type Task as ApiTask, type TaskStats as ApiTaskStats } from '@/lib/api/tasks'

// Use the API interface instead of local interface
type Task = ApiTask
type TaskStats = ApiTaskStats

const ToDoListPage = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskDescription, setNewTaskDescription] = useState('')
  const [newTaskPriority, setNewTaskPriority] = useState<Task['priority']>('medium')
  const [newTaskCategory, setNewTaskCategory] = useState<Task['category']>('personal')
  const [newTaskDueDate, setNewTaskDueDate] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState<'all' | Task['category']>('all')
  const [filterPriority, setFilterPriority] = useState<'all' | Task['priority']>('all')
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending'>('all')
  const [editingTask, setEditingTask] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<TaskStats | null>(null)

  // Callback handlers for form inputs
  const handleShowAddForm = useCallback(() => setShowAddForm(true), [])
  const handleHideAddForm = useCallback(() => setShowAddForm(false), [])
  const handleNewTaskTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value)
  }, [])
  const handleNewTaskDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTaskDescription(e.target.value)
  }, [])
  const handleNewTaskDueDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskDueDate(e.target.value)
  }, [])
  const handleNewTaskPriorityChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewTaskPriority(e.target.value as Task['priority'])
  }, [])
  const handleNewTaskCategoryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewTaskCategory(e.target.value as Task['category'])
  }, [])
  const handleSearchQueryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])
  const handleFilterCategoryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(e.target.value as 'all' | Task['category'])
  }, [])
  const handleFilterPriorityChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterPriority(e.target.value as 'all' | Task['priority'])
  }, [])
  const handleFilterStatusChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value as 'all' | 'completed' | 'pending')
  }, [])
  const handleEditTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value)
  }, [])
  const handleEditDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditDescription(e.target.value)
  }, [])

  // Load tasks and stats from database
  const loadTasksAndStats = async () => {
    try {
      setLoading(true)
      const [tasksData, statsData] = await Promise.all([
        TasksApi.getTasks(),
        TasksApi.getStats()
      ])
      
      setTasks(tasksData)
      setStats(statsData)
    } catch (error) {
      console.error('Failed to load tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasksAndStats()
  }, [])

  const addTask = useCallback(async () => {
    if (!newTaskTitle.trim()) return

    try {
      const newTask = await TasksApi.createTask({
        title: newTaskTitle.trim(),
        description: newTaskDescription.trim() || '',
        priority: newTaskPriority,
        category: newTaskCategory,
        dueDate: newTaskDueDate || ''
      })

      setTasks(prev => [newTask, ...prev])
      
      // Reload stats
      const updatedStats = await TasksApi.getStats()
      setStats(updatedStats)
      
      // Reset form
      setNewTaskTitle('')
      setNewTaskDescription('')
      setNewTaskPriority('medium')
      setNewTaskCategory('personal')
      setNewTaskDueDate('')
      setShowAddForm(false)
    } catch (error) {
      console.error('Failed to create task:', error)
    }
  }, [newTaskTitle, newTaskDescription, newTaskPriority, newTaskCategory, newTaskDueDate])

  const toggleTask = useCallback(async (id: string) => {
    try {
      const updatedTask = await TasksApi.toggleTask(id)
      setTasks(prev => prev.map(task => 
        task.id === id ? updatedTask : task
      ))
      
      // Reload stats
      const updatedStats = await TasksApi.getStats()
      setStats(updatedStats)
    } catch (error) {
      console.error('Failed to toggle task:', error)
    }
  }, [])

  const deleteTask = useCallback(async (id: string) => {
    try {
      await TasksApi.deleteTask(id)
      setTasks(prev => prev.filter(task => task.id !== id))
      
      // Reload stats
      const updatedStats = await TasksApi.getStats()
      setStats(updatedStats)
    } catch (error) {
      console.error('Failed to delete task:', error)
    }
  }, [])

  const startEdit = useCallback((task: Task) => {
    setEditingTask(task.id)
    setEditTitle(task.title)
    setEditDescription(task.description || '')
  }, [])

  const saveEdit = useCallback(async (id: string) => {
    try {
      const updatedTask = await TasksApi.updateTask({
        id,
        title: editTitle.trim(),
        description: editDescription.trim() || ''
      })
      
      setTasks(prev => prev.map(task => 
        task.id === id ? updatedTask : task
      ))
      
      setEditingTask(null)
      setEditTitle('')
      setEditDescription('')
    } catch (error) {
      console.error('Failed to update task:', error)
    }
  }, [editTitle, editDescription])

  const cancelEdit = useCallback(() => {
    setEditingTask(null)
    setEditTitle('')
    setEditDescription('')
  }, [])

  // Filter and search tasks
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
    const matchesCategory = filterCategory === 'all' || task.category === filterCategory
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'completed' && task.completed) ||
                         (filterStatus === 'pending' && !task.completed)
    
    return matchesSearch && matchesCategory && matchesPriority && matchesStatus
  })

  // Use stats from API
  const currentStats = stats || {
    total: 0,
    completed: 0,
    pending: 0,
    completionRate: 0,
    todayCompleted: 0,
    weekCompleted: 0,
    overdue: 0
  }

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-500/10'
      case 'medium': return 'text-yellow-500 bg-yellow-500/10'
      case 'low': return 'text-green-500 bg-green-500/10'
    }
  }

  const getCategoryIcon = (category: Task['category']) => {
    switch (category) {
      case 'work': return <Briefcase className="w-4 h-4" />
      case 'study': return <BookOpen className="w-4 h-4" />
      case 'health': return <Target className="w-4 h-4" />
      case 'personal': return <User className="w-4 h-4" />
      case 'other': return <Home className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: Task['category']) => {
    switch (category) {
      case 'work': return 'text-blue-500 bg-blue-500/10'
      case 'study': return 'text-purple-500 bg-purple-500/10'
      case 'health': return 'text-green-500 bg-green-500/10'
      case 'personal': return 'text-pink-500 bg-pink-500/10'
      case 'other': return 'text-gray-500 bg-gray-500/10'
    }
  }

  // Click handlers
  const createToggleTaskHandler = useCallback((taskId: string) => () => {
    toggleTask(taskId)
  }, [toggleTask])
  
  const createSaveEditHandler = useCallback((taskId: string) => () => {
    saveEdit(taskId)
  }, [saveEdit])
  
  const createStartEditHandler = useCallback((task: Task) => () => {
    startEdit(task)
  }, [startEdit])
  
  const createDeleteTaskHandler = useCallback((taskId: string) => () => {
    deleteTask(taskId)
  }, [deleteTask])

  return (
    <div className="min-h-screen p-4 md:p-6 space-y-6 md:space-y-8">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              To-Do List
            </h1>
            <p className="text-muted-foreground text-base md:text-lg">
              Organize your tasks and boost your productivity.
            </p>
          </div>
          <div className="text-primary flex-shrink-0">
            <CheckCircle2 className="w-10 h-10 md:w-12 md:h-12" />
          </div>
        </div>
      </div>

      {/* Statistics Dashboard */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 md:p-6 text-center hover:bg-card/50 transition-all duration-300 group">
            <div className="flex items-center justify-center mb-3">
              <Target className="w-6 h-6 md:w-8 md:h-8 text-primary group-hover:scale-110 transition-transform duration-200" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
              {currentStats.total}
            </div>
            <div className="text-muted-foreground text-sm">
              Total Tasks
            </div>
          </div>

          <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 md:p-6 text-center hover:bg-card/50 transition-all duration-300 group">
            <div className="flex items-center justify-center mb-3">
              <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8 text-green-500 group-hover:scale-110 transition-transform duration-200" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-green-500 mb-2">
              {currentStats.completed}
            </div>
            <div className="text-muted-foreground text-sm">
              Completed
            </div>
          </div>

          <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 md:p-6 text-center hover:bg-card/50 transition-all duration-300 group">
            <div className="flex items-center justify-center mb-3">
              <Clock className="w-6 h-6 md:w-8 md:h-8 text-orange-500 group-hover:scale-110 transition-transform duration-200" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-orange-500 mb-2">
              {currentStats.pending}
            </div>
            <div className="text-muted-foreground text-sm">
              Pending
            </div>
          </div>

          <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 md:p-6 text-center hover:bg-card/50 transition-all duration-300 group">
            <div className="flex items-center justify-center mb-3">
              <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-blue-500 group-hover:scale-110 transition-transform duration-200" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-blue-500 mb-2">
              {Math.round(currentStats.completionRate)}%
            </div>
            <div className="text-muted-foreground text-sm">
              Completion Rate
            </div>
          </div>
        </div>
      </div>

      {/* Add Task Section */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg">
          {!showAddForm ? (
            <Button
              onClick={handleShowAddForm}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-3 font-medium transition-all duration-200"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Task
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Task Title</label>
                  <Input
                    value={newTaskTitle}
                    onChange={handleNewTaskTitleChange}
                    placeholder="Enter task title..."
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Due Date (Optional)</label>
                  <Input
                    type="date"
                    value={newTaskDueDate}
                    onChange={handleNewTaskDueDateChange}
                    className="bg-background/50"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Description (Optional)</label>
                <textarea
                  value={newTaskDescription}
                  onChange={handleNewTaskDescriptionChange}
                  placeholder="Add task description..."
                  className="w-full min-h-[80px] bg-background/50 border border-border rounded-md px-3 py-2 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Priority</label>
                  <select
                    value={newTaskPriority}
                    onChange={handleNewTaskPriorityChange}
                    className="w-full bg-background/50 border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Category</label>
                  <select
                    value={newTaskCategory}
                    onChange={handleNewTaskCategoryChange}
                    className="w-full bg-background/50 border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="personal">Personal</option>
                    <option value="work">Work</option>
                    <option value="study">Study</option>
                    <option value="health">Health</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={addTask}
                  disabled={!newTaskTitle.trim()}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-full"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
                <Button
                  onClick={handleHideAddForm}
                  variant="outline"
                  className="px-6 py-2 rounded-full"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={handleSearchQueryChange}
                placeholder="Search tasks..."
                className="pl-10 bg-background/50"
              />
            </div>
            
            <select
              value={filterCategory}
              onChange={handleFilterCategoryChange}
              className="bg-background/50 border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="all">All Categories</option>
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="study">Study</option>
              <option value="health">Health</option>
              <option value="other">Other</option>
            </select>
            
            <select
              value={filterPriority}
              onChange={handleFilterPriorityChange}
              className="bg-background/50 border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={handleFilterStatusChange}
              className="bg-background/50 border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="max-w-6xl mx-auto">
        <div className="space-y-3 md:space-y-4">
          {loading ? (
            <div key="loading-state" className="text-center py-8">
              <div className="text-muted-foreground">Loading tasks...</div>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div key="empty-state" className="text-center py-12">
              <div className="text-muted-foreground/30 mb-4">
                <CheckCircle2 className="h-16 w-16 mx-auto" />
              </div>
              <p className="text-muted-foreground text-lg">
                {tasks.length === 0 ? 'No tasks yet' : 'No tasks match your filters'}
              </p>
              <p className="text-muted-foreground/70 text-sm mt-2">
                {tasks.length === 0 ? 'Add your first task to get started' : 'Try adjusting your search or filters'}
              </p>
            </div>
          ) : (
            filteredTasks.map((task, index) => (
              <div
                key={task.id || `task-${index}`}
                className={`bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl p-4 md:p-6 hover:bg-card/50 transition-all duration-300 ${
                  task.completed ? 'opacity-75' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Completion Toggle */}
                  <button
                    onClick={createToggleTaskHandler(task.id)}
                    className="mt-1 text-primary hover:scale-110 transition-transform duration-200"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>

                  {/* Task Content */}
                  <div className="flex-1 min-w-0">
                    {editingTask === task.id ? (
                      <div className="space-y-3">
                        <Input
                          value={editTitle}
                          onChange={handleEditTitleChange}
                          className="bg-background/50"
                        />
                        <textarea
                          value={editDescription}
                          onChange={handleEditDescriptionChange}
                          placeholder="Task description..."
                          className="w-full min-h-[60px] bg-background/50 border border-border rounded-md px-3 py-2 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={createSaveEditHandler(task.id)}
                            size="sm"
                            className="bg-primary hover:bg-primary/90"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Save
                          </Button>
                          <Button
                            onClick={cancelEdit}
                            variant="outline"
                            size="sm"
                          >
                            <X className="w-4 h-4 mr-1" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h3 className={`text-lg font-semibold mb-2 ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className={`text-sm mb-3 ${task.completed ? 'line-through text-muted-foreground' : 'text-muted-foreground'}`}>
                            {task.description}
                          </p>
                        )}
                        
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            <Flag className="w-3 h-3" />
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                          </span>
                          
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(task.category)}`}>
                            {getCategoryIcon(task.category)}
                            {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                          </span>
                          
                          {task.dueDate && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-blue-500 bg-blue-500/10">
                              <Calendar className="w-3 h-3" />
                              {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        
                        <div className="text-xs text-muted-foreground">
                          Created {new Date(task.createdAt).toLocaleDateString()}
                          {task.completedAt && ` • Completed ${new Date(task.completedAt).toLocaleDateString()}`}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Task Actions */}
                  {editingTask !== task.id && (
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={createStartEditHandler(task)}
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={createDeleteTaskHandler(task.id)}
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default ToDoListPage
