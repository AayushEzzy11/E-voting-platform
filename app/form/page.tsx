"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

type CountryKey = "Nepal" | "USA" | "Canada" | "Australia" | "UK" | "Germany"

interface FormDataType {
  fullName: string
  dob: string
  gender: string
  citizenshipNo: string
  citizenshipDistrict: string
  voterId: string
  passportNo: string
  country: CountryKey | ""
  province: string
  district: string
  municipality: string
  wardNo: string
  email: string
  phone: string
  citizenshipFile: File | null
  passportFile: File | null
  photoFile: File | null
  declaration: boolean
}

const PHONE_PATTERNS: Record<CountryKey, RegExp> = {
  Nepal: /^\+977\d{10}$/,
  USA: /^\+1\d{10}$/,
  Canada: /^\+1\d{10}$/,
  Australia: /^\+61\d{9}$/,
  UK: /^\+44\d{10}$/,
  Germany: /^\+49\d{10,11}$/,
}

const VALID_FILE_TYPES = ["image/jpeg", "image/png", "application/pdf"]

const validators = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  citizenshipNo: /^[0-9]{6,10}$/,
  passportNo: /^[A-Z][0-9]{7}$/,
  wardNo: /^[0-9]{1,2}$/,
}

const COUNTRY_CODES: Record<CountryKey, string> = {
  Nepal: "+977",
  USA: "+1",
  Canada: "+1",
  Australia: "+61",
  UK: "+44",
  Germany: "+49",
}

