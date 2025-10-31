import React, { Suspense } from "react";
import ExploreBtn from "../components/ExploreBtn";
import EventCard from "../components/EventCard";
import { IEvent } from "@/database";
import { cacheLife } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const Home = async () => {
  "use cache";
  cacheLife("minutes");

  const response = await fetch(`${BASE_URL}/api/events`);
  const { events } = await response.json();

  console.log(BASE_URL);

  return (
    <section>
      <h1 className="text-center">
        {" "}
        The Hub For Every Dev
        <br /> Event You can't Miss
      </h1>
      <p className="text-center mt-5">
        Hackthons, Meetups, and Conferance, All in One Place
      </p>
      <ExploreBtn />
      <div className="mt-20 space-y-7">
        <h3>Featured Event</h3>
        <ul className="events">
          {events &&
            events.length > 0 &&
            events.map((event: IEvent) => (
              <li key={event.title} className="list-none">
                <EventCard {...event} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};
export default Home;
