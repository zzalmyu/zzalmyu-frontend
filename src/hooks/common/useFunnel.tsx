import { ReactElement, ReactNode, useState, Fragment } from "react";

export interface StepProps {
  name: string;
  children: ReactNode;
}

export interface FunnelProps {
  children: Array<ReactElement<StepProps>>;
}

export const useFunnel = (defaultStep: string) => {
  const [step, setStep] = useState(defaultStep);

  const Step = (props: StepProps): ReactElement => {
    return <Fragment>{props.children}</Fragment>;
  };

  const Funnel = ({ children }: FunnelProps) => {
    const targetStep = children.find((childStep) => childStep.props.name === step);

    return <Fragment>{targetStep}</Fragment>;
  };

  return { Funnel, Step, setStep, currentStep: step } as const;
};

export default useFunnel;
