import { useState } from 'react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { Widget, AVAILABLE_WIDGETS, WidgetType } from './dashboard-widgets';
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
    <div 
      ref={(node) => dragPreview(drop(node))}
      className={`${gridClass} ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="relative group">
        <div
          ref={drag}
          className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 cursor-move opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-slate-300 rounded p-1 shadow-lg"
          title="드래그하여 이동"
        >
          <GripVertical className="w-5 h-5 text-slate-600" />
        </div>
        <Widget widgetId={widgetId} onRemove={onRemove} />
      </div>
    </div>
  );
}

export function CustomizableDashboard() {
  const [widgets, setWidgets] = useState<WidgetType[]>([
    'kospi',
    'kosdaq',
    'sp500',
    'nasdaq',
    'usd-krw',
    'client-count',
    'aum',
    'revenue',
    'top-clients',
    'market-news',
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tempSelectedWidgets, setTempSelectedWidgets] = useState<WidgetType[]>([]);

  // 다이얼로그를 열 때 현재 위젯 상태를 임시 선택 상태로 복사
  const handleOpenDialog = () => {
    setTempSelectedWidgets([...widgets]);
    setIsDialogOpen(true);
  };

  // 임시 선택 상태에서 위젯 토글
  const toggleTempWidget = (widgetId: WidgetType) => {
    if (tempSelectedWidgets.includes(widgetId)) {
      setTempSelectedWidgets(tempSelectedWidgets.filter(w => w !== widgetId));
    } else {
      setTempSelectedWidgets([...tempSelectedWidgets, widgetId]);
    }
  };

  // 저장 버튼 클릭 시 실제 위젯 상태에 반영
  const handleSaveWidgets = () => {
    setWidgets([...tempSelectedWidgets]);
    setIsDialogOpen(false);
  };

  // 취소 버튼 클릭 시 임시 선택 상태 초기화
  const handleCancelDialog = () => {
    setTempSelectedWidgets([]);
    setIsDialogOpen(false);
  };

  const removeWidget = (widgetId: WidgetType) => {
    setWidgets(widgets.filter(w => w !== widgetId));
  };

  const moveWidget = (fromIndex: number, toIndex: number) => {
    const updatedWidgets = [...widgets];
    const [movedWidget] = updatedWidgets.splice(fromIndex, 1);
    updatedWidgets.splice(toIndex, 0, movedWidget);
    setWidgets(updatedWidgets);
  };

  // Group widgets by category
  const categorizedWidgets = AVAILABLE_WIDGETS.reduce((acc, widget) => {
    if (!acc[widget.category]) {
      acc[widget.category] = [];
    }
    acc[widget.category].push(widget);
    return acc;
  }, {} as Record<string, typeof AVAILABLE_WIDGETS>);

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

        {/* Widget Selection Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={(open) => !open && handleCancelDialog()}>
          <DialogContent className="max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
            <DialogHeader className="pb-4 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle className="text-xl">위젯 선택</DialogTitle>
                  <p className="text-sm text-slate-500 mt-1">
                    표시할 정보를 선택하세요 · 선택된 항목: <span className="font-semibold text-blue-600">{tempSelectedWidgets.length}개</span>
                  </p>
                </div>
              </div>
            </DialogHeader>
            
            <div className="flex-1 overflow-y-auto py-4">
              <div className="space-y-6">
                {Object.entries(categorizedWidgets).map(([category, categoryWidgets]) => (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-base text-slate-700">{category}</h3>
                      <span className="text-xs text-slate-500">
                        {categoryWidgets.filter(w => tempSelectedWidgets.includes(w.id)).length} / {categoryWidgets.length} 선택됨
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {categoryWidgets.map((widget) => {
                        const Icon = widget.icon;
                        const isSelected = tempSelectedWidgets.includes(widget.id);
                        return (
                          <button
                            key={widget.id}
                            onClick={() => toggleTempWidget(widget.id)}
                            className={`relative p-4 rounded-lg border-2 text-center transition-all hover:scale-105 ${
                              isSelected
                                ? 'border-blue-500 bg-blue-50 shadow-md'
                                : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                            }`}
                          >
                            {isSelected && (
                              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                            )}
                            <Icon className={`w-8 h-8 mx-auto mb-2 ${isSelected ? 'text-blue-600' : 'text-slate-600'}`} />
                            <span className={`font-medium text-sm block ${isSelected ? 'text-blue-900' : 'text-slate-700'}`}>
                              {widget.title}
                            </span>
                            {widget.defaultSize === 'large' && (
                              <span className="text-xs text-slate-400 mt-1 block">대형</span>
                            )}
                            {widget.defaultSize === 'medium' && (
                              <span className="text-xs text-slate-400 mt-1 block">중형</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t flex items-center justify-between gap-4">
              <div className="text-sm text-slate-600">
                총 <span className="font-semibold text-blue-600">{tempSelectedWidgets.length}개</span>의 위젯이 선택되었습니다
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleCancelDialog}>
                  <X className="w-4 h-4 mr-2" />
                  취소
                </Button>
                <Button onClick={handleSaveWidgets} className="bg-blue-600 hover:bg-blue-700">
                  <Check className="w-4 h-4 mr-2" />
                  저장하기
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Widget Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {widgets.map((widgetId, index) => (
            <DraggableWidget
              key={widgetId}
              widgetId={widgetId}
              index={index}
              moveWidget={moveWidget}
              onRemove={() => removeWidget(widgetId)}
            />
          ))}
        </div>

        {widgets.length === 0 && (
          <Card className="py-16">
            <CardContent className="text-center">
              <Settings className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">위젯을 추가해주세요</h3>
              <p className="text-slate-600 mb-6">
                "정보추가" 버튼을 눌러 원하는 정보를 선택하세요
              </p>
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