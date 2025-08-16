"use server"

import { redirect } from "next/navigation"
import sql from "@/lib/db"
import { createSession, deleteSession, getSession } from "@/lib/auth"
import { verifyPassword, hashPassword } from "@/lib/password"

export async function login(_prevState: { error?: string } | null, formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
      return { error: "Email and password are required" }
    }

    // Get user from database
    const users = await sql`
      SELECT id, email, password_hash, role 
      FROM users 
      WHERE email = ${email}
    `

    if (users.length === 0) {
      return { error: "Invalid email or password" }
    }

    const user = users[0]

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password_hash)
    if (!isValidPassword) {
      return { error: "Invalid email or password" }
    }

    // Create session
    await createSession(user.id.toString(), user.email, user.role)
  } catch (error) {
    console.error("Login error:", error)
    return { error: "An error occurred during login" }
  }

  redirect("/admin")
}

export async function logout() {
  try {
    await deleteSession()
  } catch (error) {
    console.error("Logout error:", error)
  }
  redirect("/login")
}

export async function changePassword(currentPassword: string, newPassword: string) {
  try {
    // Get current session
    const session = await getSession()
    if (!session) {
      return { success: false, error: "Not authenticated" }
    }

    // Get user from database
    const users = await sql`
      SELECT id, email, password_hash 
      FROM users 
      WHERE id = ${Number.parseInt(session.userId)}
    `

    if (users.length === 0) {
      return { success: false, error: "User not found" }
    }

    const user = users[0]

    // Verify current password
    const isValidPassword = await verifyPassword(currentPassword, user.password_hash)
    if (!isValidPassword) {
      return { success: false, error: "Current password is incorrect" }
    }

    // Hash new password
    const newPasswordHash = await hashPassword(newPassword)

    // Update password in database
    await sql`
      UPDATE users 
      SET password_hash = ${newPasswordHash}, updated_at = NOW()
      WHERE id = ${Number.parseInt(session.userId)}
    `

    return { success: true }
  } catch (error) {
    console.error("Change password error:", error)
    return { success: false, error: "An error occurred while changing password" }
  }
}
