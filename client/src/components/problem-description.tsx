import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface ProblemDescriptionProps {
  problem: any;
}

export default function ProblemDescription({ problem }: ProblemDescriptionProps) {
  return (
    <div className="w-1/2 border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        <div className="prose max-w-none">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Problem Description</h3>
          
          <div 
            className="text-gray-700 leading-relaxed mb-6"
            dangerouslySetInnerHTML={{ __html: problem.description }}
          />

          {problem.examples && problem.examples.length > 0 && (
            <>
              <h4 className="text-md font-semibold text-gray-900 mb-3">Examples</h4>
              <div className="space-y-4 mb-6">
                {problem.examples.map((example: any, index: number) => (
                  <Card key={index} className="bg-gray-50">
                    <CardContent className="pt-4">
                      <div className="font-mono text-sm">
                        <div className="mb-2">
                          <strong>Input:</strong> {example.input}
                        </div>
                        <div className="mb-2">
                          <strong>Output:</strong> {example.output}
                        </div>
                        {example.explanation && (
                          <div className="text-gray-600">
                            <strong>Explanation:</strong> {example.explanation}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {problem.constraints && problem.constraints.length > 0 && (
            <>
              <h4 className="text-md font-semibold text-gray-900 mb-3">Constraints</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1 mb-6">
                {problem.constraints.map((constraint: string, index: number) => (
                  <li key={index} dangerouslySetInnerHTML={{ __html: constraint }} />
                ))}
              </ul>
            </>
          )}

          {problem.hints && problem.hints.length > 0 && (
            <>
              <h4 className="text-md font-semibold text-gray-900 mb-3">Approach Hints</h4>
              <Card className="bg-blue-50 border-l-4 border-primary mb-6">
                <CardContent className="pt-4">
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {problem.hints.map((hint: string, index: number) => (
                      <li key={index}>{hint}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </>
          )}

          {problem.tags && problem.tags.length > 0 && (
            <>
              <h4 className="text-md font-semibold text-gray-900 mb-3">Related Topics</h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {problem.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </>
          )}

          {(problem.timeComplexity || problem.spaceComplexity) && (
            <>
              <h4 className="text-md font-semibold text-gray-900 mb-3">Complexity</h4>
              <div className="space-y-2 mb-6">
                {problem.timeComplexity && (
                  <div className="text-gray-700">
                    <strong>Time Complexity:</strong> {problem.timeComplexity}
                  </div>
                )}
                {problem.spaceComplexity && (
                  <div className="text-gray-700">
                    <strong>Space Complexity:</strong> {problem.spaceComplexity}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
