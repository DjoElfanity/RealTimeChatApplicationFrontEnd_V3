import React from "react";
import { Button } from "../Common/Button";

interface FormField {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

interface RoomNameFormProps {
  fields: FormField[];
  onSubmit: (e: React.FormEvent) => void;
}

const RoomNameForm: React.FC<RoomNameFormProps> = ({ fields, onSubmit }) => {
  return (
    <div className="bg-white mt-3 p-3.5 rounded-lg flex flex-col">
      <form onSubmit={onSubmit}>
        {fields.map((field, index) => (
          <div key={index} className="mb-2">
            <label
              htmlFor={field.name}
              className="block text-black p-3 font-bold text-left"
            >
              {field.label}
            </label>
            {/* Mise à jour du style de l'input pour correspondre à SearchBar */}
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
        <div className="flex justify-around items-center gap-14 mt-5">
          <Button
            variant="red"
            size="default"
            type="button"
            onClick={() =>
              fields.forEach((field) =>
                field.onChange({
                  target: { value: "" },
                } as React.ChangeEvent<HTMLInputElement>)
              )
            }
          >
            Annuler
          </Button>
          <Button
            variant="green"
            size="default"
            className="px-10"
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
