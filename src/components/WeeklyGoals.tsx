import React, { useMemo } from "react";
import { Target, CheckCircle2, Circle } from "lucide-react";
import { useEditorStore } from "@/store/editorStore";

interface Goal {
  label: string;
  current: number;
  target: number;
  unit: string;
}

const WeeklyGoals: React.FC = () => {
  const { solvedProblems, submissionHistory, contest } = useEditorStore();

  const weeklyGoals: Goal[] = useMemo(() => {
    // Count problems solved (from store)
    const problemsSolved = solvedProblems.length;

    // Count total submissions
    const totalSubmissions = Object.values(submissionHistory).reduce(
      (acc, subs) => acc + subs.length,
      0,
    );

    // Check if user has participated in contests
    const contestsDone = contest?.finished ? 1 : 0;

    return [
      { label: "Problems Solved", current: Math.min(problemsSolved, 10), target: 10, unit: "problems" },
      { label: "Code Submissions", current: Math.min(totalSubmissions, 20), target: 20, unit: "submissions" },
      { label: "Tutorials Completed", current: 0, target: 3, unit: "tutorials" },
      { label: "Contest Participation", current: contestsDone, target: 1, unit: "contests" },
    ];
  }, [solvedProblems, submissionHistory, contest]);

  const completedGoals = weeklyGoals.filter((g) => g.current >= g.target).length;

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground flex items-center gap-2 text-sm">
          <Target size={16} className="text-orange-400" /> Weekly Goals
        </h3>
        <span className="text-xs text-muted-foreground">
          {completedGoals}/{weeklyGoals.length} done
        </span>
      </div>

      <div className="space-y-3">
        {weeklyGoals.map((goal) => {
          const completed = goal.current >= goal.target;
          const progress = Math.min(100, (goal.current / goal.target) * 100);

          return (
            <div key={goal.label} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {completed ? (
                    <CheckCircle2 size={14} className="text-green-400" />
                  ) : (
                    <Circle size={14} className="text-muted-foreground" />
                  )}
                  <span
                    className={`text-xs font-medium ${
                      completed ? "text-green-400 line-through" : "text-foreground"
                    }`}
                  >
                    {goal.label}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {goal.current}/{goal.target} {goal.unit}
                </span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    completed ? "bg-green-500" : "bg-orange-500"
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyGoals;
