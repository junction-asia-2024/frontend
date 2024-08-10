export async function GET(req: Request) {
  // req의 파라미터에서 address를 가져옵니다.
  const { searchParams } = new URL(req.url);
  const address = searchParams.get('address');
  // 카카오맵 API를 호출합니다.
  const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`;
  const headers = {
    Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
  };

  const res = await fetch(url, { headers });
  const data = await res.json();
  const location = data.documents[0].address;
  const lat = location.y;
  const lng = location.x;

  return new Response(JSON.stringify({ lat, lng }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
