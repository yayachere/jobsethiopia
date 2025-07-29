"use client"

import { useState, useEffect } from "react"
import Head from "next/head"
import { Search, Filter, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Layout from "@/components/layout"
import JobCard from "@/components/job-card"
import Pagination from "@/components/pagination"
import { getAllJobs, type Job } from "@/lib/actions/jobs"

const JOBS_PER_PAGE = 20

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsData = await getAllJobs()
        setJobs(jobsData)
      } catch (error) {
        console.error("Error fetching jobs:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, locationFilter, typeFilter])

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesLocation =
      locationFilter === "all" ||
      job.location.toLowerCase().includes(locationFilter.toLowerCase())

    const matchesType =
      typeFilter === "all" || job.type.toLowerCase() === typeFilter.toLowerCase()

    return matchesSearch && matchesLocation && matchesType
  })

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE)
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE
  const endIndex = startIndex + JOBS_PER_PAGE
  const currentJobs = filteredJobs.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const uniqueLocations = Array.from(new Set(jobs.map((job) => job.location)))
  const uniqueTypes = Array.from(new Set(jobs.map((job) => job.type)))

  return (
    <Layout>
      <Head>
        <title>JobsEthiopia – Latest Jobs in Ethiopia</title>
        <meta
          name="description"
          content="Explore the latest job vacancies in Ethiopia. Find your dream job in Addis Ababa and across Ethiopia with JobsEthiopia."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="JobsEthiopia – Latest Jobs in Ethiopia" />
        <meta
          property="og:description"
          content="Discover new opportunities from top companies in Ethiopia."
        />
        <meta property="og:url" content="https://jobsethiopia.vercel.app/" />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "JobsEthiopia",
              url: "https://jobsethiopia.vercel.app/",
              description:
                "Find your dream job in Ethiopia. Search thousands of fresh vacancies daily.",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://jobsethiopia.vercel.app/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </Head>

      <main aria-labelledby="main-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <header className="text-center mb-12">
            <h1 id="main-heading" className="text-4xl font-bold text-foreground mb-4">
              Find Your Dream Job
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover amazing opportunities from top companies in Ethiopia. Start your
              career journey today.
            </p>
          </header>

          {/* Search & Filter */}
          <section
            className="bg-card rounded-lg shadow-sm border border-border p-6 mb-8"
            aria-label="Search and filters"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    aria-label="Search jobs"
                    placeholder="Search jobs, companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {uniqueLocations.map((loc) => (
                    <SelectItem key={loc} value={loc.toLowerCase()}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {uniqueTypes.map((type) => (
                    <SelectItem key={type} value={type.toLowerCase()}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </section>

          {/* Job Results */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin w-8 h-8 text-primary" aria-label="Loading jobs" />
            </div>
          ) : (
            <>
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-2">
                    {filteredJobs.length} Job{filteredJobs.length !== 1 ? "s" : ""} Found
                  </h2>
                  <p className="text-muted-foreground">
                    Browse through our latest job openings
                  </p>
                </div>
                {totalPages > 1 && (
                  <div className="mt-4 sm:mt-0 text-sm text-muted-foreground">
                    Showing {startIndex + 1}-{Math.min(endIndex, filteredJobs.length)} of{" "}
                    {filteredJobs.length} jobs
                  </div>
                )}
              </div>

              {currentJobs.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {currentJobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              ) : (
                <div className="text-center py-12">
                  <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No jobs found</h3>
                  <p className="text-muted-foreground">Try adjusting your search criteria</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </Layout>
  )
}
