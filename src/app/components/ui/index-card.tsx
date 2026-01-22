import { ArrowUp, ArrowDown } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface IndexCardProps {
  name: string;
  value: string;
  change: number;
  data: number[];
  size?: 'small' | 'default';
}

export function IndexCard({ name, value, change, data, size = 'default' }: IndexCardProps) {
  const isPositive = change >= 0;
  const chartData = data.map((value, index) => ({ index, value }));

  if (size === 'small') {
    return (
      <div className="flex items-center gap-1.5 bg-slate-50 rounded px-2 py-1.5 min-w-[110px]">
        <div className="flex-1">
          <p className="text-[10px] text-slate-500 mb-0.5">{name}</p>
          <p className="text-xs font-semibold text-slate-900">{value}</p>
          <div className={`flex items-center gap-0.5 text-[10px] ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <ArrowUp className="w-2.5 h-2.5" /> : <ArrowDown className="w-2.5 h-2.5" />}
            <span>{Math.abs(change)}%</span>
          </div>
        </div>
        <div className="w-12 h-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={isPositive ? '#16a34a' : '#dc2626'} 
                strokeWidth={1.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2 min-w-[140px]">
      <div className="flex-1">
        <p className="text-xs text-slate-500 mb-0.5">{name}</p>
        <p className="text-sm font-semibold text-slate-900">{value}</p>
        <div className={`flex items-center gap-1 text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
      <div className="w-16 h-12">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={isPositive ? '#16a34a' : '#dc2626'} 
              strokeWidth={1.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}