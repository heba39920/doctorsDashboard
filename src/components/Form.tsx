import { FileText, Upload, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { useRef, useState } from "react"

interface FormData {
  name: string
}

interface FileWithId {
  id: string
  file: File
}

export const Form = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    const [isDragging, setIsDragging] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState<FileWithId[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)
  
    const handleFileSelect = (files: FileList | null) => {
      if (!files) return
      
      const newFiles: FileWithId[] = Array.from(files).map(file => ({
        id: `${Date.now()}-${Math.random()}`,
        file
      }))
      
      setSelectedFiles(prev => [...prev, ...newFiles])
    }

    const removeFile = (id: string) => {
      setSelectedFiles(prev => prev.filter(f => f.id !== id))
    }

    const onSubmit = (data: FormData) => {
      if (selectedFiles.length === 0) {
        return
      }

      const formData = new FormData()
      formData.append("name", data.name)
      
      selectedFiles.forEach((fileWithId, index) => {
        formData.append(`files`, fileWithId.file)
      })

      console.log("Form submitted:", data, "Files:", selectedFiles)
      // TODO: Submit to API
    }

  return (
    <div className="bg-[var(--surface)] text-[var(--textBlack)] flex min-h-screen justify-center items-start pt-10 pb-10">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 mt-10 w-full max-w-2xl px-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-[var(--textPrimary)]">
            Doctor Name
          </label>
          <input 
            type="text" 
            id="name" 
            {...register("name", { required: "Name is required" })}  
            className="text-sm w-full p-3 rounded-xl border-2 border-[var(--primary)] placeholder:text-[var(--textSecondary)] focus:border-[var(--secondary)] focus:ring-2 focus:ring-[var(--accent)] outline-none transition-all"
            placeholder="Enter doctor's name"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-[var(--textPrimary)]">
            Upload Files
          </label>
          <div
            className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 ${
              isDragging
                ? "border-[var(--primary)] bg-[var(--accent)]/20"
                : "border-[var(--primary)] bg-white"
            }`}
            onDragOver={(e) => {
              e.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={(e) => {
              e.preventDefault()
              setIsDragging(false)
            }}
            onDrop={(e) => {
              e.preventDefault()
              setIsDragging(false)
              const files = e.dataTransfer.files
              if (files.length > 0) {
                handleFileSelect(files)
              }
            }}
          >
            <input
              type="file"
              multiple
              accept="*"
              ref={fileInputRef}
              onChange={(e) => {
                handleFileSelect(e.target.files)
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center justify-center gap-3">
              <Upload className={`w-12 h-12 ${isDragging ? "text-[var(--primary)]" : "text-[var(--textSecondary)]"}`} />
              <div className="text-center">
                <p className="font-medium text-[var(--textPrimary)]">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-[var(--textSecondary)] mt-1">
                  Multiple files supported (.pdf, .png, .jpg, .jpeg, etc.)
                </p>
              </div>
            </div>
          </div>
        </div>

        {selectedFiles.length > 0 && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[var(--textPrimary)]">
              Selected Files ({selectedFiles.length})
            </label>
            <div className="flex flex-col gap-2 max-h-64 overflow-y-auto p-3 bg-white rounded-lg border border-[var(--accent)]">
              {selectedFiles.map((fileWithId) => (
                <div
                  key={fileWithId.id}
                  className="flex items-center justify-between p-3 bg-[var(--surface)] rounded-lg border border-[var(--accent)] hover:border-[var(--primary)] transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <FileText className="w-5 h-5 text-[var(--primary)] flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--textPrimary)] truncate">
                        {fileWithId.file.name}
                      </p>
                      <p className="text-xs text-[var(--textSecondary)]">
                        {(fileWithId.file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(fileWithId.id)}
                    className="ml-2 p-1.5 hover:bg-red-100 rounded-full transition-colors flex-shrink-0"
                    aria-label="Remove file"
                  >
                    <X className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 px-6 bg-[var(--primary)] text-white font-medium rounded-xl hover:bg-[var(--secondary)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)] disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={selectedFiles.length === 0}
        >
          Submit
        </button>
      </form>
    </div>
  )
}
