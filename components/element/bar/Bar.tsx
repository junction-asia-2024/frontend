import styled from '@emotion/styled';

type BarProps = {
  width?: number;
  height?: number;
};

const Bar = ({ width = 45, height = 45 }: BarProps) => {
  return <Container />;
};

export default Bar;

const Container = styled.div`
  width: 45px;
  aspect-ratio: 0.75;
  --c: no-repeat linear-gradient(#000 0 0);
  background:
    var(--c) 0% 50%,
    var(--c) 50% 50%,
    var(--c) 100% 50%;
  animation: l7 1s infinite linear alternate;
  @keyframes l7 {
    0% {
      background-size:
        20% 50%,
        20% 50%,
        20% 50%;
    }
    20% {
      background-size:
        20% 20%,
        20% 50%,
        20% 50%;
    }
    40% {
      background-size:
        20% 100%,
        20% 20%,
        20% 50%;
    }
    60% {
      background-size:
        20% 50%,
        20% 100%,
        20% 20%;
    }
    80% {
      background-size:
        20% 50%,
        20% 50%,
        20% 100%;
    }
    100% {
      background-size:
        20% 50%,
        20% 50%,
        20% 50%;
    }
  }
`;
