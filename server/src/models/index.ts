// Export all models from a central location
export { User, default as UserModel } from './User';
export { DiaryEntry, default as DiaryEntryModel } from './DiaryEntry';
export { Task, default as TaskModel } from './Task';
export { Note, default as NoteModel } from './Note';
export { Quote, default as QuoteModel } from './Quote';

// Export types for convenience
export type { IUser, IDiaryEntry, ITask, INote, IQuote } from '@/types';
