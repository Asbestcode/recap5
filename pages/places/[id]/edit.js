import { useRouter } from 'next/router';
import useSWRMutation from "swr/mutation";
import useSWR from 'swr';
import Form from '../../../components/Form.js';

export default function EditPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: place, isLoading, error } = useSWR(`/api/places/${id}`);

  async function updatePlace(url, { arg }) {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(arg),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      await response.json();
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  const { trigger, isMutating } = useSWRMutation(
    `/api/places/${id}`,
    updatePlace
  );

  async function editPlace(place) {
    await trigger(place);
    router.push(`/places/${id}`);
  }

  if (!isReady || isLoading || error) {return <h2>Loading...</h2>};
  if (isMutating) {return <h2>Submitting your changes...</h2>};

  return (
    <>
      <h2 id="edit-place">Edit Place</h2>
      <Form onSubmit={editPlace} formName={'edit-place'} defaultData={place} />
    </>
  );
}