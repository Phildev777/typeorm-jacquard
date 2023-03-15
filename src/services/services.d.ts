import LanguageEntity from "../entity/Language.entity";
import NoteEntity from "../entity/Note.entity";
import WilderEntity from "../entity/Wilder.entity";
export interface IMessageWithSuccess {
  success: boolean;
  message: string;
}

export interface ILanguageUpdateKey extends LanguageEntity {
  [key: string]: string; //permet d'utiliser une variable "string" en tant que clé d'un objet
}

export interface IWilderUpdateKey extends WilderEntity {
  [key: string]: string; //permet d'utiliser une variable "string" en tant que clé d'un objet
  //notes?: NotesEntity[];
}
export interface IFindByRelation {
  language: LanguageEntity;
  wilder: WilderEntity;
}

export interface IAssignNote {
  languageId: string;
  wilderId: string;
  note: number;
}
