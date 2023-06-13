import Link from 'next/link';
import { useRouter } from 'next/router.js';
import useSWR from 'swr';
import styled from 'styled-components';
import { StyledLink } from '../../../components/StyledLink.js';
import { StyledButton } from '../../../components/StyledButton.js';
import Picture from '../../../components/Picture.js'
// import { getPlaiceholder } from "plaiceholder";

// export async function getStaticPaths() {
  // const response = await fetch(`/api/places`, {
  //   method: "GET",
  // });
  // const paths = response.map((entry) => {

  // })
  // console.log(response);
  // return {
  //   paths: [
      // String variant:
      // '/blog/first-post',
      // Object variant:
      // { params: { id:'648772493351f6b5b27d7fed' } },
//     ],
//     fallback: true,
//   }
// }

// export async function getStaticProps() {
//   const src = "https://images.unsplash.com/photo-1621961458348-f013d219b50c";
//   const buffer = await fetch(src).then(async (res) =>
//     Buffer.from(await res.arrayBuffer())
//   );
//   const { svg } = await getPlaiceholder(buffer);
//   return {
//     props: {
//       svg
//     },
//   }
// }

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const ButtonContainer = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  & > * {
    flex-grow: 1;
    text-align: center;
  }
`;

const StyledLocationLink = styled(StyledLink)`
  text-align: center;
  background-color: white;
  border: 3px solid lightsalmon;
`;

const NoLink = styled.a`
  background-color: grey;
  padding: 0.8rem 1.5rem;
  border: 3px solid lightgrey;
  border-radius: 0.6rem;
  color: black;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
`;

const LoadingScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  font-size: 5rem;
  font-weight: bold;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center
  color: white;
  z-index: 0;
`

export default function DetailsPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

  const { data: place, isLoading, error } = useSWR(`/api/places/${id}`);
  if (!isReady || isLoading || error) return <LoadingScreen>Loading...</LoadingScreen>;

  async function deletePlace() {
    const confirmation = confirm("Are you sure you want to delete this place?");
    if (confirmation) {
      const response = await fetch(`/api/places/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await response.json();
        router.push("/");
      } else {
        console.error(`Error: ${response.status}`);
      }
    }
  }
  
  const isGoogleMapURL = 
    place.mapURL.includes("https://www.google.com/maps/place/") || place.mapURL.includes("https://goo.gl/maps/");

  return (
    <PageContainer>
      <Picture image={place.image} name={place.name} />
      <h2 style={{ margin: "0" }}>
        {place.name}, {place.location}
      </h2>
      <p style={{ margin: "0" }}>
        {place.description}
      </p>
      {isGoogleMapURL
        ? <Link href={place.mapURL} passHref legacyBehavior>
            <StyledLocationLink>Location on Google Maps</StyledLocationLink>
          </Link>
        : <NoLink>Location on Google Maps</NoLink>
      }
      <ButtonContainer>
        <Link href={`/places/${id}/edit`} passHref legacyBehavior>
          <StyledButton>Edit</StyledButton>
        </Link>
        <StyledButton onClick={deletePlace} type="button" variant="delete">
          Delete
        </StyledButton>
      </ButtonContainer>
    </PageContainer>
  );
}
