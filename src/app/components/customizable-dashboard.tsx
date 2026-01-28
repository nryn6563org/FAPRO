import { useState } from 'react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { Widget, AVAILABLE_WIDGETS, WidgetType } from './dashboard-widgets';
import { WidgetSelectionModal } from "./widget-selection-modal";
import { Plus, Settings, GripVertical, Check, X, Trash2 } from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface DraggableWidgetProps {
  widgetId: WidgetType;
  index: number;
  moveWidget: (fromIndex: number, toIndex: number) => void;
  onRemove: () => void;
}

function DraggableWidget({ widgetId, index, moveWidget, onRemove }: DraggableWidgetProps) {
  const [{ isDragging }, drag, dragPreview] = useDrag({
    type: 'WIDGET',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'WIDGET',
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveWidget(item.index, index);
        item.index = index;
      }
    },
  });

  const config = AVAILABLE_WIDGETS.find(w => w.id === widgetId);
  const gridClass = config?.defaultSize === 'large' 
    ? 'md:col-span-2' 
    : config?.defaultSize === 'medium'
    ? 'md:col-span-2 lg:col-span-1'
    : '';

  return (
    <div ref={(node) => dragPreview(drop(node))} className={`${gridClass} ${isDragging ? "opacity-50" : ""}`}>
      <div className="relative group">
        <div ref={drag} className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 cursor-move opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-slate-300 rounded p-1 shadow-lg" title="드래그하여 이동">
          <GripVertical className="w-5 h-5 text-slate-600" />
        </div>
        <Widget widgetId={widgetId} onRemove={onRemove} />
      </div>
    </div>
  );
}

export function CustomizableDashboard() {
  const [widgets, setWidgets] = useState<WidgetType[]>(["kospi", "kosdaq", "sp500", "nasdaq", "usd-krw", "client-count", "aum", "revenue", "top-clients", "market-news"]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // 다이얼로그를 열 때
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const removeWidget = (widgetId: WidgetType) => {
    setWidgets(widgets.filter((w) => w !== widgetId));
  };

  const moveWidget = (fromIndex: number, toIndex: number) => {
    const updatedWidgets = [...widgets];
    const [movedWidget] = updatedWidgets.splice(fromIndex, 1);
    updatedWidgets.splice(toIndex, 0, movedWidget);
    setWidgets(updatedWidgets);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">MY DASHBOARD</h2>
            <p className="text-slate-600 mt-1 text-[13px]">필요한 정보만 선택하여 나만의 대시보드를 구성하세요. 정보 추가를 선택하여, 자주 보는 정보를 추가하고, 정보 카드 위에 마우스를 올려 드래그&드롭으로 위치 변경 할 수 있습니다.</p>
          </div>
          <Button className="gap-2" onClick={handleOpenDialog}>
            <Plus className="w-4 h-4" />
            정보추가
          </Button>
        </div>

        {/* Widget Selection Modal */}
        <WidgetSelectionModal open={isDialogOpen} onOpenChange={setIsDialogOpen} selectedWidgets={widgets} onSave={setWidgets} />

        {/* Widget Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {widgets.map((widgetId, index) => (
            <DraggableWidget key={widgetId} widgetId={widgetId} index={index} moveWidget={moveWidget} onRemove={() => removeWidget(widgetId)} />
          ))}
        </div>

        {widgets.length === 0 && (
          <Card className="py-16">
            <CardContent className="text-center">
              <Settings className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">위젯을 추가해주세요</h3>
              <p className="text-slate-600 mb-6">"정보추가" 버튼을 눌러 원하는 정보를 선택하세요</p>
              <Button onClick={handleOpenDialog} className="gap-2">
                <Plus className="w-4 h-4" />
                정보추가하기
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DndProvider>
  );
}