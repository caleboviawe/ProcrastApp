import { X, Plus, Calendar, Tag } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useState } from 'react';

interface TaskFormData {
  title: string;
  category: string;
  dueDate?: string;
  hasDocument: boolean;
}

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated?: (task: TaskFormData) => void; // Now accepts form data
}

export default function AddTaskModal({
  isOpen,
  onClose,
  onTaskCreated,
}: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('other');
  const [dueDate, setDueDate] = useState('');
  const [hasDocument, setHasDocument] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newTask: TaskFormData = {
      title: title.trim(),
      category,
      dueDate: dueDate || undefined,
      hasDocument,
    };

    onTaskCreated?.(newTask);
    onClose();
    // Reset form
    setTitle('');
    setCategory('other');
    setDueDate('');
    setHasDocument(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900/95 backdrop-blur-2xl border border-slate-700 text-white max-w-md rounded-2xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent pr-10">
            Add New Task
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-slate-300 font-medium">
              Task Title *
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Complete 513 Mockups"
              required
              className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/30 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-300 font-medium flex items-center gap-2">
              <Tag size={16} />
              Category *
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-700 text-white">
                <SelectItem value="work">Work</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="health">Health</SelectItem>
                <SelectItem value="learning">Learning</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300 font-medium flex items-center gap-2">
                <Calendar size={16}/>
                Due Date (optional)
              </Label>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="bg-slate-800/50 border-slate-700 text-white rounded-xl focus:border-violet-500 focus:ring-violet-500/30 [color-scheme:dark]"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300 font-medium">
                Add a Document (optional)
              </Label>
              <Select value={hasDocument ? "yes" : "no"} onValueChange={(v) => setHasDocument(v === "yes")}>
                <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white rounded-xl">
                  <SelectValue placeholder="No" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700 text-white">
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="yes">Yes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-600/30 rounded-xl"
            >
              <Plus size={18} className="mr-2" />
              Create Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}