export default function VoterRegistrationForm() {
  const router = useRouter()

  const [formData, setFormData] = useState<FormDataType>({
    fullName: "",
    dob: "",
    gender: "",
    citizenshipNo: "",
    citizenshipDistrict: "",
    voterId: "",
    passportNo: "",
    country: "",
    province: "",
    district: "",
    municipality: "",
    wardNo: "",
    email: "",
    phone: "",
    citizenshipFile: null,
    passportFile: null,
    photoFile: null,
    declaration: false,
  })

  const [errors, setErrors] = useState<Partial<Record<keyof FormDataType, string>>>({})

  const today = new Date().toISOString().split("T")[0]

  const setFieldError = (name: keyof FormDataType, message = "") => {
    setErrors((prev) => ({ ...prev, [name]: message || undefined }))
  }

  const validateField = (name: keyof FormDataType, value: any) => {
    switch (name) {
      case "fullName":
        setFieldError(name, value.trim().length < 3 ? "Full name is too short." : "")
        break
      case "email":
        setFieldError(name, validators.email.test(value) ? "" : "Invalid email format.")
        break
      case "phone": {
        const c = formData.country
        if (!c) {
          setFieldError("country", "Select country for phone validation.")
          setFieldError("phone", "Select country for phone validation.")
          break
        }
        const pattern = PHONE_PATTERNS[c]
        setFieldError(name, pattern.test(value) ? "" : `Phone must match ${c} format, include country code.`)
        break
      }
      case "country":
        setFieldError(name, value ? "" : "Country is required.")
        if (formData.phone) validateField("phone", formData.phone)
        break
      case "citizenshipNo":
        setFieldError(name, validators.citizenshipNo.test(value) ? "" : "6–10 digits required.")
        break
      case "passportNo":
        setFieldError(name, validators.passportNo.test(value) ? "" : "Format like P1234567.")
        break
      case "wardNo":
        setFieldError(name, validators.wardNo.test(value) ? "" : "Ward must be 1–2 digits.")
        break
      case "citizenshipFile":
      case "passportFile":
      case "photoFile": {
        const f: File | null = value
        setFieldError(name, f && VALID_FILE_TYPES.includes(f.type) ? "" : "Allowed: JPG, PNG, or PDF.")
        break
      }
      case "dob": {
        if (!value) {
          setFieldError(name, "DOB required.")
          break
        }
        const selected = new Date(value)
        const now = new Date()
        if (selected > now) {
          setFieldError(name, "DOB must be in the past.")
          break
        }
        const age =
          now.getFullYear() -
          selected.getFullYear() -
          (now < new Date(now.getFullYear(), selected.getMonth(), selected.getDate()) ? 1 : 0)
        setFieldError(name, age < 18 ? "Must be at least 18 years old." : "")
        break
      }
      default:
        if (typeof value === "string" && !value.trim()) {
          setFieldError(name, "This field is required.")
        } else {
          setFieldError(name, "")
        }
        break
    }
  }

  const validateAll = (): boolean => {
    ;(Object.keys(formData) as (keyof FormDataType)[]).forEach((k) => validateField(k, (formData as any)[k]))

    // Cross-field checks
    if (
      formData.citizenshipFile &&
      formData.passportFile &&
      formData.citizenshipFile.name === formData.passportFile.name
    ) {
      setFieldError("citizenshipFile", "Citizenship and Passport cannot be the same file.")
      setFieldError("passportFile", "Citizenship and Passport cannot be the same file.")
    }
    if (formData.citizenshipFile && formData.citizenshipFile.name.toLowerCase().includes("passport")) {
      setFieldError("citizenshipFile", "Filename suggests a passport. Upload correct citizenship document.")
    }
    if (formData.passportFile && formData.passportFile.name.toLowerCase().includes("citizenship")) {
      setFieldError("passportFile", "Filename suggests a citizenship document. Upload the passport file.")
    }

    const hasError = Object.values(errors).some(Boolean)
    return !hasError
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement
    const { name, value, type, checked, files } = target
    const newVal = type === "checkbox" ? checked : files ? files[0] : value

    setFormData((prev) => {
      const next = { ...prev, [name]: newVal } as FormDataType

      if (name === "country" && value && value !== "") {
        const countryCode = COUNTRY_CODES[value as CountryKey]
        if (countryCode) {
          next.phone = countryCode
        }
      }

      return next
    })

    validateField(name as keyof FormDataType, newVal)
  }

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()

  const ok = validateAll()
  if (!ok) return

  // ✅ Directly go to auth page instead of OTP
  router.push("/auth")
}


  const inputBase = "border rounded-lg p-3 w-full outline-none focus:ring-2 focus:ring-blue-500"
  const errorText = "text-sm text-red-600 mt-1"
  const sectionTitle = "text-lg font-semibold text-gray-800 mt-8 mb-3"

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img
                src="logo1.jpg"
                alt="E-Vote Nepal Logo"
                className="w-12 h-12 rounded-full mr-3"
              />
              <span className="font-['Pacifico'] text-2xl text-blue-900">E-Vote Nepal</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/" className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-4xl border border-gray-100 my-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <i className="ri-id-card-line text-3xl text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">Overseas Voter Registration</h1>
            <p className="text-gray-600 text-sm mt-1">For Nepalese citizens abroad</p>
          </div>

        {/* Personal Information */}
        <h2 className={sectionTitle}>Personal Information</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name (as per Citizenship)"
              className={inputBase}
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            {errors.fullName && <p className={errorText}>{errors.fullName}</p>}
          </div>
          <div>
            <input
              type="date"
              name="dob"
              max={today}
              className={inputBase}
              value={formData.dob}
              onChange={handleChange}
              required
            />
            {errors.dob && <p className={errorText}>{errors.dob}</p>}
          </div>
          <div>
            <select name="gender" className={inputBase} value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            {errors.gender && <p className={errorText}>{errors.gender}</p>}
          </div>
        </div>

        {/* Citizenship & Voter Details */}
        <h2 className={sectionTitle}>Citizenship & Voter Details</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="citizenshipNo"
              placeholder="Citizenship Number"
              className={inputBase}
              value={formData.citizenshipNo}
              onChange={handleChange}
              required
            />
            {errors.citizenshipNo && <p className={errorText}>{errors.citizenshipNo}</p>}
          </div>
          <div>
            <input
              type="text"
              name="citizenshipDistrict"
              placeholder="Issued District"
              className={inputBase}
              value={formData.citizenshipDistrict}
              onChange={handleChange}
              required
            />
            {errors.citizenshipDistrict && <p className={errorText}>{errors.citizenshipDistrict}</p>}
          </div>
          <div>
            <input
              type="text"
              name="voterId"
              placeholder="Voter ID Number (if any)"
              className={inputBase}
              value={formData.voterId}
              onChange={handleChange}
            />
            {errors.voterId && <p className={errorText}>{errors.voterId}</p>}
          </div>
          <div>
            <input
              type="text"
              name="passportNo"
              placeholder="Passport Number"
              className={inputBase}
              value={formData.passportNo}
              onChange={handleChange}
              required
            />
            {errors.passportNo && <p className={errorText}>{errors.passportNo}</p>}
          </div>
        </div>

        {/* Permanent Address (Nepal) */}
        <h2 className={sectionTitle}>Permanent Address (Nepal)</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <select name="province" className={inputBase} value={formData.province} onChange={handleChange} required>
              <option value="">Province</option>
              <option>Province 1</option>
              <option>Province 2</option>
              <option>Bagmati</option>
              <option>Gandaki</option>
              <option>Lumbini</option>
              <option>Karnali</option>
              <option>Sudurpashchim</option>
            </select>
            {errors.province && <p className={errorText}>{errors.province}</p>}
          </div>
          <div>
            <input
              type="text"
              name="district"
              placeholder="District"
              className={inputBase}
              value={formData.district}
              onChange={handleChange}
              required
            />
            {errors.district && <p className={errorText}>{errors.district}</p>}
          </div>
          <div>
            <input
              type="text"
              name="municipality"
              placeholder="Municipality/Metropolitan/VDC"
              className={inputBase}
              value={formData.municipality}
              onChange={handleChange}
              required
            />
            {errors.municipality && <p className={errorText}>{errors.municipality}</p>}
          </div>
          <div className="md:col-span-1">
            <input
              type="text"
              name="wardNo"
              placeholder="Ward No."
              className={inputBase}
              value={formData.wardNo}
              onChange={handleChange}
              required
            />
            {errors.wardNo && <p className={errorText}>{errors.wardNo}</p>}
          </div>
        </div>

        {/* Contact & Location */}
        <h2 className={sectionTitle}>Contact & Location</h2>
        <div className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={inputBase}
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className={errorText}>{errors.email}</p>}
          </div>
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-64">
              <select name="country" className={inputBase} value={formData.country} onChange={handleChange} required>
                <option value="">Select Current Country</option>
                <option value="Nepal">Nepal</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="UK">UK</option>
                <option value="Germany">Germany</option>
              </select>
              {errors.country && <p className={errorText}>{errors.country}</p>}
            </div>
            <div className="flex-1">
              <input
                type="tel"
                name="phone"
                placeholder="Phone number (country code will be auto-filled)"
                className={inputBase}
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && <p className={errorText}>{errors.phone}</p>}
            </div>
          </div>
        </div>

        {/* Upload Documents */}
        <h2 className={sectionTitle}>Upload Required Documents</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Citizenship Document</label>
            <input
              type="file"
              name="citizenshipFile"
              accept=".jpg,.jpeg,.png,.pdf"
              className={inputBase}
              onChange={handleChange}
              required
            />
            {errors.citizenshipFile && <p className={errorText}>{errors.citizenshipFile}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Passport Document</label>
            <input
              type="file"
              name="passportFile"
              accept=".jpg,.jpeg,.png,.pdf"
              className={inputBase}
              onChange={handleChange}
              required
            />
            {errors.passportFile && <p className={errorText}>{errors.passportFile}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recent Photo</label>
            <input
              type="file"
              name="photoFile"
              accept=".jpg,.jpeg,.png,.pdf"
              className={inputBase}
              onChange={handleChange}
              required
            />
            {errors.photoFile && <p className={errorText}>{errors.photoFile}</p>}
          </div>
        </div>

        {/* Declaration */}
        <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              name="declaration"
              checked={formData.declaration}
              onChange={handleChange}
              className="mt-1"
              required
            />
            <span className="text-sm text-gray-700">
              I hereby declare that the information provided is true and accurate. I have not voted elsewhere and
              understand that providing false information may result in legal consequences.
            </span>
          </label>
          {errors.declaration && <p className={errorText}>{errors.declaration}</p>}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md font-semibold text-lg transition-all duration-300 hover:shadow-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
    </div>
  )
}
