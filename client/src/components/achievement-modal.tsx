import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";

interface AchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievement?: {
    title: string;
    description: string;
    xp: number;
  };
}

export default function AchievementModal({ isOpen, onClose, achievement }: AchievementModalProps) {
  if (!achievement) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="h-8 w-8 text-yellow-600" />
          </div>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            {achievement.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center space-y-4">
          <p className="text-gray-600">{achievement.description}</p>
          
          <div className="flex items-center justify-center space-x-2">
            <span className="text-2xl">🏆</span>
            <span className="font-semibold text-gray-900">+{achievement.xp} XP</span>
          </div>
          
          <Button 
            onClick={onClose}
            className="w-full bg-primary hover:bg-primary/90"
          >
            Continue Learning
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
