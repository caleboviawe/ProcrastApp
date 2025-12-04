// components/AddTaskModal.tsx
import { X, Plus, Calendar, Tag, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated?: () => void;
}

export default function AddTaskModal({
  isOpen,
  onClose,
  onTaskCreated,
}: AddTaskModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Task created!');
    onTaskCreated?.();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900/95 backdrop-blur-2xl border border-slate-700 text-white max-w-md rounded-2xl shadow-2xl">
        <DialogHeader>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X size={20} />
          </Button>
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
            <Select defaultValue="other">
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

          <div className="grid grid-cols-2 gap-4 ">
            <div className="space-y-2">
              <Label className="text-slate-300 font-medium flex items-center gap-2">
                <Calendar size={16} />
                Due Date (optional)
              </Label>
              <Input
                type="date"
                className="bg-slate-800/50 border-slate-700 text-white focus:border-violet-500 focus:ring-violet-500/30 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300 font-medium flex items-center gap-2">
                <AlertCircle size={16} />
                Add a Document (optional)
              </Label>
              <Select defaultValue="medium">
                <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700 text-white">
                  <SelectItem value="low">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      No
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      Yes
                    </div>
                  </SelectItem>
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