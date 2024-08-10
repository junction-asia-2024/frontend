import useKakaoLoader from '@/hooks/useKakaoLoader';
import { Map } from 'react-kakao-maps-sdk';

type KakaoMapProps = {
  center?: { lat: number; lng: number };
  style?: { width: string; height: string };
  level?: number;
};

export default function BasicMap({
  center = {
    lat: 33.450701,
    lng: 126.570667,
  },
  style = {
    width: '100%',
    height: '350px',
  },
  level = 3,
}: KakaoMapProps) {
  useKakaoLoader();

  return (
    <Map // 지도를 표시할 Container
      id="map"
      center={center} // 지도의 중심좌표
      style={style} // 지도의 크기
      level={level} // 지도의 확대 레벨
    />
  );
}
