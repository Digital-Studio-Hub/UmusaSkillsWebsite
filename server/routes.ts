import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendContactFormEmail } from "./email";
import * as z from "zod";

// Validation schema for contact form
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  course: z.string().min(1, "Please select a course"),
  message: z.string().optional(),
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // POST /api/contact - Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = contactFormSchema.parse(req.body);

      // Send the contact form email
      const emailSent = await sendContactFormEmail(validatedData);

      if (!emailSent) {
        return res.status(500).json({
          success: false,
          message: "Failed to send email. Please try again later.",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Your enquiry has been received. We will contact you shortly.",
      });
    } catch (error: any) {
      console.error("Contact form error:", error);

      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Invalid form data",
          errors: error.errors,
        });
      }

      return res.status(500).json({
        success: false,
        message: "An error occurred. Please try again later.",
      });
    }
  });

  // Health check endpoint for Cloud Run
  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "healthy" });
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  return httpServer;
}
