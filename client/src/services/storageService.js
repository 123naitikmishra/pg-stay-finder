export const storageService = {
  uploadImage: async (file, path = "properties") => {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve("https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        // Return base64 or a local blob URL
        // In local mode base64 works perfectly for persistence
        resolve(reader.result);
      };
      reader.onerror = (err) => {
        reject(err);
      };
      reader.readAsDataURL(file);
    });
  }
};
