"use client";

import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { Check } from 'lucide-react';
import { AVAILABLE_WIDGETS, WidgetType } from '@/app/components/dashboard-widgets';
import { cn } from '@/app/components/ui/utils';

interface WidgetSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedWidgets: WidgetType[];
  onSave: (widgets: WidgetType[]) => void;
}

export function WidgetSelectionModal({
  open,
  onOpenChange,
  selectedWidgets: initialSelected,
  onSave
}: WidgetSelectionModalProps) {
  const [selected, setSelected] = useState<WidgetType[]>(initialSelected);

  const toggleWidget = (id: WidgetType) => {
    setSelected(prev => 
      prev.includes(id) 
        ? prev.filter(w => w !== id) 
        : [...prev, id]
    );
  };

  const handleSave = () => {
    onSave(selected);
    onOpenChange(false);
  };

  // Group widgets by category
  const categories = Array.from(new Set(AVAILABLE_WIDGETS.map(w => w.category)));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0 gap-0">
        <DialogHeader className="p-6 border-b">
          <DialogTitle className="text-xl font-bold">대시보드 위젯 설정</DialogTitle>
          <p className="text-sm text-slate-500 mt-1">대시보드에 표시할 위젯을 선택해 주세요.</p>
        </DialogHeader>

        <ScrollArea className="flex-1 p-6">
          <div className="space-y-8">
            {categories.map(category => (
              <div key={category} className="space-y-4">
                <h3 className="font-semibold text-slate-900 border-l-4 border-blue-600 pl-3">
                  {category}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {AVAILABLE_WIDGETS.filter(w => w.category === category).map(widget => {
                    const isSelected = selected.includes(widget.id);
                    const Icon = widget.icon;
                    return (
                      <button key={widget.id} onClick={() => toggleWidget(widget.id)} className={cn("relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all group", isSelected ? "border-blue-600 bg-blue-50/50 ring-1 ring-blue-600" : "border-slate-100 hover:border-blue-200 hover:bg-slate-50")}>
                        <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors", isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600")}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className={cn("text-sm font-medium text-center", isSelected ? "text-blue-700" : "text-slate-700")}>{widget.title}</span>

                        {isSelected && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <DialogFooter className="p-6 border-t bg-slate-50/50">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="px-8">
            취소
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 px-8">
            저장하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
