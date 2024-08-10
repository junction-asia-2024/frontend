import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const COMPLAINT_LIST: {
  src: string;
  category: '크랙' | '포트홀' | '배너';
  address: string;
  status: string;
}[] = [
  {
    src: '/images/sample/crack.png',
    category: '크랙',
    address: '서울시 강남구 역삼동 123-456',
    status: '처리중',
  },
  {
    src: '/images/sample/crack.png',
    category: '포트홀',
    address: '서울시 강남구 역삼동 123-456',
    status: '처리완료',
  },
  {
    src: '/images/sample/crack.png',
    category: '배너',
    address: '서울시 강남구 역삼동 123-456',
    status: '처리중',
  },
];

type ComplaintBottomSheetProps = {
  open: boolean;
  onClose: () => void;
  setContext: (id: number) => void;
  next: (state?: FlowState) => void;
};

const ComplaintBottomSheet = ({
  open,
  onClose,
  setContext,
  next,
}: ComplaintBottomSheetProps) => {
  const [data, setData] = useState<
    {
      category: '크랙' | '포트홀' | '배너';
      address: string;
      status: string;
    }[]
  >([]);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    setData(COMPLAINT_LIST);
  }, []);

  if (!open) {
    return null;
  }

  return (
    <Container onClick={onClose}>
      <Wrapper open={open}>
        <div
          style={{
            width: '100%',
            padding: '12px 0 13px 0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            gap: '17px',
            borderBottom: '1px solid #545454',
          }}
          onClick={onClose}
        >
          <svg
            width="54"
            height="5"
            viewBox="0 0 54 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="54" height="5" rx="2" fill="#E9ECEF" />
          </svg>
          내 주변 문제 {data.length}개
        </div>
        <div
          style={{
            width: '100%',
          }}
        >
          {COMPLAINT_LIST.filter((complaint) => {
            if (searchString === '') {
              return true;
            }
            return complaint.address.includes(searchString);
          }).map((complaint, index) => (
            <ComplaintItem
              key={index}
              onClick={() => {
                next('register_complaint');
              }}
            >
              <div
                style={{
                  width: '150px',
                  height: '80px',
                  position: 'relative',
                  flex: 1,
                }}
              >
                <Image
                  src={complaint.src}
                  alt={complaint.address}
                  fill
                  sizes="150px"
                />
              </div>
              <div
                style={{
                  position: 'relative',
                  flex: 1,
                  height: '80px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#545454',
                    lineHeight: '108%',
                    letterSpacing: '-1px',
                  }}
                >
                  {complaint.address}
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#545454',
                    lineHeight: '108%',
                    letterSpacing: '-1px',
                    border: '1px solid #545454',
                    borderRadius: '2px',
                    width: 'fit-content',
                    padding: '2px 6px',
                  }}
                >
                  {complaint.status}
                </div>
              </div>
            </ComplaintItem>
          ))}
          <ComplaintItem
            onClick={() => {
              next('detail_information');
            }}
          >
            <div
              style={{
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                lineHeight: '108%',
                letterSpacing: '-1px',
                fontSize: '16px',
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
                  id="mask0_79_557"
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
                <g mask="url(#mask0_79_557)">
                  <path
                    d="M11.25 12.75H5.5V11.25H11.25V5.5H12.75V11.25H18.5V12.75H12.75V18.5H11.25V12.75Z"
                    fill="#1C1B1F"
                  />
                </g>
              </svg>
              새로 건의하기
            </div>
          </ComplaintItem>
        </div>
      </Wrapper>
    </Container>
  );
};

export default ComplaintBottomSheet;

const Container = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

const Wrapper = styled.div<{
  open: boolean;
}>`
  width: 100%;
  transition: height 0.2s ease-in-out;
  height: ${(props) => (props.open ? '60%' : '0')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 0 15px 31px 15px;
`;

const ComplaintItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  border-bottom: 1px solid #d9d9d9;
  height: fit-content;
  position: relative;
  gap: 15px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #f9f9f9;
  }
`;
