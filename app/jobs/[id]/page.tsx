// app/jobs/[id]/page.tsx

import { getJobById, getAllJobs, type Job } from "@/lib/actions/jobs"
import Layout from "@/components/layout"
import Link from "next/link"
import { Metadata } from "next"

interface JobDetailPageProps {
  params: { id: string }
}

export async function generateStaticParams() {
  const jobs = await getAllJobs()
  return jobs.map((job) => ({ id: job.id }))
}

export async function generateMetadata({ params }: JobDetailPageProps): Promise<Metadata> {
  const job = await getJobById(params.id)
  return {
    title: `${job?.title} at ${job?.company} | JobsEthiopia`,
    description: job?.description?.slice(0, 160),
  }
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const job = await getJobById(params.id)
  const allJobs = await getAllJobs()
  const recentJobs = allJobs.filter(j => j.id !== params.id).slice(0, 5)

  if (!job) {
    return (
      <Layout>
        <main className="py-20 text-center">
          <h1 className="text-3xl font-bold text-destructive">Job Not Found</h1>
          <p className="text-muted-foreground mt-4">The job you're looking for does not exist.</p>
        </main>
      </Layout>
    )
  }

  const renderListOrParagraph = (data: string | string[]) => {
    if (Array.isArray(data)) {
      return (
        <ul className="list-disc pl-6 text-base text-muted-foreground space-y-1">
          {data.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      )
    }
    return <p className="text-base text-muted-foreground whitespace-pre-line">{data}</p>
  }

  return (
    <Layout>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <article aria-labelledby="job-title">
          <header className="mb-10 border-b pb-6">
            <h1 id="job-title" className="text-4xl font-extrabold text-primary mb-2">
              {job.title}
            </h1>
            <div className="text-lg text-muted-foreground">
              <p>{job.company} • {job.location} • {job.type}</p>
              <p className="text-sm mt-1">
                📅 Posted: {new Date(job.posted_date).toLocaleDateString()} | 🕒 Deadline: {new Date(job.application_deadline).toLocaleDateString()}
              </p>
            </div>
          </header>

          <section className="space-y-10">
            {job.introduction && (
              <div className="bg-muted/30 p-6 rounded-xl">
                <h2 className="text-2xl font-semibold mb-2">👋 Introduction</h2>
                <p className="text-base text-muted-foreground whitespace-pre-line">{job.introduction}</p>
              </div>
            )}

            {job.description && (
              <div className="bg-background p-6 border rounded-xl">
                <h2 className="text-2xl font-semibold mb-2">📝 Job Description</h2>
                <p className="text-base text-muted-foreground whitespace-pre-line">{job.description}</p>
              </div>
            )}

            {job.requirements && (
              <div className="bg-muted/30 p-6 rounded-xl">
                <h2 className="text-2xl font-semibold mb-2">✅ Requirements</h2>
                {renderListOrParagraph(job.requirements)}
              </div>
            )}

            {job.education && (
              <div className="bg-background p-6 border rounded-xl">
                <h2 className="text-2xl font-semibold mb-2">🎓 Education</h2>
                {renderListOrParagraph(job.education)}
              </div>
            )}

            {job.experience && (
              <div className="bg-muted/30 p-6 rounded-xl">
                <h2 className="text-2xl font-semibold mb-2">💼 Experience</h2>
                {renderListOrParagraph(job.experience)}
              </div>
            )}

            {Array.isArray(job.skills) && job.skills.length > 0 && (
              <div className="bg-muted/30 p-6 rounded-xl">
                <h2 className="text-2xl font-semibold mb-2">🧠 Skills</h2>
                <ul className="list-disc pl-6 text-base text-muted-foreground space-y-1">
                  {job.skills.map((skill, idx) => (
                    <li key={idx}>{skill}</li>
                  ))}
                </ul>
              </div>
            )}

            {Array.isArray(job.benefits) && job.benefits.length > 0 && (
              <div className="bg-muted/30 p-6 rounded-xl">
                <h2 className="text-2xl font-semibold mb-2">🎁 Job Benefits</h2>
                <ul className="list-disc pl-6 text-base text-muted-foreground space-y-1">
                  {job.benefits.map((benefit, idx) => (
                    <li key={idx}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}

            {job.salary && (
              <div className="bg-muted/30 p-6 rounded-xl">
                <h2 className="text-2xl font-semibold mb-2">💵 Salary</h2>
                {renderListOrParagraph(job.salary)}
              </div>
            )}

            {(job.application_link || job.application_address) && (
              <div className="bg-background p-6 border rounded-xl">
                <h2 className="text-2xl font-semibold mb-2">📨 How to Apply</h2>
                {job.application_link && (
                  <a href={job.application_link} target="_blank" rel="noopener noreferrer">
                    <button className="mt-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition">
                      Apply Now
                    </button>
                  </a>
                )}
                {job.application_address && (
                  <p className="text-base text-muted-foreground whitespace-pre-line mt-3">{job.application_address}</p>
                )}
              </div>
            )}
          </section>
        </article>

        <section className="mt-14">
          <h2 className="text-2xl font-bold text-primary mb-4">🕵️‍♂️ Recent Posts</h2>
          <div className="space-y-4">
            {recentJobs.map((rj) => (
              <div key={rj.id} className="border p-4 rounded-lg bg-muted/10">
                <h3 className="text-lg font-semibold text-primary">{rj.title}</h3>
                <p className="text-sm text-muted-foreground">{rj.company}</p>
                <Link href={`/jobs/${rj.id}`} className="text-blue-600 underline text-sm mt-1 inline-block">View Details</Link>
              </div>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  )
}
