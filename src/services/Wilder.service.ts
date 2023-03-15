import { DeleteResult, Repository } from "typeorm";
import datasource from "../lib/datasource";
import { IWilderCreate } from "../routes/routes.d";
import LanguageService from "./Language.service";
import NoteService from "./Note.service";
import WilderEntity from "../entity/Wilder.entity";
import {
  IAssignNote,
  ILanguageUpdateKey,
  IMessageWithSuccess,
  IWilderUpdateKey,
} from "./services.d";
import NoteEntity from "../entity/Note.entity";

export default class WilderService {
  db: Repository<WilderEntity>;
  //le constructeur qui charge db pour chaque instanciation
  constructor() {
    this.db = datasource.getRepository("Wilder");
  }

  async createWilder({
    first_name,
    last_name,
    email,
  }: IWilderCreate): Promise<WilderEntity> {
    const wilder: WilderEntity = this.db.create({
      first_name,
      last_name,
      email,
    });

    return await this.db.save(wilder);
  }

  async list(): Promise<WilderEntity[]> {
    // return await this.db.find();

    return await this.db
      .createQueryBuilder("wilder")
      .leftJoinAndSelect("wilder.notes", "note")
      .leftJoinAndSelect("note.language", "language")
      .getMany();
  }

  async findById(id: string): Promise<IWilderUpdateKey> {
    let wilder: WilderEntity | null = await this.db.findOneBy({ id });
    if (!wilder) {
      throw new Error("Ce wilder n'existe pas");
    }
    return wilder as IWilderUpdateKey;
  }

  async delete(id: string): Promise<IMessageWithSuccess> {
    let result: DeleteResult = await this.db.delete({ id });
    if (result.affected === 0) {
      throw new Error("Problème, ce wilder n'existe peut être pas?");
    }
    return {
      success: true,
      message: "Wilder supprimé",
    };
  }
  async update(
    { id, ...other }: IWilderUpdateKey //ou async update ({id, first_name, last_name,email})
  ) {
    let wilder: IWilderUpdateKey = await this.findById(id);
    Object.keys(
      /*permet de créer un tableau avec les clés de l'objet (ici "other")*/ other
    ).forEach((value) => {
      //boucle pour chaque élément du tableau object.keys
      if (other[value]) {
        //=other.first_name ou other["first_name"]
        wilder[value] = other[value];
      }
    });
    return await this.db.save(wilder); // pour le sauvegarder
  }

  async assignNote({
    languageId,
    wilderId,
    note,
  }: IAssignNote): Promise<NoteEntity[]> {
    //console.log("TEST", { languageId, wilderId, note });

    const language: ILanguageUpdateKey =
      await new LanguageService() /*instance*/
        .findById(languageId); // on va chercher la méthode déjà créée dans language.service
    const wilder: IWilderUpdateKey = await this.findById(wilderId); // même chose que pour language mais sans l'import puisque nous sommes déjà dans le service du wilder.
    let previousNote = await new NoteService().findByRelation({
      language,
      wilder,
    });

    const noteResult: NoteEntity[] = await new NoteService().saveNote({
      ...previousNote, //permet de faire un objet null ou de retourver toute la note si il y en a déjà une.
      language,
      wilder,
      note,
    });
    return noteResult;
  }
}
