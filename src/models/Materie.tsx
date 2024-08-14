import { Specializare } from './Specializare';
import { AnClasa } from './AnClasa';

export interface Materie {
    id: number;
    nume: string;
    specializari: Specializare[];
    aniClase: AnClasa[];
}