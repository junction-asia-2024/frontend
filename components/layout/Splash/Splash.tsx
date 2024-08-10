'use client';

import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const Splash = () => {
  const [boarding, setBoarding] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setBoarding(false);
    }, 2000);
  }, []);

  if (!boarding) {
    return null;
  }

  return (
    <Container>
      안녕하세요! <br /> 포항에 오신 것을 환영합니다.
    </Container>
  );
};

export default Splash;

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #1e1e1e;
  z-index: 200;
  animation: fadeOut 1s ease-in-out 1s forwards;

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;
