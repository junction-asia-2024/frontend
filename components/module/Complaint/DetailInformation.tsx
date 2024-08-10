import styled from '@emotion/styled';
import ImageUpload from '../ImageUpload';
import { useState } from 'react';
import useKakaoLoader from '@/hooks/useKakaoLoader';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import toast from 'react-hot-toast';

type DetailInformationProps = {
  state: FlowState;
  next: () => void;
  context: FlowContext;
  setUrl: (url: string) => void;
  setLocation: (location: { lat: number; lng: number }) => void;
  handleOpen: () => void;
};

const DetailInformation = ({
  state,
  next,
  context,
  setUrl,
  setLocation,
  handleOpen,
}: DetailInformationProps) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleImageUpload = (file: File) => {
    setFile(file);
  };

  useKakaoLoader();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        height: '100%',
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
        <br />
        민원정보를 입력해주세요
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '20px 0',
          width: '100%',
          height: 'fit-content',
          gap: '8px',
        }}
      >
        사진 등록
        <ImageUpload
          open={open}
          onClose={handleClose}
          onChange={handleImageUpload}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '20px 0',
          width: '100%',
          height: 'fit-content',
          gap: '8px',
        }}
      >
        위치 확정
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '350px',
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
              height: '350px',
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
      </div>
      <Button
        onClick={() => {
          if (!file) {
            toast.error('사진을 등록해주세요');
            return;
          }
          next();
        }}
      >
        민원 등록하기
      </Button>
    </div>
  );
};

export default DetailInformation;

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
  min-height: 50px;
`;
