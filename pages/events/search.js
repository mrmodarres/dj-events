import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { useRouter } from "next/router";
import Link from "next/link";
export default function Search({ searched }) {
  const router = useRouter();
  const terms = router.query.terms;
  return (
    <Layout>
      <Link href="/events">Go Back</Link>
      <h1>Search for {terms}</h1>
      {searched?.data?.length < 0 ? (
        <h3>No Events to show</h3>
      ) : (
        searched?.data?.map((evt) => <EventItem key={evt.id} evt={evt} />)
      )}
    </Layout>
  );
}

export async function getServerSideProps({ query: terms }) {
  const term = terms.terms;
  const resAll = await fetch(
    `${API_URL}/api/content-type-builder/content-types/api::event.event`
  );
  const data = await resAll.json();
  console.log(data);
  const keys = data.data.schema.attributes;
  const key = [];
  let num = 0;
  for (const titleKey in keys) {
    if (keys[titleKey].type !== "media" && keys[titleKey].type !== "relation") {
      key.push(`&filters[$or][${num}][${titleKey}][$contains]=${term}`);
      num++;
    }
  }

  const newKey = key.join("");
  const res = await fetch(`${API_URL}/api/events?populate=*${newKey}`);
  const events = await res.json();

  return {
    props: { searched: events },
  };
}
