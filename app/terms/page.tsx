import Layout from '@/components/layout'
import { ArrowLeft } from 'lucide-react'
import Link from "next/link"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const page = () => {
  return (
    <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"> 
            
            {/* Back Button */}
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Jobs
            </Link>
            
            {/* Terms and conditions*/}
            <Card className='mt-8 text-muted-foreground'>
                <CardHeader>
                <CardTitle>Terms & Conditions</CardTitle>
                </CardHeader>
                <CardContent className='space-x-4 space-y-4'>
                    <p>Effective Date: July 2025</p>
                    <p>Last Updated: July 20, 2025</p>
                    <p>Welcome to JobsEthiopia! These Terms and Conditions govern your use of our website located at jobsethiopia.vercel.app. 
                        By accessing or using our platform, you agree to comply with these terms.
                    </p>

                    <h2>1. Platform Purpose</h2>
                    <p>JobsEthiopia is not a recruitment agency. We do not accept applications, conduct interviews, or influence hiring decisions. 
                        Our role is to:
                    </p>
                    <ul className="space-y-2 mt-2">
                        <li className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-muted-foreground">Publish job opportunities from credible sources</span>
                        </li>
                        <li className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-muted-foreground">Redirect users to official employer or organization websites</span>
                        </li>
                    </ul>
                    <p>We offer job listings for informational purposes only.</p>

                    <h2>2. User Responsibility</h2>
                    <p>As a user, you agree to:</p>
                    <ul className="space-y-2 mt-2">
                        <li className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-muted-foreground">Independently verify job details before applying</span>
                        </li>
                        <li className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-muted-foreground">Avoid sharing sensitive or personal data on our site</span>
                        </li>
                        <li className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-muted-foreground">Apply through external links provided directly to the employer’s site</span>
                        </li>
                    </ul>
                    <p>We are not liable for outcomes of your applications or any communication between you and employers.</p>

                    <h2>3. Job Listing Accuracy</h2>
                    <p>We strive to publish accurate, up-to-date job posts. However:</p>
                    <ul className="space-y-2 mt-2">
                        <li className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-muted-foreground">We do not guarantee completeness, availability, or reliability</span>
                        </li>
                        <li className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-muted-foreground">Job deadlines and details may change or expire without notice</span>
                        </li>
                    </ul>
                    <p>Always confirm listings on the original source.</p>

                    <h2>4. Intellectual Property</h2>
                    <p>Unless otherwise stated:</p>
                    <ul className="space-y-2 mt-2">
                        <li className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-muted-foreground">The website's design, branding, content layout, and JobsEthiopia logo 
                                are our intellectual property</span>
                        </li>
                        <li className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-muted-foreground">Job posts and employer logos are the property of the respective 
                                organizations</span>
                        </li>
                    </ul>
                    <p>Do not reproduce, republish, or modify our content without written permission, except for personal, non-commercial 
                        use.
                    </p>

                    <h2>5. Third-Party Links</h2>
                    <p>We provide external links to job application portals. These third-party websites:</p>
                    <ul className="space-y-2 mt-2">
                        <li className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-muted-foreground">Are not under our control</span>
                        </li>
                        <li className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-muted-foreground">May have separate terms and privacy policies</span>
                        </li>
                    </ul>
                    <p>We are not responsible for any issues arising from your use of external sites.</p>

                    <h2>6. Limitation of Liability</h2>
                    <p>JobsEthiopia is not liable for:</p>
                    <ul className="space-y-2 mt-2">
                        <li className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-muted-foreground">Losses from expired or incorrect job listings</span>
                        </li>
                        <li className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-muted-foreground">Missed opportunities due to delayed updates</span>
                        </li>
                        <li className="flex items-start">
                            <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-muted-foreground">Technical issues, malware, or disruptions during site use</span>
                        </li>
                    </ul>
                    <p>Use the site at your own risk.</p>

                    <h2>7. Governing Law</h2>
                    <p>These terms are governed by the laws of the Federal Democratic Republic of Ethiopia. Disputes will be subject to 
                        the jurisdiction of Ethiopian courts.</p>
                        
                    <h2>8. Contact</h2>
                    <p>For any inquiries regarding these terms, please contact us at:</p>
                    <p>📧 jobsethiopiaofficial</p>
                    <p>📍 Addis Ababa, Ethiopia</p>
                </CardContent>
            </Card>
        </div>
    </Layout>
  )
}

export default page