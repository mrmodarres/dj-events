import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import Pagination from "@/components/Pagination";
import { API_URL } from "@/config/index";
import { PER_PAGE } from "@/config/index";
import Link from "next/link";
export default function EventsPage({ events }) {
  console.log(events);
  const { page, pageCount, total } = events.meta.pagination;
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.data.length === 0 ? (
        <h3>No Events to show</h3>
      ) : (
        events.data.map((evt) => <EventItem key={evt.id} evt={evt} />)
      )}
      <Pagination page={page} pageCount={pageCount} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const start = +page;
  const res = await fetch(
    `${API_URL}/api/events?populate=image&_sort=date:ASC&pagination[page]=${start}&pagination[pageSize]=${PER_PAGE}&`
  );
  const events = await res.json();
  return {
    props: { events },
  };
}
