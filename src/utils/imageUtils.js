export const validateImageFile = (file) => {
  if (!file.type.startsWith('image/')) {
    throw new Error(`File "${file.name}" is not an image. Please upload only image files.`);
  }
  
  if (file.size > 5 * 1024 * 1024) { // 5 MB limit
    throw new Error(`File "${file.name}" exceeds the 5MB limit.`);
  }
  
  return true;
};

export const processImageFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1];
      resolve({ 
        data: base64String, 
        mimeType: file.type, 
        name: file.name 
      });
    };
    
    reader.onerror = () => {
      reject(new Error(`Failed to read file "${file.name}".`));
    };
    
    reader.readAsDataURL(file);
  });
};

export const processMultipleImages = async (files) => {
  const processedImages = [];
  
  for (const file of files) {
    try {
      validateImageFile(file);
      const processedImage = await processImageFile(file);
      processedImages.push(processedImage);
    } catch (error) {
      throw error;
    }
  }
  
  return processedImages;
}; 