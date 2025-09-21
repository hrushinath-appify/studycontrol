// Export all models from a central location
export { User, default as UserModel } from './User';
export { DiaryEntry, default as DiaryEntryModel } from './DiaryEntry';
export { Task, default as TaskModel } from './Task';
export { Note, default as NoteModel } from './Note';
export { UserStats } from './UserStats';

// Export types for convenience
export type { IUser, IDiaryEntry, ITask, INote } from '../types';
export type { IUserStats } from './UserStats';
