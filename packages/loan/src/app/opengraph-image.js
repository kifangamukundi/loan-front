import { ImageResponse } from 'next/og'
import { SITE_NAME, SITE_SLOGAN } from '@/helpers';
 
export const runtime = 'edge'

export const alt = `${SITE_NAME}`;

export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
export default async function Image() {
  const interSemiBold = fetch(
    new URL('./Inter-SemiBold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer())
 
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 28,
          background: '#2E8B57',
          color: '#FFFFFF',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {SITE_NAME}: {SITE_SLOGAN}
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: await interSemiBold,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  )
}