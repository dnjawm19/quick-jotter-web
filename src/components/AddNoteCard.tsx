import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Plus, Check, X } from "lucide-react";

interface AddNoteCardProps {
  onAdd: (title: string, content: string) => void;
}

export function AddNoteCard({ onAdd }: AddNoteCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = () => {
    if (title.trim() || content.trim()) {
      onAdd(title.trim(), content.trim());
      setTitle("");
      setContent("");
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setIsAdding(false);
  };

  if (isAdding) {
    return (
      <Card className="p-4 border-dashed border-2 border-primary/50 bg-primary/5">
        <div className="space-y-3">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="font-semibold text-lg bg-background/50"
            placeholder="메모 제목"
            autoFocus
          />
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] bg-background/50 resize-none"
            placeholder="메모 내용을 입력하세요..."
          />
          <div className="flex gap-2 justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancel}
            >
              <X className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
            >
              <Check className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      className="p-8 border-dashed border-2 border-muted-foreground/30 bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
      onClick={() => setIsAdding(true)}
    >
      <div className="flex flex-col items-center justify-center text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
          <Plus className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">새 메모 추가</h3>
          <p className="text-sm text-muted-foreground">클릭하여 메모를 작성하세요</p>
        </div>
      </div>
    </Card>
  );
}