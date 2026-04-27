/**
 * Google Drive API Service
 */

interface UploadResponse {
  id: string;
  name: string;
  webViewLink: string;
}

export async function uploadToDrive(file: File, accessToken: string): Promise<UploadResponse> {
  const metadata = {
    name: file.name,
    mimeType: file.type,
  };

  const form = new FormData();
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  form.append('file', file);

  const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: form,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to upload to Google Drive');
  }

  return response.json();
}

/**
 * Delete a file from Google Drive
 */
export async function deleteFromDrive(fileId: string, accessToken: string): Promise<void> {
  const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok && response.status !== 404) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to delete file from Google Drive');
  }
}

/**
 * Make file public via ID (requires drive.file scope to handle files created by app)
 * Note: making public via API can be tricky if scopes are limited.
 * Alternatively, we just use the webViewLink which usually works if the user is logged in
 * or we can try to update permissions.
 */
export async function makeFilePublic(fileId: string, accessToken: string) {
  const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}/permissions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      role: 'reader',
      type: 'anyone',
    }),
  });

  if (!response.ok) {
    console.warn('Could not make file public automatically. Default permissions apply.');
  }
}
