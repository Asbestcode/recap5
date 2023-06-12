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
  const imageError = 'https://images.unsplash.com/photo-1525785967371-87ba44b3e6cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80'

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
        onError={() => setSrc(imageError)}
        onLoadingComplete={(result) => {
          if (result.naturalWidth === 0) {
            setSrc(imageError);
          }
        }}
      />
    </ImageContainer>
  );
}