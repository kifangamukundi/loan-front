import React, { useEffect, useState } from 'react';

const useStepper = (initialStep = 0, steps = [], localStorageKey) => {
  // const [currentStep, setCurrentStep] = useState(initialStep);
  // const [stepData, setStepData] = useState(Array(steps.length).fill({}));

  const [currentStep, setCurrentStep] = useState(initialStep);
  const [stepData, setStepData] = useState(
    JSON.parse(localStorage.getItem(localStorageKey)) || Array(steps.length).fill({})
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(stepData));
  }, [stepData, localStorageKey]);

  const goToNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  const setStepInputData = (step, data) => {
    setStepData((prevData) => {
      const newData = [...prevData];
      newData[step] = data;
      return newData;
    });
  };

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const stepperProps = {
    currentStep,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    setStepInputData,
    isLastStep,
    isFirstStep,
  };

  return [stepperProps, steps[currentStep], stepData];
};

export default useStepper;
