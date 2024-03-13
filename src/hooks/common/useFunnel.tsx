import { ReactElement, ReactNode, useState, Fragment } from "react";

export interface StepProps<StepNames> {
  name: StepNames;
  children: ReactNode;
}

export interface FunnelProps<StepNames> {
  children: Array<ReactElement<StepProps<StepNames>>>;
}

export const useFunnel = <Steps extends string[]>(steps: Steps, initialStep = steps[0]) => {
  type StepsType = Steps[number];

  const [step, setStep] = useState<StepsType>(initialStep);

  const Step = (props: StepProps<StepsType>): ReactElement => {
    return <Fragment>{props.children}</Fragment>;
  };

  const Funnel = ({ children }: FunnelProps<StepsType>) => {
    const targetStep = children.find((childStep) => childStep.props.name === step);

    return <Fragment>{targetStep}</Fragment>;
  };

  return { Funnel, Step, setStep, currentStep: step } as const;
};

export default useFunnel;
