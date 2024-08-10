import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

type RegisterComplaintProps = {
  state: FlowState;
  next: (state?: FlowState) => void;
  context: FlowContext;
  setContext: (form: { description: string; phone: string }) => void;
  initialize: () => void;
};

const RegisterComplaint = ({
  state,
  next,
  context,
  setContext,
  initialize,
}: RegisterComplaintProps) => {
  const [registerState, setRegisterState] = useState<'idle' | 'register'>(
    'idle',
  );
  const router = useRouter();

  if (registerState === 'register') {
    return (
      <Container>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div
            style={{
              fontSize: '24px',
              lineHeight: '1.2',
              letterSpacing: '-1px',
              padding: '60px 0px 20px 0',
            }}
          >
            더 자세한 정보를
            <br />
            입력해주세요.
          </div>
          <div
            style={{
              fontSize: '16px',
              lineHeight: '1.08',
              letterSpacing: '-1px',
            }}
          >
            민원 상세 설명
            <Textarea
              value={context.description}
              onChange={(e) => {
                setContext({
                  description: e.target.value,
                  phone: context.phone || '',
                });
              }}
            />
          </div>
          <div
            style={{
              fontSize: '14px',
              lineHeight: '1.20',
              letterSpacing: '-1px',
            }}
          >
            전화번호를 등록하시면 <br />
            민원 진행 현황을 확인할 수 있어요!
            <Input
              value={context.phone}
              onChange={(e) => {
                setContext({
                  description: context.description || '',
                  phone: e.target.value,
                });
              }}
              placeholder="전화번호를 입력해주세요."
            />
          </div>
        </div>
        <Button
          onClick={() => {
            router.push('/');
          }}
        >
          민원 접수하기
        </Button>
      </Container>
    );
  }
  return (
    <Container>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            fontSize: '24px',
            lineHeight: '1.2',
            letterSpacing: '-1px',
            padding: '60px 0px 20px 0',
          }}
        >
          민원을
          <br />
          등록했습니다!
        </div>
        <div
          style={{
            fontSize: '14px',
            lineHeight: '1.2',
            letterSpacing: '-1px',
            fontWeight: '300',
          }}
        >
          자세한 내용을 추가하거나
          <br />
          등록하신 민원에 대한 소식을 들으시려면
          <br />
          상세 민원을 등록해주세요!
        </div>

        <div
          style={{
            marginTop: '47px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'fit-content',
          }}
        >
          <Image
            src={'/images/deco/complete.png'}
            alt="complete"
            width={242}
            height={242}
            priority
          />
        </div>
      </div>

      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Button
          onClick={() => {
            setRegisterState('register');
          }}
        >
          설명 추가하기
        </Button>
        <Button
          onClick={() => {
            window.location.href = '/';
          }}
        >
          초기화면으로
        </Button>
      </div>
    </Container>
  );
};

export default RegisterComplaint;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  height: fit-content;
  height: calc(var(--vh, 1vh) * 100);
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

const Textarea = styled.textarea`
  width: 100%;
  height: 143px;
  margin-top: 10px;
  border-radius: 2px;
  border: 1px solid #d9d9d9;
  padding: 10px;
  font-size: 16px;
  resize: none;
  outline: none;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  margin-top: 10px;
  border-radius: 2px;
  border: 1px solid #d9d9d9;
  padding: 0 10px;
  font-size: 16px;
  outline: none;
`;
