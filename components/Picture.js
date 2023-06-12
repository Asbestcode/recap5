import styled from "styled-components";
import Image from "next/image.js";
import { useState } from "react";
import { useRouter } from 'next/router.js';

const ImageContainer = styled.div`
  position: relative;
  margin: 0;
  > img {
    border-radius: 0.4rem;
    overflow: hidden;
    width: 100%;
    object-fit: cover;
    position: relative !important;
  }
`;

export default function Picture({ name, image }) {
  const router = useRouter();
  const { id } = router.query;
  const [src, setSrc] = useState(image);
  
  return (
    <ImageContainer>
      <Image
        src={src}
        style={{
          aspectRatio: id ? '4 / 2' : '3 / 2'
        }}
        priority
        fill
        sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
        alt={name}
        unoptimized={true}
        placeholder="blur"
        blurDataURL="/images/placeholder.jpg"
        onError={() => setSrc("/images/not-found.jpg")}
        onLoadingComplete={(result) => {
          if (result.naturalWidth === 0) {
            setSrc("/images/not-found.jpg");
          }
        }}
      />
    </ImageContainer>
  );
}