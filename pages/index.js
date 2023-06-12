import styled from 'styled-components';
import Card from '../components/Card.js';
import useSWR from 'swr';
import Link from 'next/link.js';
import { StyledLink } from '../components/StyledLink.js';

const List = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(max(300px,40vw), 1fr));
  grid-gap: 1.5rem 1.5rem;
  padding-left: 0;
  padding-top: 0;
  padding-inline-start: 0px;
  margin-block-start: 0;
  margin-block-end: 1.5rem;
`;
const ListItem = styled.li`
  position: relative;
  width: 100%;
`;
const LinkContainer = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;
export default function Home() {
  const { data } = useSWR('/api/places', { fallbackData: [] });
  
  async function resetPlaces() {
    const confirmation = confirm("Are you sure you want to reset all places?");
    if (confirmation) {
      const response = await fetch(`/api/places`, {
        method: "DELETE",
      });
      if (response.ok) {
        await response.json();
      } else {
        console.error(`Error: ${response.status}`);
      }
    }
  }

  return (
    <>
      <List role="list">
        {data.map((place) => {
          return (
            <ListItem key={place._id}>
              <Card
                name={place.name}
                image={place.image}
                location={place.location}
                id={place._id}
              />
            </ListItem>
          );
        })}
      </List>
      <LinkContainer>
        <Link href="/create" passHref legacyBehavior>
          <StyledLink>+ place</StyledLink>
        </Link>
        <StyledLink onClick={resetPlaces}>
          ↺ reset
        </StyledLink>
      </LinkContainer>
    </>
  );
}
