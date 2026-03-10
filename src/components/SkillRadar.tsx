import React, { useMemo } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { useEditorStore } from "@/store/editorStore";
import { problems } from "@/data/problems";

interface SkillDataPoint {
  subject: string;
  value: number;
  fullMark: number;
}

const TOPICS = ["Arrays", "Strings", "Trees", "Graphs", "DP", "Sorting", "Binary Search", "Hashing"];

const SkillRadar: React.FC = () => {
  const { solvedProblems } = useEditorStore();

  const skillData: SkillDataPoint[] = useMemo(() => {
    return TOPICS.map((topic) => {
      const topicProblems = problems.filter((p) =>
        p.tags.some((t) => t.toLowerCase().includes(topic.toLowerCase())),
      );
      const solved = topicProblems.filter((p) => solvedProblems.includes(p.id)).length;
      const total = Math.max(topicProblems.length, 1);
      return {
        subject: topic,
        value: Math.round((solved / total) * 100),
        fullMark: 100,
      };
    });
  }, [solvedProblems]);

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="font-semibold text-foreground mb-4 text-sm">Skill Radar</h3>
      <ResponsiveContainer width="100%" height={250}>
        <RadarChart data={skillData} cx="50%" cy="50%" outerRadius="70%">
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          <Radar
            name="Skills"
            dataKey="value"
            stroke="#f97316"
            fill="#f97316"
            fillOpacity={0.2}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
      <div className="mt-2 text-center text-xs text-muted-foreground">
        Based on problems solved by topic
      </div>
    </div>
  );
};

export default SkillRadar;
