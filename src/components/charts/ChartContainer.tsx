import { type ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartContainerProps {
  title: string;
  borderColor: string;
  children: ReactNode;
}

export function ChartContainer({ 
  title, 
  borderColor, 
  children 
}: ChartContainerProps) {
  return (
    <Card 
      className={`border-4 bg-black text-white shadow-[4px_4px_0px_${borderColor}] col-span-2`}
      style={{ borderColor }}
    >
      <CardHeader>
        <CardTitle 
          className="text-2xl font-mono"
          style={{ color: borderColor }}
        >
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}