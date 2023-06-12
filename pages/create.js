import Link from 'next/link.js';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Form from '../components/Form.js';
import { StyledLink } from '../components/StyledLink.js';

const StyledBackLink = styled(StyledLink)`
  justify-self: flex-start;
`;

export default function CreatePlacePage() {
  const router = useRouter();

  async function addPlace(place) {
    const response = await fetch("/api/places", {
      method: "POST",
      body: JSON.stringify(place),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      router.push("/");
    }
  }

  return (
    <>
      <h2 id="add-place">Add Place</h2>
      <Form onSubmit={addPlace} formName={'add-place'} />
    </>
  );
}
