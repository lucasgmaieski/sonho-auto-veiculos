// const URL_BASE = 'http://138.97.9.237:888';
const URL_BASE = 'http://localhost:888';
export default {
    getMenu: async (id: number) => {
        try{
            const response = await fetch(`${URL_BASE}/sonhoautoveiculos.com.br/wp-json/wp/v2/menu/${id}`, { cache: 'no-store' });
            if(!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const menu = await response.json();
            // console.log(menu[0]);
            return menu || [];
        
        } catch (err) {
            console.log(err);
        }

        return null;
    },
    getPage: async (id: number) => {
        try{
            const response = await fetch(`${URL_BASE}/sonhoautoveiculos.com.br/wp-json/wp/v2/pages/${id}`);
            if(!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const menu = await response.json();
            // console.log(menu[0]);
            return menu ;
        
        } catch (err) {
            console.log(err);
        }

        return null;
    },
    getVehicles: async () => {
        try{
            const response = await fetch(`${URL_BASE}/sonhoautoveiculos.com.br/wp-json/wp/v2/veiculosf`, { next: { revalidate: 3600 } });
            if(!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const vehicles = await response.json();
            console.log(vehicles[0]);
            return vehicles || [];
        
        } catch (err) {
            console.log(err);
        }

        return null;
    },
    getVehicleBySlug: async (slug: string) => {
        try{
            const response = await fetch(`${URL_BASE}/sonhoautoveiculos.com.br/wp-json/wp/v2/veiculos?slug=${slug}`, { next: { revalidate: 3600 } });
            if(!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const vehicle = await response.json();
            console.log("vehicle: ")
            console.log(vehicle);
            return vehicle[0];
        
        } catch (err) {
            console.log(err);
        }

        return null;
    },
    getQtdVehiclesPerField: async () => {
        try{
            // ano, preco, MARCA, condicao, combustivel, motor, quilometros, transmissao, direcao, cor, portas, *localizacao, *carroceria, 
            const response = await fetch(`${URL_BASE}/sonhoautoveiculos.com.br/wp-json/acf/v3/veiculos?_fields=acf.ano,acf.preco,acf.condicao,acf.combustivel,acf.motor,acf.quilometros,acf.transmissao,acf.direcao,acf.cor,acf.portas,acf.marca,acf.tipo`, { next: { revalidate: 3600 } });
            if(!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const vehicleFilters : DadosAPI[] = await response.json();

            interface DadosAPI {
                acf: {
                [campo: string]: string | { name: string };
                };
            }
            interface ContagemPorCampo {
                [campo: string]: {
                [valor: string]: number;
                };
            }
            
            const contagemPorCampo : ContagemPorCampo = {};
            // Itera sobre os dados da API
            vehicleFilters.forEach(item => {
                for (const campo in item.acf) {
                    let valorCampo = item.acf[campo];
                    console.log("campo: " + campo)

                    if ((campo === "marca" || "tipo") && (typeof valorCampo === "object") && ("name" in valorCampo)) {
                        valorCampo = (valorCampo as { name: string }).name;
                      }

                    // Cria um objeto de contagem para o campo, se não existir
                    if (!contagemPorCampo[campo]) {
                        contagemPorCampo[campo] = {};
                    }
            
                    // Atualiza o contador para esse valor no campo
                    contagemPorCampo[campo][valorCampo as string] = (contagemPorCampo[campo][valorCampo as string] || 0) + 1;
                }
            });
            
            // Imprime os resultados
            for (const campo in contagemPorCampo) {
                // console.log(`Contagem para o campo "${campo}":`);
                for (const valor in contagemPorCampo[campo]) {
                    // console.log(`   ${valor}: ${contagemPorCampo[campo][valor]}`);
                }
                // console.log(contagemPorCampo);
            }

            return contagemPorCampo;
        
        } catch (err) {
            console.log(err);
        }


    },
}