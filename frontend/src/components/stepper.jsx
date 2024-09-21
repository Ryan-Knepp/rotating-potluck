import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

export default function Stepper({ steps = [], currentStep = 0 }) {
  const isPrevious = (step) => step < currentStep;
  const isCurrent = (step) => step === currentStep;
  const isUpcoming = (step) => step > currentStep;

  return (
    <ol role="list" className="w-full px-1 md:px-4 my-4 flex items-center">
      {steps.map((step, stepIdx) => (
        <li
          key={step}
          className={cn(
            stepIdx !== steps.length - 1 ? "flex-1" : "",
            "relative"
          )}
        >
          <div className="group flex items-center">
            <div className="flex flex-col md:flex-row items-center">
              <span
                className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center",
                  isPrevious(stepIdx) ? " bg-green-500" : "",
                  isCurrent(stepIdx) ? "bg-purple-600" : "",
                  isUpcoming(stepIdx) ? "border-purple-600 border-2" : ""
                )}
              >
                <span
                  className={cn(
                    "text-sm font-medium",
                    isPrevious(stepIdx) ? "text-green-50" : "",
                    isCurrent(stepIdx) ? "text-purple-50" : "",
                    isUpcoming(stepIdx) ? "text-purple-600" : ""
                  )}
                >
                  {isPrevious(stepIdx) ? (
                    <CheckIcon className="w-5 h-5" />
                  ) : (
                    stepIdx + 1
                  )}
                </span>
              </span>
              <span className="md:ml-4 text-sm font-medium text-neutral-900">
                {step}
              </span>
            </div>
            {stepIdx !== steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-4",
                  isPrevious(stepIdx) ? "bg-green-500" : "bg-neutral-600"
                )}
              />
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
