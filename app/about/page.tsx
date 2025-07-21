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
                <CardTitle>About Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line mt-4">
                    JobsEthiopia is a trusted Ethiopian job portal dedicated to connecting job seekers with reliable employment 
                    opportunities across the country. Our mission is to make job searching simpler, more transparent, and accessible for 
                    everyone — from recent graduates to experienced professionals.
                </p>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line mt-4">
                  We curate and publish verified job listings sourced directly from reputable organizations including government 
                  institutions, NGOs, private companies, and international agencies. Each listing is reviewed for clarity, relevance, 
                  and authenticity to ensure users access only accurate and up-to-date information.
                </p>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line mt-4">
                  JobsEthiopia does not host or generate job content. All opportunities are sourced from external employers and link 
                  directly to the original application portals. We also do not collect personal data, require user registration, or 
                  process applications ourselves. 
                </p>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line mt-4">
                  Whether you're looking for your first job or planning your next career move, JobsEthiopia empowers you to explore 
                  opportunities confidently through a centralized and user-friendly interface.
                </p>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line mt-4">
                  We are proud to support job seekers in Ethiopia and continually strive to be a leading platform for employment 
                  discovery.
                </p>
              </CardContent>
            </Card>
            {/* What we do */}
            <Card>
                <CardHeader>
                <CardTitle>What We Do:</CardTitle>
                </CardHeader>
                <CardContent>
                <ul className="space-y-2">
                    <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-muted-foreground">Publish daily job vacancies from trusted employers and organizations.</span>
                    </li>
                    <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-muted-foreground">Curate job listings that are clear, concise, and easy to apply to.</span>
                    </li>
                    <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-muted-foreground">Share job alerts through multiple channels, including Telegram, Instagram, Facebook, and TikTok.</span>
                    </li>
                    <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-muted-foreground">Help employers reach thousands of qualified candidates through targeted job promotion.</span>
                    </li>
                </ul>
                </CardContent>
            </Card>
            {/* Misson */}
            <Card>
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-muted-foreground">To make job searching easier, faster, and more transparent for everyone in Ethiopia by offering
                         a centralized, trusted, and user-friendly platform.</span>
                    </li>
                </ul>
              </CardContent>
            </Card>
            {/* Vision */}
            <Card>
              <CardHeader>
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-muted-foreground">To become Ethiopia’s leading job connection hub — a place where opportunity meets talent, and 
                        where careers are built with confidence.</span>
                    </li>
                </ul>
              </CardContent>
            </Card>
        </div>
    </Layout>
  )
}

export default page