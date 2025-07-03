"use server"

import sql from "@/lib/db"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"

export interface Job {
  id: string
  title: string
  company: string
  location: string
  type: string
  salary: string
  description: string
  requirements: string[]
  benefits: string[]
  posted_date: string
  application_deadline: string
  contact_email: string
  company_website?: string // Optional field for job website
  application_link?: string // Optional field for job application link
  application_address?: string // Optional field for job application address
  education?: string[]
  experience?: string[]
  skills?: string[]
  introduction?: string // Optional field for job introduction
}

export async function getAllJobs(): Promise<Job[]> {
  try {
    const jobs = await sql`
      SELECT 
        id::text,
        title,
        company,
        location,
        type,
        salary,
        description,
        requirements,
        benefits,
        posted_date::text,
        application_deadline::text,
        contact_email,
        company_website,
        application_link,
        application_address,
        education,
        experience,
        skills,
        introduction
      FROM jobs 
      ORDER BY created_at DESC
    `
    return jobs as Job[]
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return []
  }
}

export async function getJobById(id: string): Promise<Job | null> {
  try {
    const jobs = await sql`
      SELECT 
        id::text,
        title,
        company,
        location,
        type,
        salary,
        description,
        requirements,
        benefits,
        posted_date::text,
        application_deadline::text,
        contact_email,
        company_website,
        application_link,
        application_address,
        education,
        experience,
        skills,
        introduction
      FROM jobs 
      WHERE id = ${id}
    `
    return (jobs[0] as Job) || null
  } catch (error) {
    console.error("Error fetching job:", error)
    return null
  }
}

export async function createJob(formData: FormData) {
  const session = await getSession()
  if (!session) {
    redirect("/login")
  }

  const title = formData.get("title") as string
  const company = formData.get("company") as string
  const location = formData.get("location") as string
  const type = formData.get("type") as string
  const salary = formData.get("salary") as string
  const description = formData.get("description") as string
  const applicationDeadline = formData.get("applicationDeadline") as string
  const contactEmail = formData.get("contactEmail") as string
  const companyWebsite = formData.get("companyWebsite") as string // Optional field for job website
  const applicationLink = formData.get("applicationLink") as string // Optional field for job application link
  const applicationAddress = formData.get("applicationAddress") as string // Optional field for job
  const introduction = formData.get("introduction") as string // Optional field for job introduction

  // Parse requirements and benefits from JSON strings
  const requirements = JSON.parse((formData.get("requirements") as string) || "[]")
  const benefits = JSON.parse((formData.get("benefits") as string) || "[]")
  const experience = JSON.parse((formData.get("experience") as string) || "[]")
  const education = JSON.parse((formData.get("education") as string) || "[]")
  const skills = JSON.parse((formData.get("skills") as string) || "[]")

  try {
    await sql`
      INSERT INTO jobs (
        title, company, location, type, salary, description, 
        requirements, benefits, application_deadline, contact_email, 
        application_link, application_address, company_website, education, 
        experience, skills, introduction
      ) VALUES (
        ${title}, ${company}, ${location}, ${type}, ${salary}, ${description},
        ${requirements}, ${benefits}, ${applicationDeadline}, ${contactEmail},
        ${applicationLink}, ${applicationAddress}, ${companyWebsite}, ${education}, 
        ${experience}, ${skills}, ${introduction}
      )
    `
    return { success: true }
  } catch (error) {
    console.error("Error creating job:", error)
    return { error: "Failed to create job" }
  }
}

export async function updateJob(id: string, formData: FormData) {
  const session = await getSession()
  if (!session) {
    redirect("/login")
  }

  const title = formData.get("title") as string
  const company = formData.get("company") as string
  const location = formData.get("location") as string
  const type = formData.get("type") as string
  const salary = formData.get("salary") as string
  const description = formData.get("description") as string
  const applicationDeadline = formData.get("applicationDeadline") as string
  const contactEmail = formData.get("contactEmail") as string
  const companyWebsite = formData.get("companyWebsite") as string // Optional field for job website
  const applicationLink = formData.get("applicationLink") as string // Optional field for job application link
  const applicationAddress = formData.get("applicationAddress") as string // Optional field for job application address
  const introduction = formData.get("introduction") as string // Optional field for job introduction

  const requirements = JSON.parse((formData.get("requirements") as string) || "[]")
  const benefits = JSON.parse((formData.get("benefits") as string) || "[]")
  const experience = JSON.parse((formData.get("experience") as string) || "[]")
  const education = JSON.parse((formData.get("education") as string) || "[]")
  const skills = JSON.parse((formData.get("skills") as string) || "[]")

  try {
    await sql`
      UPDATE jobs SET
        title = ${title},
        company = ${company},
        location = ${location},
        type = ${type},
        salary = ${salary},
        description = ${description},
        requirements = ${requirements},
        benefits = ${benefits},
        application_deadline = ${applicationDeadline},
        contact_email = ${contactEmail},
        application_link = ${applicationLink},
        application_address = ${applicationAddress},
        company_website = ${companyWebsite},
        education = ${education},
        experience = ${experience},
        skills = ${skills},
        introduction = ${introduction},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
    `
    return { success: true }
  } catch (error) {
    console.error("Error updating job:", error)
    return { error: "Failed to update job" }
  }
}

export async function deleteJob(id: string) {
  const session = await getSession()
  if (!session) {
    redirect("/login")
  }

  try {
    await sql`DELETE FROM jobs WHERE id = ${id}`
    return { success: true }
  } catch (error) {
    console.error("Error deleting job:", error)
    return { error: "Failed to delete job" }
  }
}
