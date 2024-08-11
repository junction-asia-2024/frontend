import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import customAxios from '@/lib/axios';

const COMPLAINT_LIST: {
  id: number;
  longitude: string;
  time: string;
  address: string;
  file_url: string;
}[] = [
  {
    id: 38476,
    longitude: '129.3707766',
    time: '2024-06-02T22:43:22',
    address: '경상북도 포항시 남구 해도동',
    file_url: 'https://d1m84t8yekat2i.cloudfront.net/pre-images/0000038476',
  },
  {
    id: 38524,
    longitude: '129.3688293',
    time: '2024-06-02T23:38:10',
    address: '경상북도 포항시 남구 해도동',
    file_url: 'https://d1m84t8yekat2i.cloudfront.net/pre-images/0000038524',
  },
  {
    id: 38526,
    longitude: '129.3650239',
    time: '2024-06-02T23:43:29',
    address: '경상북도 포항시 남구 대도동',
    file_url: 'https://d1m84t8yekat2i.cloudfront.net/pre-images/0000038526',
  },
  {
    id: 38529,
    longitude: '129.3443347',
    time: '2024-06-02T23:49:30',
    address: '경상북도 포항시 남구 대잠동',
    file_url: 'https://d1m84t8yekat2i.cloudfront.net/pre-images/0000038529',
  },
  {
    id: 38548,
    longitude: '129.3666875',
    time: '2024-06-03T00:11:01',
    address: '경상북도 포항시 남구 대도동',
    file_url: 'https://d1m84t8yekat2i.cloudfront.net/pre-images/0000038548',
  },
  {
    id: 38560,
    longitude: '129.3561243',
    time: '2024-06-03T00:34:43',
    address: '경상북도 포항시 남구 대도동',
    file_url: 'https://d1m84t8yekat2i.cloudfront.net/pre-images/0000038560',
  },
  {
    id: 38564,
    longitude: '129.3456806',
    time: '2024-06-03T00:39:40',
    address: '경상북도 포항시 남구 대잠동',
    file_url: 'https://d1m84t8yekat2i.cloudfront.net/pre-images/0000038564',
  },
  {
    id: 38617,
    longitude: '129.3388873',
    time: '2024-06-03T01:34:02',
    address: '경상북도 포항시 남구 이동',
    file_url: 'https://d1m84t8yekat2i.cloudfront.net/pre-images/0000038617',
  },
  {
    id: 38623,
    longitude: '129.3419582',
    time: '2024-06-03T01:37:00',
    address: '경상북도 포항시 남구 대잠동',
    file_url: 'https://d1m84t8yekat2i.cloudfront.net/pre-images/0000038623',
  },
  {
    id: 38625,
    longitude: '129.3421863',
    time: '2024-06-03T01:37:25',
    address: '경상북도 포항시 남구 대잠동',
    file_url: 'https://d1m84t8yekat2i.cloudfront.net/pre-images/0000038625',
  },
];

type ComplaintBottomSheetProps = {
  open: boolean;
  context: FlowContext;
  onClose: () => void;
  setContext: (id: number) => void;
  next: (state?: FlowState) => void;
};

const ComplaintBottomSheet = ({
  open,
  context,
  onClose,
  setContext,
  next,
}: ComplaintBottomSheetProps) => {
  const [list, setList] = useState<
    {
      id: number;
      longitude: string;
      time: string;
      address: string;
      file_url: string;
    }[]
  >([]);
  const [searchString, setSearchString] = useState('');

  const { data } = useQuery({
    queryKey: ['detect', searchString],
    queryFn: () => {
      return customAxios({
        method: 'GET',
        url: '/api/detects',
        params: {
          latitude: context.location?.lat || 33.450701,
          longitude: context.location?.lng || 126.570667,
        },
      }).then((res) => res.data);
    },
    enabled: open && !!context.location,
  });

  useEffect(() => {
    if (data) {
      setList(data);
    }
  }, [data]);

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
          내 주변 문제 {list.length}개
        </div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'scroll',
          }}
        >
          {list.map((complaint, index) => (
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
                  src={complaint.file_url}
                  alt={complaint.address}
                  fill
                  sizes="150px"
                  loader={({ src }) => (src ? src : '/og-image.png')}
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
                  {complaint.time.split('T')[0]}
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
