import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const data = [
  { material: "cable hdmi corto", cantidad: 1 },
  { material: "cable hdmi largo", cantidad: 1 },
  { material: "cinta negra", cantidad: 1 },
  { material: "sub panel", cantidad: 1 },
  { material: "escalador de video", cantidad: 1 },
  { material: "notebooks", cantidad: 1 },
  { material: "Pasador de ppt", cantidad: 1 },
  { material: "cable dvi hdmi", cantidad: 2 },
  { material: "cable usb", cantidad: 2 },
  { material: "cables interlock", cantidad: 2 },
  { material: "telas negras", cantidad: 2 },
  { material: "cables utp de linkeo semi largo", cantidad: 2 },
  { material: "cables de tension de linkeo semi largos", cantidad: 2 },
  { material: "cables de bajada de tension a 220 comun", cantidad: 2 },
  { material: "alargues largos", cantidad: 2 },
  { material: "zapatillas", cantidad: 2 },
  { material: "patas L", cantidad: 3 },
  { material: "estructuras para cerramiento", cantidad: 3 },
  { material: "utp largos de 50 mts", cantidad: 3 },
  { material: "ratcher", cantidad: 3 },
  { material: "Bulones de precision largos", cantidad: 10 },
  { material: "chapas de nivelacion mariposa", cantidad: 10 },
  { material: "bolnes largos finos para estuturas", cantidad: 10 },
  { material: "modulos de p3 de 1 x 50 cm", cantidad: 12 },
  { material: "cables utp de linkeo", cantidad: 13 }
];

export default function AppMaterialesLed() {
  const [checkedItems, setCheckedItems] = useState({});
  const [filtro, setFiltro] = useState("");
  const [vista, setVista] = useState("inicio");
  const [materialCheck, setMaterialCheck] = useState({});
  const [usuario, setUsuario] = useState("");
  const [observacionesMateriales, setObservacionesMateriales] = useState("");
  const [observacionesChecklist, setObservacionesChecklist] = useState("");

  const toggleCheck = (material) => {
    setCheckedItems({
      ...checkedItems,
      [material]: !checkedItems[material],
    });
  };

  const toggleMaterialCheck = (material) => {
    setMaterialCheck({
      ...materialCheck,
      [material]: !materialCheck[material],
    });
  };

  const generarPDF = (usuario) => {
    const doc = new jsPDF();
    const fechaHora = new Date().toLocaleString();

    doc.setFontSize(16);
    doc.text("Checklist de Materiales", 20, 20);
    doc.setFontSize(12);
    doc.text(`Empleado: ${usuario}`, 20, 30);
    doc.text(`Fecha y hora: ${fechaHora}`, 20, 38);

    const rows = data.map((item) => {
      const isChecked = materialCheck[item.material] ? "✔" : "";
      return [isChecked, item.material, item.cantidad];
    });

    autoTable(doc, {
      head: [["✔", "Material", "Cantidad"]],
      body: rows,
      startY: 45,
    });

    if (observacionesMateriales) {
      doc.text("Observaciones:", 20, doc.lastAutoTable.finalY + 10);
      doc.text(observacionesMateriales, 20, doc.lastAutoTable.finalY + 18);
    }

    doc.save(`checklist_${usuario.replace(/\s+/g, '_')}.pdf`);
  };

  const enviarMateriales = () => {
    if (!usuario) {
      alert("Por favor introduce tu nombre antes de enviar.");
      return;
    }

    generarPDF(usuario);
    alert(`Se ha generado el PDF con los materiales cargados por ${usuario}.`);

    setMaterialCheck({});
    setCheckedItems({});
    setObservacionesMateriales("");
  };

  if (vista === "inicio") {
    return (
      <div className="p-4 max-w-2xl mx-auto space-y-6 text-center">
        <img
          src="/logo-alquilemaq.png"
          alt="Logo Alquilemaq"
          className="mx-auto h-20"
        />
        <h1 className="text-3xl font-bold">Alquilemaq</h1>
        <h2 className="text-xl">Sistema Integral de Eventos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div onClick={() => setVista("materiales")} className="cursor-pointer bg-blue-200 p-4 rounded shadow">Materiales</div>
          <div onClick={() => setVista("checklist")} className="cursor-pointer bg-green-200 p-4 rounded shadow">Checklist</div>
          <div onClick={() => setVista("procedimiento")} className="cursor-pointer bg-gray-200 p-4 rounded shadow">Procedimientos</div>
        </div>
      </div>
    );
  }

  if (vista === "materiales") {
    return (
      <div className="p-4 max-w-2xl mx-auto space-y-4">
        <div className="flex justify-between items-center">
          <button onClick={() => setVista("inicio")} className="bg-gray-300 px-4 py-2 rounded">Volver</button>
          <button onClick={enviarMateriales} className="bg-blue-500 text-white px-4 py-2 rounded">Enviar</button>
        </div>
        <div>
          <label>Nombre del usuario:</label>
          <input
            className="border p-2 w-full"
            placeholder="Introduce tu nombre"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>
        <h2 className="text-xl font-bold pt-4">Pantalla LED 3x2 - Indoor, &lt; 60 cm altura</h2>
        <div className="grid gap-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-start gap-4 bg-blue-50 hover:bg-blue-100 p-4 border rounded">
              <input
                type="checkbox"
                checked={!!materialCheck[item.material]}
                onChange={() => toggleMaterialCheck(item.material)}
              />
              <div>
                <p className="font-semibold leading-tight">{item.material}</p>
                <p className="text-sm">Cantidad: {item.cantidad}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-4">
          <label>Observaciones:</label>
          <textarea
            className="border p-2 w-full"
            value={observacionesMateriales}
            onChange={(e) => setObservacionesMateriales(e.target.value)}
            placeholder="Escribe observaciones aquí..."
          />
        </div>
      </div>
    );
  }

  if (vista === "checklist") {
    return (
      <div className="p-4 max-w-2xl mx-auto space-y-4">
        <button onClick={() => setVista("inicio")} className="mb-4 bg-gray-300 px-4 py-2 rounded">Volver</button>
        <h2 className="text-xl font-bold">Checklist de Materiales</h2>
        <input
          className="border p-2 w-full"
          placeholder="Buscar material..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <div className="grid gap-2">
          {data.filter((item) => item.material.toLowerCase().includes(filtro.toLowerCase())).map((item, index) => (
            <div key={index} className="flex items-start gap-4 bg-green-50 hover:bg-green-100 p-4 border rounded">
              <input
                type="checkbox"
                checked={!!checkedItems[item.material]}
                onChange={() => toggleCheck(item.material)}
              />
              <div>
                <p className="font-semibold leading-tight">{item.material}</p>
                <p className="text-sm">Cantidad: {item.cantidad}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="pt-4">
          <label>Observaciones:</label>
          <textarea
            className="border p-2 w-full"
            value={observacionesChecklist}
            onChange={(e) => setObservacionesChecklist(e.target.value)}
            placeholder="Escribe observaciones aquí..."
          />
        </div>
      </div>
    );
  }

  if (vista === "procedimiento") {
    return (
      <div className="p-4 max-w-2xl mx-auto">
        <button onClick={() => setVista("inicio")} className="mb-4 bg-gray-300 px-4 py-2 rounded">Volver</button>
        <h2 className="text-xl font-bold">Procedimientos</h2>
        <p className="mt-2 text-gray-600">Aquí se pueden mostrar pasos, documentación o instrucciones relevantes.</p>
      </div>
    );
  }

  return null;
}
