import { ImageResponse } from 'next/og'
import { SHORT_NAME } from '@/helpers'

export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
export default function Icon() {
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
          borderRadius: '40%',
        }}
      >
        {SHORT_NAME}
      </div>
    ),
    {
      ...size,
    }
  )
}