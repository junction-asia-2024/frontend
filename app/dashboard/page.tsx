'use client';
import Header from '@/components/layout/Header';
import styled from '@emotion/styled';
import { Box, Grid, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { marked } from 'marked';
import parse from 'html-react-parser';
import { debounce } from 'lodash';
import useDebounce from '@/hooks/useDebounce';

const SUMMARY_DUMMY = `최종 요약:
1. **전체 분석 결과 요약:**
   - 손상 사건은 경상북도 포항시 남구를 중심으로 발생.
   - 송도동, 대잠동, 상도동 등에서 손상 사건 집중적 발생.
   - 대부분 오후 시간대에 사건이 발생.

2. **주요 패턴 및 트렌드 요약:**
   - 오후 시간대(12시 이후)에 손상 사건이 집중 발생.
   
3. **지역별 도로 손상 정보 요약:**
   - 연일읍, 송도동, 대잠동 등에서 손상 사건 발생.
   
4. **시간대별 발생 정보 요약:**
   - 오후 4시~6시에 가장 많은 사건 발생.
   - 7월에 사건이 많이 발생.

5. **권장 사항 및 개선 방안 요약:**
   - 손상 사건 집중 지역의 도로 상태 모니터링 및 추가 점검 강화 필요.
   - 오후 시간대에 도로 관리 강화 및 정기 점검 시행 권장.`;

const DashboardPage = () => {
  const [chat, setChat] = useState<string>('');
  const [rows1, setRows1] = useState<
    {
      id: number;
      category: string;
      address: string;
      count: number | null;
      status: string;
    }[]
  >([]);
  const [rows2, setRows2] = useState<
    {
      id: number;
      regDate: string;
      content: string;
      phone: string;
    }[]
  >([]);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [searchString, setSearchString] = useState<string>('');

  const debounceSearchString = useDebounce(searchString, 300);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const columns1: GridColDef<(typeof rows1)[number]>[] = [
    {
      field: 'category',
      headerName: '종류',
      align: 'center',
      headerAlign: 'center',
      width: 70,
    },
    {
      field: 'address',
      headerName: '위치',
      align: 'left',
      headerAlign: 'center',
      flex: 1,
    },
    {
      field: 'age',
      headerName: '민원 개수',
      type: 'number',
      align: 'center',
      headerAlign: 'center',
      width: 90,
    },
    {
      field: 'status',
      headerName: '처리 상태',
      description: 'This column has a value getter and is not sortable.',
      align: 'center',
      headerAlign: 'center',
      width: 90,
      renderCell({ row }) {
        return <strong>{row.status}</strong>;
      },
    },
  ];

  const columns2: GridColDef<(typeof rows2)[number]>[] = [
    {
      field: 'no',
      headerName: 'No.',
      headerAlign: 'center',
      align: 'center',
      width: 70,
    },
    {
      field: 'regDate',
      headerName: '날짜',
      headerAlign: 'center',
      align: 'center',
      width: 100,
    },
    {
      field: 'content',
      headerName: '내용',
      headerAlign: 'center',
      align: 'left',
      type: 'number',
      flex: 1,
    },
    {
      field: 'phone',
      headerName: '전화번호',
      headerAlign: 'center',
      align: 'center',
      description: 'This column has a value getter and is not sortable.',
      width: 170,
    },
  ];

  useEffect(() => {
    const rows = [
      {
        id: 1,
        category: '도로',
        address: '포항시 남구 송도 동',
        count: 3,
        status: '처리중',
      },
      {
        id: 2,
        category: '도로',
        address: '포항시 남구 대잠동',
        count: 2,
        status: '처리중',
      },
      {
        id: 3,
        category: '도로',
        address: '포항시 남구 상도동',
        count: 10,
        status: '처리중',
      },
      {
        id: 4,
        category: '도로',
        address: '포항시 남구 연일읍',
        count: 5,
        status: '처리중',
      },
      {
        id: 5,
        category: '도로',
        address: '포항시 남구 상도동',
        count: 4,
        status: '처리중',
      },
    ];
    setRows1(rows);
  }, []);

  useEffect(() => {
    const markdown = async () => {
      setChat(await marked(SUMMARY_DUMMY));
    };

    markdown();
  }, [chat]);
  return (
    <Container>
      <Header display={'block'} />
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
        sx={{
          width: '100%',
          border: '1px solid #d9d9d9',
          borderRadius: '4px',
          boxShadow: 'none',
          ':before': {
            display: 'none',
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ flexShrink: 0 }}>AI 요약</Typography>
        </AccordionSummary>
        <AccordionDetails>{parse(chat)}</AccordionDetails>
      </Accordion>
      <div
        style={{
          height: 'fit-content',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            fontSize: '24px',
          }}
        >
          현황
        </div>
        <GraphGrid>
          <GraphItam>
            <Line
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: true,
                    text: '선형 차트',
                    font: {
                      size: 20,
                    },
                  },
                },
              }}
              data={{
                labels: [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                ],
                datasets: [
                  {
                    label: 'My First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                  },
                ],
              }}
            />
          </GraphItam>
          <GraphItam>
            <Bar
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: true,
                    text: '막대 차트',
                    font: {
                      size: 20,
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
              data={{
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [
                  {
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </GraphItam>
          <GraphItam>
            <Pie
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: true,
                    text: '파이 차트',
                    font: {
                      size: 20,
                    },
                  },
                },
              }}
              data={{
                labels: ['Red', 'Blue', 'Yellow'],
                datasets: [
                  {
                    label: '# of Votes',
                    data: [300, 50, 100],
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </GraphItam>
        </GraphGrid>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
        }}
      >
        <div
          style={{
            fontSize: '24px',
          }}
        >
          민원 확인하기
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                fontSize: '18px',
              }}
            >
              유지보수 필요건
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #D9D9D9',
                padding: '4px 7px',
              }}
            >
              <input
                style={{
                  width: '230px',
                  outline: 'none',
                  fontSize: '12px',
                }}
                placeholder="검색어를 입력하세요"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
              />
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_102_304"
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
                <g mask="url(#mask0_102_304)">
                  <path
                    d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z"
                    fill="#545454"
                  />
                </g>
              </svg>
            </div>
          </div>
          <Box sx={{ height: 294, width: '100%' }}>
            <DataGrid
              rows={rows1.filter((row) =>
                row.address.includes(debounceSearchString),
              )}
              columns={columns1}
              slots={{
                pagination: () => null,
                footer: () => null,
              }}
            />
          </Box>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <div
            style={{
              fontSize: '18px',
            }}
          >
            민원 내용
          </div>
          <Box sx={{ height: 294, width: '100%' }}>
            <DataGrid
              rows={rows2}
              columns={columns2}
              slots={{
                pagination: () => null,
                footer: () => null,
              }}
            />
          </Box>
        </div>
      </div>
    </Container>
  );
};

export default DashboardPage;

const ExpandMoreIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_102_425"
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
      <g mask="url(#mask0_102_425)">
        <path
          d="M12 15L16 11H8L12 15ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
          fill="#1C1B1F"
        />
      </g>
    </svg>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 113px 16px 88px 16px;
  display: flex;
  flex-direction: column;
  gap: 64px;
  overflow: auto;

  // 스크롤바 숨김
  &::-webkit-scrollbar {
    display: none;
  }
  --ms-overflow-style: none;
  scrollbar-width: none;
`;

const GraphGrid = styled(Grid)`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  margin-top: 20px;
  width: 100%;
  height: fit-content;
`;

const GraphItam = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #d9d9d9;
`;
