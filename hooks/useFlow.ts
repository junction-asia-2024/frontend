import { useState } from 'react';
import { FLOW_STATES } from '../constants/complaint';

const useFlow = (): {
  flowState: FlowState;
  flowStates: string[];
  next: (state?: FlowState) => void;
  back: () => void;
  flowContext: FlowContext;
  setComplaintType: (type: string) => void;
  setAddress: (address: string, location: { lat: number; lng: number }) => void;
  setForm: (form: { description: string; phone: string }) => void;
  setId: (id: number) => void;
  setLocation: (location: { lat: number; lng: number }) => void;
  setUrl: (url: string) => void;
} => {
  const [flowState, setFlowState] = useState<FlowState>(FLOW_STATES[0]);
  const [flowContext, setFlowContext] = useState<FlowContext>({
    complaintType: '',
    address: '',
    id: 0,
  });
  const next = (state?: FlowState) => {
    if (state) {
      setFlowState(state);
      return;
    }
    // overflow check
    if (FLOW_STATES.indexOf(flowState) === FLOW_STATES.length - 1) {
      return;
    }
    setFlowState(FLOW_STATES[FLOW_STATES.indexOf(flowState) + 1]);
  };

  const back = () => {
    // underflow check
    if (FLOW_STATES.indexOf(flowState) === 0) {
      return;
    }
    setFlowState(FLOW_STATES[FLOW_STATES.indexOf(flowState) - 1]);
  };

  const setComplaintType = (complaintType: string) => {
    setFlowContext({ ...flowContext, complaintType });
  };

  const setAddress = (
    address: string,
    location: { lat: number; lng: number },
  ) => {
    setFlowContext({ ...flowContext, address, location });
  };

  const setForm = ({
    description,
    phone,
  }: {
    description: string;
    phone: string;
  }) => {
    setFlowContext({ ...flowContext, description, phone });
  };

  const setId = (id: number) => {
    setFlowContext({ ...flowContext, id });
  };

  const setLocation = (location: { lat: number; lng: number }) => {
    setFlowContext({ ...flowContext, location });
  };

  const setUrl = (url: string) => {
    setFlowContext({ ...flowContext, img: url });
  };

  return {
    flowState,
    flowStates: FLOW_STATES,
    next,
    back,
    flowContext,
    setComplaintType,
    setAddress,
    setForm,
    setId,
    setLocation,
    setUrl,
  };
};

export default useFlow;
