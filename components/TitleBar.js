import styled from "styled-components";
import Link from 'next/link';
import { useRouter } from 'next/router.js';

const HeadlineContainer = styled.div`
  position: sticky;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
  margin: 0;
  padding: 50px 1.5rem;
  z-index: 1;
  pointer-events: none;
`
const Headline = styled.h1`
  background-color: white;
  position: relative;
  display: inline-block;
  left: 26px;
  margin: 0;
  padding: 5px 20px;
  text-align: center;
  border-radius: 0.8rem;
  border: 1px solid rgba(0, 0, 0, 1);
`;
const BackLink = styled.a`
  position: absolute;
  display: inline-block;
  right: calc(1.5rem + 26px);
  background-color: lightsalmon;
  padding: 0.8rem 1.5rem;
  border: 1px solid rgba(0, 0, 0, 1);
  border-radius: 0.6rem;
  color: black;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  pointer-events: auto;
`;

export default function TitleBar() {
  const router = useRouter();
  const { id } = router.query;
  const isRoot = id || router.pathname === "/create" || router.pathname === `places/${id}/edit`;
  return (
    <HeadlineContainer>
      <Headline>Tourio</Headline>
      {isRoot && 
        <Link href={'/'} passHref legacyBehavior>
          <BackLink justifySelf="start">back</BackLink>
        </Link>
      }
    </HeadlineContainer>
  )
}