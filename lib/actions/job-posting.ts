"use server"

import sql from "@/lib/db"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export interface JobPostingData {
  category: string
  howToApply: string
  companyName: string
  deadline: string
  introduction: string
  description: string
  email: string
  website: string
  applicationAddress: string
  companyLogo?: string | null
  positions: {
    jobTitle: string
    qualifications: string[]
    responsibilities: string[]
    applicationLink: string
    location: string
    jobType: string
    salary: string
    benefits: string[]
    skills: string[]
    experience: string[]
    careerLevel: string
  }[]
}

function arrayToPostgresArray(arr: string[]): string {
  if (!arr || arr.length === 0) return "{}"
  const filtered = arr.filter((item) => item && item.trim() !== "")
  if (filtered.length === 0) return "{}"
  // Escape quotes and wrap in PostgreSQL array format
  const escaped = filtered.map((item) => `"${item.replace(/"/g, '\\"')}"`)
  return `{${escaped.join(",")}}`
}

export async function createJobPosting(data: JobPostingData) {
  const session = await getSession()
  if (!session) {
    redirect("/login")
  }

  if (!data.companyName?.trim()) {
    return {
      success: false,
      error: "Company name is required and cannot be empty",
    }
  }

  if (!data.description?.trim()) {
    return {
      success: false,
      error: "Job description is required and cannot be empty",
    }
  }

  if (!data.deadline) {
    return {
      success: false,
      error: "Application deadline is required",
    }
  }

  // Validate positions with more detailed messages
  for (let i = 0; i < data.positions.length; i++) {
    const position = data.positions[i]
    if (!position.jobTitle?.trim()) {
      return {
        success: false,
        error: `Job title is required for position ${i + 1}`,
      }
    }
    if (!position.jobType) {
      return {
        success: false,
        error: `Job type is required for position ${i + 1}`,
      }
    }
    if (!position.careerLevel) {
      return {
        success: false,
        error: `Career level is required for position ${i + 1}`,
      }
    }
    if (position.qualifications.every((q) => !q.trim())) {
      return {
        success: false,
        error: `At least one qualification is required for position ${i + 1}`,
      }
    }
  }

  try {
    // Insert each position as a separate job entry
    const results = []

    for (const position of data.positions) {
      let processedLogo = data.companyLogo
      if (processedLogo) {
        // Ensure the logo is properly formatted as a data URL
        if (!processedLogo.startsWith("data:image/")) {
          processedLogo = `data:image/jpeg;base64,${processedLogo}`
        }
        console.log("Processing company logo for job:", position.jobTitle, "Logo length:", processedLogo.length)
      }

      const qualificationsArray = arrayToPostgresArray(position.qualifications)
      const responsibilitiesArray = arrayToPostgresArray(position.responsibilities)
      const benefitsArray = arrayToPostgresArray(position.benefits)
      const experienceArray = arrayToPostgresArray(position.experience)
      const skillsArray = arrayToPostgresArray(position.skills)

      const result = await sql`
        INSERT INTO jobs (
          title, 
          company, 
          location, 
          type, 
          salary, 
          description, 
          qualification, 
          responsibilities,
          benefits, 
          application_deadline, 
          contact_email, 
          application_link, 
          application_address, 
          company_website, 
          experience, 
          skills, 
          introduction,
          category,
          career_level,
          how_to_apply,
          company_logo
        ) VALUES (
          ${position.jobTitle},
          ${data.companyName},
          ${position.location},
          ${position.jobType},
          ${position.salary},
          ${data.description},
          ${qualificationsArray},
          ${responsibilitiesArray},
          ${benefitsArray},
          ${data.deadline},
          ${data.email},
          ${position.applicationLink || ""},
          ${data.applicationAddress || ""},
          ${data.website || ""},
          ${experienceArray},
          ${skillsArray},
          ${data.introduction || ""},
          ${data.category || ""},
          ${position.careerLevel || ""},
          ${data.howToApply || ""},
          ${processedLogo}
        )
        RETURNING id, company_logo
      `

      console.log("Job created with ID:", result[0].id, "Logo saved:", !!result[0].company_logo)
      results.push(result[0])
    }

    revalidatePath("/")
    revalidatePath("/admin")

    return {
      success: true,
      message: `🎉 Successfully created ${results.length} job posting${results.length > 1 ? "s" : ""}${results.some((r) => r.company_logo) ? " with company logo" : ""}!`,
      jobIds: results.map((r) => r.id),
    }
  } catch (error) {
    console.error("Error creating job posting:", error)
    return {
      success: false,
      error: "Failed to create job posting. Please check your data and try again.",
    }
  }
}

