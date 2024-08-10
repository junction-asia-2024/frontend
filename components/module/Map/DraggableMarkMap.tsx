import useKakaoLoader from '@/hooks/useKakaoLoader';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

type KakaoMapProps = {
  center?: { lat: number; lng: number };
  style?: { width: string; height: string };
  level?: number;
};

const DraggableMarkMap = ({
  center = {
    lat: 33.450701,
    lng: 126.570667,
  },
  style = {
    width: '100%',
    height: '350px',
  },
  level = 3,
}: KakaoMapProps) => {
  useKakaoLoader();

  return (
    <Map // 지도를 표시할 Container
      id="map"
      center={center} // 지도의 중심좌표
      style={style} // 지도의 크기
      level={level} // 지도의 확대 레벨
    >
      <MapMarker // 마커를 생성합니다
        position={center} // 마커가 표시될 위치
        draggable={true} // 마커가 드래그 가능하도록 설정합니다
      />
    </Map>
  );
};

export default DraggableMarkMap;
