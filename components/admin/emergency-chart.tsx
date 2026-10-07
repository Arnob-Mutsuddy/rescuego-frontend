// components/admin/emergency-chart.tsx
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function EmergencyStatusChart({
  data,
}: {
  data: { status: string; pending: number; active: number; completed: number };
}) {
  const chartData = [
    { name: "Pending", value: data.pending, color: "#eab308" },
    { name: "Active", value: data.active, color: "#3b82f6" },
    { name: "Completed", value: data.completed, color: "#22c55e" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Emergency Requests Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}