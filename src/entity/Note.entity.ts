import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import LanguageEntity from "./Language.entity";
import WilderEntity from "./Wilder.entity";
@Entity("notes")
export default class Note {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  note: number;
  @ManyToOne(() => LanguageEntity, { eager: true, onDelete: "CASCADE" })
  language: LanguageEntity;

  @ManyToOne(() => WilderEntity, (wilder) => wilder.notes, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  wilder: WilderEntity;
}

/* import { EntitySchema } from "typeorm";
export default new EntitySchema({
  name: "Note",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    note: {
      type: "int",
    },
  },
  relations: {
    language: {
      target: "Language",
      type: "many-to-one", //plusieurs notes pour un langage
      eager: true, // permet de récuperer les données de target
      onDelete: "CASCADE",
    },
    wilder: {
      target: "Wilder",
      type: "many-to-one", // plusieurs notes pour un wilder
      eager: true, //peupler/hydrater les données
      joinColumn: true, //permet d'avoir la clé étrangère
      // inverseSide: "notes", //ce côté inverse se retrouve dans l'entité wilder (relations.notes)
      onDelete: "CASCADE", // permet de supprimer les relations dans les autres tables ici permet de supprimer la note et pas le wilder et de supprimer le wilder avec ses notes.
    },
  },
}); */
