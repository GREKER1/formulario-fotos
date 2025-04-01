
const cloudName = "dug90vwpe";
const uploadPreset = "formulario2025"; // Cambiar si configuraste uno personalizado
const sheetURL = "https://script.google.com/macros/s/AKfycbxDdEhzgr3j4b3JYAT9rOwVSfu9g_34y9vbg2Oiay4ogmQmWVtWxfwp4n_ocp-YH4M3HQ/exec";

document.getElementById("myForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const form = e.target;
  const nombre = form.nombre.value;
  const planta = form.planta.value;

  const foto1 = await subirACloudinary(document.getElementById("foto1").files[0]);
  const foto2 = await subirACloudinary(document.getElementById("foto2").files[0]);

  const payload = { nombre, planta, foto1, foto2 };

  const res = await fetch(sheetURL, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });

  document.getElementById("mensaje").innerText = "Enviado correctamente.";
  form.reset();
});

async function subirACloudinary(file) {
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const res = await fetch(url, { method: "POST", body: formData });
  const data = await res.json();
  return data.secure_url;
}
