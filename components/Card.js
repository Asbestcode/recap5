import Link from "next/link.js";
import styled from "styled-components";
import Picture from "./Picture.js";

const Article = styled.article`
  border: 1px solid black;
  border-radius: 0.8rem;
  padding: 0.5rem;
`;

const Figure = styled.div`
  position: relative;
  margin: 0;
`;

const FigCaption = styled.div`
  margin: 0;
  position: absolute;
  color: white;
  bottom: 15px;
  left: 12px;
  text-shadow: 0 0 20px #000, 0 0 10px #000, 0 0 3px #000;
`;

const Anchor = styled.a`
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

const ScreenReaderOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;

export default function Card({ name, image, location, id }) {
  return (
    <Article>
      <Figure>
        <Picture image={image} name={name}/>
        <FigCaption>{name}, {location}</FigCaption>
      </Figure>
      <Link href={`places/${id}`} passHref legacyBehavior>
        <Anchor>
          <ScreenReaderOnly>More Info</ScreenReaderOnly>
        </Anchor>
      </Link>
    </Article>
  );
}
