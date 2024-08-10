export const runtime = 'edge';

export async function POST(req: Request) {
  // req에서 file을 가져옵니다.
  const file = (await req.formData()).get('file'); // FormDataEntryValue

  const url = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUD_FLARE_ACCOUNT_ID}/images/v1`;

  const formData = new FormData();
  formData.append('file', file as Blob);
  formData.append('metadata', JSON.stringify({ key: 'value' }));
  formData.append('requireSignedURLs', 'false');

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.CLOUD_FLARE_API_KEY}`,
    },
    body: formData,
  });

  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers: res.headers,
  });
}
