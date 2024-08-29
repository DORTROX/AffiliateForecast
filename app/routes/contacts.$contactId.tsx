import { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";


export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.contactId, "contactId is required");
  if (!params.contactId) {
    throw new Response("Not Found", { status: 404 });
  }
  return { contact: { id: params.contactId } };
};

export default function contacts() {
  const { contact } = useLoaderData<typeof loader>();
  return (
    <div>
      <p>Hello, {contact.id}</p>
    </div>
  );
}
