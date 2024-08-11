'use client';
import Header from '@/components/layout/Header';
import styled from '@emotion/styled';
import { Box, Grid, MenuItem, Select, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { marked } from 'marked';
import parse from 'html-react-parser';
import { useQuery } from '@tanstack/react-query';
import customAxios from '@/lib/axios';
import FormControl from '@mui/material/FormControl';
import BarLoader from '@/components/element/bar';
import Bounce from '@/components/element/bounce';
import Typewriter from '@/components/effect/Typewriter';

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
  const [linearList, setLinearList] = useState<
    {
      hour: string;
      count: number;
    }[]
  >([]);
  const [barList, setBarList] = useState<
    {
      day: string;
      count: number;
    }[]
  >([]);
  const [pieList, setPieList] = useState<
    {
      status: string;
      count: number;
      percentage: number;
    }[]
  >([]);

  const [rows1, setRows1] = useState<
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
  const [rows2, setRows2] = useState<
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
  const [expanded, setExpanded] = useState<string | false>(false);
  const [complaintType, setComplaintType] = useState<string>('crack');

  const [gptSummary, setGptSummary] = useState<string>('');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const columns1: GridColDef<(typeof rows1)[number]>[] = [
    {
      field: 'classname',
      headerName: '종류',
      align: 'center',
      headerAlign: 'center',
      width: 70,
    },
    {
      field: 'location',
      headerName: '위치',
      align: 'left',
      headerAlign: 'center',
      flex: 1,
    },
    {
      field: 'count',
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

  function removeHtmlTags(text: string): string {
    const clean = /<.*?>/g;
    return text.replace(clean, '');
  }

  const {
    data: gptData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['gpt'],
    queryFn: () => {
      return customAxios({
        method: 'GET',
        url: '/api/gpt',
      }).then((res) => res.data);
    },
  });

  const { data: complaintData } = useQuery({
    queryKey: ['complaint', complaintType],
    queryFn: () => {
      return customAxios({
        method: 'GET',
        url: '/api/complaints',
        params: {
          classname: complaintType,
          skip: 0,
          limit: 100,
        },
      }).then((res) => res.data);
    },
  });

  const { data: linearData } = useQuery({
    queryKey: ['chart', 'linear'],
    queryFn: () => {
      return customAxios({
        method: 'GET',
        url: '/api/chart/linear',
      }).then((res) => res.data);
    },
  });

  const { data: barData } = useQuery({
    queryKey: ['chart', 'bar'],
    queryFn: () => {
      return customAxios({
        method: 'GET',
        url: '/api/chart/stick',
        params: {
          start_date: '2021-08-05',
          end_date: '2024-08-11',
        },
      }).then((res) => res.data);
    },
  });

  const { data: pieData } = useQuery({
    queryKey: ['chart', 'pie'],
    queryFn: () => {
      return customAxios({
        method: 'GET',
        url: '/api/chart/pie',
        params: {
          start_date: '2021-08-01',
          end_date: '2024-08-31',
        },
      }).then((res) => res.data);
    },
  });

  useEffect(() => {
    const markdown = async (chat: string) => {
      setGptSummary(await marked(chat));
    };

    if (gptData) {
      markdown(gptData);
    }
  }, [gptData]);

  useEffect(() => {
    if (complaintData) {
      setRows1(complaintData);
    }
  }, [complaintData]);

  useEffect(() => {
    if (linearData) {
      setLinearList(linearData);
    }
  }, [linearData]);

  useEffect(() => {
    if (barData) {
      setBarList(barData);
    }
  }, [barData]);

  useEffect(() => {
    if (pieData) {
      setPieList(pieData);
    }
  }, [pieData]);
  return (
    <Container>
      <Header display={'block'} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <div
          style={{
            fontSize: '24px',
          }}
        >
          AI 요약
        </div>
        <Box
          sx={{
            width: '100%',
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            boxShadow: 'none',
            ':before': {
              display: 'none',
            },
            minHeight: '200px',
            maxHeight: '400px',
            height: 'fit-content',
            overflow: 'auto',
            padding: '20px',
            lineHeight: '1.5',
          }}
        >
          {isLoading ? (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Bounce width={35} height={35} /> 데이터를 요약하고 있어요! 😁
            </div>
          ) : (
            <Typewriter
              typingSpeed={20}
              textArray={[removeHtmlTags(gptSummary)]}
              onComplete={() => {
                console.log('complete');
              }}
            />
          )}
        </Box>
      </div>
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
                    display: false,
                    text: '선형 차트',
                    font: {
                      size: 20,
                    },
                  },
                },
              }}
              data={{
                labels: linearList.map((item) => item.hour),
                datasets: [
                  {
                    label: 'My First Dataset',
                    data: linearList.map((item) => item.count),
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
                    display: false,
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
                labels: barList.map((item) => item.day),
                datasets: [
                  {
                    label: '# of Votes',
                    data: barList.map((item) => item.count),
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
                    display: false,
                    text: '파이 차트',
                    font: {
                      size: 20,
                    },
                  },
                },
              }}
              data={{
                labels: pieList.map((item) => item.status),
                datasets: [
                  {
                    label: '# of Status',
                    data: pieList.map((item) => item.count),
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
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={complaintType}
                onChange={(e) => setComplaintType(e.target.value)}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                sx={{
                  outline: 'none',
                  borderRadius: '4px',
                  '.MuiSelect-select': {
                    padding: '4px 8px',
                  },
                }}
              >
                <MenuItem value={'crack'}>크랙</MenuItem>
                <MenuItem value={'banner'}>배너</MenuItem>
                <MenuItem value={'pothole'}>포트홀</MenuItem>
                <MenuItem value={'vehicle'}>불법주정차</MenuItem>
                <MenuItem value={'trash'}>쓰레기</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Box sx={{ height: 294, width: '100%' }}>
            <DataGrid
              rows={rows1}
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
