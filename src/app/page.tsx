import FilterBox from "@/components/FilterBox";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import JobListed from "@/components/JobListed";
import { JobProvider } from "@/context/JobFilter";
export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <JobProvider>
        <FilterBox />
        <JobListed />
      </JobProvider>
    </div>
  );
}
