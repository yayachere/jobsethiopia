"use client"

import Link from "next/link"
import { Briefcase, Mail, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const telegramLink = "https://t.me/JobsEthiopiaOfficial"
const tiktokLink = "https://www.tiktok.com/@jobsethiopiaofficial?is_from_webapp=1&sender_device=pc"
const facebookLink = "https://web.facebook.com/profile.php?viewas=100000686899395&id=61578169974603"
const instagramLink = "https://www.instagram.com/jobsethiopia/"

// Custom TikTok and Telegram icons as SVG components
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
)

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785L21.9 4.334c.252-1.017-.375-1.474-1.235-1.119z" />
  </svg>
)

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-foreground">JobsEthiopia</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your trusted partner in finding the perfect career opportunity. We connect talented professionals with
                top companies worldwide.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="p-2">
                  <Link href={facebookLink} target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Facebook</span>
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <Link href={instagramLink} target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4" />
                  <span className="sr-only">Instagram</span>
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <Link href={tiktokLink} target="_blank" rel="noopener noreferrer">
                  <TikTokIcon className="h-4 w-4" />
                  <span className="sr-only">TikTok</span>
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <Link href={telegramLink} target="_blank" rel="noopener noreferrer">
                  <TelegramIcon className="h-4 w-4" />
                  <span className="sr-only">Telegram</span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    Privacy Policy and Terms
                  </Link>
                </li>
              </ul>
            </div>

            {/* Job Categories */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Popular Categories</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    Technology
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    Marketing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    Finance
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    Healthcare
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Separator />

        {/* Contact Info - Only Email Now */}
        <div className="py-8">
          <div className="flex justify-center">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Email Us</p>
                <p className="text-sm text-muted-foreground">jobsethiopiaofficial@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Footer */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-sm text-muted-foreground">© {currentYear} JobsEthiopia. All rights reserved.</p>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-sm text-muted-foreground">Made with ❤️ for job seekers</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
