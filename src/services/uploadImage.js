export const uploadImage = async (file) => {
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

  if (!file.type.startsWith("image/")) {
    throw new Error("Arquivo inválido");
  }

  if (file.size > 2 * 1024 * 1024) {
    throw new Error("Imagem maior que 2MB");
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error("Erro ao enviar imagem");
  }

  return data.data.url;
};
