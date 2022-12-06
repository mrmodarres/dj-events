import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import Link from "next/link";

export default function Home({ events }) {
  const evts = events.data;

  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {evts.length === 0 ? (
        <h3>No Events to show</h3>
      ) : (
        evts.map((evt) => <EventItem key={evt.id} evt={evt} />)
      )}
      {evts.length > 0 && (
        <Link href="/events" className="btn-secondary">
          View All Events
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `${API_URL}/api/events?populate=*&pagination[start]=0&pagination[limit]=3`
  );
  const events = await res.json();

  return {
    props: { events: events },
    // revalidate: 1,
  };
}
