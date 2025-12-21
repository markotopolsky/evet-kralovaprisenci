import { AktualitaForm } from "../AktualitaForm";

export default function CreateAktualitaPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#2A2A2A]">Nová aktualita</h1>
      <div className="card-friendly p-6">
        <AktualitaForm mode="create" />
      </div>
    </div>
  );
}

