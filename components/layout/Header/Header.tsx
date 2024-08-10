// import Logo from '@/components/svg/Logo';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type HeaderProps = {
  display: 'none' | 'block';
};

const Header = ({ display }: HeaderProps) => {
  const router = useRouter();
  return (
    <Container
      style={{
        display,
      }}
    >
      <div
        style={{
          width: '56px',
          height: '28px',
          position: 'relative',
        }}
        onClick={() => {
          window.location.href = '/';
        }}
      >
        <Image src={'/images/mwez.png'} alt="" fill sizes="56px" />
      </div>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  padding: 14px 16px;
  background-color: white;
  z-index: 100;
  border-bottom: 0.5px solid #e0e0e0;
`;
