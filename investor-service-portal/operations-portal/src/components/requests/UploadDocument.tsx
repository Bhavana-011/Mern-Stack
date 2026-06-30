import { useState, useContext } from "react";

import { AuthContext } from "../../context/AuthContext";
import { permissions } from "../../utils/permissions";

interface UploadDocumentProps {
  requestId: string;

  onUpload: (
    documentType: string,
    fileName: string
  ) => Promise<void>;
}

function UploadDocument({
  requestId,
  onUpload,
}: UploadDocumentProps) {
  const auth = useContext(AuthContext);

  const [documentType, setDocumentType] =
    useState("KYC");

  const [fileName, setFileName] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  if (!auth) {
    return null;
  }

  if (
    !permissions.canUploadDocuments(auth.role)
  ) {
    return null;
  }

  async function handleSubmit() {
    if (!fileName.trim()) {
      alert("Please enter a file name.");
      return;
    }

    try {
      setLoading(true);

      await onUpload(
        documentType,
        fileName
      );

      alert(
        "Document uploaded successfully!"
      );

      setFileName("");
      setDocumentType("KYC");
    } catch (error) {
      console.error(error);
      alert("Failed to upload document.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">
        Upload Supporting Document
      </h2>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block font-medium">
            Request ID
          </label>

          <input
            type="text"
            value={requestId}
            disabled
            className="w-full rounded-lg border bg-gray-100 px-4 py-2"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Document Type
          </label>

          <select
            value={documentType}
            onChange={(e) =>
              setDocumentType(
                e.target.value
              )
            }
            className="w-full rounded-lg border px-4 py-2"
          >
            <option value="KYC">
              KYC
            </option>

            <option value="PAN">
              PAN
            </option>

            <option value="AADHAAR">
              AADHAAR
            </option>

            <option value="BANK_PROOF">
              BANK PROOF
            </option>

            <option value="OTHER">
              OTHER
            </option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            File Name
          </label>

          <input
            type="text"
            placeholder="Enter file name"
            value={fileName}
            onChange={(e) =>
              setFileName(
                e.target.value
              )
            }
            className="w-full rounded-lg border px-4 py-2"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-lg bg-green-600 px-6 py-2 text-white hover:bg-green-700 disabled:opacity-50"
        >
          {loading
            ? "Uploading..."
            : "Upload Document"}
        </button>
      </div>
    </div>
  );
}

export default UploadDocument;