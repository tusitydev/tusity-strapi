import { type File } from '../../../../shared/interface';

export interface Aula {
  id: number;
  nome: string;
  descricao: string;
  video: string | File;
  tempo?: number;
}
