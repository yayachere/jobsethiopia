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

            {/* about us */}
            <Card>
              <CardHeader>
                <CardTitle>Disclaimer for JobsEthiopia</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line  mt-4">
                    If you have any questions or require more information about our site's disclaimer, 
                    please feel free to contact us at jobsEthiopia@gmail.com.
                </p>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line  mt-4">
                    The information presented on JobsEthiopia is intended solely for general and informational purposes. 
                    We strive to ensure that the content is accurate and up-to-date, but we make no warranties regarding its completeness,
                    reliability, or accuracy. Any reliance you place on the material found on our site is strictly at your own risk. 
                    JobsEthiopia shall not be held responsible for any losses or damages resulting from the use of our platform.
                </p>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line  mt-4">
                  JobsEthiopia may contain links to external websites that are not maintained or controlled by us. While we aim to 
                  include only trustworthy and reputable sources, we do not guarantee or accept responsibility for the content, services, 
                  or privacy practices of these third-party sites. Any external links do not imply endorsement, and their content may 
                  change without prior notice.
                </p>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line  mt-4">
                    When navigating away from JobsEthiopia, please be aware that other websites may operate under different privacy 
                    policies and terms of service. We advise reviewing those policies before engaging in any transactions or providing 
                    personal information.
                </p>
                <h2 className="mt-4">Consent</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    By using our website, you hereby consent to our disclaimer and agree to its terms.
                </p>
              </CardContent>
            </Card>
        </div>
    </Layout>
  )
}

export default page