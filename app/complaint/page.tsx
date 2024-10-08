'use client';
import Header from '@/components/layout/Header';
import customAxios from '@/lib/axios';
import styled from '@emotion/styled';
import { useState } from 'react';
import useDebounce from '@/hooks/useDebounce';

const COMPLAINT_LIST: {
  regDate: string;
  category: '크랙' | '포트홀' | '배너';
  address: string;
  status: string;
  phone: string;
}[] = [
  {
    regDate: '2021-10-10',
    category: '크랙',
    address: '서울시 강남구 역삼동 123-456',
    status: '처리중',
    phone: '01012345678',
  },
  {
    regDate: '2021-10-10',
    category: '포트홀',
    address: '서울시 강남구 역삼동 123-456',
    status: '처리완료',
    phone: '01012345678',
  },
  {
    regDate: '2021-10-10',
    category: '배너',
    address: '서울시 강남구 역삼동 123-456',
    status: '처리중',
    phone: '01012345678',
  },
  {
    regDate: '2021-10-10',
    category: '크랙',
    address: '서울시 강남구 역삼동 123-456',
    status: '처리중',
    phone: '01012345677',
  },
  {
    regDate: '2021-10-10',
    category: '포트홀',
    address: '서울시 강남구 역삼동 123-456',
    status: '처리완료',
    phone: '01012345676',
  },
  {
    regDate: '2021-10-10',
    category: '배너',
    address: '서울시 강남구 역삼동 123-456',
    status: '처리중',
    phone: '01012345675',
  },
];

// "classname": "banner",
// "location": "location0120",
// "id": 12,
// "longitude": 1.123,
// "image_link": "il",
// "description": "des",
// "latitude": 1.3,
// "phone": "01012345678",
// "status": "W",
// "created_at": "2024-08-11T01:21:17"

const ComplaintPage = () => {
  const [complaintList, setComplaintList] = useState<
    {
      classname: string;
      location: string;
      id: number;
      longitude: number;
      image_link: string;
      description: string;
      latitude: number;
      phone: string;
      status: string;
      created_at: string;
    }[]
  >([]);
  const [searchString, setSearchString] = useState('');

  const debounceSearchString = useDebounce(searchString, 300);

  const handleSearch = async () => {
    const result = await customAxios({
      method: 'GET',
      url: '/api/complaints/phone',
      params: {
        phone: debounceSearchString,
        skip: 0,
        limit: 10,
      },
    }).then((res) => res.data);

    setComplaintList(result);
  };

  return (
    <Main>
      <Header display={'block'} />
      <div
        style={{
          fontSize: '24px',
          lineHeight: '1.2',
          letterSpacing: '-1px',
          padding: '60px 0px 20px 0',
        }}
      >
        접수하신 <br />
        민원 현황을 확인하세요.
      </div>
      <div>
        <Input
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
          value={searchString}
          placeholder="전화번호를 입력하세요."
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <Button onClick={handleSearch}>민원찾기</Button>
      </div>
      <div
        style={{
          marginTop: '20px',
        }}
      >
        <ComplaintItem>
          <div
            style={{
              flex: 0.5,
            }}
          >
            {'날짜'}
          </div>
          <div
            style={{
              flex: 0.5,
            }}
          >
            {'종류'}
          </div>
          <div
            style={{
              flex: 1,
            }}
          >
            {'민원 내용'}
          </div>
          <div
            style={{
              flex: 0.2,
            }}
          >
            {'현황'}
          </div>
        </ComplaintItem>
        {complaintList.map((complaint, index) => (
          <ComplaintItem key={index}>
            <div
              style={{
                flex: 0.5,
              }}
            >
              {complaint.created_at.split('T')[0]}
            </div>
            <div
              style={{
                flex: 0.5,
              }}
            >
              {complaint.classname}
            </div>
            <div
              style={{
                flex: 1,
              }}
            >
              {complaint.description}
            </div>
            <div
              style={{
                flex: 0.2,
              }}
            >
              {complaint.status}
            </div>
          </ComplaintItem>
        ))}
      </div>
    </Main>
  );
};

export default ComplaintPage;

const Main = styled.main`
  max-width: 480px;
  width: 100%;
  display: flex;
  height: calc(var(--vh, 1vh) * 100);
  flex-direction: column;
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

const Input = styled.input`
  width: 100%;
  height: 50px;
  margin-top: 10px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  padding: 0 10px;
  font-size: 16px;
  outline: none;

  &:placeholder {
  }
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  margin-top: 10px;
  border-radius: 5px;
  background-color: #005ea9;
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
`;

const ComplaintItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7.5px 10px;
  font-size: 12px;
  color: #545454;
  border-bottom: 1px solid #d9d9d9;
  letter-spacing: -1px;
  line-height: 1.08;
`;
