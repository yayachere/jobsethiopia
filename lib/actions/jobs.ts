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
  salary?: string
  description: string
  benefits?: string[]
  posted_date: string
  application_deadline: string
  contact_email: string
  company_website?: string
  application_link?: string
  application_address?: string
  experience?: string[]
  skills?: string[]
  introduction?: string
  company_logo?: string
  category?: string
  career_level?: string
  qualification?: string[]
  responsibilities?: string[]
  how_to_apply?: string
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
        benefits,
        posted_date::text,
        application_deadline::text,
        contact_email,
        company_website,
        application_link,
        application_address,
        experience,
        skills,
        introduction,
        company_logo,
        category,
        career_level,
        qualification,
        responsibilities,
        how_to_apply,
        created_at
      FROM jobs 
      ORDER BY created_at DESC
    `

    return jobs.map((job: any) => ({
      id: job.id,
      title: job.title || "",
      company: job.company || "",
      location: job.location || "",
      type: job.type || "Full-time",
      salary: job.salary || null,
      description: job.description || "",
      benefits: Array.isArray(job.benefits) ? job.benefits : [],
      posted_date: job.posted_date || job.created_at,
      application_deadline: job.application_deadline || "",
      contact_email: job.contact_email || "",
      company_website: job.company_website || null,
      application_link: job.application_link || null,
      application_address: job.application_address || null,
      experience: Array.isArray(job.experience) ? job.experience : [],
      skills: Array.isArray(job.skills) ? job.skills : [],
      introduction: job.introduction || null,
      company_logo: job.company_logo || null,
      category: job.category || null,
      career_level: job.career_level || null,
      qualification: Array.isArray(job.qualification) ? job.qualification : [],
      responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities : [],
      how_to_apply: job.how_to_apply || null,
    })) as Job[]
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
        benefits,
        posted_date::text,
        application_deadline::text,
        contact_email,
        company_website,
        application_link,
        application_address,
        experience,
        skills,
        introduction,
        company_logo,
        category,
        career_level,
        qualification,
        responsibilities,
        how_to_apply,
        created_at
      FROM jobs 
      WHERE id = ${id}
    `

    if (jobs.length === 0) {
      return null
    }

    const job = jobs[0]
    return {
      id: job.id,
      title: job.title || "",
      company: job.company || "",
      location: job.location || "",
      type: job.type || "Full-time",
      salary: job.salary || null,
      description: job.description || "",
      benefits: Array.isArray(job.benefits) ? job.benefits : [],
      posted_date: job.posted_date || job.created_at,
      application_deadline: job.application_deadline || "",
      contact_email: job.contact_email || "",
      company_website: job.company_website || null,
      application_link: job.application_link || null,
      application_address: job.application_address || null,
      experience: Array.isArray(job.experience) ? job.experience : [],
      skills: Array.isArray(job.skills) ? job.skills : [],
      introduction: job.introduction || null,
      company_logo: job.company_logo || null,
      category: job.category || null,
      career_level: job.career_level || null,
      qualification: Array.isArray(job.qualification) ? job.qualification : [],
      responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities : [],
      how_to_apply: job.how_to_apply || null,
    } as Job
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
  const companyWebsite = formData.get("companyWebsite") as string
  const applicationLink = formData.get("applicationLink") as string
  const applicationAddress = formData.get("applicationAddress") as string
  const introduction = formData.get("introduction") as string
  const companyLogo = formData.get("companyLogo") as string
  const category = formData.get("category") as string
  const careerLevel = formData.get("careerLevel") as string
  const howToApply = formData.get("howToApply") as string

  // Parse JSON arrays with error handling
  const parseJsonArray = (value: string | null): string[] => {
    try {
      return value ? JSON.parse(value) : []
    } catch {
      return []
    }
  }

  const benefits = parseJsonArray(formData.get("benefits") as string)
  const experience = parseJsonArray(formData.get("experience") as string)
  const skills = parseJsonArray(formData.get("skills") as string)
  const qualification = parseJsonArray(formData.get("qualification") as string)
  const responsibilities = parseJsonArray(formData.get("responsibilities") as string)

  try {
    await sql`
      INSERT INTO jobs (
        title, company, location, type, salary, description, 
        benefits, application_deadline, contact_email, 
        application_link, application_address, company_website, 
        experience, skills, introduction, company_logo, category, career_level,
        qualification, responsibilities, how_to_apply
      ) VALUES (
        ${title}, ${company}, ${location}, ${type}, ${salary}, ${description},
        ${benefits}, ${applicationDeadline}, ${contactEmail},
        ${applicationLink}, ${applicationAddress}, ${companyWebsite}, 
        ${experience}, ${skills}, ${introduction}, ${companyLogo}, ${category}, ${careerLevel},
        ${qualification}, ${responsibilities}, ${howToApply}
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
  const companyWebsite = formData.get("companyWebsite") as string
  const applicationLink = formData.get("applicationLink") as string
  const applicationAddress = formData.get("applicationAddress") as string
  const introduction = formData.get("introduction") as string
  const companyLogo = formData.get("companyLogo") as string
  const category = formData.get("category") as string
  const careerLevel = formData.get("careerLevel") as string
  const howToApply = formData.get("howToApply") as string

  // Parse JSON arrays with error handling
  const parseJsonArray = (value: string | null): string[] => {
    try {
      return value ? JSON.parse(value) : []
    } catch {
      return []
    }
  }

  const benefits = parseJsonArray(formData.get("benefits") as string)
  const experience = parseJsonArray(formData.get("experience") as string)
  const skills = parseJsonArray(formData.get("skills") as string)
  const qualification = parseJsonArray(formData.get("qualification") as string)
  const responsibilities = parseJsonArray(formData.get("responsibilities") as string)

  try {
    await sql`
      UPDATE jobs SET
        title = ${title},
        company = ${company},
        location = ${location},
        type = ${type},
        salary = ${salary},
        description = ${description},
        benefits = ${benefits},
        application_deadline = ${applicationDeadline},
        contact_email = ${contactEmail},
        application_link = ${applicationLink},
        application_address = ${applicationAddress},
        company_website = ${companyWebsite},
        experience = ${experience},
        skills = ${skills},
        introduction = ${introduction},
        company_logo = ${companyLogo},
        category = ${category},
        career_level = ${careerLevel},
        qualification = ${qualification},
        responsibilities = ${responsibilities},
        how_to_apply = ${howToApply},
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