export async function saveDraftJobPosting(data: JobPostingData) {
  const session = await getSession()
  if (!session) {
    redirect("/login")
  }

  try {
    // Save drafts to the job_drafts table
    const results = []

    for (const position of data.positions) {
      let processedLogo = data.companyLogo
      if (processedLogo) {
        if (!processedLogo.startsWith("data:image/")) {
          processedLogo = `data:image/jpeg;base64,${processedLogo}`
        }
        console.log("Processing company logo for draft:", position.jobTitle, "Logo length:", processedLogo.length)
      }

      const qualificationsArray = arrayToPostgresArray(position.qualifications)
      const benefitsArray = arrayToPostgresArray(position.benefits)
      const experienceArray = arrayToPostgresArray(position.experience)
      const skillsArray = arrayToPostgresArray(position.skills)

      const result = await sql`
        INSERT INTO job_drafts (
          title, 
          company, 
          location, 
          type, 
          salary, 
          description, 
          requirements, 
          benefits, 
          application_deadline, 
          contact_email, 
          application_link, 
          application_address, 
          company_website, 
          education, 
          experience, 
          skills, 
          introduction,
          category,
          how_to_apply,
          career_level,
          company_logo
        ) VALUES (
          ${position.jobTitle},
          ${data.companyName},
          ${position.location},
          ${position.jobType},
          ${position.salary},
          ${data.description},
          ${qualificationsArray},
          ${benefitsArray},
          ${data.deadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]},
          ${data.email},
          ${position.applicationLink || ""},
          ${data.applicationAddress || ""},
          ${data.website || ""},
          ${"{}"},
          ${experienceArray},
          ${skillsArray},
          ${data.introduction || ""},
          ${data.category || ""},
          ${data.howToApply || ""},
          ${position.careerLevel || ""},
          ${processedLogo}
        )
        RETURNING id, company_logo
      `

      console.log("Draft created with ID:", result[0].id, "Logo saved:", !!result[0].company_logo)
      results.push(result[0])
    }

    return {
      success: true,
      message: `💾 Successfully saved ${results.length} draft${results.length > 1 ? "s" : ""}${results.some((r) => r.company_logo) ? " with company logo" : ""}!`,
      draftIds: results.map((r) => r.id),
    }
  } catch (error) {
    console.error("Error saving draft:", error)
    return {
      success: false,
      error: "Failed to save draft. Please check your data and try again.",
    }
  }
}

// Get all drafts
export async function getAllDrafts() {
  const session = await getSession()
  if (!session) {
    redirect("/login")
  }

  try {
    const drafts = await sql`
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
        application_deadline::text,
        contact_email,
        company_website,
        application_link,
        application_address,
        education,
        experience,
        skills,
        introduction,
        category,
        how_to_apply,
        career_level,
        company_logo,
        created_at::text,
        updated_at::text
      FROM job_drafts 
      ORDER BY created_at DESC
    `
    return drafts
  } catch (error) {
    console.error("Error fetching drafts:", error)
    return []
  }
}

// Delete draft
export async function deleteDraft(id: string) {
  const session = await getSession()
  if (!session) {
    redirect("/login")
  }

  try {
    await sql`DELETE FROM job_drafts WHERE id = ${id}`
    return { success: true }
  } catch (error) {
    console.error("Error deleting draft:", error)
    return { error: "Failed to delete draft" }
  }
}
