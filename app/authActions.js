"use server";

import fs from "fs/promises";
import path from "path";
import { cookies } from "next/headers";

const ADMINS_FILE = path.join(process.cwd(), "admins.json");

// FOR THE STUDENT: This is where you can "register" an admin.
// I've added a function to create the first admin easily.
export async function createInitialAdmin(username, password) {
  const admins = [{ username, password }];
  await fs.writeFile(ADMINS_FILE, JSON.stringify(admins, null, 2));
  return { success: true };
}

export async function loginAdmin(username, password) {
  try {
    const fileData = await fs.readFile(ADMINS_FILE, "utf-8");
    const admins = JSON.parse(fileData);

    const admin = admins.find(a => a.username === username && a.password === password);

    if (admin) {
      // Set a simple cookie to remember the login
      const cookieStore = await cookies();
      cookieStore.set("admin_session", "logged_in", { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 // 1 day
      });
      return { success: true };
    }
    return { success: false, error: "Invalid username or password" };
  } catch (error) {
    return { success: false, error: "System error" };
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
}

export async function getAllAdmins() {
  try {
    const fileData = await fs.readFile(ADMINS_FILE, "utf-8");
    return JSON.parse(fileData);
  } catch (error) {
    return [];
  }
}

export async function checkAuth() {
  const cookieStore = await cookies();
  return cookieStore.has("admin_session");
}
