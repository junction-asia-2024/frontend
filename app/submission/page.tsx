'use client';

import Header from '@/components/layout/Header';
import ComplaintBottomSheet from '@/components/module/Complaint/ComplaintBottomSheet';
import DetailInformation from '@/components/module/Complaint/DetailInformation';
import Idle from '@/components/module/Complaint/Idle';
import RegisterComplaint from '@/components/module/Complaint/RegisterComplaint';
import WhereYouFindThat from '@/components/module/Complaint/WhereYouFindThat';
import useFlow from '@/hooks/useFlow';
import useWarnOnUnload from '@/hooks/useWarnOnUnload';
import styled from '@emotion/styled';
import { useState } from 'react';

const SubmissionPage = () => {
  const { flowState, ...flowProps } = useFlow();
  const [complaintBottomSheetOpen, setComplaintBottomSheetOpen] =
    useState(false);

  useWarnOnUnload();

  const handleOpen = () => {
    setComplaintBottomSheetOpen(true);
  };

  const getComponent = (flowState: FlowState) => {
    const components: {
      [key: string]: JSX.Element | null;
    } = {
      idle: (
        <Idle
          state={flowState}
          next={flowProps.next}
          setContext={flowProps.setComplaintType}
        />
      ),
      where_you_find_that: (
        <WhereYouFindThat
          state={flowState}
          next={flowProps.next}
          context={flowProps.flowContext}
          setContext={flowProps.setAddress}
          setLocation={flowProps.setLocation}
          handleOpen={handleOpen}
        />
      ),
      detail_information: (
        <DetailInformation
          state={flowState}
          next={flowProps.next}
          context={flowProps.flowContext}
          setUrl={flowProps.setUrl}
          setLocation={flowProps.setLocation}
          handleOpen={handleOpen}
        />
      ),
      register_complaint: (
        <RegisterComplaint
          state={flowState}
          next={flowProps.next}
          context={flowProps.flowContext}
          setContext={flowProps.setForm}
          initialize={() => {
            flowProps.setComplaintType('');
            flowProps.setAddress('');
            flowProps.setUrl('');
            flowProps.setLocation({
              lat: 35.8481599061928,
              lng: 129.264130893778,
            });
          }}
        />
      ),
    };

    return components[flowState] || null;
  };
  return (
    <Main>
      <Header display={'block'} />
      {flowState !== 'idle' && (
        <BackButton
          onClick={() => {
            flowProps.back();
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_79_487"
              style={{
                maskType: 'alpha',
              }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="24"
              height="24"
            >
              <rect width="24" height="24" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_79_487)">
              <path
                d="M10 18L4 12L10 6L11.4 7.45L7.85 11H20V13H7.85L11.4 16.55L10 18Z"
                fill="#545454"
              />
            </g>
          </svg>
        </BackButton>
      )}
      {getComponent(flowState)}
      <ComplaintBottomSheet
        open={complaintBottomSheetOpen}
        onClose={() => setComplaintBottomSheetOpen(false)}
        next={flowProps.next}
        setContext={flowProps.setId}
      />
    </Main>
  );
};

export default SubmissionPage;

const Main = styled.main`
  max-width: 480px;
  width: 100%;
  display: flex;
  height: calc(var(--vh, 1vh) * 100);
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 57px 16px 88px 16px;
  overflow-x: hidden;
  overflow-y: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  --ms-overflow-style: none;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  top: 58px;
  left: 16px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  mix-blend-mode: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: scale 0.2s ease-in-out;

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    scale: 1.1;
  }
`;
