'use client';
import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <Main>
      <svg
        style={{
          position: 'absolute',
          top: '-30%',
          left: '-40%',
        }}
        width="1020"
        height="1020"
        viewBox="0 0 1020 1020"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_113_1520)">
          <circle cx="510" cy="506" r="480" fill="white" />
        </g>
        <defs>
          <filter
            id="filter0_d_113_1520"
            x="0"
            y="0"
            width="1020"
            height="1020"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feMorphology
              radius="10"
              operator="dilate"
              in="SourceAlpha"
              result="effect1_dropShadow_113_1520"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="10" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0.294746 0 0 0 0 0.529915 0 0 0 0.4 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_113_1520"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_113_1520"
              result="shape"
            />
          </filter>
        </defs>
      </svg>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          fontSize: '18px',
          lineHeight: '18px',
          zIndex: 10,
        }}
      >
        빠르고 확실한 민원은
        <div
          style={{
            width: '223px',
            height: '59px',
            position: 'relative',
          }}
        >
          <Image
            src={'/images/mwez_text.png'}
            alt="민원이지"
            fill
            sizes="223px"
          />
          <div
            style={{
              width: '104px',
              height: '136px',
              position: 'absolute',
              right: '-52px',
              top: '-36px',
            }}
          >
            <Image
              src={'/images/mwez_deco.png'}
              alt="민원이지"
              fill
              sizes="104px"
            />
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: '10px',
          fontSize: '24px',
        }}
      >
        <div
          onClick={() => {
            router.push('/complaint');
          }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            width: '246px',
            color: '#fff',
          }}
        >
          내 민원 확인하기
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_67_282"
              style={{
                maskType: 'alpha',
              }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="24"
              height="24"
            >
              <rect width="24" height="24" fill="#ffffff" />
            </mask>
            <g mask="url(#mask0_67_282)">
              <path
                d="M8.025 22L6.25 20.225L14.475 12L6.25 3.775L8.025 2L18.025 12L8.025 22Z"
                fill="#ffffff"
              />
            </g>
          </svg>
        </div>
        <div
          onClick={() => {
            router.push('/submission');
          }}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            width: '246px',
            color: '#fff',
          }}
        >
          민원 건의하기
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_67_282"
              style={{
                maskType: 'alpha',
              }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="24"
              height="24"
            >
              <rect width="24" height="24" fill="#ffffff" />
            </mask>
            <g mask="url(#mask0_67_282)">
              <path
                d="M8.025 22L6.25 20.225L14.475 12L6.25 3.775L8.025 2L18.025 12L8.025 22Z"
                fill="#ffffff"
              />
            </g>
          </svg>
        </div>
      </div>
    </Main>
  );
}

const Main = styled.main`
  max-width: 480px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: #005ea9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 164px 32px 110px 32px;
  position: relative;
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  margin-top: 10px;
  border-radius: 10px;
  background-color: #000;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;
