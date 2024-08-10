import { useEffect, useState } from 'react';
import DaumPostcode, { type Address } from 'react-daum-postcode';
import styled from '@emotion/styled';
import axios from 'axios';
import useKakaoLoader from '@/hooks/useKakaoLoader';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { Box, Modal } from '@mui/material';
import { modalStyle } from '@/style/modal';

type WhereYouFindThatProps = {
  state: FlowState;
  next: () => void;
  context: FlowContext;
  setContext: (address: string) => void;
  setLocation: (location: { lat: number; lng: number }) => void;
  handleOpen: () => void;
};

const WhereYouFindThat = ({
  state,
  next,
  context,
  setContext,
  setLocation,
  handleOpen,
}: WhereYouFindThatProps) => {
  const [open, setOpen] = useState(false);
  // const [location, setLocation] = useState({ lat: 33.450701, lng: 126.570667 });

  const handleClose = () => {
    setOpen(false);
  };

  useKakaoLoader();

  return (
    <Container>
      <div
        style={{
          width: '100%',
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
          어디에서
          <br />
          {context.complaintType}을(를) 발견하셨나요?
        </div>
        <Input
          value={context.address}
          onChange={(e) => {
            return;
          }}
          onClick={() => {
            setOpen(true);
          }}
          placeholder="주소를 입력해주세요"
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          maxWidth: '100%',
        }}
      >
        <Map // 지도를 표시할 Container
          id="map"
          center={{
            lat: context.location?.lat || 33.450701,
            lng: context.location?.lng || 126.570667,
          }} // 지도의 중심좌표
          style={{
            width: '100%',
            height: '450px',
          }} // 지도의 크기
          level={3} // 지도의 확대 레벨
        >
          <MapMarker // 마커를 생성합니다
            position={{
              lat: context.location?.lat || 33.450701,
              lng: context.location?.lng || 126.570667,
            }} // 마커가 표시될 위치
            draggable={true} // 마커가 드래그 가능하도록 설정합니다
            onClick={() => {
              handleOpen();
            }}
          />
        </Map>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <DaumPostcode
            autoClose={false}
            onComplete={async ({ address }) => {
              // address, zonecode
              setContext(address);
              const result = await axios
                .get('/api/geo', {
                  params: {
                    address,
                  },
                })
                .then((res) => res.data);
              setLocation({
                lat: parseFloat(result.lat),
                lng: parseFloat(result.lng),
              });
              setOpen(false);
            }}
            style={{
              width: '100%',
              height: '480px',
            }}
          />
        </Box>
      </Modal>
    </Container>
  );
};

export default WhereYouFindThat;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: fit-content;
  gap: 20px;
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
