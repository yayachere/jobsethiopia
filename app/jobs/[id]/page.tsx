"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, DollarSign, Building, Mail, Clock, ExternalLink, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Layout from "@/components/layout"
import { getJobById, getAllJobs, type Job } from "@/lib/actions/jobs"

export default function JobDetailPage() {
  const params = useParams()
  const [job, setJob] = useState<Job | null>(null)
  const [recentJobs, setRecentJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        console.log("Fetching job with ID:", params.id)

        // Fetch current job
        const jobData = await getJobById(params.id as string)
        console.log("Job data:", jobData)

        if (!jobData) {
          setError("Job not found")
          return
        }
        setJob(jobData)

        // Fetch all jobs for recent posts
        console.log("Fetching all jobs...")
        const allJobs = await getAllJobs()
        console.log("All jobs:", allJobs.length, "jobs found")

        // Filter out current job and get 5 most recent
        const recent = allJobs.filter((j) => j.id !== params.id).slice(0, 5)
        console.log("Recent jobs:", recent.length, "jobs found")
        setRecentJobs(recent)
      } catch (error) {
        console.error("Error fetching data:", error)
        setError("Failed to load job details")
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchData()
    }
  }, [params.id])

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch {
      return dateString
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p>Loading job details...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (error || !job) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{error || "Job Not Found"}</h1>
            <Link href="/">
              <Button>Back to Jobs</Button>
            </Link>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Details Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-foreground">{job.title}</CardTitle>
                <div className="flex items-center text-lg text-muted-foreground mb-4">
                  <Building className="h-5 w-5 mr-2" />
                  <span className="font-semibold">{job.company}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{job.location}</span>
                  </div>

                  <div className="flex items-center text-muted-foreground">
                    <Badge variant="secondary" className="mr-2">
                      {job.type}
                    </Badge>
                  </div>

                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>Posted {formatDate(job.posted_date)}</span>
                  </div>

                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>Deadline {formatDate(job.application_deadline)}</span>
                  </div>

                  {job.career_level && (
                    <div className="flex items-center text-muted-foreground">
                      <Badge variant="outline" className="mr-2">
                        {job.career_level}
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Company Logo */}
            {job.company_logo && (
              <Card>
                <CardHeader>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center">
                    <img
                      src={job.company_logo || "/placeholder.svg"}
                      alt={`${job.company} logo`}
                      className="max-w-xs max-h-32 object-contain"
                    />
                  </div>
                </CardContent>
              </Card>
            )}


            {/* Introduction */}
            {job.introduction && (
              <Card>
                <CardHeader>
                  <CardTitle>Introduction</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{job.introduction}</p>
                </CardContent>
              </Card>
            )}

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{job.description}</p>
              </CardContent>
            </Card>

            {/* Qualification */}
            {job.qualification && job.qualification.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Qualification</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {job.qualification.map((qual, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-muted-foreground">{qual}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Responsibilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {job.responsibilities.map((responsibility, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-muted-foreground">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Experience */}
            {job.experience && job.experience.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {job.experience.map((exp, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-muted-foreground">{exp}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Skills */}
            {job.skills && job.skills.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {job.skills.map((skill, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-muted-foreground">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Salary */}
            {job.salary && (
              <Card>
                <CardHeader>
                  <CardTitle>Salary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-muted-foreground">
                    <DollarSign className="h-5 w-5 mr-2" />
                    <span className="text-lg font-semibold">{job.salary}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* How to Apply */}
            <Card>
              <CardHeader>
                <CardTitle>How to Apply</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {job.how_to_apply && (
                  <div>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{job.how_to_apply}</p>
                    <Separator className="my-4" />
                  </div>
                )}

                {job.contact_email && (
                  <div className="flex items-center text-muted-foreground">
                    <Mail className="h-4 w-4 mr-2" />
                    <span className="text-sm">{job.contact_email}</span>
                  </div>
                )}

                {job.application_link && (
                  <div>
                    <Button className="w-full" size="lg" asChild>
                      <a href={job.application_link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Apply for this Job
                      </a>
                    </Button>
                    <p className="text-xs text-gray-500 text-center mt-2">
                      You will be redirected to the company's application page
                    </p>
                  </div>
                )}

                {job.application_address && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Application Address:</h4>
                    <p className="text-muted-foreground text-sm">{job.application_address}</p>
                  </div>
                )}

                {job.company_website && (
                  <div>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <a href={job.company_website} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4 mr-2" />
                        Visit Company Website
                      </a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent Posts Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Recent Job Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentJobs.length > 0 ? (
                    recentJobs.map((recentJob) => (
                      <div key={recentJob.id} className="border-b pb-4 last:border-b-0">
                        <Link href={`/jobs/${recentJob.id}`}>
                          <div className="block hover:bg-gray-50 p-2 rounded transition-colors cursor-pointer">
                            <h4 className="font-semibold text-sm mb-1 text-gray-600 hover:text-blue-600 line-clamp-2">
                              {recentJob.title}
                            </h4>
                            <p className="text-xs text-gray-600 mb-2">{recentJob.company}</p>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-gray-500 flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {recentJob.location}
                              </span>
                              <Badge variant="secondary" className="text-xs">
                                {recentJob.type}
                              </Badge>
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>Posted {formatDate(recentJob.posted_date)}</span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-gray-500 mb-2">No recent jobs available</p>
                      <p className="text-xs text-gray-400">Check back later for new job postings</p>
                    </div>
                  )}

                  <div className="pt-4 border-t">
                    <Link href="/">
                      <Button variant="outline" className="w-full text-sm bg-transparent">
                        View All Jobs
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}
