import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/contact-schema";

const valid = {
  name: "Max Muster",
  contact: "max@example.de",
  service: "Rasenpflege",
  location: "Musterstraße 1, 12345 Musterstadt",
  message: "",
};

describe("contact form rules", () => {
  it("accepts an e-mail address as contact", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });
  it("accepts a phone number as contact", () => {
    expect(contactSchema.safeParse({ ...valid, contact: "+49 151 2345678" }).success).toBe(true);
  });
  it("rejects contact that is neither phone nor e-mail", () => {
    expect(contactSchema.safeParse({ ...valid, contact: "hallo" }).success).toBe(false);
  });
  it("requires service and location", () => {
    expect(contactSchema.safeParse({ ...valid, service: "" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, location: "" }).success).toBe(false);
  });
});
