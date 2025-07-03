"use client"

import type React from "react"
import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { X, Plus } from "lucide-react"
import { createJob, updateJob, type Job } from "@/lib/actions/jobs"

interface JobFormProps {
  job?: Job
  onSuccess: () => void
}

export default function JobForm({ job, onSuccess }: JobFormProps) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    title: job?.title || "",
    company: job?.company || "",
    location: job?.location || "",
    type: job?.type || "",
    salary: job?.salary || "",
    description: job?.description || "",
    requirements: job?.requirements || [""],
    benefits: job?.benefits || [""],
    applicationDeadline: job?.application_deadline || "",
    contactEmail: job?.contact_email || "",
    companyWebsite: job?.company_website || "",
    applicationLink: job?.application_link || "",
    applicationAddress: job?.application_address || "",
    education: job?.education || [""],
    experience: job?.experience || [""],
    skills: job?.skills || [""],
    introduction: job?.introduction || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const form = new FormData()
    form.append("title", formData.title)
    form.append("company", formData.company)
    form.append("location", formData.location)
    form.append("type", formData.type)
    form.append("salary", formData.salary)
    form.append("description", formData.description)
    form.append("applicationDeadline", formData.applicationDeadline)
    form.append("contactEmail", formData.contactEmail)
    form.append("requirements", JSON.stringify(formData.requirements.filter((req) => req.trim() !== "")))
    form.append("benefits", JSON.stringify(formData.benefits.filter((benefit) => benefit.trim() !== "")))
    form.append("companyWebsite", formData.companyWebsite)
    form.append("applicationLink", formData.applicationLink)
    form.append("applicationAddress", formData.applicationAddress)
    form.append("education", JSON.stringify(formData.education.filter((edu) => edu.trim() !== "")))
    form.append("experience", JSON.stringify(formData.experience.filter((exp) => exp.trim() !== "")))
    form.append("skills", JSON.stringify(formData.skills.filter((skill) => skill.trim() !== "")))
    form.append("introduction", job?.introduction || "") // Optional field for job introduction

    startTransition(async () => {
      try {
        let result
        if (job) {
          result = await updateJob(job.id, form)
        } else {
          result = await createJob(form)
        }

        if (result?.error) {
          setError(result.error)
        } else {
          onSuccess()
        }
      } catch (err) {
        setError("An unexpected error occurred")
      }
    })
  }

  const addRequirement = () => {
    setFormData((prev) => ({
      ...prev,
      requirements: [...prev.requirements, ""],
    }))
  }

  const removeRequirement = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }))
  }

  const updateRequirement = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.map((req, i) => (i === index ? value : req)),
    }))
  }

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [...prev.experience, ""],
    }))
  }

  const removeExperience = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }))
  }

  const updateExperience = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.map((req, i) => (i === index ? value : req)),
    }))
  }

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, ""],
    }))
  }

  const removeEducation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }))
  }

  const updateEducation = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.map((req, i) => (i === index ? value : req)),
    }))
  }

  const addSkills = () => {
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, ""],
    }))
  }

  const removeSkills = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }))
  }

  const updateSkills = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.map((benefit, i) => (i === index ? value : benefit)),
    }))
  }

  const addBenefit = () => {
    setFormData((prev) => ({
      ...prev,
      benefits: [...prev.benefits, ""],
    }))
  }

  const removeBenefit = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }))
  }

  const updateBenefit = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.map((benefit, i) => (i === index ? value : benefit)),
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Job Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="e.g., Senior Software Engineer"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company *</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
            placeholder="e.g., Tech Solutions Inc."
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
            placeholder="e.g., Addis Ababa, Ethiopia"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Job Type *</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Full-time">Full-time</SelectItem>
              <SelectItem value="Part-time">Part-time</SelectItem>
              <SelectItem value="Contract">Contract</SelectItem>
              <SelectItem value="Freelance">Freelance</SelectItem>
              <SelectItem value="Internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="salary">Salary Range</Label>
          <Input
            id="salary"
            value={formData.salary}
            onChange={(e) => setFormData((prev) => ({ ...prev, salary: e.target.value }))}
            placeholder="e.g., $80,000 - $100,000"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactEmail">Contact Email</Label>
          <Input
            id="contactEmail"
            type="email"
            value={formData.contactEmail}
            onChange={(e) => setFormData((prev) => ({ ...prev, contactEmail: e.target.value }))}
            placeholder="contact@company.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyWebsite">Company Website</Label>
          <Input
            id="companyWebsite"
            type="text"
            value={formData.companyWebsite}
            onChange={(e) => setFormData((prev) => ({ ...prev, companyWebsite: e.target.value }))}
            placeholder="https://example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="applicationLink">Application Link</Label>
          <Input
            id="applicationLink"
            type="url"
            value={formData.applicationLink}
            onChange={(e) => setFormData((prev) => ({ ...prev, applicationLink: e.target.value }))}
            placeholder="https://example.com/apply"
          />
        </div>

      </div>

      <div className="space-y-2">
        <Label htmlFor="applicationAddress">Application Address</Label>
        <Input
          id="applicationAddress"
          type="text"
          value={formData.applicationAddress}
          onChange={(e) => setFormData((prev) => ({ ...prev, applicationAddress: e.target.value }))}
          placeholder="123 Main St, City, State, Zip"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="applicationDeadline">Application Deadline *</Label>
        <Input
          id="applicationDeadline"
          type="date"
          value={formData.applicationDeadline}
          onChange={(e) => setFormData((prev) => ({ ...prev, applicationDeadline: e.target.value }))}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="introduction">Introduction</Label>
        <Textarea
          id="introduction"
          value={formData.introduction}
          onChange={(e) => setFormData((prev) => ({ ...prev, introduction: e.target.value }))}
          rows={6}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Job Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          rows={6}
          required
        />
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <Label>Requirements *</Label>
            <Button type="button" variant="outline" size="sm" onClick={addRequirement}>
              <Plus className="h-4 w-4 mr-2" />
              Add Requirement
            </Button>
          </div>
          <div className="space-y-3">
            {formData.requirements.map((requirement, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={requirement}
                  onChange={(e) => updateRequirement(index, e.target.value)}
                  placeholder="Enter requirement"
                  required
                />
                {formData.requirements.length > 1 && (
                  <Button type="button" variant="outline" size="sm" onClick={() => removeRequirement(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <Label>Experience *</Label>
            <Button type="button" variant="outline" size="sm" onClick={addExperience}>
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </div>
          <div className="space-y-3">
            {formData.experience.map((experience, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={experience}
                  onChange={(e) => updateExperience(index, e.target.value)}
                  placeholder="Enter experience"
                  required
                />
                {formData.experience.length > 1 && (
                  <Button type="button" variant="outline" size="sm" onClick={() => removeExperience(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <Label>Education *</Label>
            <Button type="button" variant="outline" size="sm" onClick={addEducation}>
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </div>
          <div className="space-y-3">
            {formData.education.map((education, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={education}
                  onChange={(e) => updateEducation(index, e.target.value)}
                  placeholder="Enter education"
                  required
                />
                {formData.education.length > 1 && (
                  <Button type="button" variant="outline" size="sm" onClick={() => removeEducation(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <Label>Skills</Label>
            <Button type="button" variant="outline" size="sm" onClick={addSkills}>
              <Plus className="h-4 w-4 mr-2" />
              Add Skills
            </Button>
          </div>
          <div className="space-y-3">
            {formData.skills.map((skills, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={skills}
                  onChange={(e) => updateSkills(index, e.target.value)}
                  placeholder="Enter skills"
                />
                {formData.skills.length > 1 && (
                  <Button type="button" variant="outline" size="sm" onClick={() => removeSkills(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <Label>Benefits</Label>
            <Button type="button" variant="outline" size="sm" onClick={addBenefit}>
              <Plus className="h-4 w-4 mr-2" />
              Add Benefit
            </Button>
          </div>
          <div className="space-y-3">
            {formData.benefits.map((benefit, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={benefit}
                  onChange={(e) => updateBenefit(index, e.target.value)}
                  placeholder="Enter benefit"
                />
                {formData.benefits.length > 1 && (
                  <Button type="button" variant="outline" size="sm" onClick={() => removeBenefit(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button type="submit" disabled={isPending}>
          {isPending ? (job ? "Updating..." : "Creating...") : job ? "Update Job" : "Create Job"}
        </Button>
      </div>
    </form>
  )
}
