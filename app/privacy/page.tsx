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

            
            {/* Privacy policy */}
            <Card className='text-muted-foreground'>
              <CardHeader>
                <CardTitle>Privacy Policy</CardTitle>
              </CardHeader>
              <CardContent className='space-x-4 space-y-4'>
                
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    Effective Date: July 2025
                </p>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    Last Updated: July 20, 2025
                </p>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    JobsEthiopia ("we", "our", "us") respects your privacy and is committed to protecting it. This Privacy Policy explains 
                    how we handle your information when you visit jobsethiopia.vercel.app.
                </p>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    We do not collect, store, or process any personal data. Our website exists to share job opportunities and redirect users 
                    to the original source for applications.
                </p>
                <h2 className='mt-4'>1. Information We Do NOT Collect</h2>
                <p>JobsEthiopia does not require registration, login, or account creation. We do not collect:
                </p>
                <ul className="space-y-2 mt-2">
                    <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-muted-foreground">Names</span>
                    </li>
                    <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-muted-foreground">Email addresses</span>
                    </li>
                    <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-muted-foreground">Phone numbers</span>
                    </li>
                    <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-muted-foreground">Location data</span>
                    </li>
                    <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-muted-foreground">CVs or job applications</span>
                    </li>
                </ul>
                <p>All application processes occur on third-party employer websites.</p>

                <h2 className='mt-4'>2. Cookies and Analytics</h2>
                <p>We may use cookies and third-party tools (such as Google Analytics) to gather anonymous, non-personal 
                    browsing information, such as:
                </p>
                <ul className="space-y-2 mt-2">
                        <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-muted-foreground">Pages visited</span>
                        </li>
                        <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-muted-foreground">Time spent on site</span>
                        </li>
                        <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-muted-foreground">Device/browser type</span>
                        </li>
                    </ul>
                <p>This information is aggregated for analytical purposes only and cannot be used to identify individuals.
                </p>

                <h2 className='mt-4'>3. Third-Party Links</h2>
                <p>Our job listings often link to external websites (employers, job boards, etc.). We are not responsible for 
                    the privacy practices or content of those external sites. We encourage you to review their privacy policies 
                    before submitting any information.
                </p>

                <h2 className='mt-4'>4. Your Rights</h2>
                <p>Since we do not collect or store your personal data, you do not need to request access, correction, or deletion 
                    of information. However, for questions or concerns, feel free to contact us at:
                    📧 jobsethiopiaofficial@gmail.com
                </p>

                <h2 className='mt-4'>5. Policy Updates</h2>
                <p>We may revise this Privacy Policy to reflect changes in technology, legal requirements, or site features. 
                    Updates will be posted on this page with a revised "Last Updated" date.
                </p>

                <h2 className='mt-4'>Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                <p>📧 Email: jobsethiopiaofficial@gmail.com</p>
              </CardContent>
            </Card>
        </div>
    </Layout>
  )
}

export default page