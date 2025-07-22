
const uploadToUploadCare = async (file) => {
  const formData = new FormData();
  formData.append("UPLOADCARE_STORE", "1");
  formData.append("UPLOADCARE_PUB_KEY", "d437aebdd5cd6018bb4a");
  formData.append("file", file);

  const response = await fetch("https://upload.uploadcare.com/base/", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return `https://ucarecdn.com/${data.file}/`;
};

export {
    uploadToUploadCare
};