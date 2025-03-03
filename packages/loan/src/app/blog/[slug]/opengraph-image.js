import { ImageResponse } from 'next/og';
import { getPost } from '@/ssr-functions';
import { BLOG_NAME } from '@/helpers';
 
export const runtime = 'edge'

export const alt = `${BLOG_NAME}`;

export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
export default async function Image({ params }) {
  const interSemiBold = fetch(
    new URL('../../Inter-SemiBold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  const post = await getPost(params.slug);

  const { title } = post.data.item;
 
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: '#2E8B57',
          color: '#FFFFFF',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {title}: {BLOG_NAME}
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