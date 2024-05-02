import React from "react";
import { toast } from "react-hot-toast";
import { createRoom } from "../../api/RoomApi"; // Vérifiez le chemin d'import
import { Button } from "../Common/Button";

interface FormField {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

interface RoomNameFormProps {
  token: string; // Token pour l'authentification de l'API
  fields: FormField[];
  onSubmit: (e: React.FormEvent) => void;
}

const RoomNameForm: React.FC<RoomNameFormProps> = ({
  fields,
  onSubmit,
  token,
}) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e); // Permet de gérer également des logiques externes si besoin

    // Spécifique pour la création de salles si le champ s'appelle "roomName"
    const roomField = fields.find((field) => field.name === "roomName");
    if (roomField && roomField.value) {
      try {
        const newRoom = await createRoom(roomField.value, token);
        console.log("Salle créée :", newRoom);
        toast.success("Salle créée avec succès !"); // Affiche un message de succès
        roomField.onChange({
          target: { name: roomField.name, value: "" },
        } as React.ChangeEvent<HTMLInputElement>);
      } catch (error) {
        console.error("Failed to create room", error);
      }
    }
  };

  return (
    <div className="bg-white mt-3 p-3.5 rounded-lg flex flex-col">
      <form onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <div key={index} className="mb-2">
            <label
              htmlFor={field.name}
              className="block text-black p-3 font-bold text-left"
            >
              {field.label}
            </label>
            <input
              type="text"
              id={field.name}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              placeholder={field.placeholder}
              className="form-input px-4 py-3 rounded-lg w-full bg-background-leger placeholder:text-[#709CE6] focus:outline-none text-[#709CE6] border border-background-medium focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        ))}
        <div className="flex justify-around items-center gap-2 mt-5">
          <Button
            variant="red"
            size="default"
            type="button"
            onClick={() =>
              fields.forEach((field) =>
                field.onChange({
                  target: { name: field.name, value: "" },
                } as React.ChangeEvent<HTMLInputElement>)
              )
            }
          >
            Annuler
          </Button>
          <Button
            variant="green"
            size="default"
            className="xl:px-12"
            type="submit"
          >
            Créer
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RoomNameForm;
