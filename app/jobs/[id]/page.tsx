"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, DollarSign, Building, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Layout from "@/components/layout"
import { getJobById, type Job } from "@/lib/actions/jobs"

export default function JobDetailPage() {
  const params = useParams()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobData = await getJobById(params.id as string)
        setJob(jobData)
      } catch (error) {
        console.error("Error fetching job:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchJob()
  }, [params.id])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
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

  if (!job) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </Link>

        {/* Job Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl font-bold text-foreground mb-4">{job.title}</CardTitle>
                <div className="flex items-center text-lg text-muted-foreground mb-4">
                  <Building className="h-5 w-5 mr-2" />
                  <span className="font-semibold">{job.company}</span>
                </div>
              </div>
              <Badge variant="secondary" className="text-sm px-3 py-1">
                {job.type}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{job.location}</span>
              </div>

              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-5 w-5 mr-2" />
                <span>Deadline {job.application_deadline}</span>
              </div>

              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-5 w-5 mr-2" />
                <span>Posted {formatDate(job.posted_date)}</span>
              </div>
            </div>
          </CardHeader>
        </Card>
            {/* Job Introduction */}
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

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{job.description}</p>
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.education && job.education.map((education, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-muted-foreground">{education}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-muted-foreground">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardHeader>
                <CardTitle>Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.experience && job.experience.map((experience, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-muted-foreground">{experience}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

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
                      <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-muted-foreground">{skill}</span>
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

            {/* Apply Card */}
            <Card>
                <CardHeader>
                  <CardTitle>Apply Now</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm">Deadline: {formatDate(job.application_deadline)}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    <span className="text-sm">{job.contact_email}</span>
                  </div>

                  <Separator />
                  
                {job.application_link && (
                  <>
                    <Button className="w-full" size={"lg"}>
                      <a href={job.application_link} className="w-full btn btn-lg" target="_blank" rel="noopener noreferrer">
                        Apply for this Job
                      </a>
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      You will be redirected to the company's application page
                    </p>
                  </>
                )}
                </CardContent>
            </Card>
            
            {/* Appllication Address */}
            {job.application_address && (
              <Card>
                <CardHeader>
                  <CardTitle>Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{job.application_address}</p>
                </CardContent>
              </Card>
            )}

            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle>About {job.company}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">Learn more about this company and their other job openings.</p>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  <a href={job.company_website} className="w-full btn btn-lg" target="_blank" rel="noopener noreferrer">
                    View Company Profile
                  </a>
                </Button>
              </CardContent>
            </Card>

      </div>
    </Layout>
  )
}
