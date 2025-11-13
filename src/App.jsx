import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle } from "lucide-react";
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
  return <div className="p-4">Tu aplicación está funcionando correctamente.</div>;
}