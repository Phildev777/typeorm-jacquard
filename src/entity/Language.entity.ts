import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Unique("contrainte_unique", ["label"])
@Entity("languages")
export default class Language {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  label: string;
}

/* import { EntitySchema } from "typeorm";
export default new EntitySchema({
  name: "Language",
  tableName: "languages", //permet de renommer la table
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    label: {
      type: "text",
      unique: true,
    },
  },
});
 */
