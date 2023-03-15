import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import NoteEntity from "./Note.entity";
@Entity("wilders")
export default class Wilder {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  first_name: string;
  @Column()
  last_name: string;
  @Column({ unique: true })
  email: string;
  @OneToMany(() => NoteEntity, (note) => note.wilder)
  notes?: NoteEntity[];
}

/* import { EntitySchema } from "typeorm";
export default new EntitySchema({
  name: "Wilder",
  tableName: "wilders",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    first_name: {
      type: "text",
    },
    last_name: { type: "text" },
    email: { type: "text", unique: true },
  },
  relations: {
    note: {
      type: "one-to-many", // un wilder plusieurs notes
      target: "Note",
      inverseSide: "wilder", // pour récupérer le wilder à partir de la note
    },
  },
}); */
