export interface NoteProps {
  id: string;
  content: string;
  important: boolean;
  toggleImportance: () => void;
}