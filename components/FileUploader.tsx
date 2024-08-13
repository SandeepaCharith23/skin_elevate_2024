// FileUploader.tsx
import React, { useState } from "react";

interface FileUploaderProps {
  files: File | undefined;
  onChange: (files: File | undefined) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ files, onChange }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onChange(file);
    }
  };

  return (
    <div className="file-uploader">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="file-input"
      />
      <label htmlFor="file-input" className="cursor-pointer">
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-auto object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded">
            <span className="text-gray-600">Click or Drag to upload</span>
          </div>
        )}
      </label>
    </div>
  );
};

export default FileUploader;
