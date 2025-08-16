"use client"

import type React from "react"
import { useState, useTransition } from "react"
import { Plus, X, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { updateJob, type Job } from "@/lib/actions/jobs"

interface JobFormProps {
  job: Job
  onSuccess: () => void
}

const jobTypes = ["Full-Time", "Part-time", "Contract", "Freelance", "Internship"]

export default function JobForm({ job, onSuccess }: JobFormProps) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    title: job.title || "",
    company: job.company || "",
    location: job.location || "",
    type: job.type || "",
    salary: job.salary || "",
    description: job.description || "",
    requirements: job.requirements || [""],
    benefits: job.benefits || [""],
    applicationDeadline: job.application_deadline || "",
    contactEmail: job.contact_email || "",
    companyWebsite: job.company_website || "",
    applicationLink: job.application_link || "",
    applicationAddress: job.application_address || "",
    education: job.education || [""],
    experience: job.experience || [""],
    skills: job.skills || [""],
    introduction: job.introduction || "",
  })
  const [deadline, setDeadline] = useState<Date | undefined>(
    job.application_deadline ? new Date(job.application_deadline) : undefined,
  )

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
    form.append("applicationDeadline", deadline ? deadline.toISOString().split("T")[0] : "")
    form.append("contactEmail", formData.contactEmail)
    form.append("requirements", JSON.stringify(formData.requirements.filter((req) => req.trim() !== "")))
    form.append("benefits", JSON.stringify(formData.benefits.filter((benefit) => benefit.trim() !== "")))
    form.append("companyWebsite", formData.companyWebsite)
    form.append("applicationLink", formData.applicationLink)
    form.append("applicationAddress", formData.applicationAddress)
    form.append("education", JSON.stringify(formData.education.filter((edu) => edu.trim() !== "")))
    form.append("experience", JSON.stringify(formData.experience.filter((exp) => exp.trim() !== "")))
    form.append("skills", JSON.stringify(formData.skills.filter((skill) => skill.trim() !== "")))
    form.append("introduction", formData.introduction)

    startTransition(async () => {
      try {
        const result = await updateJob(job.id, form)

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

  // Array field management functions
  const addArrayItem = (field: keyof typeof formData) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] as string[]), ""],
    }))
  }

  const removeArrayItem = (field: keyof typeof formData, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index),
    }))
  }

  const updateArrayItem = (field: keyof typeof formData, index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).map((item, i) => (i === index ? value : item)),
    }))
  }

  // Render array input field
  const renderArrayField = (field: keyof typeof formData, label: string, required = false, placeholder = "") => {
    const items = (formData[field] as string[]) || [""]

    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label className="text-sm font-medium">
            {label} {required && <span className="text-red-500">*</span>}
          </Label>
          <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem(field)}>
            <Plus className="h-3 w-3 mr-1" />
            Add {label.slice(0, -1)}
          </Button>
        </div>
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={item}
                onChange={(e) => updateArrayItem(field, index, e.target.value)}
                placeholder={placeholder || `Enter ${label.toLowerCase().slice(0, -1)}`}
                required={required && index === 0}
              />
              {items.length > 1 && (
                <Button type="button" variant="outline" size="sm" onClick={() => removeArrayItem(field, index)}>
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    )
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
              {jobTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
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
            type="url"
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
          value={formData.applicationAddress}
          onChange={(e) => setFormData((prev) => ({ ...prev, applicationAddress: e.target.value }))}
          placeholder="123 Main St, City, State, Zip"
        />
      </div>

      <div className="space-y-2">
        <Label>Application Deadline *</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-full justify-start text-left font-normal", !deadline && "text-muted-foreground")}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {deadline ? format(deadline, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <CalendarComponent mode="single" selected={deadline} onSelect={setDeadline} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="introduction">Introduction</Label>
        <Textarea
          id="introduction"
          value={formData.introduction}
          onChange={(e) => setFormData((prev) => ({ ...prev, introduction: e.target.value }))}
          rows={3}
          placeholder="Brief introduction about the company or position"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {renderArrayField("requirements", "Requirements", true, "Enter requirement")}
          {renderArrayField("experience", "Experience", false, "Enter experience requirement")}
          {renderArrayField("skills", "Skills", false, "Enter required skill")}
        </div>
        <div className="space-y-4">
          {renderArrayField("education", "Education", false, "Enter education requirement")}
          {renderArrayField("benefits", "Benefits", false, "Enter benefit")}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Update Job"}
        </Button>
      </div>
    </form>
  )
}
