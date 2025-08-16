"use client"
import { useState, useEffect } from "react"
import { Plus, X, Calendar, Upload, ImageIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format, parseISO } from "date-fns"
import { updateJob, type Job } from "@/lib/actions/jobs"
import { useToast } from "@/hooks/use-toast"

// Job categories with descriptions for tooltips
const jobCategories = [
  { label: "Accounting / Finance", description: "Jobs like accountant, auditor, financial analyst" },
  { label: "Admin / Secretarial", description: "Office assistants, executive secretaries, receptionists" },
  { label: "Advertising / Marketing / PR", description: "Digital marketers, brand managers, PR officers" },
  { label: "ICT / Telecom / IT", description: "Developers, network engineers, cybersecurity experts" },
  { label: "Education / Teaching / Training", description: "Teachers, trainers, curriculum designers" },
  { label: "Engineering / Manufacturing", description: "Production engineers, QA, technicians" },
]

// Job type options
const jobTypes = ["Full-Time", "Part-Time", "Contract", "Freelance", "Internship", "Other"]

// Career level options
const careerLevels = ["Fresher", "Entry Level", "Mid Level", "Senior Level", "Manager", "Director", "Executive"]

interface EditJobDialogProps {
  job: Job
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

interface EditJobFormData {
  title: string
  company: string
  location: string
  type: string
  salary: string
  description: string
  qualification: string[]
  benefits: string[]
  applicationDeadline: Date | undefined
  contactEmail: string
  applicationLink: string
  applicationAddress: string
  companyWebsite: string
  responsibilities: string[]
  experience: string[]
  skills: string[]
  introduction: string
  howToApply: string
  companyLogo: string | null
}

export default function EditJobDialog({ job, isOpen, onOpenChange, onSuccess }: EditJobDialogProps) {
  const [formData, setFormData] = useState<EditJobFormData>({
    title: "",
    company: "",
    location: "",
    type: "",
    salary: "",
    description: "",
    qualification: [""],
    benefits: [""],
    applicationDeadline: undefined,
    contactEmail: "",
    applicationLink: "",
    applicationAddress: "",
    companyWebsite: "",
    responsibilities: [""],
    experience: [""],
    skills: [""],
    introduction: "",
    howToApply: "",
    companyLogo: null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const { toast } = useToast()

  // Initialize form data when job changes
  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title || "",
        company: job.company || "",
        location: job.location || "",
        type: job.type || "",
        salary: job.salary || "",
        description: job.description || "",
        qualification: job.qualification && job.qualification.length > 0 ? job.qualification : [""],
        benefits: job.benefits && job.benefits.length > 0 ? job.benefits : [""],
        applicationDeadline: job.application_deadline ? parseISO(job.application_deadline) : undefined,
        contactEmail: job.contact_email || "",
        applicationLink: job.application_link || "",
        applicationAddress: job.application_address || "",
        companyWebsite: job.company_website || "",
        responsibilities: job.responsibilities && job.responsibilities.length > 0 ? job.responsibilities : [""],
        experience: job.experience && job.experience.length > 0 ? job.experience : [""],
        skills: job.skills && job.skills.length > 0 ? job.skills : [""],
        introduction: job.introduction || "",
        howToApply: job.how_to_apply || "",
        companyLogo: job.company_logo || null,
      })
      setLogoPreview(job.company_logo || null)
    }
  }, [job])

  // Convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File Type",
          description: "Please select an image file.",
          variant: "destructive",
        })
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select an image smaller than 5MB.",
          variant: "destructive",
        })
        return
      }

      try {
        const base64 = await fileToBase64(file)
        setFormData((prev) => ({ ...prev, companyLogo: base64 }))
        setLogoPreview(base64)
      } catch (error) {
        console.error("Error converting file to base64:", error)
        toast({
          title: "Upload Error",
          description: "Failed to process the image. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  // Remove logo
  const removeLogo = () => {
    setFormData((prev) => ({ ...prev, companyLogo: null }))
    setLogoPreview(null)
    // Reset file input
    const fileInput = document.getElementById("editCompanyLogo") as HTMLInputElement
    if (fileInput) {
      fileInput.value = ""
    }
  }

  // Add array field item
  const addArrayItem = (field: keyof EditJobFormData) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] as string[]), ""],
    }))
  }

  // Remove array field item
  const removeArrayItem = (field: keyof EditJobFormData, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index),
    }))
  }

  // Update array field item
  const updateArrayItem = (field: keyof EditJobFormData, index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).map((item, i) => (i === index ? value : item)),
    }))
  }

  // Validate form data
  const validateForm = (): string | null => {
    if (!formData.title.trim()) {
      return "Job title is required"
    }
    if (!formData.company.trim()) {
      return "Company name is required"
    }
    if (!formData.description.trim()) {
      return "Job description is required"
    }
    if (!formData.applicationDeadline) {
      return "Application deadline is required"
    }
    if (!formData.type) {
      return "Job type is required"
    }

    return null
  }

  // Handle form submission
  const handleSubmit = async () => {
    const validationError = validateForm()
    if (validationError) {
      toast({
        title: "Validation Error",
        description: validationError,
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Create FormData for the server action
      const submitData = new FormData()
      submitData.append("title", formData.title)
      submitData.append("company", formData.company)
      submitData.append("location", formData.location)
      submitData.append("type", formData.type)
      submitData.append("salary", formData.salary)
      submitData.append("description", formData.description)
      submitData.append(
        "applicationDeadline",
        formData.applicationDeadline ? format(formData.applicationDeadline, "yyyy-MM-dd") : "",
      )
      submitData.append("contactEmail", formData.contactEmail)
      submitData.append("applicationLink", formData.applicationLink)
      submitData.append("applicationAddress", formData.applicationAddress)
      submitData.append("companyWebsite", formData.companyWebsite)
      submitData.append("introduction", formData.introduction)
      submitData.append("howToApply", formData.howToApply)
      submitData.append("companyLogo", formData.companyLogo || "")

      // Convert arrays to JSON strings
      submitData.append("qualification", JSON.stringify(formData.qualification.filter((r) => r.trim() !== "")))
      submitData.append("benefits", JSON.stringify(formData.benefits.filter((b) => b.trim() !== "")))
      submitData.append("responsibilities", JSON.stringify(formData.responsibilities.filter((e) => e.trim() !== "")))
      submitData.append("experience", JSON.stringify(formData.experience.filter((e) => e.trim() !== "")))
      submitData.append("skills", JSON.stringify(formData.skills.filter((s) => s.trim() !== "")))

      const result = await updateJob(job.id, submitData)

      if (result.success) {
        toast({
          title: "Success!",
          description: "Job updated successfully!",
        })

        onOpenChange(false)

        // Call success callback if provided
        if (onSuccess) {
          onSuccess()
        }
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update job",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Update error:", error)
      toast({
        title: "Error",
        description: "Failed to update job. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Render array input field
  const renderArrayField = (field: keyof EditJobFormData, label: string, required = false, placeholder = "") => {
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
    <TooltipProvider>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Edit Job Post</DialogTitle>
          </DialogHeader>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Basic Job Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Job Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Job Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">
                      Job Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter job title"
                      required
                    />
                  </div>

                  {/* Company Name */}
                  <div className="space-y-2">
                    <Label htmlFor="company">
                      Company Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                      placeholder="Enter company name"
                      required
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                      placeholder="e.g., New York, NY or Remote"
                    />
                  </div>

                  {/* Job Type */}
                  <div className="space-y-2">
                    <Label>
                      Job Type <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
                    >
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

                  {/* Salary */}
                  <div className="space-y-2">
                    <Label htmlFor="salary">Salary</Label>
                    <Input
                      id="salary"
                      value={formData.salary}
                      onChange={(e) => setFormData((prev) => ({ ...prev, salary: e.target.value }))}
                      placeholder="e.g., $80,000 - $100,000"
                    />
                  </div>

                  {/* Application Deadline */}
                  <div className="space-y-2">
                    <Label>
                      Application Deadline <span className="text-red-500">*</span>
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.applicationDeadline && "text-muted-foreground",
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {formData.applicationDeadline ? format(formData.applicationDeadline, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={formData.applicationDeadline}
                          onSelect={(date) => setFormData((prev) => ({ ...prev, applicationDeadline: date }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Company Logo */}
                <div className="space-y-2">
                  <Label htmlFor="editCompanyLogo">Company Logo</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Input
                        id="editCompanyLogo"
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("editCompanyLogo")?.click()}
                        className="flex-1"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {logoPreview ? "Change Logo" : "Upload Logo"}
                      </Button>
                      {logoPreview && (
                        <Button type="button" variant="outline" size="sm" onClick={removeLogo}>
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    {logoPreview && (
                      <div className="flex items-center space-x-2 p-2 border rounded-md">
                        <img
                          src={logoPreview || "/placeholder.svg"}
                          alt="Company Logo Preview"
                          className="w-12 h-12 object-contain rounded"
                        />
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">
                            {formData.companyLogo === job.company_logo ? "Current logo" : "New logo uploaded"}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Job Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">
                    Job Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Detailed description of the job"
                    rows={4}
                    required
                  />
                </div>

                {/* Introduction */}
                <div className="space-y-2">
                  <Label htmlFor="introduction">Introduction</Label>
                  <Textarea
                    id="introduction"
                    value={formData.introduction}
                    onChange={(e) => setFormData((prev) => ({ ...prev, introduction: e.target.value }))}
                    placeholder="Brief introduction about the company or job"
                    rows={3}
                  />
                </div>

                {/* How to Apply */}
                <div className="space-y-2">
                  <Label htmlFor="how-to-apply">How To Apply</Label>
                  <Textarea
                    id="how-to-apply"
                    value={formData.howToApply}
                    onChange={(e) => setFormData((prev) => ({ ...prev, howToApply: e.target.value }))}
                    placeholder="Brief how to apply details about the job"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Contact Email */}
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

                  {/* Company Website */}
                  <div className="space-y-2">
                    <Label htmlFor="companyWebsite">Company Website</Label>
                    <Input
                      id="companyWebsite"
                      type="url"
                      value={formData.companyWebsite}
                      onChange={(e) => setFormData((prev) => ({ ...prev, companyWebsite: e.target.value }))}
                      placeholder="https://company.com"
                    />
                  </div>

                  {/* Application Link */}
                  <div className="space-y-2">
                    <Label htmlFor="applicationLink">Application Link</Label>
                    <Input
                      id="applicationLink"
                      value={formData.applicationLink}
                      onChange={(e) => setFormData((prev) => ({ ...prev, applicationLink: e.target.value }))}
                      placeholder="URL or email for applications"
                    />
                  </div>

                  {/* Application Address */}
                  <div className="space-y-2">
                    <Label htmlFor="applicationAddress">Application Address</Label>
                    <Input
                      id="applicationAddress"
                      value={formData.applicationAddress}
                      onChange={(e) => setFormData((prev) => ({ ...prev, applicationAddress: e.target.value }))}
                      placeholder="Physical address for applications"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Requirements and Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Job Requirements & Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {renderArrayField("qualification", "Qualification", true, "Enter qualification")}
                    {renderArrayField("experience", "Experience", false, "Enter experience requirement")}
                    {renderArrayField("skills", "Skills", false, "Enter required skill")}
                  </div>
                  <div className="space-y-4">
                    {renderArrayField("benefits", "Benefits", false, "Enter benefit")}
                    {renderArrayField("responsibilities", "Responsibilities", false, "Enter responsibility")}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Job"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  )
}
