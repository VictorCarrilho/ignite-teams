/**
 * Funcionalidade: Buscar os players filtrando pelo GROUP e pelo TEAM
 */

import { playersGetByGroup } from './playersGetByGroup';


export async function playersGetByGroupAndTeam(group: string, team: string){

    try {
        // buscar todos os players do group \\
        const storage = await playersGetByGroup(group);
        // buscar todos os players do group pelo team
        const players = storage.filter(player => player.team === team);

        return players;
        
    } catch (error) {
        throw error;
    }
}