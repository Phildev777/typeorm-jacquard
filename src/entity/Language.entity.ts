import { Field, InputType, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@ObjectType()
@Unique("contrainte_unique", ["label"])
@Entity("languages")
export default class Language {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  label: string;
}

@InputType()
export class LanguageInput {
  @Field()
  id: string;
  
  @Field({nullable: true})
  label?: string;
}

@InputType()
export class LanguageCreate {
  @Field()
  label: string;
}

@InputType()
export class LanguageUpdate {
  @Field()
  id: string;
  
  @Field()
  label: string;
}
